import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import Logger from '@/utils/Logger';
import db from '@/db';
import { appointment } from '@/db/schemas';
import { eq } from 'drizzle-orm';

const stripe = new Stripe(process.env.STRIPE_WEBHOOK_TOKEN as string);

const logger = new Logger("/ap/webhook/route.ts")

export async function POST(req: NextRequest) {
    logger.log(15, "Running payment webhook ...", "--------------------------------")
    const sig = req.headers.get('stripe-signature')!;
    const buf = await req.arrayBuffer();
    const body = Buffer.from(buf);
    logger.log(19, "Extracted signature : ...", sig)
    logger.log(20, "Created buffer : ...", buf)
    logger.log(21, "extracted body from buffer : ...", body)
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_TOKEN as string
        );
    } catch (err) {
        console.error('❌ Webhook signature verification failed.', err);
        return new NextResponse('Webhook Error', { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        logger.log(36, "Constructed webhook event : ", event);
        const session = event.data.object as Stripe.Checkout.Session;
        const appointmentId = session.metadata?.appointment_id;
        logger.log(39, "Recieved session : ", session);
        logger.log(40, "Recieved appointment id : ", appointmentId);

        if (appointmentId) {
            // Mark order as Paid
            logger.log(44, "Updating slot status : ", "------------");
            // Trigger stock update
            try {
                const response = await db.update(appointment).set({
                    status: "PAID"
                }).where(eq(appointment.id, appointmentId));

                logger.log(46, "Changed appointment status : ", response);
            } catch (error) {
                console.error("❌ Failed to update product stock:", error);
            }
        }
    }
    else if (true) {
        console.log(`event type : ${event.type}`)
        console.log(`\n\n -----------------------------------------------`)
        console.log(event)
    }

    return new NextResponse('Webhook received', { status: 200 });
}