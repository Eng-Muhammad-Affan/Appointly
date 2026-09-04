import { create } from "zustand";
import api from "@/lib/api";
import { toast } from "sonner";

// 1. Define your Data/State
export interface IProfile {
  userId: string;
  email: string;
  name: string;
  role: "user" | "admin";
}

type ProfileStore = {
  loading: boolean;
  data: IProfile | null;
  isCheckingAuth: boolean;
  setInfo: (data: IProfile | null) => void;
  setIsCheckingAuth: (status: boolean) => void;
  fetchProfileData: (navigate: (path: string) => void) => Promise<void>;
};

export const useProfile = create<ProfileStore>((set) => ({
  loading: false,
  data: null,
  isCheckingAuth: true, // Usually true by default if you check on mount

  setIsCheckingAuth: (status) => set({ isCheckingAuth: status }),
  
  setInfo: (data) => set({ data }),

  fetchProfileData: async (navigate) => {
    set({ loading: true });
    try {
      const response = await api.get("/auth/profile");
      const data = response.data;

      // Axios usually throws on non-2xx, but if you're using fetch/custom:
      if (response.status === 200) {
        set({
          data: {
            userId: data.id,
            email: data.email,
            role: data.role,
            name: data.name,
          },
          isCheckingAuth: false,
          loading: false,
        });
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      const errorMessage = error.response?.data?.details || "Session expired";
      
      set({ data: null, isCheckingAuth: false, loading: false });
      toast.error(errorMessage);
      
      // Redirect using the passed navigate function
      navigate("/login");
    }
  },
}));