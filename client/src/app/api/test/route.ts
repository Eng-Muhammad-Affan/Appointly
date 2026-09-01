import db from "@/db";
import { appointment } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.nextUrl);
  const appointmentId = url.searchParams.get("appointmentid") as string;

  const response = await db
    .update(appointment)
    .set({
      booked: false,
      customer_email: null,
      customer_name: null,
      transfer_group: null,
    })
    .where(eq(appointment.id, appointmentId))
    .returning();
  return NextResponse.json(response);
}
