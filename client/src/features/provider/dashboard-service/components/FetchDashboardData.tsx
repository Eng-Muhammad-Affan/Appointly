"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { type ServiceDashboard, useDashboard } from "../index";
import axios from "axios";

export const FetchDashboardData = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setServices, selectService, setUser, setLoading, selectedService } =
    useDashboard();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const session = await authClient.getSession();

        if (session.error) {
          toast.error(session.error.message);
          return;
        }

        if (!session.data) return;

        const data = session.data;

        setUser({
          name: data.user.name,
          email: data.user.email,
          id: data.user.id,
          image: data.user.image,
        });

        const response = await axios.post("/api/dashboard/data", {
          userId: data.user.id,
        });

        const services: ServiceDashboard[] = response.data.services;

        setServices(services);

        const updatedServiceData = services.find(
          (currService) => currService.id === selectedService.id,
        );

        if (updatedServiceData) {
          selectService(updatedServiceData);
        }
        // biome-ignore lint/suspicious/noExplicitAny:required
      } catch (error: any) {
        console.error("Dashboard fetch error:", error);
        toast.error("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    getData();

    const interval = setInterval(() => {
      getData();
    }, 180000); // 3 minutes

    return () => clearInterval(interval);
  }, [selectService, selectedService.id, setLoading, setServices, setUser]);

  return <>{children}</>;
};
