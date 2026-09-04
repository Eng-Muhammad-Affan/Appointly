import { create } from "zustand"
import type { InventoryProduct } from "@/types/admin"

type InventoryState = {
    products: InventoryProduct[],
    setProducts: (data: InventoryProduct[]) => void;
    loading: boolean;
    updateInventoryLoadingStatus: (status: boolean) => void;
}

export const useInventory = create<InventoryState>((set) => ({
    loading: false,
    updateInventoryLoadingStatus: (status: boolean) => set({
        loading: status
    }),
    products: [],
    setProducts: (data) => set({ products: data })
}))