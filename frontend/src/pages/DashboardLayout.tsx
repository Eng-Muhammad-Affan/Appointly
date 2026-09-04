import { Outlet, useNavigate } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/AppSidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useEffect, useState } from "react"
import { useProfile } from "@/stores/use-profile"
import { toast } from "sonner"
import api from "@/lib/api"
import useDashboardOrders from "@/stores/admin/use-orders-admin"


const DashboardLayout = () => {
  const { setInfo } = useProfile();
  const navigate = useNavigate();
  const { fetchOrders } = useDashboardOrders();


  // Create a local mounting state to prevent the Outlet from 
  // rendering before we have the user data.

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await api.get("/auth/profile");
        const data = response.data;

        if (response.status === 200 && data.role === "admin") {
          setInfo({
            userId: data.id,
            email: data.email,
            role: data.role,
            name: data.name,
          });
          // Fetch secondary data
          fetchOrders();
          setIsCheckingAuth(false);
        }
        else if (response.status === 200 && data.role !== "admin") {
          navigate("/login");
        }
        else if (response.status === 401) {
          toast.error(data.details || "Session expired");
          navigate("/login");
        } else {
          toast.error(data.details || "An error occurred");
          navigate("/login");
        }
      } catch (error) {
        console.error("Auth error:", error);
        navigate("/login");
      }
    };

    getProfileData();
  }, [navigate, setInfo, fetchOrders]);

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        {/* <main> */}
        <SidebarTrigger className="absolute right-10 top-10" />
        <Outlet />
        {/* </main>s */}
      </SidebarProvider>
    </TooltipProvider>
  )
}
export default DashboardLayout