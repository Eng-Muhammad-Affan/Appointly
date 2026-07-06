"use client";

import { Lock, User, CalendarDays, Clock, Brush, Plus } from "lucide-react";
import Image from "next/image";

// Type definitions
export type AppointmentStatus =
  | "confirmed"
  | "payment_held"
  | "cancelled"
  | "completed";

export type Appointment = {
  id: string;
  serviceName: string;
  providerName: string;
  providerImage?: string;
  date: Date;
  time: string;
  status: AppointmentStatus;
  imageUrl: string;
  imageAlt: string;
  isPrivate?: boolean;
  icon?: React.ReactNode;
};

// Dummy appointments data
const dummyAppointments: Appointment[] = [
  {
    id: "1",
    serviceName: "Swedish Massage",
    providerName: "Elena Rodriguez",
    date: new Date(2026, 9, 27),
    time: "9:00 AM",
    status: "confirmed",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkQtzYhe_p7fu9laB6M8HHcpbwu50tcLcOG7v2znOdUP9VB8QdYUT82DvVA6N4gw2AcWrrKdMrkuXgHdTVzLQqfFoscLRss1rcRREVBaOLSOmKXGgCh7iGxm3vH0aT06Ml6zUW4UJYDwyv4Yg98IQbTqASb-beIkoVQCnYUPESoUltCAQamPSzIxZUvQYZuGv4iP84d8qW9TsjS7_XMxnlLoOhUUzTS5uODvJYV7BYlrcEsxJZRGJ_iO0G9a2bLgsS6JfYps_wzOI2",
    imageAlt: "A serene and tranquil spa setting",
    isPrivate: true,
    icon: <User size={16} />,
  },
  {
    id: "2",
    serviceName: "Signature Haircut",
    providerName: "Luxe Artistry",
    date: new Date(2026, 10, 2),
    time: "2:00 PM",
    status: "payment_held",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB7IHuQa381LVtn3coSFAPKHRSf6LHp6HNmqMKesoByan8JzW4cqfgFRKFC5M4aWjAPI3xf8YcjA0PT-J2DtVZwLZyQPqIXyKtCVQAj-2-9Qx40uyZpms2S-wLHJyIgi3pPmc71cbTr22R7rKuqiGAFiCn2vwcRpIyb7HTJXqZMyJMZVfBlkjgP2b_UdrREG0bI4YLFEM0ImrUdguKQYMYtHpobanI1V9eO0GiUrqxs0q8PWO0m_q-n6pcLru-f2HeZMj7tMz-NzYU0",
    imageAlt: "A stylish, high-end hair salon interior",
    isPrivate: false,
    icon: <Brush size={16} />,
  },
];

const statusConfig: Record<
  AppointmentStatus,
  { label: string; bgColor: string; textColor: string; borderColor: string }
