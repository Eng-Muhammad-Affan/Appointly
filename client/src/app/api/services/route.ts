import { type NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { user, service, appointment } from "@/db/schemas";
import { eq, and, ilike } from "drizzle-orm";

export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const searchQuery = params.get("query");

  try {
    const isSearchParamsPresent = searchQuery && searchQuery.trim() !== "";
    const whereConditions = [eq(service.is_active, true)];
    if (isSearchParamsPresent) {
      whereConditions.push(ilike(service.name, `%${searchQuery}%`));
    }

    const services = await db
      .select({
        // Service fields
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
        remainingSlots: db.$count(
          appointment,
          and(
            eq(appointment.service_id, service.id),
            eq(appointment.booked, false),
          ),
        ),
        // 👇 Flat user fields
        userName: user.name,
      })
      .from(service)
      .where(and(...whereConditions))
      .leftJoin(user, eq(service.user_id, user.id));

    return NextResponse.json(services, { status: 200 });
  } catch (err) {
    console.error("Query error:", err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
};
