import { z } from "zod";

export const SignupFormSchema = z
  .object({
    name:z.string("Invalid name").min(7,"Minimum 7 characters allowed").max(20,"Name must be under 20 characters"),
    email: z.email("Invalid email"),
    password: z
      .string({ message: "Please Enter password" })
      .min(8, "Password must be at least 8 characters long")
      .max(15, "Password must be shorter than 15 characters")

      // _____ Validate lowercase characters
      .refine((val) => /[a-z]/.test(val), {
        message: "Password must include lowercase characters",
      })

      // _____ Validate uppercase characters
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must include uppercase characters",
      })
  })
  .strict();