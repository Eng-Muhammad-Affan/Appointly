import { z } from "zod";

export const checkoutFormSchema = z.object({
  name: z
    .string({ message: "Please Enter your name" })
    .min(5, "Name must be atleast 10 characters")
    .max(20, "Name must be shorter than 15 characters"),
  email: z.email("Invalid email"),
  phone: z
    .string()
    .min(11, "Phone number must be 11 digits")
    .max(11, "Phone number must be 11 digits")
    .regex(/^03[0-9]{9}$/, "Enter a valid Pakistan phone number (e.g., 03001234567)"),

  zipCode: z
    .string()
    .length(5, "ZIP code must be 5 digits")
    .regex(/^\d{5}$/, "ZIP code must contain only digits"),

  address: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(500, "Address is too long"),

  city: z
    .string()
    .min(1, "Please select a city"),

  state: z
    .string()
    .min(1, "Please select a state/province"),

  notes: z
    .string()
    .max(500, "Notes cannot exceed 500 characters")
    .optional()
    .or(z.literal("")),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;