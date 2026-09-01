import type { Service } from "@/db/schemas";

// ______ Type of appointment in all user facing pages ...
type AppointmentClient = {
  id: string;
  service_id: string;
  start_time: string;
  end_time: string;
  token: number;
  slot_date: string;
  booked: boolean;
};

type ClientService = Omit<
  Service,
  "is_active" | "last_generated" | "user_id" | "maxCapacity"
> & {
  userName: string;
  remainingSlots: number;
};

export type { ClientService, AppointmentClient };
