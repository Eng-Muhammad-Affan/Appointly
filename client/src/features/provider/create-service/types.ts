"use client"

import z from "zod";
import { AddServiceAPISchema } from "./validations";

export type FormValues = z.input<typeof AddServiceAPISchema>;