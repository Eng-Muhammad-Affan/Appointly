

// import api from "@/lib/api";
// import type { UserProduct } from "@/types/user";
// import { toast } from "sonner";
// import { create } from "zustand";
// import type { WishlistItem } from "@/types/user";

// // Helper for navigation
// const redirectToLogin = () => {
//   window.location.href = "/login";
// };

// interface WishlistStore {
//   wishlist: WishlistItem[];
//   isLoading: boolean;
//   isError: boolean;
//   fetchWishlist: () => Promise<void>;
//   addToWishlist: (product: UserProduct) => Promise<void>;
//   removeFromWishlist: (productId: string) => Promise<void>;
//   isInWishlist: (productId: string) => boolean;
//   clearWishlist: () => Promise<void>;
// }

// export const useWishlistStore = create<WishlistStore>((set, get) => ({
//   wishlist: [],
//   isLoading: false,
//   isError: false,

//   fetchWishlist: async () => {
//     set({ isLoading: true, isError: false });
//     try {
//       const res = await api.get("/wishlist/");
//       set({ wishlist: res.data, isError: false });
//     } catch (error: any) {
//       // Only redirect to login if it's an authentication error (401)
//       if (error.response?.status === 401) {
//         redirectToLogin();
//         return;
//       }
//       set({ isError: true });
//       toast.error("Failed to fetch wishlist");
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   addToWishlist: async (product) => {
//     // Check if already exists to prevent duplicate UI state
//     if (get().wishlist.some((item) => item.product.id === product.id)) {
//       toast.info("Already in wishlist");
//       return;
//     }

//     try {
//       const item: WishlistItem = await api.post("/wishlist/add", { product_id: product.id });
      
//       set((state) => ({
//        wishlist: [...state.wishlist, item],
//       }));
      
//       toast.success("Added to wishlist");
//     } catch (error: any) {
//       // Only redirect to login if it's an authentication error (401)
//       if (error.response?.status === 401) {
//         redirectToLogin();
//         return;
//       }
//       toast.error("Failed to add to wishlist");
//     }
//   },

//   removeFromWishlist: async (productId) => {
//     try {
//       await api.delete(`/wishlist/remove/${productId}`);
      
//       set((state) => ({
//         wishlist: state.wishlist.filter((item) => item.id !== productId),
//       }));
      
//       toast.success("Removed from wishlist");
//     } catch (error: any) {
//       // Only redirect to login if it's an authentication error (401)
//       if (error.response?.status === 401) {
//         redirectToLogin();
//         return;
//       }
//       // Handle 404 (product not found) specifically
//       if (error.response?.status === 404) {
//         // Remove from local state anyway since it doesn't exist on server
//         set((state) => ({
//           wishlist: state.wishlist.filter((item) => item.id !== productId),
//         }));
//         toast.error("Product not found in wishlist");
//         return;
//       }
//       toast.error("Failed to remove item");
//     }
//   },

//   isInWishlist: (productId) => {
//     return get().wishlist.some((item) => item.id === productId);
//   },

//   clearWishlist: async () => {
//     try {
//       await api.delete("/wishlist/clear");
      
//       set({ wishlist: [] });
      
//       toast.success("Wishlist cleared successfully");
//     } catch (error: any) {
//       // Only redirect to login if it's an authentication error (401)
//       if (error.response?.status === 401) {
//         redirectToLogin();
//         return;
//       }
//       toast.error("Failed to clear wishlist");
//     }
//   },
// }));


import type { UserProduct } from "@/types/user";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { WishlistItem } from "@/types/user";

interface WishlistStore {
  wishlist: WishlistItem[];
  isLoading: boolean;
  isError: boolean;
  addToWishlist: (product: UserProduct) => void;
   isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;

  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],
      isLoading: false,
      isError: false,

      addToWishlist: (product) => {
        // Check if already exists to prevent duplicates
        if (get().wishlist.some((item) => item.product.id === product.id)) {
          toast.info("Already in wishlist");
          return;
        }

        const wishlistItem: WishlistItem = {
          id: product.id, // Using product ID as wishlist item ID for simplicity
          product: product,
        };

        set((state) => ({
          wishlist: [...state.wishlist, wishlistItem],
        }));

        toast.success("Added to wishlist");
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== productId && item.product.id !== productId),
        }));

        toast.success("Removed from wishlist");
      },

      isInWishlist: (productId) => {
        return get().wishlist.some((item) => item.id === productId || item.product.id === productId);
      },

      clearWishlist: () => {
        set({ wishlist: [] });
        toast.success("Wishlist cleared successfully");
      },
    }),
    {
      name: "wishlist-storage", // unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        wishlist: state.wishlist,
      }), // only persist wishlist array, not loading/error states
    }
  )
);