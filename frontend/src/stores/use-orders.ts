// import { create } from 'zustand';
// import type { Order, OrderFilters } from '@/types/user';
// import api from '@/lib/api';
// import { useProfile } from './use-profile';

// interface OrderState {
//   // State
//   orders: Order[];
//   selectedOrder: Order | null;
//   filters: OrderFilters;
//   isLoading: boolean;
//   error: string | null;

//   // Actions
//   fetchOrders: () => Promise<void>;
//   fetchOrderById: (orderId: string) => Promise<void>;
//   addOrder: (order: Order) => void;
//   updateOrder: (orderId: string, updates: Partial<Order>) => void;
//   removeOrder: (orderId: string) => void;
//   setFilters: (filters: OrderFilters) => void;
//   clearFilters: () => void;
//   selectOrder: (order: Order | null) => void;
//   setError: (error: string | null) => void;
  
//   // Computed-like getters
//   getFilteredOrders: () => Order[];
//   getOrderById: (orderId: string) => Order | undefined;
//   getOrdersByStatus: (status: Order['status']) => Order[];
// }



// // /orders?user_id=id 
// // /orders/id?user
// const useOrderStore = create<OrderState>((set, get) => ({
//   // Initial state
//   orders: [],
//   selectedOrder: null,
//   filters: {},
//   isLoading: false,
//   error: null,

//   // Actions
//   fetchOrders: async () => {
//     set({ isLoading: true, error: null });
//     const data = useProfile().getState().data
//     if(!data) {
//       console.log("Data not found")
//     }
//     try {
//       const response = await api.get(`/orders?email=${data?.email}`);
//       if (!response.data) throw new Error('Failed to fetch orders');
//       const orders: Order[] = await response.data;
//       set({ orders, isLoading: false });
//     } catch (error) {
//       set({ 
//         error: error instanceof Error ? error.message : 'An error occurred', 
//         isLoading: false 
//       });
//     }
//   },

//   fetchOrderById: async (orderId: string) => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await api.get(`/orders/${orderId}`);
//       if (!response.data) throw new Error('Failed to fetch order');
//       const order: Order = await response.data;
//       set({ selectedOrder: order, isLoading: false });
//     } catch (error) {
//       set({ 
//         error: error instanceof Error ? error.message : 'An error occurred', 
//         isLoading: false 
//       });
//     }
//   },

//   addOrder: (order: Order) => {
//     set((state) => ({
//       orders: [...state.orders, order],
//     }));
//   },

//   updateOrder: (orderId: string, updates: Partial<Order>) => {
//     set((state) => ({
//       orders: state.orders.map((order) =>
//         order.id === orderId ? { ...order, ...updates } : order
//       ),
//       selectedOrder: 
//         state.selectedOrder?.id === orderId 
//           ? { ...state.selectedOrder, ...updates } 
//           : state.selectedOrder,
//     }));
//   },

//   removeOrder: (orderId: string) => {
//     set((state) => ({
//       orders: state.orders.filter((order) => order.id !== orderId),
//       selectedOrder: state.selectedOrder?.id === orderId ? null : state.selectedOrder,
//     }));
//   },

//   setFilters: (filters: OrderFilters) => {
//     set({ filters });
//   },

//   clearFilters: () => {
//     set({ filters: {} });
//   },

//   selectOrder: (order: Order | null) => {
//     set({ selectedOrder: order });
//   },

//   setError: (error: string | null) => {
//     set({ error });
//   },

//   // Computed-like getters (these are functions that access current state)
//   getFilteredOrders: () => {
//     const { orders, filters } = get();
    
//     return orders.filter((order) => {
//       // Filter by status
//       if (filters.status && order.status !== filters.status) {
//         return false;
//       }
      
//       // Filter by date range
//       if (filters.dateFrom) {
//         const orderDate = new Date(order.created_at);
//         const fromDate = new Date(filters.dateFrom);
//         if (orderDate < fromDate) return false;
//       }
      
//       if (filters.dateTo) {
//         const orderDate = new Date(order.created_at);
//         const toDate = new Date(filters.dateTo);
//         if (orderDate > toDate) return false;
//       }
      
