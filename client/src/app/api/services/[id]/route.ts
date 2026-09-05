import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import db from "@/db";
import { appointment, service, user } from "@/db/schemas";
import { eq, and, or, gt, not } from "drizzle-orm";
import dayjs from "@/lib/dayjs";

export const GET = async (
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;

    const today = dayjs().format("YYYY-MM-DD");

    let requiredService = {};
    let slots: any[] = [];

    await db.transaction(async (tsx) => {
      await tsx
        .select({
          id: service.id,
          image: service.image,
          created_at: service.created_at,
          user_id: service.user_id,
          name: service.name,
          category: service.category,
          description: service.description,
          price: service.price,
          currency: service.currency,
          is_active: service.is_active,
          working_days: service.working_days,
          start_time: service.start_time,
          end_time: service.end_time,
          duration: service.duration,
          max_appointments_per_day: service.max_appointments_per_day,
          ratings: service.ratings,
          details: service.details,
          maxCapacity: service.maxCapacity,
          buffer_time_in_min: service.buffer_time_in_min,
          cancellation_policy_hrs: service.cancellation_policy_hrs,
          // 👇 Flat user fields
          userName: user.name,
        })
        .from(service)
        .where(and(eq(service.is_active, true), eq(service.id, id)))
        .leftJoin(user, eq(service.user_id, user.id))
        .then((data) => {
          requiredService = data[0];
        });

      // ____ Fetch appointments ...
      slots = await tsx.query.appointment.findMany({
        where: and(
          eq(appointment.service_id, id),
          or(
            gt(appointment.slot_date, today),
            eq(appointment.slot_date, today),
          ),
          not(appointment.booked),
        ),
        columns: {
          transfer_group: false,
          updated_at: false,
          customer_email: false,
          customer_name: false,
          created_at: false,
          status: false,
        },
      });
    });

    // console.log(requiredService);
    return NextResponse.json(
      {
        service: {
          ...requiredService,
          remainingSlots: slots.length,
        },
        slots: slots,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Query error:", err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
};
