// import { Button } from "@/components/ui/button";
// import { useWishlistStore } from "@/stores/use-wishlist";
// import { Trash2 } from "lucide-react";
// import WishlistCard from "./Card";

// const WishlistWidget = () => {
//   const { wishlist , clearWishlist} = useWishlistStore();
//   return (
//     <>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {wishlist.map((item, idx) => (
//           <WishlistCard wishlistProduct={item} key={idx} />
//         ))}
//       </div>
//       <div className="pt-[30px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
//         <div className="flex items-center gap-4">
//           <Button
//             variant="outline"
//             size="sm"
//             className="border-manzarri-black/20"
//           >
//             Sort by Date Added
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             className="border-manzarri-black/20"
//           >
//             Sort by Price
//           </Button>
//         </div>
//         <Button
//           variant="ghost"
//           size="sm"
//           className="text-manzarri-black/60 hover:text-red-600"
//         onClick={clearWishlist}
//         >
//           <Trash2 className="w-4 h-4 mr-2" />
//           Clear Wishlist
//         </Button>
//       </div>
//     </>
//   );
// };
// export default WishlistWidget;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/stores/use-wishlist";
import { Trash2, ArrowUpDown, Heart } from "lucide-react";
import { Link } from "react-router-dom"; // Adjust based on your router (next/link, etc.)
import WishlistCard from "./Card";

const WishlistWidget = () => {
  const { wishlist, clearWishlist } = useWishlistStore();
  const [sortBy, setSortBy] = useState<"date" | "price" | null>(null);

  // Simple sorting logic placeholder to make your buttons actually work
  const sortedWishlist = [...wishlist].sort((a, b) => {
    if (sortBy === "price") {
      // Assumes your product items have a 'price' property
      return (Number(a.product.price) || 0) - (Number(a.product.price) || 0);
    }
    // Default or date sorting layout if items have an 'id' or 'createdAt'
    return 0;
  });

  // Empty State - Crucial for a smooth mobile experience
  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-4 border border-dashed rounded-2xl bg-gray-50/50">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
          <Heart className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Your wishlist is empty</h3>
        <p className="text-sm text-gray-500 max-w-sm mb-6">
          Tap the heart icon on products you like to save them here for later.
        </p>
        <Button asChild size="sm" className="rounded-xl">
          <Link to="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Action Controls Bar - Moved to the top for natural mobile accessibility */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pb-4 border-b border-gray-100">
        
        {/* Sorting Group - Becomes full-width buttons on small viewports */}
        <div className="grid grid-cols-2 sm:flex items-center gap-2">
          <Button
            variant={sortBy === "date" ? "default" : "outline"}
            size="sm"
            className={`border-manzarri-black/25 text-xs rounded-xl h-9 w-full sm:w-auto ${
              sortBy !== "date" ? "bg-transparent text-manzarri-black/80" : ""
            }`}
            onClick={() => setSortBy("date")}
          >
            <ArrowUpDown className="w-3.5 h-3.5 mr-1.5 opacity-60" />
            Sort by Date
          </Button>
          <Button
            variant={sortBy === "price" ? "default" : "outline"}
            size="sm"
            className={`border-manzarri-black/25 text-xs rounded-xl h-9 w-full sm:w-auto ${
              sortBy !== "price" ? "bg-transparent text-manzarri-black/80" : ""
            }`}
            onClick={() => setSortBy("price")}
          >
            <ArrowUpDown className="w-3.5 h-3.5 mr-1.5 opacity-60" />
            Sort by Price
          </Button>
        </div>

        {/* Clear Action Button */}
        <Button
          variant="ghost"
          size="sm"
          className="text-manzarri-black/60 hover:text-red-600 hover:bg-red-50/50 text-xs rounded-xl h-9 self-end sm:self-auto px-3"
          onClick={clearWishlist}
        >
          <Trash2 className="w-3.5 h-3.5 mr-1.5 text-red-500" />
          Clear Wishlist
        </Button>
      </div>

      {/* Product Cards Grid - Responsively switches layouts cleanly across devices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {sortedWishlist.map((item) => (
          <WishlistCard 
            wishlistProduct={item} 
            // Changed from index 'idx' to item.id to ensure smooth UI deletions
            key={item.id || item.id} 
          />
        ))}
      </div>
    </div>
  );
};

export default WishlistWidget;