//       // Filter by search query (search in order ID or product IDs)
//       if (filters.searchQuery) {
//         const query = filters.searchQuery.toLowerCase();
//         const matchesId = order.id.toLowerCase().includes(query);
//         const matchesProduct = order.items.some(item => 
//           item.product_id.toLowerCase().includes(query)
//         );
//         if (!matchesId && !matchesProduct) return false;
//       }
      
//       return true;
//     });
//   },

//   getOrderById: (orderId: string) => {
//     return get().orders.find((order) => order.id === orderId);
//   },

//   getOrdersByStatus: (status: Order['status']) => {
//     return get().orders.filter((order) => order.status === status);
//   },
// }));

// export default useOrderStore;


import { create } from 'zustand';
import type { Order, OrderFilters } from '@/types/user';
import api from '@/lib/api';
import { useProfile } from './use-profile'; // Make sure this exports useProfile, not default

interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  filters: OrderFilters;
  isLoading: boolean;
  error: string | null;

  fetchOrders: () => Promise<void>;
  fetchOrderById: (orderId: string) => Promise<void>;
  addOrder: (order: Order) => void;
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
  removeOrder: (orderId: string) => void;
  setFilters: (filters: OrderFilters) => void;
  clearFilters: () => void;
  selectOrder: (order: Order | null) => void;
  setError: (error: string | null) => void;
  
  getFilteredOrders: () => Order[];
  getOrderById: (orderId: string) => Order | undefined;
  getOrdersByStatus: (status: Order['status']) => Order[];
}

const useOrderStore = create<OrderState>((set, get) => ({
  // Initial state
  orders: [],
  selectedOrder: null,
  filters: {},
  isLoading: false,
  error: null,

  // Actions
  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    
    // ✅ FIX: Removed () from useProfile
    const profileData = useProfile.getState().data;
    
    // ✅ FIX: Added early return guard if user isn't authenticated yet
    if (!profileData || !profileData.email) {
      set({ 
        error: "User profile not loaded. Cannot fetch orders.", 
        isLoading: false 
      });
      return;
    }

    try {
      const response = await api.get(`/orders?email=${profileData.email}`);
      
      if (!response.data) throw new Error('Failed to fetch orders');
      
      // ✅ FIX: Removed unnecessary await from response.data
      const orders: Order[] = response.data; 
      set({ orders, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.details || error.message || 'An error occurred', 
        isLoading: false 
      });
    }
  },

  fetchOrderById: async (orderId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/orders/${orderId}`);
      if (!response.data) throw new Error('Failed to fetch order');
      const order: Order = response.data;
      set({ selectedOrder: order, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.details || error.message || 'An error occurred', 
        isLoading: false 
      });
    }
  },

  addOrder: (order) => {
    set((state) => ({
      orders: [...state.orders, order],
    }));
  },

  updateOrder: (orderId, updates) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, ...updates } : order
      ),
      selectedOrder: 
        state.selectedOrder?.id === orderId 
          ? { ...state.selectedOrder, ...updates } 
          : state.selectedOrder,
    }));
  },

  removeOrder: (orderId) => {
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== orderId),
      selectedOrder: state.selectedOrder?.id === orderId ? null : state.selectedOrder,
    }));
  },

  setFilters: (filters) => set({ filters }),
  clearFilters: () => set({ filters: {} }),
  selectOrder: (order) => set({ selectedOrder: order }),
  setError: (error) => set({ error }),

  // Computed-like getters
  getFilteredOrders: () => {
    const { orders, filters } = get();
    
    return orders.filter((order) => {
      if (filters.status && order.status !== filters.status) {
        return false;
      }
      
      if (filters.dateFrom) {
        const orderDate = new Date(order.created_at);
        const fromDate = new Date(filters.dateFrom);
        if (orderDate < fromDate) return false;
      }
      
      if (filters.dateTo) {
        const orderDate = new Date(order.created_at);
        const toDate = new Date(filters.dateTo);
        if (orderDate > toDate) return false;
      }
      
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesId = order.id.toLowerCase().includes(query);
        const matchesProduct = order.items?.some(item => 
          item.product_id.toLowerCase().includes(query)
        );
        if (!matchesId && !matchesProduct) return false;
      }
      
      return true;
    });
  },

  getOrderById: (orderId) => {
    return get().orders.find((order) => order.id === orderId);
  },

  getOrdersByStatus: (status) => {
    return get().orders.filter((order) => order.status === status);
  },
}));

export default useOrderStore;