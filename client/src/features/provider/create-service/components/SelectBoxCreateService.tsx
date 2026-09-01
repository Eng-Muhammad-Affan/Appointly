import { useFormContext } from "react-hook-form";
import type { FormValues } from "../types";
import { cn } from "@/lib/utils";

type Option = {
  // biome-ignore lint/suspicious/noExplicitAny:required
  key: any;
  // biome-ignore lint/suspicious/noExplicitAny:required
  value: any;
};

export const SelectBoxCreateService = ({
  label,
  options,
  name,
  type,
}: {
  label: string;
  options: Option[];
  name: keyof FormValues;
  type: "number" | "string";
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();
  const error = errors[name];

  const fieldParams: Record<string, boolean | string> = {};
  switch (type) {
    case "number":
      fieldParams.valueAsNumber = true;
      break;
  }

  return (
    <div>
      <label
        className="block font-label-bold text-label-bold mb-xs text-on-surface-variant"
        htmlFor={name}
      >
        {label}
      </label>
      <select
        {...register(name, fieldParams)}
        className={cn(
          "w-full px-md py-sm bg-surface-container-lowest border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-all",
          error ? "border-error" : "border-outline-variant/40",
        )}
      >
        {options.map((opt) => (
          <option key={opt.key} value={opt.value}>
            {opt.key}
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
