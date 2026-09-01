// components/appointments/AppointmentFilters.tsx
import type React from "react";
import { cn } from "@/lib/utils";

interface FilterTab {
  label: string;
  value: string;
  isActive?: boolean;
}

interface AppointmentFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters: FilterTab[] = [
  { label: "All", value: "all" },
  { label: "Upcoming", value: "UPCOMING" },
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
];

export const AppointmentFilters: React.FC<AppointmentFiltersProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-sm mb-lg border-b border-outline-variant/30 pb-sm">
      {filters.map((filter) => (
        <button
          type="button"
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            "px-md py-sm font-label-bold text-label-bold border-b-2 transition-all",
            activeFilter === filter.value
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-primary",
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};
