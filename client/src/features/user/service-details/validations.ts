import z from "zod";

export const BookingSchema = z.object(
    {
        id: z.string("invalid id"),
        service_id: z.string("invalid service id"),
        customer_name: z
              .string("Invalid name")
              .min(7, "Minimum 7 characters required")
              .max(20, "Maximum 20 characters required"),
        customer_email: z.email("Invalid email"),
    }
).strict()