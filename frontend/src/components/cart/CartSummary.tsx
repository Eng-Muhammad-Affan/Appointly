import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/use-cart";
import { useMemo } from "react";
import { CartItem } from "@/types/user";
import { Link } from "react-router-dom";

export const CartSummary = () => {
  const { items } = useCartStore();

  const total = useMemo(() => {
    return items.reduce((acc: number, curr: CartItem) => {
      return acc + (Number(curr.product.price) * curr.quantity);
    }, 0);
  }, [items]);

  return (
    <>
      <div className="lg:col-span-1">
        <Card className="border-manzarri-black/10 sticky top-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-manzarri-black mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-manzarri-black/70">Subtotal</span>
                <span className="font-medium">
                  Rs {Math.round(total)}
                </span>
              </div>

              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-manzarri-reddish-brown">
                  Rs {Math.round(total)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Link to={"/checkout"}>
              <Button
                // onClick={handleCheckout}
                disabled={items.length === 0}
                className="text-white cursor-pointer w-full bg-blue-main hover:bg-blue-600 py-6"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Proceed to Checkout
              </Button>
              </Link>
            </div>

            <p className="text-xs text-manzarri-black/60 text-center mt-4">
              By proceeding, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </Card>
      </div>
    </>
  );
};