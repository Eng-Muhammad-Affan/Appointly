import { create } from "zustand";
import type { Service, ServiceCategory, ServiceFilters } from "./types";

interface BrowseState {
  // Data
  services: Service[];
  isLoading: boolean;
  error: string | null;

  // Filters
  filters: ServiceFilters;

  // Actions
  setServices: (services: Service[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearch: (search: string) => void;
  setCategory: (category: ServiceCategory) => void;
  setLocation: (location: string | null) => void;
  setMinRating: (rating: number | null) => void;
  setTrustedOnly: (trusted: boolean) => void;
  clearAllFilters: () => void;
  clearLocation: () => void;
}

const initialFilters: ServiceFilters = {
  search: "",
  category: "all",
  location: "San Francisco, CA",
  minRating: null,
  trustedOnly: false,
};

export const useBrowseStore = create<BrowseState>((set) => ({
  // Initial state
  services: [],
  isLoading: false,
  error: null,
  filters: initialFilters,

  // Actions
  setServices: (services) => set({ services }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  setSearch: (search) =>
    set((state) => ({ filters: { ...state.filters, search } })),

  setCategory: (category) =>
    set((state) => ({ filters: { ...state.filters, category } })),

  setLocation: (location) =>
    set((state) => ({ filters: { ...state.filters, location } })),

  setMinRating: (rating) =>
    set((state) => ({ filters: { ...state.filters, minRating: rating } })),

  setTrustedOnly: (trusted) =>
    set((state) => ({ filters: { ...state.filters, trustedOnly: trusted } })),

  clearAllFilters: () => set({ filters: { ...initialFilters, location: null } }),

  clearLocation: () =>
    set((state) => ({ filters: { ...state.filters, location: null } })),
}));