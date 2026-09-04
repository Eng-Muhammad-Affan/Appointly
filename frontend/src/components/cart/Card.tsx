import { Button } from "@/components/ui/button";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/stores/use-cart";
import type { CartItem } from "@/types/user";
import { Link } from "react-router-dom";

export const CartCard = ({ cartItem }: { cartItem: CartItem }) => {
  const { updateQuantity, removeItem, isLoading } = useCartStore();

  const handlecounter = (forward: boolean) => {
    const currentQuantity = cartItem.quantity;

    if (forward) {
      // Calculate next value directly instead of waiting on a state setter
      updateQuantity(cartItem.product.id, currentQuantity + 1);
    } else {
      if (currentQuantity > 1) {
        updateQuantity(cartItem.product.id, currentQuantity - 1);
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to={`/products/${cartItem.product.id}`} className="flex-shrink-0">
          <img
            src={cartItem.product.productImages[0].imageFile}
            alt={cartItem.product.productName}
            width={400}
            height={400}
            className="w-24 h-24 object-cover rounded-lg"
          />
        </Link>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-manzarri-black mb-1">
                {cartItem.product.productName}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-manzarri-reddish-brown">
                  Rs {Math.round(Number(cartItem.product.price))}
                </span>
              </div>
            </div>

            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-manzarri-black/20 rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-manzarri-skin/50"
                    onClick={() => handlecounter(false)}
                    disabled={cartItem.quantity <= 1} // Good UX: disable minus when quantity is 1
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="px-3 py-1 text-sm font-medium">
                    {cartItem.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-manzarri-skin/50"
                    onClick={() => handlecounter(true)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-manzarri-black/60 hover:text-red-600"
                  onClick={() => removeItem(cartItem.product.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};