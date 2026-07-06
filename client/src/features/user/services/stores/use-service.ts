import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { ClientService } from "../types";
interface ServiceState {
  loading: boolean;
  services: ClientService[];
  setLoading: (value: boolean) => void;
  setService: (list: ClientService[]) => void;
  selectedService: ClientService;
}

export const useService = create<ServiceState>()(
  persist(
    (set) => ({
      services: [],
      loading: false,
      selectedService: {
        name: "",
        description: "",
        category: "",
        currency: "",
        ratings: [],
        remainingSlots: 0,
        max_appointments_per_day: 0,
        details: [],
        start_time: "",
        end_time: "",
        duration: 0,
        id: "",
        created_at: new Date(),
        working_days: [],
        price: 0,
        buffer_time_in_min: 0,
        image: "",
        cancellation_policy_hrs: 0,
        userName: "",
      },
      setLoading: (value) => set(() => ({ loading: value })),
      setService: (list) =>
        set(() => ({
          services: list,
        })),
    }),
    {
      name: "services-page-data",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
