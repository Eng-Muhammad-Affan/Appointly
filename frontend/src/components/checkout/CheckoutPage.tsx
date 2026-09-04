import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/use-cart";
import { useEffect, useMemo } from "react";
import { CheckoutFormData, checkoutFormSchema } from "@/validations/checkout-schema";
import { Truck, ShoppingBag, Loader2, ShieldCheck, Minus, Plus, Trash2 } from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";
import { useProfile } from "@/stores/use-profile";
import { useNavigate } from "react-router-dom";
import Header from "@/components/user/Header";
import Footer from "@/components/user/Footer";

const PAKISTAN_CITIES = [
  "Islamabad", "Karachi", "Lahore", "Rawalpindi", "Faisalabad",
  "Multan", "Peshawar", "Quetta", "Gujranwala", "Sialkot",
  "Bahawalpur", "Sargodha", "Abbottabad", "Mardan",
  "Hyderabad", "Sukkur", "Larkana",
];

const PAKISTAN_PROVINCES = [
  "Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan",
  "Islamabad Capital Territory", "Gilgit-Baltistan", "Azad Jammu and Kashmir",
];

const CheckoutPage = () => {
  const { items, clearCart, updateQuantity, removeItem } = useCartStore();
  const { data: profileData, fetchProfileData, setInfo } = useProfile();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      notes: "",
    },
  });

  // 1. Fetch profile data exactly ONCE on component mount
  const getProfileData = async () => {
    try {
      const response = await api.get("/auth/profile");
      const data = response.data;

      // Axios usually throws on non-2xx, but if you're using fetch/custom:
      if (response.status === 200) {
        setInfo(
          {
            userId: data.id,
            email: data.email,
            role: data.role,
            name: data.name,
          },
        )
      }

      return true
    } catch (error: any) {
      // console.error("Auth error:", error);
      return false
    }
  }

  useEffect(() => {
    getProfileData()
    if (items.length === 0) {
      toast.error("Please add some products to cart")
    }
  }, [fetchProfileData, navigate]);

  // 2. Pre-fill the form ONLY when profileData arrives for the first time
  useEffect(() => {

    if (profileData) {
      reset({
        name: profileData.name || "",
        email: profileData.email || "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        notes: "",
      });
    }
    // CRITICAL: Leave profileData.name/email or a condition so it doesn't loop
    // Better yet, track if it has already been initialized if profileData can change dynamically.
  }, [profileData, reset]);

  const total = useMemo(() => {
    return items.reduce((acc, curr) => acc + Number(curr.product.price) * curr.quantity, 0);
  }, [items]);

  const deliveryCharges = useMemo(() => total > 3000 ? 0 : 200, [total]);
  const grandTotal = useMemo(() => total + deliveryCharges, [total, deliveryCharges]);

  const onSubmit = async (formData: CheckoutFormData) => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      // ✅ Payload matches your specific JSON structure
      const requestBody = {
        full_name: formData.name,
        email: formData.email,
        phone_number: formData.phone,
        zipcode: formData.zipCode,
        address: formData.address,
        city: formData.city,
        province: formData.state,
        order_note: formData.notes || "",
        items: items.map(item => ({
          product_id: item.product.id, // Mapping from CartItem.product.id
          quantity: item.quantity,
        })),
      };

      const response = await api.post("/checkout/", requestBody);

      if (response.data.success) {
        toast.success("Order hasbeen placed successfully. Please check your email")
        if (response.data.isUser) {
          navigate(`/profile/orders/${response.data.data.order_id}`)
        }
        clearCart();
      } else {
        toast.error(response.data.message || "Order placement failed");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message ||
        error.response?.data?.detail ||
        "An error occurred while placing your order";
      toast.error(errorMessage);
    }
  };

  const isButtonDisabled = isSubmitting || items.length === 0;

  // Helper for input styling
  const getInputClassName = (hasError: boolean) =>
    `w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-colors ${hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
    }`;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-16 mt-14 sm:mt-23">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black">Checkout</h1>
            <p className="mt-2 text-black">Complete your order with Cash on Delivery</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6 border-manzarri-black/10">
                  <div className="flex items-center gap-2 mb-6">
                    <Truck className="w-5 h-5 text-blue" />
                    <h2 className="text-xl font-semibold text-manzarri-black">
                      Shipping Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <input
                        {...register("name")}
                        id="name"
                        type="text"
                        placeholder="joe doe"
                        className={getInputClassName(!!errors.name)}
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <input
                        {...register("email")}
                        id="email"
                        type="email"
                        placeholder="example@gmail.com"
                        className={getInputClassName(!!errors.email)}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <input
                        {...register("phone")}
                        id="phone"
                        type="tel"
                        placeholder="03302493874"
                        className={getInputClassName(!!errors.phone)}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>

                    {/* ZIP Code */}
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <input
                        {...register("zipCode")}
                        id="zipCode"
                        placeholder="376524"
                        className={getInputClassName(!!errors.zipCode)}
                      />
                      {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>}
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Complete Address *</Label>
                      <textarea
                        {...register("address")}
                        id="address"
                        rows={2}
                        placeholder="House No, Street Name, Area"
                        className={getInputClassName(!!errors.address)}
                      ></textarea>
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                    </div>

                    {/* City Select */}
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <select
                        {...register("city")}
                        id="city"
                        className={getInputClassName(!!errors.city)}
                      >
                        <option value="">Select your city</option>
                        {PAKISTAN_CITIES.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                    </div>

                    {/* Province Select */}
                    <div>
                      <Label htmlFor="state">State/Province *</Label>
                      <select
                        {...register("state")}
                        id="state"
                        className={getInputClassName(!!errors.state)}
                      >
                        <option value="">Select your state/province</option>
                        {PAKISTAN_PROVINCES.map((province) => (
                          <option key={province} value={province}>{province}</option>
                        ))}
                      </select>
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                    </div>
                  </div>

                  <div className="mt-6">
                    <Label htmlFor="notes">Order Notes (Optional)</Label>
                    <textarea
                      {...register("notes")}
                      id="notes"
                      rows={3}
                      className={getInputClassName(!!errors.notes)}
                      placeholder="Special instructions for delivery"
                    />
                  </div>
                </Card>

                {/* Payment Section & Submit Button omitted for brevity but should remain below the card */}
                {/* Payment Method Card - unchanged but kept for context */}
                <Card className="p-6 border-2 border-blue bg-blue-50">
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck className="w-5 h-5 text-blue" />
                    <h2 className="text-xl font-semibold text-black">Payment Method</h2>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-blue">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue/10 rounded-full flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-manzarri-black">Cash on Delivery</h3>
                        <p className="text-sm text-manzarri-black/60">Pay when you receive your order</p>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-blue flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-blue-main" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-start gap-2 text-sm text-manzarri-black/60">
                    <ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>
                      Your personal information is secure. We don't share your details with anyone.
                      Payment will be collected at the time of delivery.
                    </p>
                  </div>
                </Card>

                <p className="text-xs text-manzarri-black/60 text-center">
                  By placing this order, you agree to our Terms of Service and Privacy Policy.
                  You will pay Rs. {grandTotal.toFixed(2)} upon delivery.
                </p>
              </div>

              {/* Order Summary Sidebar - unchanged */}
              <div className="lg:col-span-1">
                <Card className="border-manzarri-black/10 sticky top-8">
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-manzarri-black mb-6">Order Summary</h2>
                    <div className="space-y-3 mb-10">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-3 items-center transition-all"
                        >
                          {/* Mini Product Image Aspect Scaling */}
                          {item.product.productImages?.[0] && (
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 overflow-hidden flex-shrink-0 p-1 flex items-center justify-center">
                              <img
                                src={item.product.productImages[0].imageFile}
                                alt={item.product.productName}
                                className="w-full h-full object-contain mix-blend-multiply"
                              />
                            </div>
                          )}

                          {/* Responsive Text & Controls Panel */}
                          <div className="flex-1 min-w-0 pr-1">
                            <h4 className="font-bold text-gray-900 text-xs sm:text-sm line-clamp-1 leading-tight mb-0.5">
                              {item.product.productName}
                            </h4>
                            <p className="text-xs font-semibold text-gray-500 mb-2">
                              Rs {Number(item.product.price).toLocaleString()}
                            </p>

                            {/* Inline Responsive Quantity Adjusters */}
                            <div className="flex items-center gap-1.5">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 rounded-md border-gray-200"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3 text-gray-600" />
                              </Button>
                              <span className="w-6 text-center text-xs font-bold text-gray-900">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 rounded-md border-gray-200"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3 text-gray-600" />
                              </Button>
                            </div>
                          </div>

                          {/* Actions Anchor Block - Safe tracking layout prevents horizontal bleeding */}
                          <div className="flex flex-col items-end justify-between h-16 sm:h-20 flex-shrink-0 pl-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                              onClick={() => removeItem(item.product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <span className="text-xs sm:text-sm font-bold text-gray-900 whitespace-nowrap">
                              Rs {Math.round(Number(item.product.price) * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator className="mb-4" />
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-manzarri-black/70">Subtotal</span>
                        <span className="font-medium">Rs. {total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-manzarri-black/70">Delivery Charges</span>
                        <span className="font-medium">
                          {deliveryCharges === 0 ? (
                            <span className="text-green-600">Free</span>
                          ) : (
                            `Rs. ${deliveryCharges}`
                          )}
                        </span>
                      </div>
                      {deliveryCharges > 0 && (
                        <p className="text-xs text-manzarri-black/50">
                          Free delivery on orders above Rs. 3,000
                        </p>
                      )}
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-manzarri-reddish-brown">
                          Rs. {grandTotal}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Payment Method</span>
                        <span>Cash on Delivery</span>
                      </div>
                      <Button
                        // onClick={handleCheckout}
                        className="text-white cursor-pointer w-full bg-blue-main hover:bg-blue-600 py-6"
                        type="submit"
                        disabled={isButtonDisabled}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Placing Order...
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-5 h-5 mr-2" />
                            Place Order • Rs. {grandTotal}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};


export default CheckoutPage;



