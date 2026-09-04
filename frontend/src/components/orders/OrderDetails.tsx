import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,Clock, CheckCircle, XCircle,
  AlertCircle, Loader2, ShoppingBag, Calendar,
  CreditCard, Truck, Info, Receipt,
} from 'lucide-react';
import Header from '../user/Header';
import Footer from '../user/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import useOrderStore from '@/stores/use-orders';
import { Link } from 'react-router-dom';
const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    selectedOrder,
    isLoading,
    error,
    fetchOrderById,
    selectOrder,
  } = useOrderStore();

  const [activeTab, setActiveTab] = useState<'items' | 'history' | 'info'>('items');

  useEffect(() => {
    if (id) {
      fetchOrderById(id);
    }
    return () => {
      selectOrder(null);
    };
  }, [id]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'failed':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const tabs = [
    { id: 'items' as const, label: 'Order Items', icon: ShoppingBag },
    // { id: 'history' as const, label: 'Status History', icon: Clock },
    { id: 'info' as const, label: 'Order Info', icon: Info },
  ];

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500"/>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !selectedOrder) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-4">
          <AlertCircle className="h-16 w-16 text-red-300" />
          <h2 className="text-xl font-semibold text-gray-600 text-center">
            {error || 'Order not found'}
          </h2>
          <p className="text-gray-400 text-sm text-center">
            The order you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => navigate('/profile/orders')}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Back to Orders
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  const order = selectedOrder;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">

          {/* Navigation */}
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <button
              onClick={() => navigate('/profile/orders')}
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium text-sm md:text-base">Back to Orders</span>
            </button>
            
            <div className="flex items-center gap-3">
              {getStatusIcon(order.status)}
              <Badge className={`${getStatusColor(order.status)} border text-sm px-4 py-1.5`}>
                {order.status.toUpperCase()}
              </Badge>
            </div>
          </div>

          {/* Order Header */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Order ID</p>
                <h1 className="text-xl md:text-2xl font-bold font-mono text-gray-900">
                  #{order.id.slice(0, 8)}...
                </h1>
              </div>
              <div className="flex flex-wrap gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order Date</p>
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    {formatDate(order.created_at)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                  <p className="text-xl md:text-2xl font-bold text-blue-500">
                    {formatCurrency(order.total_amount)}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-100">
              {/* <Button
                variant="outline"
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                <Receipt className="h-4 w-4 mr-2" />
                Download Invoice
              </Button> */}
              {/* <Button
                variant="outline"
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Track Order
              </Button> */}
              {order.status === 'pending' && (
                <Button
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancel Order
                </Button>
              )}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Left Column - Order Items */}
            <div className="lg:col-span-2">
              <Card className="border-gray-100 overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-100">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all border-b-2 -mb-px ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-500'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="p-6">
                  {/* Items Tab */}
                  {activeTab === 'items' && (
                    <div className="space-y-4">
                      {order.items.map((item, index) => {
                        const product = item.product;
                        const productImage = product?.productImages[0]?.imageFile;

                        return (
                          <div
                            key={index}
                            className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl"
                          >
                            <img
                              src={productImage || "/placeholder-laptop.png"}
                              alt={product?.productName || "Product"}
                              className="w-20 h-20 object-cover rounded-lg bg-white border flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 truncate">
                                {product?.productName || 'Product Unavailable'}
                              </h3>
                              {product?.brand && (
                                <p className="text-xs text-blue-500 font-medium mt-1">
                                  {product.brand}
                                </p>
                              )}
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span>Qty: {item.quantity}</span>
                                  {product?.sku && (
                                    <span className="text-gray-400">SKU: {product.sku}</span>
                                  )}
                                </div>
                                <div className="text-right">
                                  {/* {item.price_at_purchase && (
                                    <p className="text-sm text-gray-400 line-through">
                                      {formatCurrency(item.price_at_purchase * item.quantity)}
                                    </p>
                                  )} */}
                                  <p className="font-bold text-blue-500">
                                    {formatCurrency((item.price_at_purchase || 0) * item.quantity)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
              
                  {/* Info Tab */}
                  {activeTab === 'info' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <p className="text-sm text-gray-500 mb-1">Order ID</p>
                          <p className="font-mono text-sm font-semibold text-gray-900">{order.id}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <p className="text-sm text-gray-500 mb-1">Created At</p>
                          <p className="text-sm font-semibold text-gray-900">{formatDateTime(order.created_at)}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                          <p className="text-sm font-semibold text-gray-900">{formatDateTime(order.created_at)}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <p className="text-sm text-gray-500 mb-1">Total Items</p>
                          <p className="text-sm font-semibold text-gray-900">{order.items.length} items</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-6">
              {/* Price Summary */}
              <Card className="border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-blue-500" />
                  Order Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="text-gray-900 font-medium">
                      {formatCurrency(order.total_amount * 0.9)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="text-gray-900 font-medium">
                      {formatCurrency(order.total_amount * 0.05)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax</span>
                    <span className="text-gray-900 font-medium">
                      {formatCurrency(order.total_amount * 0.05)}
                    </span>
                  </div>
                  <div className="border-t border-gray-100 pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="font-bold text-blue-500 text-lg">
                        {formatCurrency(order.total_amount)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Payment Info */}
              <Card className="border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-500" />
                  Payment Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Payment Method</p>
                    <p className="text-sm font-semibold text-gray-900">
                      Cash on delivery
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Payment Status</p>
                    <Badge className={`${getStatusColor(order.status)} border`}>
                      {order.status.toUpperCase()}
                    </Badge>
                  </div>
                  {order.id && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Payment ID</p>
                      <p className="text-xs font-mono text-gray-600">{order.id}</p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Shipping Info */}
              <Card className="border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Truck className="h-5 w-5 text-blue-500" />
                  Shipping Information
                </h3>
                {order.address ? (
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Address</p>
                      <p className="text-sm text-gray-900">
                        {order.address}, {order.city}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.province}, {order.zipcode}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.total_amount}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">No shipping address provided</p>
                )}
              </Card>

              {/* Need Help Card */}
              <Card className="border-blue-100 bg-blue-50/50 p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  Need Help?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  If you have any questions about your order, our support team is here to help.
                </p>
                
               <Link to={"/#contact"} >
                <Button
                  variant="outline"
                  className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  Contact Support
                </Button>
               </Link>
              </Card>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default OrderDetail;