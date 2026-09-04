import api from "@/lib/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useProfile } from "@/stores/use-profile";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "@/components/user/Header";
import Footer from "@/components/user/Footer";
import useOrderStore from "@/stores/use-orders";

export default function FetchProfileData() {
  const { setInfo } = useProfile();
  const navigate = useNavigate();
  const { fetchOrders } = useOrderStore();


  // Create a local mounting state to prevent the Outlet from 
  // rendering before we have the user data.
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await api.get("/auth/profile");
        const data = response.data;

        if (response.status === 200) {
          setInfo({
            userId: data.id,
            email: data.email,
            role: data.role,
            name: data.name,
          });
          // Fetch secondary data
          fetchOrders();
          setIsCheckingAuth(false);
        } else if (response.status === 401) {
          toast.error(data.details || "Session expired");
          navigate("/login");
        } else {
          toast.error(data.details || "An error occurred");
          navigate("/login");
        }
      } catch (error) {
        console.error("Auth error:", error);
        // If the request fails entirely (network error or 401/500), 
        // redirect to login
        navigate("/login");
      }
    };

    getProfileData();
  }, [navigate, setInfo, fetchOrders]);

  // If we are still fetching the profile after a refresh, 
  // show nothing or a loader. This prevents the Outlet/Child 
  // routes from seeing an "empty" state and redirecting you.
  if (isCheckingAuth) {
    return null; // Or a <Spinner /> component
  }

  return (
    <>
      <Header />
      <main style={{ minHeight: '80vh', paddingTop: '80px' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}