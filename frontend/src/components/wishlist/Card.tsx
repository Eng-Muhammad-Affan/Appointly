import { useWishlistStore } from "@/stores/use-wishlist";
import type { WishlistItem } from "@/types/user";
import { useState, useCallback } from "react";
import { Heart, ShoppingBag, Trash2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCartStore } from "../../stores/use-cart";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const WishlistCard = ({ wishlistProduct }: { wishlistProduct: WishlistItem }) => {
  const { removeFromWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const [size, setSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleQuantityChange = useCallback((delta: number) => {
    setQuantity((prev) => {
      const newQuantity = prev + delta;
      if (newQuantity < 1) {
        toast.error("Quantity must be at least 1");
        return prev;
      }
      if (newQuantity > 100) {
        toast.error("Maximum order quantity is 100 per item. Please contact support for bulk orders.");
        return prev;
      }
      return newQuantity;
    });
  }, []);

  const handleAddToCart = useCallback(() => {

    addItem(wishlistProduct.product,  quantity);
    removeFromWishlist(wishlistProduct.id);
    toast.success(`${quantity} × ${wishlistProduct.product.productName} added to cart!`);
    setIsDialogOpen(false);
    setSize("");
    setQuantity(1);
  }, [size, quantity, wishlistProduct, addItem, removeFromWishlist]);

  const handleRemoveFromWishlist = useCallback(() => {
    removeFromWishlist(wishlistProduct.id);
    toast.success("Removed from wishlist");
  }, [wishlistProduct.id, removeFromWishlist]);

  return (
    <Card className="group cursor-pointer overflow-hidden border-manzarri-black/10 hover:shadow-xl transition-all duration-300">
      <div className="relative">
        {wishlistProduct.product.productImages?.[0] ? (
          <img
            src={wishlistProduct.product.productImages[0].imageFile}
            alt={wishlistProduct.product.productName}
            width={400}
            height={400}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
        )}

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="ghost"
            className="w-8 h-8 p-0 bg-white/90 hover:bg-white rounded-full shadow-md"
            onClick={handleRemoveFromWishlist}
            aria-label={`Remove ${wishlistProduct.product.productName} from wishlist`}
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-manzarri-black mb-2 group-hover:text-manzarri-reddish-brown transition-colors line-clamp-1">
          {wishlistProduct.product.productName}
        </h3>

        <div className="flex gap-2">
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button
                className="flex-1 bg-blue-main text-white"
                aria-label={`Add ${wishlistProduct.product.productName} to cart`}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Add to Cart</AlertDialogTitle>
                <AlertDialogDescription>
                  Configure your item before adding to cart
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="flex flex-col gap-6 py-4">

                {/* Quantity Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Quantity</label>
                  <div className="flex items-center gap-3">
                    <Button
                      size="icon"
                      variant="outline"
                      className="w-8 h-8 rounded-full"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="text-lg font-semibold min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="w-8 h-8 rounded-full"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= 100}
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Max 100 items per order. For bulk orders, please contact support.
                  </p>
                </div>
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleAddToCart} className="bg-blue-main text-whites">
                  Add to Cart - Rs {(Number(wishlistProduct.product.price)) * quantity}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            size="icon"
            variant="ghost"
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
            aria-label="Remove from wishlist"
            onClick={handleRemoveFromWishlist}
          >
            <Heart className="w-4 h-4 fill-current" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default WishlistCard;