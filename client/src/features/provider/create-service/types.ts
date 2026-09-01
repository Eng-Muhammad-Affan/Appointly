import type z from "zod";
import type { AddServiceAPISchema } from "./validations";

export type FormValues = z.infer<typeof AddServiceAPISchema>;
