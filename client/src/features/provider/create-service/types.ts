import z from "zod";
import { AddServiceAPISchema } from "./validations";

export type FormValues = z.infer<typeof AddServiceAPISchema>;