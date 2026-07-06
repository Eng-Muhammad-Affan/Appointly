import {
  useFormContext,
} from "react-hook-form";
import type { FormValues } from "../types";
import { cn } from "@/lib/utils";

type Option = {
  key: any;
  value: any;
};

export const SelectBoxCreateService = ({
  label,
  options,
  name,
}: {
  label: string;
  options: Option[];
  name: keyof FormValues;
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();
  const error = errors[name];

  return (
    <div>
      <label className="block font-label-bold text-label-bold mb-xs text-on-surface-variant">
        {label}
      </label>
      <select
        {...register(name)}
        className={cn(
          "w-full px-md py-sm bg-surface-container-lowest border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-all",
          error ? "border-error" : "border-outline-variant/40",
        )}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.value}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-caption text-error">
          {error.message as string}
        </p>
      )}
    </div>
  );
};