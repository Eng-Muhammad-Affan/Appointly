"use client";
// ____ Hooks ...
import { useEffect } from "react";
import { useProfile } from "../hooks/use-profile";

// ____ Libraries...
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import axios from "axios";

export const FetchUserProfileData = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    setAppointments,
    appointments,
    setCompletedAppointments,
    setCancelledAppointments,
  } = useProfile();
  const { data } = authClient.useSession();

  useEffect(() => {
    if (data) {
      const getData = async (email: string) => {
        const { data, status } = await axios.post(
          "/api/user/account/get-appointments",
          {
            email,
          },
        );
        if (status === 500) {
          return toast.error(data);
        }
        const { appointments } = data;
        setAppointments(appointments);
      };
      getData(data.user.email);
    }
  }, [data, setAppointments]);

  useEffect(() => {
    const completedAppointments = appointments.filter(
      (app) => app.status === "COMPLETED",
    );
    const cancelledAppointments = appointments.filter(
      (app) => app.status === "CANCELLED",
    );
    const _upcomingAppointments = appointments.filter(
      (app) => app.status === "PAID",
    );
    const _reschedule = appointments.filter(
      (app) => app.status === "REQUESTED-RESCHEDULE",
    );

    setCompletedAppointments(completedAppointments);
    setCancelledAppointments(cancelledAppointments);
  }, [appointments, setCancelledAppointments, setCompletedAppointments]);
  return children;
};