> = {
  confirmed: {
    label: "Confirmed",
    bgColor: "bg-accent/20",
    textColor: "text-[#2D5A27]",
    borderColor: "border-accent/30",
  },
  payment_held: {
    label: "Payment Held",
    bgColor: "bg-[#FBC02D]/20",
    textColor: "text-[#6B5100]",
    borderColor: "border-[#FBC02D]/30",
  },
  cancelled: {
    label: "Cancelled",
    bgColor: "bg-red-100",
    textColor: "text-red-700",
    borderColor: "border-red-300",
  },
  completed: {
    label: "Completed",
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
    borderColor: "border-blue-300",
  },
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function AppointmentsPage() {
  const appointments = dummyAppointments;
  const upcomingAppointments = appointments.filter(
    (apt) => apt.status !== "cancelled" && apt.status !== "completed",
  );

  return (
    <div className="h-screen overflow-y-scroll w-full p-5 sm:p-10">
      <header className="my-10">
        <h1 className="text-3xl font-bold text-primary">
          Upcoming Appointments
        </h1>
        <p className="text-base text-on-surface-variant mt-1">
          You have {upcomingAppointments.length} appointment
          {upcomingAppointments.length !== 1 ? "s" : ""} scheduled for the
          upcoming weeks.
        </p>
      </header>
      <main className="flex flex-col gap-6">
        {appointments.map((appointment) => {
          const status = statusConfig[appointment.status];

          return (
            <div
              key={appointment.id}
              className="bg-surface-container-lowest rounded-xl p-6 card-shadow border border-outline-variant/5"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex gap-6">
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                    <Image
                      width={50}
                      height={50}
                      alt={appointment.imageAlt}
                      className="w-full h-full object-cover"
                      src={appointment.imageUrl}
                    />
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-bold text-primary">
                        {appointment.serviceName}
                      </h2>
                      {appointment.isPrivate && (
                        <Lock size={14} className="text-muted" />
                      )}
                    </div>

                    <p className="font-semibold text-sm text-on-surface-variant mb-4 flex items-center gap-1">
                      {appointment.icon}
                      <span>{appointment.providerName}</span>
                    </p>

                    <div className="flex flex-wrap gap-4 mt-2">
                      <span className="flex items-center gap-1 text-xs text-on-surface-variant bg-surface-container px-2 py-1 rounded-full">
                        <CalendarDays size={14} />
                        {formatDate(appointment.date)}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-on-surface-variant bg-surface-container px-2 py-1 rounded-full">
                        <Clock size={14} />
                        {appointment.time}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end gap-4">
                  <span
                    className={`${status.bgColor} ${status.textColor} px-4 py-1 rounded-full font-semibold text-xs border ${status.borderColor}`}
                  >
                    {status.label}
                  </span>

                  <div className="flex flex-wrap gap-2">
                    {appointment.status === "confirmed" && (
                      <>
                        <button className="px-4 py-2 rounded-lg bg-secondary text-black font-semibold text-sm hover:opacity-90 transition-opacity">
                          Book Again
                        </button>
                        <button className="px-4 py-2 rounded-lg border border-outline text-on-surface font-semibold text-sm hover:bg-surface transition-colors">
                          Request Reschedule
                        </button>
                        <button className="px-4 py-2 rounded-lg text-red-600 font-semibold text-sm hover:bg-red-50 transition-colors">
                          Cancel
                        </button>
                      </>
                    )}

                    {appointment.status === "payment_held" && (
                      <>
                        <button className="px-4 py-2 rounded-lg border border-outline text-on-surface font-semibold text-sm hover:bg-surface transition-colors">
                          Manage Payment
                        </button>
                        <button className="px-4 py-2 rounded-lg text-on-surface-variant font-semibold text-sm hover:bg-surface transition-colors">
                          Details
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Empty State / Additional Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-surface/50 rounded-xl p-8 border-2 border-dashed border-outline-variant flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4">
              <Plus size={24} className="text-on-surface-variant" />
            </div>
            <h4 className="text-base font-bold text-on-surface-variant">
              Need another service?
            </h4>
            <p className="text-sm text-on-surface-variant mb-4">
              Discover top-rated professionals in your area.
            </p>
            <button className="bg-secondary text-black px-6 py-2 rounded-lg font-semibold hover:opacity-90">
              Explore Marketplace
            </button>
          </div>

          <div className="bg-primary p-8 rounded-xl text-white flex flex-col justify-between">
            <div>
              <h4 className="text-2xl font-bold mb-2">Premium Member</h4>
              <p className="opacity-80 text-base">
                You have saved $45 in booking fees this month with your
                Appointly Gold membership.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-primary bg-secondary-container"></div>
                <div className="w-8 h-8 rounded-full border-2 border-primary bg-tertiary"></div>
                <div className="w-8 h-8 rounded-full border-2 border-primary bg-accent"></div>
              </div>
              <button className="text-secondary font-semibold hover:underline">
                View Benefits
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
