"use client";

// ____ This schema should be compiled as client side component because we are using FileList and FileList doesnot exists on nextjs server side ...

import { z } from "zod";
import { days } from "@/shared/constants";

const AddServiceAPISchema = z
  .object({
    name: z
      .string("Name is required")
      .min(3, "Minimum 3 characters required")
      .max(100, "Maximum 100 characters allowed"),
    user_id: z.string(),
    category: z.string(),
    description: z
      .string("Description is required")
      .min(50, "Minimum 50 characters required")
      .max(400, "Maximum 300 characters allowed"),

    price: z
      .number("Price is required")
      .nonnegative("Price cannot be negative"),

    currency: z
      .string("Currency is required")
      .length(3, "Currency must be a 3-letter code (e.g., USD, PKR)"),

    working_days: z
      .array(z.enum(days))
      .nonempty("At least one day is required")
      .refine((arr) => new Set(arr).size === arr.length, {
        message: "Days must be unique",
      }),

    start_time: z
      .string("Start time is required")
      .regex(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, "Invalid time format"),

    details: z.string().array().nonempty("Please provide at least one detail"),

    end_time: z
      .string("End time is required")
      .regex(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, "Invalid time format"),

    duration: z
      .number("Duration is required")
      .positive("Duration must be positive"),

    max_appointments_per_day: z
      .number("Must be a number")
      .positive("Must be positive"),

    max_capacity: z.number("Must be a number").positive("Must be positive"),

    buffer_time_min: z
      .number("Must be a number")
      .min(0, "Must be at least 0"),

    cancellation_policy_hrs: z
      .number("Must be a number")
      .min(0, "Must be at least 0"),
  })
  .strict()
  .superRefine((data, ctx) => {
    const toMinutes = (t: string) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };

    const startMin = toMinutes(data.start_time);
    const endMin = toMinutes(data.end_time);
    const totalAvailableMinutes = endMin - startMin;

    // 1. End must be after start
    if (totalAvailableMinutes <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End time must be after start time",
        path: ["end_time"],
      });
      return;
    }

    // 2. A single appointment (plus buffer) must fit in the window
    const slotMinutes = data.duration + data.buffer_time_min;
    if (slotMinutes > totalAvailableMinutes) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `A single appointment (${data.duration} min + ${data.buffer_time_min} min buffer) does not fit in the available ${totalAvailableMinutes} min window.`,
        path: ["duration"],
      });
      return;
    }

    // 3. Number of slots that fit (last buffer can be ignored)
    //    n slots fit if: n * duration + (n - 1) * buffer <= totalAvailable
    //    => n <= (totalAvailable + buffer) / (duration + buffer)
    const slotsPerDay = Math.floor(
      (totalAvailableMinutes + data.buffer_time_min) / slotMinutes
    );

    // 4. Total appointments possible given per-slot capacity
    const maxPossibleAppointments = slotsPerDay * data.max_capacity;

    if (data.max_appointments_per_day > maxPossibleAppointments) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          `With a ${data.duration} min duration, ${data.buffer_time_min} min buffer, ` +
          `and capacity of ${data.max_capacity} per slot, only ${slotsPerDay} slot(s) ` +
          `fit in the ${totalAvailableMinutes} min window — a maximum of ` +
          `${maxPossibleAppointments} appointment(s) per day. Please adjust your values.`,
        path: ["max_appointments_per_day"],
      });
    }
  });

export { AddServiceAPISchema };
