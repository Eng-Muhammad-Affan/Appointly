// components/appointments/AppointmentTable.tsx
import type React from "react";
import { AppointmentRow } from "./AppointmentRow";
import type { AppointmentStatusType } from "./AppointmentStatus";

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

const mockAppointments: Appointment[] = [
  {
    client: {
      name: "Sarah Jenkins",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAeDxGFWqhqYAPY744lbH-F7F22ZptbSSfzY-rZ98MnUlohxnFMEPka3I7kiDUG-HeAPnhBnH-6wmDVAUArHRaENiWgjyOXGDWaAfj014rrTMseMSkFEw0AjU50pKIdBbUHOOlmMq8qjeGXsdLviijVBFi0WwA30BxYwJjWMjggYP4_yyvyHPD7TH2U6vNeq3tF-MC5bWxpxEOm4D65hKXAFeTa-vkrRiQCykfYEZFb5YleNsWAVqNUCQ6YprvTCptXaNOGDjJJPNf8",
    },
    service: "Signature Hydrafacial",
    date: "Oct 25, 2023",
    time: "10:00 AM",
    duration: "60 min",
    price: "$120.00",
    status: "confirmed",
  },
  {
    client: {
      name: "Michael Chen",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD7ramaPTQh0iWxRxEiWFG5JxJ3V01VsTFecofHoq2ryJXnqouO4UHXZS041gQW8wXy6_BIhTtp3X6aSrwYwEEMCAciQFtNWdmxDub5PYIpRtpRBhdtUyQtxaHR-rbhencOqAAH756Axm7T8RRaq7njHdXMgkQ1gp-rAaZMSzeyZe1kYkSuZycLXHGhrq4RYCH_7bP-LbTxNSyjAzAABd07oRoEhaWtALHBCcj3YjDWwcvo18hR6zXcvngLlDvQf3M0d4CGxR-zejH7",
    },
    service: "Deep Tissue Massage",
    date: "Oct 25, 2023",
    time: "01:30 PM",
    duration: "90 min",
    price: "$150.00",
    status: "pending",
  },
  {
    client: {
      name: "Elena Rodriguez",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA_G4P4-zYCClLLZ-R0wVYrl1VJL_5a19wf3RbxAwoXZqQUC-RyAPNV4oIP3ukG4nYcqmFULZsm4TcxSOxj4f-42eLOdToLqLHGXB8TTAjVXDBoJdVnwgfOddwYy6xv4KROzeu4L8acn5LZEECooEf7NClCsua-R9wqHK2yabwb4NQyR1nWF4vVtLZzzYeV3BxFxTGnVvR8nVlGJaRRp6sWb5SEzfQU7cQ2_WcDzmt5l5tr21OGvM81SXOsbIiCyzujJRKEgUApHkkv",
    },
    service: "Lash Lift & Tint",
    date: "Oct 24, 2023",
    time: "11:00 AM",
    duration: "45 min",
    price: "$85.00",
    status: "completed",
  },
];

export const AppointmentTable: React.FC = () => {
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
          {mockAppointments.map((appointment, index) => (
            <AppointmentRow
              key={index}
              appointment={appointment}
              onView={() => console.log("View", appointment.client.name)}
              onReschedule={() =>
                console.log("Reschedule", appointment.client.name)
              }
              onCancel={() => console.log("Cancel", appointment.client.name)}
              onRebook={() => console.log("Rebook", appointment.client.name)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
