import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import db from "@/db";
import { appointment } from "@/db/schemas";
import { eq, and } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const StripeCheckoutSessionMetadataSchema = z
  .object({
    appointmentId: z.string(),
    customerName: z.string(),
    customerEmail: z.string(),
    transferGroup: z.string(),
    serviceId: z.string(),
    connectedAccountId: z.string(),
  })
  .strict();

type MetaData = z.infer<typeof StripeCheckoutSessionMetadataSchema>;

/*
 * Allocate the appointment.
 *
 * IMPORTANT:
 * The WHERE clause contains booked = false.
 *
 * This makes the update atomic and prevents two webhook
 * executions from booking the same appointment.
 */
const allocateSlot = async (data: MetaData) => {
  const [updatedAppointment] = await db
    .update(appointment)
    .set({
      booked: true,
      customer_name: data.customerName,
      customer_email: data.customerEmail,
      transfer_group: data.transferGroup,
      status: "PAID",
    })
    .where(
      and(
        eq(appointment.id, data.appointmentId),
        eq(appointment.booked, false),
      ),
    )
    .returning();

  return updatedAppointment;
};

export async function POST(req: NextRequest) {
  /*
   * Stripe requires the RAW request body for signature verification.
   */
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new NextResponse("Missing Stripe signature", {
      status: 400,
    });
  }

  const body = Buffer.from(await req.arrayBuffer());

  let event: Stripe.Event;

  /*
   * Verify webhook signature
   */
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_TOKEN as string,
    );
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);

    return new NextResponse("Webhook signature verification failed", {
      status: 400,
    });
  }

  /*
   * Handle only the events that we actually need.
   */
  try {
    switch (event.type) {
      /*
       * Customer successfully completed Checkout.
       */
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        /*
         * Checkout Session metadata
         */
        const validation = StripeCheckoutSessionMetadataSchema.safeParse(
          session.metadata,
        );

        if (!validation.success) {
          console.error(
            "Invalid Checkout Session metadata:",
            validation.error.flatten(),
          );

          return new NextResponse("Invalid metadata", {
            status: 400,
          });
        }

        const metadata = validation.data;

        /*
         * For normal card payments, this event means Checkout
         * has successfully completed.
         *
         * However, if you want to be extremely strict about
         * payment confirmation, you can additionally check
         * payment_status.
         */
        if (session.payment_status !== "paid") {
          console.log(
            `Checkout completed but payment status is ${session.payment_status}`,
          );

          break;
        }

        /*
         * Atomically allocate the appointment.
         */
        const updatedAppointment = await allocateSlot(metadata);

        /*
         * If nothing was updated, either:
         *
         * 1. The appointment was already booked, or
         * 2. The appointment doesn't exist.
         *
         * This also makes the webhook effectively idempotent
         * for the booking operation.
         */
        if (!updatedAppointment) {
          console.log(
            `Appointment ${metadata.appointmentId} was already booked or does not exist`,
          );

          break;
        }

        console.log(
          `Appointment ${metadata.appointmentId} successfully booked`,
        );

        break;
      }

      /*
       * Payment failed.
       */
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        console.log(
          "Payment failed:",
          paymentIntent.id,
          paymentIntent.last_payment_error?.message,
        );

        /*
         * Do NOT mark the appointment as PAID.
         *
         * You can optionally update your appointment status
         * to FAILED here if your enum supports it.
         */

        break;
      }

      /*
       * Payment succeeded.
       *
       * This is useful if you want payment confirmation to be
       * based on the PaymentIntent rather than Checkout.
       */
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        console.log("Payment succeeded:", paymentIntent.id);

        /*
         * You already have the metadata on PaymentIntent.
         *
         * If you use checkout.session.completed to allocate the
         * appointment, do NOT also allocate it here unless the
         * operation is explicitly idempotent.
         */

        break;
      }

      default:
        console.log(`Unhandled Stripe event: ${event.type}`);
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error("Stripe webhook processing error:", error);

    /*
     * Returning 500 tells Stripe that processing failed and
     * allows Stripe to retry the webhook.
     */
    return new NextResponse("Webhook processing failed", {
      status: 500,
    });
  }
}
