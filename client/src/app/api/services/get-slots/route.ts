// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import db from "@/db";
// import { type Appointment, type Service, appointment } from "@/db/schemas";
// import dayjs from "@/lib/dayjs";
// import { and, eq, not, gt, or ,gte,} from "drizzle-orm";
// import { GenerateSlots } from "@/utils";

// type Payload = Pick<
//   Service,
//   "id" | "duration" | "working_days" | "start_time" | "end_time"
// >;

// type Columns<T> = {
//   [K in keyof T]: boolean;
// };

// type Req = Payload & {
//   columns: Partial<Columns<Appointment>>;
// };

// export const POST = async (req: NextRequest) => {
//   const { id, duration, working_days, start_time, end_time, columns }: Req =
//     await req.json();

//   const today = dayjs().toDate();
//   const currentTime = today.getMilliseconds();

//   try {
//     /**
//      * Selects slots where :
//      * 1. service id matched
//      * 2. slot date >= today
//      * 3. not booked
//      */
// const slots = await db.query.appointment.findMany({
//   where: and(
//     eq(appointment.service_id, id),
//     // Compare dates for today or future
//     gte(appointment.slot_date, today),  // Uncomment and fix this
//     // Only compare times for today's appointments
//     or(
//       gt(appointment.slot_date, today),  // Future dates - any time is fine
//       and(
//         eq(appointment.slot_date, today), // Today's date
//         gt(appointment.start_time, currentTime) // Only future times today
//       )
//     ),
//     not(appointment.booked),
//   ),
//   columns: columns,
// });

//     if (slots.length === 0) {
//       GenerateSlots(columns, {
//         id,
//         duration,
//         working_days,
//         start_time,
//         end_time,
//       });
//     }
//     return NextResponse.json({ slots }, { status: 200 });
//   } catch (err) {
//     console.log(err);
//     return NextResponse.json({ message: "An error occured" }, { status: 500 });
//   }
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import db from "@/db";
import { type Appointment, type Service, appointment } from "@/db/schemas";
import dayjs from "@/lib/dayjs";
import { and, eq, not, gt, or, gte } from "drizzle-orm";
import { GenerateSlots } from "@/utils";

type Payload = Pick<
  Service,
  "id" | "duration" | "working_days" | "start_time" | "end_time"
>;

type Columns<T> = {
  [K in keyof T]: boolean;
};

type Req = Payload & {
  columns: Partial<Columns<Appointment>>;
};

export const POST = async (req: NextRequest) => {
  const { id, duration, working_days, start_time, end_time, columns }: Req =
    await req.json();

  const now = dayjs();
  const today = now.format("YYYY-MM-DD"); // Format as date string if your DB stores dates this way

  try {
    /**
     * Selects slots where:
     * 1. service id matched
     * 2. slot date >= today
     * 3. not booked
     * 4. For today, only future times
     */
    const slots = await db.query.appointment.findMany({
      where: and(
        eq(appointment.service_id, id),
        eq(appointment.status, "PENDING"),
        gte(appointment.slot_date, today), // Compare date strings
        or(
          gt(appointment.slot_date, today), // Future dates - any time is fine
          and(
            eq(appointment.slot_date, today), // Today's date
            gt(appointment.start_time, now.toDate()), // Only future times today
          ),
        ),
        not(appointment.booked),
      ),
      columns: columns,
    });

    console.log(`slots found : ${slots.length} `);
    if (slots.length === 0) {
      GenerateSlots(columns, {
        id,
        duration,
        working_days,
        start_time,
        end_time,
      });
    }
    return NextResponse.json({ slots }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "An error occured" }, { status: 500 });
  }
};
