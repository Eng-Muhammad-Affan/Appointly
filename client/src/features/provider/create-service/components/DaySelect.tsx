"use client";
import { days } from "@/shared/constants/data";

import { useFormContext, Controller } from "react-hook-form";
import type { FormValues } from "../types";
import { cn } from "@/lib/utils";

export const DaySelect = () => {
  const { control } = useFormContext<FormValues>();

  return (
    <div className="mb-lg">
      <label
        className="block font-label-bold text-label-bold mb-md text-on-surface-variant"
        htmlFor={"working_days"}
      >
        Working days
      </label>
      <Controller
        name="working_days"
        control={control}
        render={({ field }) => (
          <div className="grid grid-cols-7 gap-xs">
            {days.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => {
                  const newValue = field.value.includes(day)
                    ? field.value.filter((d: string) => d !== day)
                    : [...field.value, day];
                  field.onChange(newValue);
                }}
                className={cn(
                  "h-12 flex flex-col items-center justify-center rounded-lg border transition-colors",
                  field.value.includes(day)
                    ? "border-2 border-primary bg-primary text-on-primary"
                    : "border-outline-variant/40 bg-surface-container text-on-surface-variant hover:bg-surface-container-high",
                )}
              >
                <span className="text-[10px] font-bold">
                  {day.slice(0, 2).toUpperCase()}
                </span>
              </button>
            ))}
          </div>
        )}
      />
    </div>
  );
};
