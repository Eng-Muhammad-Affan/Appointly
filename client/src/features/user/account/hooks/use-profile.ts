import { create } from "zustand";
import type { AppointmentProfile } from "../types";

interface ProfileState {
  name: string;
  email: string;
  setInfo: (info: { name: string; email: string }) => void;
  appointments: AppointmentProfile[];

  setAppointments: (list: AppointmentProfile[]) => void;
  setCompletedAppointments: (list: AppointmentProfile[]) => void;
    completedAppointments: AppointmentProfile[];
  setCancelledAppointments: (list: AppointmentProfile[]) => void;
    cancelledAppointments: AppointmentProfile[];
}

export const useProfile = create<ProfileState>()((set) => ({
  name: "",
  email: "",
  
  setInfo: (info) =>
    set(() => ({
      name: info.name,
      email: info.email,
    })),
  appointments: [],
  setAppointments: (list) =>
    set(() => ({
      appointments: list,
    })),
  
    setCompletedAppointments:(list) => set(() => ({
      completedAppointments:list
    })),
    completedAppointments:[],

    setCancelledAppointments:(list) => set(() => ({
      completedAppointments:list
    })),
    cancelledAppointments:[],

}));
