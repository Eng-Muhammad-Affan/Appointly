"use client";
import { ArrowLeft, Shield, Truck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCartStore } from "@/stores/use-cart";
import { CartCard, CartSummary, EmptyCart } from "@/components/cart";
import { Link } from "react-router-dom";
import { CartItem } from "@/types/user";
import { ErrorCart } from "@/components/cart/ErrorCart";
import Header from "@/components/user/Header";
import Footer from "@/components/user/Footer";

export default function CartPage() {

  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      
      <div className="min-h-screen bg-manzarri-white">
        {/* Header */}
        <div className="bg-manzarri-skin/20 py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/products?category=laptops" className="cursor-pointer">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-manzarri-black hover:text-manzarri-reddish-brown"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-manzarri-black">
              Shopping Cart
            </h1>
            <p className="text-sm md:text-md text-manzarri-black/70">
              Review and complete your purchase
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <RenderList />
        </div>
      </div>
      <Footer />
    </>
  );
}


const RenderList = () => {
  const { items, isLoading, isError, clearCart } = useCartStore()

  const features = [
    {
      icon: Shield,
      title: "Secure Checkout",
      description: "256-bit SSL encryption",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders across pakistan",
    },
    {
      icon: RefreshCw,
      title: "30-Day Returns",
      description: "Easy return policy",
    },
  ];

  if (!isLoading && isError) {
    return <ErrorCart />
  }
  else if (!isLoading && !isError && items.length === 0) {
    return <EmptyCart />
  }
  else if (isLoading && items.length === 0) {
    return <EmptyCart />  // add loading component
  }
  else {
    return <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="border-manzarri-black/10">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-manzarri-black">
                Cart Items ({items.length})
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="bg-blue-main text-white"
                onClick={clearCart}
              >
                Clear All
              </Button>
            </div>

            <div className="space-y-6">
              {items.map((item: CartItem, index: number) => (
                <CartCard cartItem={item} key={index} />
              ))}
            </div>
          </div>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-manzarri-skin/10 rounded-lg"
              >
                <IconComponent className="w-8 h-8 text-manzarri-reddish-brown flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-manzarri-black text-sm">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-manzarri-black/60">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Summary */}
      <CartSummary />
    </div>
  }

}