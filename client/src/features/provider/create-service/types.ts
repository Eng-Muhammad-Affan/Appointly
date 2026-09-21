"use client";

import type z from "zod";
import type { AddServiceAPISchema } from "./validations";

export type FormValues = z.input<typeof AddServiceAPISchema>;
