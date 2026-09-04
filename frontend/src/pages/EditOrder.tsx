// import { AiOutlineSave } from "react-icons/ai";
// import { HiOutlineSave } from "react-icons/hi";
// import {
//   InputWithLabel,
//   Sidebar,
//   SimpleInput,
//   TextAreaInput,
//   WhiteButton,
// } from "../components";
// import { useEffect, useMemo, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "@/lib/api";
// import useOrderStore from "@/stores/use-orders";
// import useDashboardOrders from "@/stores/admin/use-orders-admin";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { checkoutFormSchema } from "@/validations/checkout-schema";
// import { OrderItem } from "@/types/admin";


// const EditOrder = () => {
//   const {id} = useParams()
//   const {orders, isLoading , error} = useDashboardOrders()

//   const requiredOrder =  useMemo(() => {
//     const required = orders.find((ord) => ord.id === id);
//     console.log(required)
//     return required;
//   },[orders])

//   const {} = useForm({
//     mode:"onChange",
//     resolver:zodResolver(checkoutFormSchema)
//   })

//   const itemsSnapshot = useMemo(() {
//     return requiredOrder ? requiredOrder.items : null 
//   },[requiredOrder])

//   const [orderItems , setOrderItems] = useState<OrderItem[]>([])

//   useEffect(() => {
//     requiredOrder && setOrderItems(requiredOrder.items) 
//   },[requiredOrder])

//   return (
//     <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
//       <div className="dark:bg-blackPrimary bg-whiteSecondary w-full ">
//         <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
//           <div className="px-4 sm:px-6 lg:px-8 pb-8 border-b border-gray-800 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
//             <div className="flex flex-col gap-3">
//               <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
//                 Edit order
//               </h2>
//             </div>
//             <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center">
//               <button className="dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 w-48 py-2 text-lg dark:hover:border-gray-500 hover:border-gray-400 duration-200 flex items-center justify-center gap-x-2">
//                 <AiOutlineSave className="dark:text-whiteSecondary text-blackPrimary text-xl" />
//                 <span className="dark:text-whiteSecondary text-blackPrimary font-medium">
//                   Save draft
//                 </span>
//               </button>
//               <WhiteButton
//                 link="/orders/add-order"
//                 textSize="lg"
//                 width="48"
//                 py="2"
//                 text="Update order"
//               >
//                 <HiOutlineSave className="dark:text-blackPrimary text-whiteSecondary text-xl" />
//               </WhiteButton>
//             </div>
//           </div>

//           {/* Add Product section here  */}
//           <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-8 grid grid-cols-2 gap-x-10 max-xl:grid-cols-1 max-xl:gap-y-10">
//             {/* left div */}
//             <div>
//               <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
//                 Order information
//               </h3>

//               <div className="mt-4 flex flex-col gap-5">
//                 <InputWithLabel label="Customer name">
//                   <SimpleInput
//                     type="text"
//                     placeholder="Enter a customer name..."
//                     value={inputObject.customerName}
//                     onChange={(e) => setInputObject({ ...inputObject, customerName: e.target.value })}
//                   />
//                 </InputWithLabel>

//                 <InputWithLabel label="Customer lastname">
//                   <SimpleInput
//                     type="text"
//                     placeholder="Enter a customer lastname..."
//                     value={inputObject.customerLastName}
//                     onChange={(e) => setInputObject({ ...inputObject, customerLastName: e.target.value })}
//                   />
//                 </InputWithLabel>

//                 <InputWithLabel label="Company name (optional)">
//                   <SimpleInput
//                     type="text"
//                     placeholder="Enter a company name..."
//                     value={inputObject.companyName}
//                     onChange={(e) => setInputObject({ ...inputObject, companyName: e.target.value })}
//                   />
//                 </InputWithLabel>

//                 <InputWithLabel label="Country">
//                   <SimpleInput type="text" placeholder="Enter a country..." value={inputObject.country} onChange={(e) => setInputObject({...inputObject, country: e.target.value})} />
//                 </InputWithLabel>

//                 <InputWithLabel label="Street and house number">
//                   <SimpleInput
//                     type="text"
//                     placeholder="Enter a street and house number..."
//                     value={inputObject.streetAndHouseNumber}
//                     onChange={(e) => setInputObject({ ...inputObject, streetAndHouseNumber: e.target.value })}
//                   />
//                 </InputWithLabel>

