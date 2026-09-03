import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconNotification } from "@tabler/icons-react";
// import { useCartStore } from "@/stores/use-cart";
// import { useWishlistStore } from "@/stores/use-wishlist";
import { ShoppingBag, Heart, Settings } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
// import api from "@/lib/api";
import Link from "next/link";

const QuickActions = () => {
  const actions = [
    {
      name: "Explore marketplace",
      icon: ShoppingBag,
      link: "/services",
    },
    {
      name: "Settings",
      icon: Settings,
      link: "/account/settings",
    },
    {
      name: "Notifications",
      icon: IconNotification,
      link: "/account",
    },
  ]
  // const {wishlist} = useWishlistStore()
  // const {items} = useCartStore()

  // const navigate = useNavigate()
  // const logout = async () => {
  //   await api.get("/auth/signout")
  //   navigate("/")
  // }
  return (
    <Card className="border-manzarri-black/10">
      <div className="p-6">
        <h3 className="font-semibold text-manzarri-black mb-4">
          Quick Actions
        </h3>
        <div className="space-y-3">
          {actions.map((action, idx) => (
            <Link href={action.link} className="block" key={idx}>
              <Button
                variant="outline"
                className="w-full justify-start bg-orange-500/30"
              >
                <action.icon className="w-4 h-4 mr-3" />
                {action.name}
              </Button>
            </Link>

          ))}
          {/* <Link href="/profile/settings" className="block">
            <Button
              variant="outline"
              className="bg-yellow-500/10 w-full justify-start bg-orange-500/30"
            >
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Button>
          </Link> */}
        </div>
      </div>
    </Card>
  );
};
export default QuickActions;
