import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export const ErrorCart = () => {
  return (
    <div className="text-center py-16">
      <ShoppingBag className="w-24 h-24 text-manzarri-black/20 mx-auto mb-6" />
      <h2 className="text-2xl font-semibold text-manzarri-black mb-4">
        An error occured
      </h2>
      <p className="text-manzarri-black/70 mb-8">
        Looks like we're having trouble getting your cart. Check your connection and try again later
      </p>
      <Link to="/#categories">
        {/* <Button className="bg-manzarri-reddish-brown hover:bg-manzarri-reddish-brown/90 text-manzarri-white">
          Start Shopping
        </Button> */}
      </Link>
    </div>
  );
};
