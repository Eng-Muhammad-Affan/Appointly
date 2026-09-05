"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  ChevronRight,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import dayjs from "@/lib/dayjs";

// Types
interface Appointment {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  with: string;
  status: "upcoming" | "confirmed" | "pending" | "cancelled";
  type: "consultation" | "meeting" | "call" | "other";
}

// Loading skeleton
const AppointmentsSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>

      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-3 flex-1">
              <div className="h-5 w-48 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="flex flex-wrap gap-4">
                <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
              <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Individual appointment card
const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    }
  };

  const _getTypeIcon = (type: Appointment["type"]) => {
    switch (type) {
      case "consultation":
        return <User className="w-4 h-4" />;
      case "call":
        return <Clock className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-4 border border-[var(--color-outline)] rounded-lg hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2 flex-1">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-[var(--color-on-surface)]">
              {appointment.title}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--color-on-surface-variant)]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>
                {dayjs(new Date(appointment.date)).format("MMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{appointment.time}</span>
            </div>
            {appointment.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>{appointment.location}</span>
              </div>
            )}
            {appointment.with && (
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>{appointment.with}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <Badge className={getStatusColor(appointment.status)}>
            {appointment.status.charAt(0).toUpperCase() +
              appointment.status.slice(1)}
          </Badge>
          <Link href={`/appointments/${appointment.id}`}>
            <Button
              variant="ghost"
              size="sm"
              className="text-[var(--color-secondary)] hover:text-[var(--color-secondary-dark)]"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Main component
const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        // Simulate API call - replace with actual API call
        // const response = await fetch('/api/appointments/upcoming');
        // const data = await response.json();

        // Mock data for demonstration
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const mockAppointments: Appointment[] = [
          {
            id: "1",
            title: "Annual Check-up",
            date: new Date(Date.now() + 86400000 * 2), // 2 days from now
            time: "10:00 AM",
            location: "Main Clinic - Room 302",
            with: "Dr. Sarah Johnson",
            status: "confirmed",
            type: "consultation",
          },
          {
            id: "2",
            title: "Follow-up Consultation",
            date: new Date(Date.now() + 86400000 * 5), // 5 days from now
            time: "2:30 PM",
            location: "Virtual Call",
            with: "Dr. Michael Chen",
            status: "pending",
            type: "call",
          },
          {
            id: "3",
            title: "Dental Cleaning",
            date: new Date(Date.now() + 86400000 * 8), // 8 days from now
            time: "11:15 AM",
            location: "Dental Center - Floor 2",
            with: "Dr. Emily Rodriguez",
            status: "upcoming",
            type: "consultation",
          },
        ];

        setAppointments(mockAppointments);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to fetch appointments"),
        );
        console.error("Appointments fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-[var(--color-surface)] p-6 rounded-lg shadow-sm border border-[var(--color-outline)]">
        <AppointmentsSkeleton />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-[var(--color-surface)] p-6 rounded-lg shadow-sm border border-[var(--color-outline)]">
        <div className="text-center py-8">
          <div className="text-red-600 dark:text-red-400 mb-4">
            Failed to load appointments
          </div>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="text-[var(--color-secondary)]"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Empty state
  if (appointments.length === 0) {
    return (
      <div className="bg-[var(--color-surface)] p-6 rounded-lg shadow-sm border border-[var(--color-outline)]">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Calendar className="w-16 h-16 text-[var(--color-on-surface-variant)] mb-4" />
          <h3 className="text-h3 text-[var(--color-on-surface)] mb-2">
            No Upcoming Appointments
          </h3>
          <p className="text-body-base text-[var(--color-on-surface-variant)] mb-6">
            You don't have any appointments scheduled for the upcoming days.
          </p>
          <Button className="bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-[var(--color-on-secondary)]">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Appointment
          </Button>
        </div>
      </div>
    );
  }

  // Success state with appointments
  return (
    <div className="bg-[var(--color-surface)] p-6 rounded-lg shadow-sm border border-[var(--color-outline)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-h2 text-[var(--color-on-surface)] flex items-center gap-2">
          <Calendar className="w-6 h-6 text-[var(--color-secondary)]" />
          Upcoming Appointments
          <Badge className="ml-2 bg-[var(--color-secondary)] text-[var(--color-on-secondary)]">
            {appointments.length}
          </Badge>
        </h2>
        <Link href="/appointments/schedule">
          <Button className="bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-[var(--color-on-secondary)] w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            New Appointment
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>

      {appointments.length > 3 && (
        <div className="mt-4 text-center">
          <Link href="/appointments">
            <Button variant="outline" className="text-[var(--color-secondary)]">
              View All Appointments
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UpcomingAppointments;
