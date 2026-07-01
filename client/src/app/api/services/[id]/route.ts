import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import db from "@/db";
import { appointment, service } from "@/db/schemas";
import { eq, and, or, gt, not } from "drizzle-orm";
import dayjs from "@/lib/dayjs";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;

    const today = dayjs().format("YYYY-MM-DD");


    // Test 2: Try the relation query
    const requiredService = await db.query.service.findFirst({
      where: and(
        not(service.is_active),
        eq(service.id, id)
      ),
      with: {
        user: {
          columns: {
            name: true
          }
        }
      },
      columns: {
        is_active: false,
        maxCapacity: false,
        last_generated: false,
      }
    });

    const slots = await db.query.appointment.findMany({
      where: and(
        eq(appointment.service_id, id),
        or(gt(appointment.slot_date, today), eq(appointment.slot_date, today)),
        not(appointment.booked),
      ),
      columns: {
        transfer_group: false,
      },
    });

    return NextResponse.json({
      "service": requiredService,
      "slots": slots
    }, { status: 200 });

  } catch (err) {
    console.error("Query error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};