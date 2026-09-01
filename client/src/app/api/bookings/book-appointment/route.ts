import Stripe from "stripe";
import db from "@/db";
import { appointment, service, user } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
import type z from "zod";
import type { BookingSchema } from "@/features/user/service-details";
import { v4 as uuidv4 } from "uuid";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const urls = {
  success: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
  failed: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/failed`,
};

type FormData = z.infer<typeof BookingSchema>;

interface PivotObject {
  service_name: string;
  service_id: string;
  service_currency: string;
  service_price: number;
  stripe_account_id: string;
}

export const POST = async (req: NextRequest) => {
  try {
    const formData: FormData = await req.json();

    const pivot: PivotObject = {
      service_name: "",
      service_id: "",
      service_currency: "",
      service_price: 0,
      stripe_account_id: "",
    };

    await db.transaction(async (tx) => {
      //  1. Get appointment

      const [appointmentData] = await tx
        .select()
        .from(appointment)
        .where(eq(appointment.id, formData.id))
        .limit(1);

      if (!appointmentData) {
        return NextResponse.json(
          { message: "Appointment not found" },
          { status: 404 },
        );
      }

      // _____ 2. Check whether appointment is already booked
      if (appointmentData.booked) {
        return NextResponse.json(
          {
            message: "Slot is not available. Please select another one",
          },
          { status: 409 },
        );
      }

      //  3. Get service
      const [serviceData] = await tx
        .select({
          id: service.id,
          name: service.name,
          currency: service.currency,
          price: service.price,
          user_id: service.user_id,
        })
        .from(service)
        .where(eq(service.id, formData.service_id))
        .limit(1);

      if (!serviceData) {
        return NextResponse.json(
          { message: "Service not found" },
          { status: 404 },
        );
      }

      const [requiredProviderAccount] = await tx
        .select()
        .from(user)
        .where(eq(user.id, serviceData.user_id));

      if (!requiredProviderAccount) {
        return NextResponse.json(
          {
            message: "Service provider is not connected to Stripe",
          },
          { status: 400 },
        );
      } else if (!requiredProviderAccount.stripe_account_id) {
        return NextResponse.json(
          {
            message: "Service provider is not connected to Stripe",
          },
          { status: 400 },
        );
      } else {
        pivot.service_id = serviceData.id;
        pivot.service_name = serviceData.name;
        pivot.service_price = serviceData.price;
        pivot.service_currency = serviceData.currency;
        pivot.stripe_account_id = requiredProviderAccount.stripe_account_id;
      }
    });

    // 4. Generate transfer group
    const transferGroup = `appointment_${uuidv4()}`;

    // 5. Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card"],

      customer_email: formData.customer_email,

      client_reference_id: formData.id,

      /*
       * IMPORTANT:
       * Use transferGroup everywhere, not transfer_group.
       */
      metadata: {
        appointmentId: formData.id,
        customerName: formData.customer_name,
        customerEmail: formData.customer_email,
        transferGroup,
        serviceId: pivot.service_id,
        connectedAccountId: pivot.stripe_account_id,
      },

      line_items: [
        {
          price_data: {
            currency: pivot.service_currency.toLowerCase(),

            product_data: {
              name: `Appointment for ${pivot.service_name}`,
            },

            unit_amount: Math.round(pivot.service_price * 100),
          },

          quantity: 1,
        },
      ],

      success_url: urls.success,
      cancel_url: urls.failed,

      /*
       * This creates a PaymentIntent on your PLATFORM account.
       *
       * transfer_group allows you to associate the eventual
       * Stripe Transfer with this payment.
       */
      payment_intent_data: {
        transfer_group: transferGroup,

        metadata: {
          appointmentId: formData.id,
          serviceId: pivot.service_id,
          transferGroup,
          connectedAccountId: pivot.stripe_account_id,
        },
      },
    });

    // 6. Return Checkout URL
    return NextResponse.json({
      url: session.url,
      message: "Redirecting to checkout",
    });
  } catch (error) {
    console.error("Checkout creation error:", error);

    return NextResponse.json(
      {
        message: "Error in creating payment",
      },
      { status: 500 },
    );
  }
};
