import type { Service } from "@/db/schemas";
import type { Appointment } from "@/db/schemas";

// ______ Type of appointment in all user facing pages ...
type AppointmentClient = Omit<
  Appointment,
  | "transfer_group"
  | "updated_at"
  | "customer_email"
  | "customer_name"
  | "status"
  | "booked"
> & {
  status: "PENDING" | "COMPLETED" | "CANCELLED" | "REQUESTED-RESCHEDULE";
};

type ClientService = Omit<Service, "is_active"> & {
  user: {
    name:string;
  }
  appointmentsCount:number
};

export type { ClientService, AppointmentClient };
