import api from "@/lib/api";
import { create } from "zustand";

/**
 * Interface representing a single Category item 
 * based on the provided API response structure.
 */
export interface Category {
  name: string;
  slug: string;
  code: string;
  url: string;
  description: string;
  id: string;
  created_at: string;
  updated_at: string;
  brands:string[]
}

/**
 * Interface for the API response envelope
 */
interface CategoryResponse {
  items: Category[];
}

/**
 * Interface representing the Zustand store state and actions
 */
interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>()((set) => ({
  categories: [],
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      // Assuming 'api' is an Axios instance or similar client
      const response = await api.get<CategoryResponse>("/categories");
      
      set({ 
        categories: response.data.items, 
        isLoading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || error.message || "An error occurred", 
        isLoading: false 
      });
    }
  },
}));