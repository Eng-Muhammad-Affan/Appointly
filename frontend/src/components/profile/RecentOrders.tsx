import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useOrderStore from "@/stores/use-orders";
import { Link } from "react-router-dom";

const RecentOrders = () => {
  const { orders } = useOrderStore();

  // Helper to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Helper to format ISO date string
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="border-manzarri-black/10">
      <div className="p-6 border-b border-manzarri-black/10">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-manzarri-black">
            Recent Orders
          </h2>
         <Link to={"/profile/orders"}>
          <Button
            variant="ghost"
            className="transition-all duration-300 ease bg-blue-main text-white hover:bg-blue-main/40"
          >
            View All
          </Button>
         </Link>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {orders.slice(0,2).map((order) => {
            // Safely get the first item and its product details
            const firstItem = order.items[0];
            const product = firstItem?.product;
            const productImage = product?.productImages[0]?.imageFile;

            return (
              <div
                key={order.id}
                className="flex items-start gap-4 p-4 bg-blue-main/10 rounded-lg"
              >
                <div className="flex-shrink-0">
                  <img
                    src={productImage || "/placeholder-laptop.png"}
                    alt={product?.productName || "Product Image"}
                    className="w-16 h-16 object-cover rounded-lg bg-white border"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div className="max-w-[70%]">
                      <h3 className="font-semibold text-manzarri-black truncate text-sm">
                        Order #{order.id.slice(0, 8)}...
                      </h3>
                      <p className="text-sm text-manzarri-black/70 line-clamp-1">
                        {product?.productName}
                      </p>
                      {order.items.length > 1 && (
                        <p className="text-xs text-manzarri-black/50">
                          + {order.items.length - 1} more items
                        </p>
                      )}
                    </div>
                    <Badge
                      className={
                        order.status === "paid"
                          ? "bg-manzarri-green text-manzarri-white"
                          : order.status === "pending"
                          ? "bg-manzarri-faun text-manzarri-white"
                          : "bg-manzarri-reddish-brown text-manzarri-white"
                      }
                    >
                      {order.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-manzarri-black/60">
                      {formatDate(order.created_at)}
                    </span>
                    <span className="font-semibold text-manzarri-reddish-brown">
                      {formatCurrency(order.total_amount)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {orders.length === 0 && (
            <div className="text-center py-10 text-manzarri-black/50">
              No recent orders found.
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default RecentOrders;