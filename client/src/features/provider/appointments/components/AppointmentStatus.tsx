// components/appointments/AppointmentStatus.tsx
import { cn } from "@/lib/utils";

export type AppointmentStatusType =
  | "PENDING"
  | "COMPLETED"
  | "CANCELLED"
  | "REQUESTED-RESCHEDULE";

const statusStyles: Record<AppointmentStatusType, string> = {
  "REQUESTED-RESCHEDULE": "bg-accent-success/20 text-[#2d6a4f]",
  PENDING: "bg-secondary-container/30 text-on-secondary-container",
  COMPLETED: "bg-surface-container-high text-on-surface-variant",
  CANCELLED: "bg-error-container/20 text-error",
};

export const AppointmentStatus = ({
  status,
}: {
  status: AppointmentStatusType;
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
