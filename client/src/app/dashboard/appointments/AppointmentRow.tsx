// components/appointments/AppointmentRow.tsx
import type React from "react";
import { Eye, CalendarCog, XCircle, RefreshCw } from "lucide-react";
import {
  AppointmentStatus,
  type AppointmentStatusType,
} from "./AppointmentStatus";

interface Appointment {
  client: {
    name: string;
    image: string;
  };
  service: string;
  date: string;
  time: string;
  duration: string;
  price: string;
  status: AppointmentStatusType;
}

interface AppointmentRowProps {
  appointment: Appointment;
  onView?: () => void;
  onReschedule?: () => void;
  onCancel?: () => void;
  onRebook?: () => void;
}

export const AppointmentRow: React.FC<AppointmentRowProps> = ({
  appointment,
  onView,
  onReschedule,
  onCancel,
  onRebook,
}) => {
  const isCompleted = appointment.status === "completed";

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <img
              alt={appointment.client.name}
              className="w-full h-full object-cover"
              src={appointment.client.image}
            />
          </div>
          <span className="font-semibold text-sm text-gray-900">
            {appointment.client.name}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-gray-900">{appointment.service}</span>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-semibold text-sm text-gray-900">
            {appointment.date}
          </span>
          <span className="text-xs text-gray-500">{appointment.time}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-gray-500 text-sm">
        {appointment.duration}
      </td>
      <td className="px-6 py-4 font-semibold text-sm text-gray-900">
        {appointment.price}
      </td>
      <td className="px-6 py-4">
        <AppointmentStatus status={appointment.status} />
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
          <button
            onClick={onView}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-all"
            title="View Details"
          >
            <Eye size={18} />
          </button>

          {!isCompleted && (
            <>
              <button
                onClick={onReschedule}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-all"
                title="Reschedule"
              >
                <CalendarCog size={18} />
              </button>
              <button
                onClick={onCancel}
                className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-all"
                title="Cancel"
              >
                <XCircle size={18} />
              </button>
            </>
          )}

          {isCompleted && (
            <button
              onClick={onRebook}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-200 transition-all flex items-center gap-1"
            >
              <RefreshCw size={14} />
              Rebook
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};
