import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Filter, ChevronDown,
  Package, AlertCircle, Loader2, ShoppingBag,
  X, Calendar
} from 'lucide-react';
import Header from '../user/Header';
import Footer from '../user/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import useOrderStore from '@/stores/use-orders';

const OrdersList: React.FC = () => {
  const navigate = useNavigate();
  const {
    orders,
    filters,
    isLoading,
    error,
    fetchOrders,
    setFilters,
    clearFilters,
    getFilteredOrders,
  } = useOrderStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (orders.length === 0) {
      fetchOrders();
    }
  }, [orders.length, fetchOrders]);

  const filteredOrders = getFilteredOrders();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setFilters({ ...filters, searchQuery: value });
  };

  const handleStatusFilter = (status: string | undefined) => {
    setFilters({ ...filters, status: status as any });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    clearFilters();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
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

  const activeFiltersCount = filters.status ? 1 : 0;

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-4">
          <AlertCircle className="h-16 w-16 text-red-300" />
          <h2 className="text-xl font-semibold text-gray-600 text-center">Failed to load orders</h2>
          <p className="text-gray-400 text-sm">{error}</p>
          <Button
            onClick={fetchOrders}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Try Again
          </Button>
        </div>
        <Footer /> 
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
          
          {/* Page Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900">
              My Orders
            </h1>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              Track and manage your orders
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6 mb-6 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by order ID..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>

              {/* Filter Button */}
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full sm:w-auto border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                  <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>

                {/* Filter Dropdown */}
                {showFilters && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl border border-gray-100 shadow-lg z-10 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 text-sm">Filter by Status</h3>
                      {filters.status && (
                        <button
                          onClick={handleClearFilters}
                          className="text-xs text-blue-500 hover:text-blue-600"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <div className="space-y-2">
                      {['paid', 'pending', 'failed'].map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusFilter(filters.status === status ? undefined : status)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            filters.status === status
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-500">Active filters:</span>
                {filters.status && (
                  <Badge className="bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                    {filters.status}
                    <button onClick={() => handleStatusFilter(undefined)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-gray-400 hover:text-gray-600 ml-auto"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Orders List */}
          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <div className="col-span-4">Order</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2">Items</div>
                <div className="col-span-2">Total</div>
                <div className="col-span-2">Status</div>
              </div>

              {filteredOrders.map((order) => {
                const firstItem = order.items[0];
                const product = firstItem?.product;
                const productImage = product?.productImages[0]?.imageFile;

                return (
                  <Card
                    key={order.id}
                    onClick={() => navigate(`/profile/orders/${order.id}`)}
                    className="cursor-pointer hover:shadow-md transition-all border-gray-100 overflow-hidden group"
                  >
                    {/* Mobile Layout */}
                    <div className="md:hidden p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <img
                            src={productImage || "/placeholder-laptop.png"}
                            alt={product?.productName || "Product"}
                            className="w-16 h-16 object-cover rounded-lg bg-white border"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                              #{order.id.slice(0, 8)}...
                            </p>
                            <Badge className={`${getStatusColor(order.status)} border`}>
                              {order.status.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {product?.productName}
                          </p>
                          {order.items.length > 1 && (
                            <p className="text-xs text-gray-400 mt-1">
                              +{order.items.length - 1} more items
                            </p>
                          )}
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(order.created_at)}
                            </span>
                            <span className="font-bold text-blue-500">
                              {formatCurrency(order.total_amount)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:grid grid-cols-12 gap-4 items-center p-4">
                      <div className="col-span-4 flex items-center gap-4">
                        <img
                          src={productImage || "/placeholder-laptop.png"}
                          alt={product?.productName || "Product"}
                          className="w-12 h-12 object-cover rounded-lg bg-white border flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                            #{order.id.slice(0, 8)}...
                          </p>
                          <p className="text-sm text-gray-600 truncate">
                            {product?.productName}
                          </p>
                        </div>
                      </div>
                      <div className="col-span-2 text-sm text-gray-600">
                        {formatDate(order.created_at)}
                      </div>
                      <div className="col-span-2 text-sm text-gray-600">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </div>
                      <div className="col-span-2 font-bold text-blue-500">
                        {formatCurrency(order.total_amount)}
                      </div>
                      <div className="col-span-2">
                        <Badge className={`${getStatusColor(order.status)} border`}>
                          {order.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              {orders.length === 0 ? (
                <>
                  <ShoppingBag className="h-16 w-16 text-gray-300" />
                  <h2 className="text-xl font-semibold text-gray-600 text-center">No orders yet</h2>
                  <p className="text-gray-400 text-sm text-center max-w-md">
                    You haven't placed any orders yet. Start shopping to see your orders here.
                  </p>
                  <Button
                    onClick={() => navigate('/catalog')}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Browse Products
                  </Button>
                </>
              ) : (
                <>
                  <Package className="h-16 w-16 text-gray-300" />
                  <h2 className="text-xl font-semibold text-gray-600 text-center">No orders found</h2>
                  <p className="text-gray-400 text-sm text-center">
                    No orders match your current filters.
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    className="border-gray-200 text-gray-700"
                  >
                    Clear Filters
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default OrdersList;