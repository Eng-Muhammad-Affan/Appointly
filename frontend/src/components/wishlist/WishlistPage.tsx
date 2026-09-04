import { useWishlistStore } from "@/stores/use-wishlist";
import {
  EmptyWishlist,
  WishlistCTA,
  WishlistGrid,
  WishlistTop,
} from "@/components/wishlist";
import Header from "@/components/user/Header";
import Footer from "@/components/user/Footer";


export default function WishlistPage() {
  const { wishlist } = useWishlistStore();
  return (
    <>
      <Header />
      <br /><br /><br />
      <div className="min-h-screen bg-manzarri-white">
        {/* Header */}
        <WishlistTop />

        <div className="container mx-auto px-4 py-8">
          {wishlist.length > 0 ? (
            <>
              {/* ____ Main wishlist ... */}
              <WishlistGrid />
              {/* Wishlist Summarpy */}
              <WishlistCTA />
            </>
          ) : (
            /* Empty Wishlist */
            <EmptyWishlist />
          )}
        </div>
      </div>
      <Footer />
    </>

  );
}