//                 <InputWithLabel label="City">
//                   <SimpleInput type="text" placeholder="Enter a city..." value={inputObject.city} onChange={(e) => setInputObject({...inputObject, city: e.target.value})} />
//                 </InputWithLabel>

//                 <InputWithLabel label="Zip code">
//                   <SimpleInput type="text" placeholder="Enter a zip code..." value={inputObject.zipCode} onChange={(e) => setInputObject({...inputObject, zipCode: e.target.value})} />
//                 </InputWithLabel>

//                 <InputWithLabel label="Phone number">
//                   <SimpleInput
//                     type="text"
//                     placeholder="Enter a phone number..."
//                     value={inputObject.phoneNumber}
//                     onChange={(e) => setInputObject({ ...inputObject, phoneNumber: e.target.value })}
//                   />
//                 </InputWithLabel>

//                 <InputWithLabel label="Email address">
//                   <SimpleInput
//                     type="text"
//                     placeholder="Enter a email address..."
//                     value={inputObject.emailAddress}
//                     onChange={(e) => setInputObject({ ...inputObject, emailAddress: e.target.value })}
//                   />
//                 </InputWithLabel>

//                 <InputWithLabel label="Order notice">
//                   <TextAreaInput placeholder="Enter a order notice..." value={inputObject.orderNotice} onChange={(e) => setInputObject({...inputObject, orderNotice: e.target.value})} />
//                 </InputWithLabel>
//               </div>
//             </div>

//             {/* right div */}
//             <div>
//               <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
//                 Products in order
//               </h3>

//               <div>
//                 <div className="mt-4 flex flex-col gap-5">
//                   <InputWithLabel label="Search products">
//                     <SimpleInput type="text" placeholder="Search products..." value={inputObject.searchProducts} onChange={(e) => setInputObject({...inputObject, searchProducts: e.target.value})} />
//                   </InputWithLabel>
//                   <InputWithLabel label="Quantity">
//                     <SimpleInput
//                       type="text"
//                       placeholder="Enter a quantity..."
//                       value={inputObject.quantity}
//                       onChange={(e) => setInputObject({ ...inputObject, quantity: Number(e.target.value) })}
//                     />
//                   </InputWithLabel>
//                   <WhiteButton
//                     link="/orders/add-order"
//                     textSize="lg"
//                     width="full"
//                     py="2"
//                     text="Add product"
//                   />
//                 </div>

//                 <div className="mt-5">
//                   <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
//                     Products
//                   </h3>
//                   <div className="mt-4 flex flex-col gap-5 max-[450px]:items-start">
//                     <div className="flex justify-between items-center max-[450px]:flex-col">
//                       <div className="flex items-center gap-3 max-[450px]:flex-col">
//                       <img src="/src/assets/tablet (1).jpg" alt="product" className="w-12 h-12" />
//                       <span className="dark:text-whiteSecondary text-blackPrimary">Samsung Galaxy Tab 7</span>
//                       </div>
//                       <span className="dark:text-whiteSecondary text-blackPrimary">Quantity: 2</span>
//                     </div>
//                     <div className="flex justify-between items-center max-[450px]:flex-col">
//                       <div className="flex items-center gap-3  max-[450px]:flex-col">
//                       <img src="/src/assets/tablet (2).jpg" alt="product" className="w-12 h-12" />
//                       <span className="dark:text-whiteSecondary text-blackPrimary">Samsung Galaxy Tab 8</span>
//                       </div>
//                       <span className="dark:text-whiteSecondary text-blackPrimary">Quantity: 1</span>
//                     </div>
//                     <div className="flex justify-between items-center max-[450px]:flex-col">
//                       <div className="flex items-center gap-3  max-[450px]:flex-col">
//                       <img src="/src/assets/tablet (3).jpg" alt="product" className="w-12 h-12" />
//                       <span className="dark:text-whiteSecondary text-blackPrimary">Samsung Galaxy Tab 9</span>
//                       </div>
//                       <span className="dark:text-whiteSecondary text-blackPrimary">Quantity: 1</span>
//                     </div>
//                   </div>
//                 </div>

