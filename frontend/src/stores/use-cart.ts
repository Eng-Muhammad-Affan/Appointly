// import api from "@/lib/api";
// import type { UserProduct } from "@/types/user";
// import { toast } from "sonner";
// import { create } from "zustand";
// import type { CartItem } from "@/types/user";

// interface CartStore {
//   items: CartItem[];
//   isLoading: boolean;
//   isError: boolean;
//   fetchCartItems: () => Promise<void>;
//   addItem: (product: UserProduct, quantity: number) => Promise<void>;
//   removeItem: (productId: string, cartItemId: string) => Promise<void>;
//   updateQuantity: (productId: string, cartItemId: string, quantity: number) => Promise<void>;
//   clearCart: () => void;
// }

// export const useCartStore = create<CartStore>((set, get) => ({
//   items: [],
//   isLoading: false,
//   isError: false,

//   fetchCartItems: async () => {
//     set({ isLoading: true, isError: false });
//     try {
//       const res = await api.get("/cart/");
//       set({ items: res.data, isError: false });
//     } catch (error) {
//       set({ isError: true });
//       toast.error("Failed to obtain cart");
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   addItem: async (product, quantity) => {
//     const { items } = get();
//     const existingItem = items.find((item) => item.product.id === product.id);
//     set({ isLoading: true, isError: false });

//     try {
//       if (existingItem) {
//         const newQuantity = existingItem.quantity + quantity;
//         const res = await api.put(`/cart/${existingItem.id}`, {
//           product_id: product.id,
//           quantity: newQuantity,
//         });

//         set({
//           items: items.map((item) =>
//             item.product.id === product.id 
//               ? { ...item, quantity: newQuantity } 
//               : item
//           ),
//         });
//         toast.success("Cart updated");
//       } else {
//         const res = await api.post("/cart/create", {
//           product_id: product.id,
//           quantity: quantity,
//         });

//         const cartItemId = res.data?.id;
//         set({
//           items: [...items, { id: cartItemId, quantity: quantity, product: product }],
//         });
//         toast.success("Added to cart");
//       }
//     } catch (error) {
//       set({ isError: true });
//       toast.error("Failed to update cart");
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   removeItem: async (productId, cartItemId) => {
//     set({ isLoading: true, isError: false });
//     try {
//       await api.delete(`/cart/delete/${cartItemId}`);
//       set((state) => ({
//         items: state.items.filter((item) => item.product.id !== productId),
//       }));
//       toast.success("Item removed");
//     } catch (error) {
//       set({ isError: true });
//       toast.error("Could not remove item");
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   updateQuantity: async (productId, cartItemId, quantity) => {
//     if (quantity <= 0) {
//       return get().removeItem(productId, cartItemId);
//     }

//     set({ isLoading: true, isError: false });
//     try {
//       await api.put(`/cart/${cartItemId}`, {
//         product_id: productId,
//         quantity: quantity,
//       });

//       set((state) => ({
//         items: state.items.map((item) =>
//           item.product.id === productId ? { ...item, quantity } : item
//         ),
//       }));
//     } catch (error) {
//       set({ isError: true });
//       toast.error("Failed to update quantity");
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   clearCart: async () => {
//     set({ isLoading: true, isError: false });
//     try {
//       await api.delete("/cart/clear");
//       set({ items: [] });
//       toast.success("Cart cleared");
//     } catch (error) {
//       set({ isError: true });
//       toast.error("Failed to clear cart");
//     } finally {
//       set({ isLoading: false });
//     }
//   },
// }));

// --------------------------------------



// import type { UserProduct } from "@/types/user";
// import { toast } from "sonner";
// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import type { CartItem } from "@/types/user";

// interface CartStore {
//   items: CartItem[];
//   isLoading: boolean;
//   isError: boolean;
//   addItem: (product: UserProduct, quantity: number) => Promise<void>;
//   removeItem: (productId: string) => void;
//   updateQuantity: (productId: string, quantity: number) => void;
//   clearCart: () => void;
// }

// export const useCartStore = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       items: [],
//       isLoading: false,
//       isError: false,

//       addItem: async (product, quantity) => {
//         set({ isLoading: true, isError: false });

//         try {
//           const { items } = get();
//           const existingItem = items.find((item) => item.product.id === product.id);

//           // Simulate async operation
//           // await new Promise(resolve => setTimeout(resolve, 300));

//           if (existingItem) {
//             const newQuantity = existingItem.quantity + quantity;
//             set({
//               items: items.map((item) =>
//                 item.product.id === product.id 
//                   ? { ...item, quantity: newQuantity } 
//                   : item
//               ),
//               isLoading: false,
//             });
//             toast.success("Cart updated");
//           } else {
//             const cartItem: CartItem = {
//               id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//               quantity: quantity,
//               product: product,
//             };

//             set({ 
//               items: [...items, cartItem],
//               isLoading: false,
//             });
//             toast.success("Added to cart");
//           }
//         } catch (error) {
//           set({ isError: true, isLoading: false });
//           toast.error("Failed to update cart");
//         }
//       },

//       removeItem: (productId) => {
//         set(state => ({
//           items: state.items.filter((item) => item.product.id !== productId),
//         }));
//         toast.success("Item removed");
//       },

//       updateQuantity: (productId, quantity) => {
//         if (quantity <= 0) {
//           return get().removeItem(productId);
//         }

//         set(state => ({
//           items: state.items.map((item) =>
//             item.product.id === productId ? { ...item, quantity } : item
//           ),
//         }));
//       },

//       clearCart: () => {
//         set({ items: [] });
//         toast.success("Cart cleared");
//       },
//     }),
//     {
//       name: "cart-storage", // unique name for localStorage key
//       storage: createJSONStorage(() => localStorage),
//       partialize: (state) => ({
//         items: state.items,
//       }), // only persist items, not loading/error states
//     }
//   )
// );



import type { UserProduct } from "@/types/user";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "@/types/user";

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  isError: boolean;
  isOpen: boolean; // New UI state
  setIsOpen: (open: boolean) => void; // Toggle function
  addItem: (product: UserProduct, quantity: number) => Promise<void>;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      isError: false,
      isOpen: false, // Initial state

      setIsOpen: (open) => set({ isOpen: open }),

      addItem: async (product, quantity) => {
        set({ isLoading: true, isError: false });

        try {
          const { items } = get();
          const existingItem = items.find((item) => item.product.id === product.id);

          if (existingItem) {
            set({
              isLoading: false,
              isOpen: true
            });
          } else {
            const cartItem: CartItem = {
              id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              quantity: quantity,
              product: product,
            };

            set({
              items: [...items, cartItem],
              isLoading: false,
              isOpen: true, // OPEN DRAWER ON NEW ADD
            });
          }
        } catch (error) {
          set({ isError: true, isLoading: false });
          toast.error("Failed to update cart");
        }
      },

      removeItem: (productId) => {
        set(state => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
        toast.success("Item removed");
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) return get().removeItem(productId);
        set(state => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
        // toast.success("Cart cleared");
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        // isOpen is EXCLUDED here so it doesn't persist on refresh
      }),
    }
  )
);