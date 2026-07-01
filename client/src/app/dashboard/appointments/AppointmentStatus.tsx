// components/appointments/AppointmentStatus.tsx
import type React from "react";
import { cn } from "@/lib/utils";

export type AppointmentStatusType =
  | "confirmed"
  | "pending"
  | "completed"
  | "cancelled";

interface AppointmentStatusProps {
  status: AppointmentStatusType;
}

const statusStyles: Record<AppointmentStatusType, string> = {
  confirmed: "bg-accent-success/20 text-[#2d6a4f]",
  pending: "bg-secondary-container/30 text-on-secondary-container",
  completed: "bg-surface-container-high text-on-surface-variant",
  cancelled: "bg-error-container/20 text-error",
};

export const AppointmentStatus: React.FC<AppointmentStatusProps> = ({
  status,
}) => {
  return (
    <span
      className={cn(
        "px-sm py-xs rounded-full text-caption font-label-bold capitalize",
        statusStyles[status],
      )}
    >
      {status}
    </span>
  );
};
