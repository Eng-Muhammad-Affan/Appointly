"use client";
import { Button } from "@/components/ui/button";
import { useWishlistStore} from "@/stores/use-wishlist";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const WishlistTop = () => {
  const { wishlist } = useWishlistStore();
  // const { addToCart } = useCart();
  const totalValue = wishlist.reduce((sum, item) => sum + Number(item.product.price), 0);
  return (
    <div className="py-15">
      <div className="container mx-auto px-4">
        {/* <div className="flex items-center gap-4 mb-4">
          <Link to="/profile">
            <Button
              variant="ghost"
              size="sm"
              className="text-manzarri-black hover:text-manzarri-reddish-brown"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profile
            </Button>
          </Link>
        </div> */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-manzarri-black mb-2">
              My Wishlist
            </h1>
            <p className="text-manzarri-black/70">
              {wishlist.length} items • Total value: Rs
              {totalValue.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WishlistTop;
