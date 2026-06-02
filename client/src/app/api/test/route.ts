import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";

export async function GET(req:NextRequest) {

    const secretKey = process.env.STRIPE_SECRET_KEY as string

  try {
    const stripe = new Stripe(secretKey);
    const response = await stripe.customers.list(
        {
            email:"affanamir903@gmail.com"
        }
    )
    return NextResponse.json(response);
    
  } catch (err: any) {
    if (err.type === 'authentication_error') {
      console.error("❌ Invalid or revoked Stripe key:", err.message);
    } else if (err.statusCode === 401) {
      console.error("❌ Authentication failed - key may have been rolled");
    }
    return NextResponse.json({
        status:false
    });
  }
}