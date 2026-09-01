// components/appointments/AppointmentTable.tsx
import type React from "react";
import { AppointmentRow } from "./AppointmentRow";
import { useDashboard } from "../../dashboard-service";
import { useMemo } from "react";
import dayjs from "@/lib/dayjs";

export const AppointmentTable: React.FC = () => {
  const { selectedService } = useDashboard();

  // useEffect(() => {
  //   console.log(selectedService)
  // }, [selectedService])

  const sortedAppointments = useMemo(() => {
    return [...selectedService.appointments].sort((a, b) => {
      return dayjs(a.start_time).isAfter(dayjs(b.start_time)) ? 1 : -1;
    });
  }, [selectedService.appointments]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-surface-container-low">
            <th className="px-lg py-md font-label-bold text-label-bold text-on-surface-variant">
              Client
            </th>
            <th className="px-lg py-md font-label-bold text-label-bold text-on-surface-variant">
              Service
            </th>
            <th className="px-lg py-md font-label-bold text-label-bold text-on-surface-variant">
              Slot no.
            </th>
            <th className="px-lg py-md font-label-bold text-label-bold text-on-surface-variant">
              Date & Time
            </th>
            <th className="px-lg py-md font-label-bold text-label-bold text-on-surface-variant">
              Duration (min)
            </th>
            <th className="flex items-center  gap-2 px-lg py-md font-label-bold text-label-bold text-on-surface-variant">
              Price{" "}
              <span className="text-xs text-accent">
                {selectedService.currency.toUpperCase()}
              </span>
            </th>
            <th className="px-lg py-md font-label-bold text-label-bold text-on-surface-variant">
              Status
            </th>
            <th className="px-lg py-md font-label-bold text-label-bold text-on-surface-variant text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/20">
          {sortedAppointments.map((appointment) => (
            <AppointmentRow
              key={appointment.id}
              appointment={appointment}
              onView={() => console.log("View", appointment.customer_name)}
              onReschedule={() =>
                console.log("Reschedule", appointment.customer_name)
              }
              onRebook={() => console.log("Rebook", appointment.customer_name)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
