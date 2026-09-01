import type {
  ClientService,
  AppointmentClient,
} from "@/features/user/services";
import axios from "axios";
import dayjs from "dayjs";
import { create } from "zustand";

type ServiceDetailsState = {
  selectedSlot: AppointmentClient | null;
  setSelectedSlot: (slot: AppointmentClient) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  service: ClientService | null;
  slots: AppointmentClient[];
  setService: (service: ClientService) => void;
  fetchClientService: (id: string) => void;
  getSlots: (service: ClientService) => void;
};

export const useServiceDetails = create<ServiceDetailsState>((set) => ({
  selectedSlot: null,

  setSelectedSlot: (slot) =>
    set({
      selectedSlot: slot,
    }),

  selectedDate: dayjs().toDate(),

  setSelectedDate: (date) =>
    set(() => ({
      selectedDate: date,
    })),

  service: null,

  slots: [],

  setService: (service) =>
    set(() => ({
      service: service,
    })),

  fetchClientService: async (id) => {
    try {
      const response = await axios.get(`/api/services/${id}`);

      set({
        service: response.data.service,
        slots: response.data.slots,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getSlots: async (service) => {
    try {
      const reqData = {
        id: service.id,
        duration: service.duration,
        working_days: service.working_days,
        start_time: service.start_time,
        end_time: service.end_time,
      };

      const response = await axios.post("/api/services/get-slots", reqData);
      set(() => ({
        slots: response.data.slots,
      }));
    } catch (err) {
      console.log(err);
      set(() => ({
        slots: [],
      }));
    }
  },
}));
