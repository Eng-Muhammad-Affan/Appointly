import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCartStore } from "@/stores/use-cart";
import { useWishlistStore } from "@/stores/use-wishlist";
import { ShoppingBag, Heart} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import api from "@/lib/api";

const QuickActions = () => {
  const {wishlist} = useWishlistStore()
  const {items} = useCartStore()

  const navigate = useNavigate()
  const logout = async () => {
    await api.get("/auth/signout")
    navigate("/")
  }
  return (
    <Card className="border-manzarri-black/10">
      <div className="p-6">
        <h3 className="font-semibold text-manzarri-black mb-4">
          Quick Actions
        </h3>
        <div className="space-y-3">
          <Link to="/cart" className="block">
            <Button
              variant="outline"
              className="w-full justify-start bg-orange-500/30"
            >
              <ShoppingBag className="w-4 h-4 mr-3" />
              View Cart ({items.length})
            </Button>
          </Link>
          <Link to="/wishlist" className="block">
            <Button
              variant="outline"
              className=" flex w-full justify-start bg-orange-500/30"
            >
              <Heart className="w-4 h-4 mr-3" />
              Wishlist ({wishlist.length})
            </Button>
          </Link>
            <Button
            onClick={logout}
              variant="outline"
              className=" flex w-full justify-start bg-orange-500/30"
            >
              
              <LogOut className="w-4 h-4 mr-3" />
              Logout 
            </Button>
          {/* <Link to="/profile/settings" className="block">
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
