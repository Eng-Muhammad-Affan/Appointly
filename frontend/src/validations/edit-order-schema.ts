// @/validations/edit-order-schema.ts
import { z } from "zod";

export const editOrderSchema = z.object({
  user_name: z.string().min(1, "Customer name is required"),
  user_email: z.string().email("Invalid email address"),
  phone_number: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  zipcode: z.string().min(1, "Zip code is required"),
  order_note: z.string().optional(),
  status: z.enum(['pending', 'paid', 'cancelled']),
});

export type EditOrderFormData = z.infer<typeof editOrderSchema>;