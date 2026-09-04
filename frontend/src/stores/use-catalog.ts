import { create } from "zustand";
import { toast } from "sonner";
import { UserProduct } from "@/types/user";
import api from "@/lib/api";
import qs from "qs"

interface Category {
  name: string;
  slug: string;
  code: string;
  url: string;
  description: string;
  id: string;
  created_at: string;
  updated_at: string;
}

interface PaginationInfo {
  current_page: number;
  page_size: number;
  total_count: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

interface CatalogState {
  searchAvailableBrands: [];
  products: UserProduct[];
  searchResults: UserProduct[];
  categories: Category[];
  availableBrands: string[]; // NEW: Brands available for current category
  pagination: PaginationInfo | null;
  searchPagination: PaginationInfo | null;
  isError: boolean;
  isLoading: boolean;
  isFetchingMore: boolean;
  isSearching: boolean;
  isSearchingMore: boolean;
  fetchCategories: () => Promise<void>;
  fetchProducts: (params: any, page?: number, pageSize?: number) => Promise<void>;
  fetchMoreProducts: (params: any) => Promise<void>;
  searchProducts: (keyword: string, params?: any, page?: number, pageSize?: number) => Promise<void>;
  loadMoreSearchResults: (keyword: string, params?: any) => Promise<void>;
  resetProducts: () => void;
  clearSearch: () => void;
}

export const useProductData = create<CatalogState>()((set, get) => ({
  isError: false,
  isLoading: false,
  isFetchingMore: false,
  isSearching: false,
  isSearchingMore: false,
  products: [],
  searchResults: [],
  categories: [],
  availableBrands: [], // NEW
  pagination: null,
  searchPagination: null,
  searchAvailableBrands: [],
  fetchCategories: async () => {
    set({ isLoading: true, isError: false });
    try {
      const response = await api.get('/categories');
      const categories = response.data.items || [];
      set({ categories });
    } catch (err) {
      console.log(err);
      set({ isLoading: false, isError: true });
    }
    set({ isLoading: false, isError: false });

  },

  fetchProducts: async (params = {}, page = 1, pageSize = 30) => {
    set({ isLoading: true, isError: false });
    try {
      const response = await api.get('/products/', {
        params: {
          ...params,
          page,
          page_size: pageSize
        },
        paramsSerializer: params =>
          qs.stringify(params, { arrayFormat: "repeat" })
      });

      
      const products = response.data.data || [];
      const pagination = response.data.pagination || null;

      // NEW: Extract brands ONLY if no brand filter is applied
      // This ensures availableBrands stays complete for the dropdown
      const newState: any = {
        products,
        pagination,
        isLoading: false
      };

      if (!params.brands || params.brands.length === 0) {
        const brands = [...new Set<string>(
          products
            .map((p: UserProduct) => p.brand)
            .filter((brand: string): brand is string => Boolean(brand.trim()))
        )].sort((a: string, b: string) => a.localeCompare(b));

        newState.availableBrands = brands;
      }

      set(newState);
    } catch (err) {
      console.log(err);
      set({ isError: true, isLoading: false });
    }
  },


  fetchMoreProducts: async (params = {}) => {
    const { pagination, isFetchingMore } = get();

    if (isFetchingMore || !pagination?.has_next) return;

    set({ isFetchingMore: true });

    try {
      const nextPage = pagination.current_page + 1;

      const response = await api.get('/products/', {
        params: { ...params, page: nextPage, page_size: pagination.page_size }
      });

      const newProducts = response.data.data || [];
      const newPagination = response.data.pagination || null;

      // NEW: Also update brands when loading more if no brand filter
      const newState: any = {
        products: [...get().products, ...newProducts],
        pagination: newPagination,
        isFetchingMore: false
      };

      if (!params.brand) {
        const allProducts = [...get().products, ...newProducts];
        const brands = [...new Set(
          allProducts
            .map((p: UserProduct) => p.brand)
            .filter((brand): brand is string => Boolean(brand?.trim()))
        )].sort((a: string, b: string) => a.localeCompare(b));

        newState.availableBrands = brands;
      }

      set(newState);
    } catch (err) {
      console.log(err);
      set({ isFetchingMore: false });
      toast.error("Failed to load more products");
    }
  },

  searchProducts: async (keyword: string, params = {}, page = 1, pageSize = 50) => {
    set({ searchResults: [], searchPagination: null, isSearching: true, isError: false });

    if (!keyword.trim()) {
      set({ searchResults: [], searchPagination: null });
      return;
    }

    set({ isSearching: true, isError: false });

    try {
      const response = await api.get('/products/search', {
        params: { ...params, keyword, page, page_size: pageSize }
      });

      const searchResults = response.data.data || [];
      const searchPagination = response.data.pagination || null;

      const newState: any = {
        searchResults,
        searchPagination,
        isSearching: false
      };

      if (!params.brands || params.brands.length === 0) {
        const brands = [...new Set<string>(
          searchResults
            .map((p: UserProduct) => p.brand)
            .filter((brand: string): brand is string => Boolean(brand.trim()))
        )].sort((a: string, b: string) => a.localeCompare(b));
        newState.searchAvailableBrands = brands;
      }

      set(newState);

    } catch (err) {
      console.log(err);
      set({ isError: true, isSearching: false });
      toast.error("Failed to search products");
    }
  },

  loadMoreSearchResults: async (keyword: string, params = {}) => {
    const { searchPagination, isSearchingMore } = get();

    if (isSearchingMore || !searchPagination?.has_next || !keyword.trim()) return;

    set({ isSearchingMore: true });

    try {
      const nextPage = searchPagination.current_page + 1;

      const response = await api.get('/products/search', {
        params: { ...params, keyword, page: nextPage, page_size: searchPagination.page_size }
      });

      const newResults = response.data.data || [];
      const newPagination = response.data.pagination || null;

      const allSearchResults = [...get().searchResults, ...newResults];
      const newState: any = {
        searchResults: allSearchResults,
        searchPagination: newPagination,
        isSearchingMore: false
      };

      if (!params.brands || params.brands.length === 0) {
        const brands = [...new Set(
          allSearchResults
            .map((p: UserProduct) => p.brand)
            .filter((brand): brand is string => Boolean(brand?.trim()))
        )].sort((a: string, b: string) => a.localeCompare(b));
        newState.searchAvailableBrands = brands;
      }

      set(newState);

    } catch (err) {
      console.log(err);
      set({ isSearchingMore: false });
      toast.error("Failed to load more search results");
    }
  },

  resetProducts: () => {
    set({ products: [], pagination: null, availableBrands: [] });
  },

  clearSearch: () => {
    set({ searchResults: [], searchPagination: null, searchAvailableBrands: [] });
  },
}));