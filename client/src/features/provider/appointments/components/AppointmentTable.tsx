// components/appointments/AppointmentTable.tsx
import type React from "react";
import { AppointmentRow } from "./AppointmentRow";
import { useDashboard } from "../../dashboard-service";
import { useEffect } from "react";

export const AppointmentTable: React.FC = () => {
  const {selectedService} = useDashboard()

  useEffect(() => {
    console.log(selectedService)
  }, [selectedService])

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
              Date & Time
            </th>
            <th className="px-lg py-md font-label-bold text-label-bold text-on-surface-variant">
              Duration
            </th>
            <th className="px-lg py-md font-label-bold text-label-bold text-on-surface-variant">
              Price
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
          {selectedService.appointments.map((appointment, index) => (
            <AppointmentRow
              key={index}
              appointment={appointment}
              onView={() => console.log("View", appointment.customer_name)}
              onReschedule={() =>
                console.log("Reschedule", appointment.customer_name)
              }
              onCancel={() => console.log("Cancel", appointment.customer_name)}
              onRebook={() => console.log("Rebook", appointment.customer_name)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
