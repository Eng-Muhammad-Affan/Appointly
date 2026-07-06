"use client";

import { useCallback, useEffect } from "react";
// import { api } from "@/lib/api";
import { useBrowseStore } from "./browse-store";
import type { ServicesResponse } from "./types";
import { toast } from "sonner";

export function useServices() {
  const { filters, setServices, setLoading, setError, services, isLoading, error } =
    useBrowseStore();

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      if (filters.search) params.append("search", filters.search);
      if (filters.category && filters.category !== "all")
        params.append("category", filters.category);
      if (filters.location) params.append("location", filters.location);
      if (filters.minRating !== null)
        params.append("minRating", String(filters.minRating));
      if (filters.trustedOnly) params.append("trustedOnly", "true");

    //   const response = await api.get<ServicesResponse>(
    //     `/services?${params.toString()}`
    //   );
    //   setServices(response.data.services);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch services";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [filters, setServices, setLoading, setError]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return {
    services,
    isLoading,
    error,
    refetch: fetchServices,
  };
}