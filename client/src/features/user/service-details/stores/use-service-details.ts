import { ClientService, AppointmentClient } from "@/features/user/services"
import { create } from "zustand"

type ServiceDetailsState = {
  service: ClientService;
  slots: AppointmentClient[];
  fetchClientService: (id: string) => void;
  getSlots: (id: string) => void;
}
export const useServiceDetails = create<ServiceDetailsState>(() => ({
  service: {
    name: "",
    description: "",
    category: "",
    currency: "",
    ratings: [],
    appointmentsCount: 0,
    max_appointments_per_day: 0,
    details: [],
    start_time: "",
    end_time: "",
    duration: 0,
    id: "",
    created_at: new Date(),
    user_id: "",
    working_days: [],
    price: 0,
    remainingAppointments: 0,
    buffer_time_in_min: 0,
    image: "",
    cancellation_policy_hrs: 0,
    user: {
      name: ""
    }
  },
  fetchClientService: (id) => {

  },
  getSlots: (id) => {

  },
  s

}))