//               </div>
//               <div className="mt-5">
//                 <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
//                   Total
//                 </h3>
//                 <div className="mt-4 flex flex-col gap-5">
//                   <div className="flex justify-between items-center">
//                     <span className="dark:text-whiteSecondary text-blackPrimary">Total products</span>
//                     <span className="dark:text-whiteSecondary text-blackPrimary">4</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="dark:text-whiteSecondary text-blackPrimary">Total price</span>
//                     <span className="dark:text-whiteSecondary text-blackPrimary">$1899</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default EditOrder;




import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AiOutlineSave } from "react-icons/ai";
import { HiOutlineSave, HiOutlineTrash, HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";
import {
  InputWithLabel,
  SimpleInput,
  TextAreaInput,
  WhiteButton,
} from "../components";
import useDashboardOrders from "@/stores/admin/use-orders-admin";
import { editOrderSchema, EditOrderFormData } from "@/validations/edit-order-schema";
import { OrderItem } from "@/types/admin";
import { Copy, Loader, Loader2, Trash2, Minus, Plus } from "lucide-react";
import formatDate from "@/utils/format-date";
import { Button } from "@/components/ui/button";

interface EditableOrderItem extends OrderItem {
  displayName: string;
  displayImage: string;
}

const EditOrder = () => {
  const { id } = useParams();
  const {
    orders,
    isLoading,
    error,
    updateOrder,
    fetchOrderById
  } = useDashboardOrders();

  const [isSaving, setIsSaving] = useState(false);

  // Find the required order
  const requiredOrder = useMemo(() => {
    return orders.find((ord) => ord.id === id);
  }, [orders, id]);

  // Format items for display
  const formattedItems: EditableOrderItem[] = useMemo(() => {
    if (!requiredOrder?.items) return [];
    return requiredOrder.items.map(item => ({
      ...item,
      displayName: item.product?.productName || `Product ${item.product_id}`,
      displayImage: item.product.productImages[0].thumbnailFile || "/placeholder-image.jpg",
    }));
  }, [requiredOrder]);

  // Initialize form with react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<EditOrderFormData>({
    mode: "onChange",
    resolver: zodResolver(editOrderSchema),
    defaultValues: {
      user_name: "",
      user_email: "",
      phone_number: "",
      address: "",
      city: "",
      province: "",
      zipcode: "",
      order_note: "",
      status: "pending",
    },
  });

  // Order items state with quantities
  const [orderItems, setOrderItems] = useState<EditableOrderItem[]>([]);
  const [originalItems, setOriginalItems] = useState<EditableOrderItem[]>([]);

  // Reset form and items when order loads
  useEffect(() => {
    if (requiredOrder) {
      reset({
        user_name: requiredOrder.user_name,
        user_email: requiredOrder.user_email,
        phone_number: requiredOrder.phone_number,
        address: requiredOrder.address,
        city: requiredOrder.city,
        province: requiredOrder.province,
        zipcode: requiredOrder.zipcode,
        order_note: requiredOrder.order_note || "",
        status: requiredOrder.status,
      });

      setOrderItems(formattedItems);
      setOriginalItems(JSON.parse(JSON.stringify(formattedItems)));
    }
  }, [requiredOrder, reset, formattedItems]);

  // Check for changes in items
  const hasItemChanges = useMemo(() => {
    if (orderItems.length !== originalItems.length) return true;

    return orderItems.some((item, index) => {
      const original = originalItems[index];
      return !original ||
        item.product_id !== original.product_id ||
        item.quantity !== original.quantity;
    });
  }, [orderItems, originalItems]);

  // Overall change detection
  const hasChanges = isDirty || hasItemChanges;

  // Calculate totals
  const totals = useMemo(() => {
    const totalProducts = orderItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = orderItems.reduce((sum, item) => sum + (item.price_at_purchase * item.quantity), 0);
    return { totalProducts, totalPrice };
  }, [orderItems]);

  // Handle quantity change
  const handleQuantityChange = (productId: string, change: number) => {
    setOrderItems(prevItems =>
      prevItems.map(item => {
        if (item.product_id === productId) {
          const newQuantity = Math.max(0, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0) // Remove items with 0 quantity
    );
  };

  // Handle remove item
  const handleRemoveItem = (productId: string) => {
    setOrderItems(prevItems => prevItems.filter(item => item.product_id !== productId));
  };

  // Handle update order
  const onSubmit = async (formData: EditOrderFormData) => {
    try {
      setIsSaving(true);

      // Calculate new total amount based on items
      const total_amount = orderItems.reduce((sum, item) =>
        sum + (item.price_at_purchase * item.quantity), 0
      );

      const updatedOrderData = {
        ...formData,
        items: orderItems.map(({ displayName, displayImage, ...item }) => item),
        total_amount,
      };

      updateOrder(id!, updatedOrderData);

      setOriginalItems(JSON.parse(JSON.stringify(orderItems)));
      reset(formData);
      toast.success("Order updated successfully");
    } catch (error) {
      console.error("Failed to update order:", error);
      toast.error("Failed to update order. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle save draft
  const handleSaveDraft = async () => {
    try {
      setIsSaving(true);
      const formData = watch();

      const total_amount = orderItems.reduce((sum, item) =>
        sum + (item.price_at_purchase * item.quantity), 0
      );

      const draftData = {
        ...formData,
        items: orderItems.map(({ displayName, displayImage, ...item }) => item),
        total_amount,
        status: 'pending' as const,
      };

      updateOrder(id!, draftData);
      toast.success("Draft saved successfully");
    } catch (error) {
      console.error("Failed to save draft:", error);
      toast.error("Failed to save draft");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  // Fetch order if not in store
  useEffect(() => {
    if (id && !requiredOrder && !isLoading) {
      fetchOrderById(id);
    }
  }, [id, requiredOrder, isLoading, fetchOrderById]);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error || (!isLoading && !requiredOrder)) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="dark:text-red-400 text-red-600">Order not found</div>
      </div>
    );
  }
  else if (!requiredOrder) {
    return <div className="flex justify-center items-center h-64">
      <div className="dark:text-red-400 text-red-600">Order not found</div>
    </div>
  }

  return (
    <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
          {/* Header */}
          <div className="px-4 sm:px-6 lg:px-8 pb-8 border-b border-gray-800 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Edit order
              </h2>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${requiredOrder?.status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  requiredOrder?.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                  {requiredOrder?.status?.charAt(0).toUpperCase() + requiredOrder?.status?.slice(1)}
                </span>
                {hasChanges && (
                  <span className="text-yellow-500 text-sm font-medium">Unsaved changes</span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Order ID</p>
                  <p className="font-mono text-sm font-semibold text-gray-900">{requiredOrder.id}</p>

                  <button className="p-[7px] bg-gray-200 rounded-sm absolute top-1 right-1 active:scale-[0.9]" onClick={() => handleCopyToClipboard(requiredOrder.id)}>
                    <Copy size={12} />
                  </button>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Created At</p>
                  <p className="text-sm font-semibold text-gray-900">{formatDate(requiredOrder.created_at)}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                  <p className="text-sm font-semibold text-gray-900">{formatDate(requiredOrder.created_at)}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Total Items</p>
                  <p className="text-sm font-semibold text-gray-900">{requiredOrder.items.length} items</p>
                </div>
              </div>

            </div>
            <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center">
              <button
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 w-48 py-2 text-lg dark:hover:border-gray-500 hover:border-gray-400 duration-200 flex items-center justify-center gap-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <AiOutlineSave className="dark:text-whiteSecondary text-blackPrimary text-xl" />
                <span className="dark:text-whiteSecondary text-blackPrimary font-medium">
                  {isSaving ? "Saving..." : "Save draft"}
                </span>
              </button>

              {hasChanges && (
                <button
                  disabled={isSaving}
                  className={`dark:bg-whiteSecondary bg-blackPrimary w-48 py-2 text-lg dark:hover:bg-white hover:bg-gray-800 duration-200 flex items-center justify-center gap-x-2`} type="button" onClick={handleSubmit(onSubmit)}>  <HiOutlineSave className="dark:text-blackPrimary text-whiteSecondary text-xl" /></button>
              )}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-8 grid grid-cols-2 gap-x-10 max-xl:grid-cols-1 max-xl:gap-y-10">
              {/* Left Column - Order Information */}
              <div>
                <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                  Order information
                </h3>

                <div className="mt-4 flex flex-col gap-5">
                  <InputWithLabel label="Customer name *">
                    <SimpleInput
                      type="text"
                      placeholder="Enter customer name..."
                      {...register("user_name")}
                    />
                    {errors.user_name && <p className="text-sm text-red-500">{errors.user_name.message}</p>}
                  </InputWithLabel>

                  <InputWithLabel label="Email address *">
                    <SimpleInput
                      type="email"
                      placeholder="Enter email address..."
                      {...register("user_email")}
                    />
                    {errors.user_email && <p className="text-sm text-red-500">{errors.user_email.message}</p>}
                  </InputWithLabel>

                  <InputWithLabel label="Phone number *">
                    <SimpleInput
                      type="text"
                      placeholder="Enter phone number..."
                      {...register("phone_number")}
                    />
                    {errors.phone_number && <p className="text-sm text-red-500">{errors.phone_number.message}</p>}
                  </InputWithLabel>

                  <InputWithLabel label="Address *">
                    <SimpleInput
                      type="text"
                      placeholder="Enter street address..."
                      {...register("address")}
                    />
                    {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
                  </InputWithLabel>

                  <div className="grid grid-cols-2 gap-4">
                    <InputWithLabel label="City *">
                      <SimpleInput
                        type="text"
                        placeholder="Enter city..."
                        {...register("city")}
                      />
                      {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
                    </InputWithLabel>

                    <InputWithLabel label="Province *">
                      <SimpleInput
                        type="text"
                        placeholder="Enter province..."
                        {...register("province")}
                      />
                      {errors.province && <p className="text-sm text-red-500">{errors.province.message}</p>}
                    </InputWithLabel>
                  </div>

                  <InputWithLabel label="Zip code *">
                    <SimpleInput
                      type="text"
                      placeholder="Enter zip code..."
                      {...register("zipcode")}
                    />
                    {errors.zipcode && <p className="text-sm text-red-500">{errors.zipcode.message}</p>}
                  </InputWithLabel>

                  <InputWithLabel label="Order status">
                    <select
                      {...register("status")}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-blackPrimary dark:text-whiteSecondary bg-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </InputWithLabel>

                  <InputWithLabel label="Order note">
                    <TextAreaInput
                      placeholder="Enter order note..."
                      {...register("order_note")}
                    />
                    {errors.order_note && <p className="text-sm text-red-500">{errors.order_note.message}</p>}
                  </InputWithLabel>
                </div>
              </div>

              {/* Right Column - Products */}
              <div>
                <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                  Products in order
                </h3>

                <div className="mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold dark:text-whiteSecondary text-blackPrimary">
                      Order Items ({orderItems.length})
                    </h4>
                  </div>

                  {orderItems.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                      <p className="dark:text-gray-400 text-gray-600">No products in this order</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2">
                      {orderItems.map((item) => (
                        <div
                          key={item.product_id}
                          className="flex gap-3 px-3 py-7 bg-white items-center transition-all"
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
                                onClick={() => item.quantity > 1 ? handleQuantityChange(item.product_id, -1) : handleQuantityChange(item.product_id, 0)}
                                disabled={isSaving}
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
                                onClick={() => handleQuantityChange(item.product_id, 1)}
                                disabled={isSaving}>
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
                              onClick={() => handleRemoveItem(item.product_id)}
                              disabled={isSaving}
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
                  )}
                </div>

                {/* Totals Section */}
                <div className="mt-6 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
                  <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary mb-4">
                    Order Summary
                  </h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="dark:text-gray-400 text-gray-600">Total products</span>
                      <span className="dark:text-whiteSecondary text-blackPrimary font-semibold">
                        {totals.totalProducts}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="dark:text-gray-400 text-gray-600">Items count</span>
                      <span className="dark:text-whiteSecondary text-blackPrimary font-semibold">
                        {orderItems.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-3">
                      <span className="dark:text-whiteSecondary text-blackPrimary font-bold text-lg">Total amount</span>
                      <span className="dark:text-whiteSecondary text-blackPrimary font-bold text-xl">
                        Rs {totals.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditOrder;