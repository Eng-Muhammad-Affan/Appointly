import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, ShoppingCart, Shield, RotateCcw,
  AlertCircle, Check, Heart, Minus, Plus, ZoomIn,
  Info, Package, Award, Loader2,
  Tag, Database, BarChart3, Truck, MessageCircle
} from 'lucide-react';
import Header from '../user/Header';
import Footer from '../user/Footer';
import { useProductData } from '@/stores/use-catalog';
import { useCartStore } from '@/stores/use-cart';
import { useWishlistStore } from '@/stores/use-wishlist';
import api from '@/lib/api';

const ProductDetail: React.FC = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const { addItem } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const { products, fetchProducts, isLoading } = useProductData();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'specifications'>('details');
  const [isFetchingProduct, setIsFetchingProduct] = useState(false);
  const [productError, setProductError] = useState<string | null>(null);

  const currentProduct = useMemo(() => {
    return products.find((p) => p.id === id);
  }, [products, id]);

  const parsedPrice = useMemo(() => {
    if (!currentProduct?.price) return 0;
    const price = typeof currentProduct.price === 'string'
      ? parseFloat(currentProduct.price)
      : Number(currentProduct.price);
    return isNaN(price) ? 0 : price;
  }, [currentProduct?.price]);

  const isFreeProduct = parsedPrice <= 0;

  // ✅ FIX 1: Compute content availability
  const hasOverview = !!(currentProduct?.productDesc && currentProduct.productDesc.trim().length > 0);
  const hasSpecifications = !!(currentProduct?.specifications && currentProduct.specifications.length > 0);

  // ✅ FIX 2: Dynamic tabs — only tabs with content are included
  const tabs = [
    ...(hasOverview ? [{ id: 'details' as const, label: 'Details', icon: Info }] : []),
    ...(hasSpecifications ? [{ id: 'specifications' as const, label: 'Specifications', icon: Database }] : []),
  ];

  // ✅ FIX 3: Set default active tab based on what's available
  useEffect(() => {
    if (hasOverview) {
      setActiveTab('details');
    } else if (hasSpecifications) {
      setActiveTab('specifications');
    }
  }, [hasOverview, hasSpecifications]);

  const handleWishlistToggle = async () => {
    if (!currentProduct) return;
    if (isInWishlist(currentProduct.id)) {
      await removeFromWishlist(currentProduct.id);
    } else {
      await addToWishlist(currentProduct);
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id || currentProduct) return;
      try {
        setIsFetchingProduct(true);
        setProductError(null);
        const response = await api.get(`/products/get/${id}`);
        if (response.data) {
          useProductData.setState((state) => ({
            products: [...state.products, response.data]
          }));
        }
      } catch (error: any) {
        console.error('Error fetching product:', error);
        if (error.response?.status === 404) {
          setProductError('Product not found');
        } else if (error.response?.status === 500) {
          setProductError('Server error. Please try again later.');
        } else {
          setProductError('Failed to load product. Please try again.');
        }
      } finally {
        setIsFetchingProduct(false);
      }
    };

    if (products.length === 0 && category) {
      fetchProducts(category, 1, 30);
    }
    fetchProductDetails();
  }, [id, currentProduct, products.length, category, fetchProducts]);

  if (isLoading || isFetchingProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (productError || !currentProduct) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-4">
        <AlertCircle className="h-16 w-16 text-gray-300" />
        <h2 className="text-xl font-semibold text-gray-600 text-center">
          {productError || 'Product not found'}
        </h2>
        <p className="text-gray-500 text-center">
          {productError
            ? 'Please try again later or contact support if the problem persists.'
            : "The product you're looking for doesn't exist or has been removed."
          }
        </p>
        <div className="flex gap-4">
          <Link to="/#categories" className="text-blue-500 hover:underline">
            Return to Catalog
          </Link>
          {productError && (
            <button
              onClick={() => {
                setProductError(null);
                if (id) {
                  const fetchAgain = async () => {
                    try {
                      setIsFetchingProduct(true);
                      const response = await api.get(`/products/get/${id}`);
                      if (response.data) {
                        useProductData.setState((state) => ({
                          products: [...state.products, response.data]
                        }));
                      }
                    } catch {
                      setProductError('Failed to load product. Please try again.');
                    } finally {
                      setIsFetchingProduct(false);
                    }
                  };
                  fetchAgain();
                }
              }}
              className="text-blue-500 hover:underline"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (isFreeProduct) return;
    addItem(currentProduct, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWhatsAppChat = () => {
    const phoneNumber = "923213240204";
    const message = `Hi, I'm interested in ${currentProduct.productName} (ID: ${currentProduct.id})`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const highlightsList = currentProduct.productHighlights?.split("_").filter(h => h.trim() !== "") || [];
  const currentImage = currentProduct.productImages?.[selectedImage]?.imageFile || '';
  const thumbnailImages = currentProduct.productImages || [];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white sm:pt-16 md:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">

          {/* Navigation */}
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <Link to={`/products?category=${currentProduct.category_slug}`} className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium text-sm md:text-base">Back</span>
            </Link>
            <button
              onClick={handleWishlistToggle}
              className={`p-2.5 rounded-xl transition-all shadow-sm ${isInWishlist(currentProduct.id) ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 border border-gray-100'}`}
            >
              <Heart className={`h-5 w-5 ${isInWishlist(currentProduct.id) ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-8 md:gap-6">

            {/* ✅ FIX 4: Image section — fixed height, object-contain */}
            <div className="space-y-4">
              <div className="relative w-full h-[250px] md:h-[450px] overflow-hidden rounded-2xl bg-white shadow-md group">
                <img
                  src={currentImage}
                  alt={currentProduct.productName}
                  className={`w-full h-full object-contain transition-transform duration-500 ${isZoomed ? 'scale-150' : 'group-hover:scale-105'}`}
                />
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm z-10"
                >
                  <ZoomIn className="h-5 w-5 text-gray-700" />
                </button>
              </div>

              {thumbnailImages.length > 1 && (
                <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {thumbnailImages.map((image: any, index: number) => (
                    <button
                      key={image.id ?? index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg border-2 transition-all ${selectedImage === index ? 'border-blue-500' : 'border-transparent'}`}
                    >
                      <img src={image.thumbnailFile} alt="thumb" className="w-full h-full object-contain rounded-md" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div className="flex flex-col">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider bg-blue-main/10 text-blue-main">
                    {currentProduct.brand || 'Brand'}
                  </span>
                </div>
                <h1 className="text-2xl md:text-2xl lg:text-xl font-extrabold text-gray-900 leading-tight">
                  {currentProduct.productName}
                </h1>

                {/* ✅ FIX 5: Price — completely hidden when isFreeProduct, only WhatsApp text shown */}
                {!isFreeProduct && (
                  <p className="text-md md:text-xl font-bold text-blue-main mt-3">
                    Rs. {Math.round(parsedPrice).toLocaleString()}
                  </p>
                )}
              </div>

              {/* Stock & Availability */}
              <div className="mb-6 space-y-2">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${currentProduct.stockStatus === 'instock' ? 'bg-green-50 text-green-700' :
                    currentProduct.stockStatus === 'outofstock' ? 'bg-red-50 text-red-700' :
                      'bg-yellow-50 text-yellow-700'
                  }`}>
                  <div className={`w-2 h-2 rounded-full ${currentProduct.stockStatus === 'instock' ? 'bg-green-500' :
                      currentProduct.stockStatus === 'outofstock' ? 'bg-red-500' :
                        'bg-yellow-500'
                    }`} />
                  {currentProduct.stockStatus === 'instock' ? 'In Stock' :
                    currentProduct.stockStatus === 'outofstock' ? 'Out of Stock' :
                      currentProduct.stockStatus || 'Unknown'}
                </div>

                {currentProduct.availableQuantity && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Package className="h-4 w-4" />
                    <span>Available: {currentProduct.availableQuantity} units</span>
                  </div>
                )}

                {currentProduct.soldQuantity && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BarChart3 className="h-4 w-4" />
                    <span>Sold: {currentProduct.soldQuantity} units</span>
                  </div>
                )}
              </div>

              {highlightsList.length > 0 && (
                <div className="bg-blue-50/50 rounded-2xl p-4 md:p-5 border border-blue-100 mb-6">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm md:text-sm">
                    <Award className="h-5 w-5 text-blue-main" /> Key Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                    {highlightsList.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs lg:text-sm text-gray-700">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span className="line-clamp-2">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {currentProduct.warranty ? (
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Warranty: <strong className="text-gray-900">{currentProduct.warranty}</strong></span>
                  </div>
                ) : <></>}
              </div>

              {/* Purchase Actions */}
              <div className=" space-y-4">
                {isFreeProduct ? (
                  <button
                    onClick={handleWhatsAppChat}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-sm md:text-base bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-200 active:scale-[0.98] transition-all"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chat on WhatsApp for Price
                  </button>
                ) : (
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center max-sm:gap-2 sm:gap-0 lg:gap-2">
                  <div>
                    <div className="flex items-center justify-between border-2 border-gray-100 rounded-xl px-2 bg-white">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:text-blue-500 transition-colors">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 md:w-12 text-center font-bold text-lg">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:text-blue-500 transition-colors">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                  </div>
                    <button
                      onClick={handleAddToCart}
                      disabled={currentProduct.stockStatus === 'outofstock'}
                      className={`flex-1 flex items-center justify-center gap-1 lg:gap-3 py-4 rounded-xl font-bold text-sm md:text-base transition-all ${addedToCart
                          ? 'bg-green-500 text-white'
                          : 'bg-blue-500/80 hover:bg-blue-main text-white shadow-lg shadow-blue-200 active:scale-[0.98]'
                        } ${currentProduct.stockStatus === 'outofstock' ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      {addedToCart ? 'Added to Cart!' : `Add to cart - Rs. ${(parsedPrice * quantity).toLocaleString()}`}
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-6">
                  <div className="flex flex-col items-center text-center gap-1">
                    <Shield className="h-5 w-5 md:h-6 md:w-6 text-gray-400" />
                    <span className="text-[9px] md:text-[10px] uppercase font-bold text-gray-500">Secure</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-1 border-x border-gray-100">
                    <RotateCcw className="h-5 w-5 md:h-6 md:w-6 text-gray-400" />
                    <span className="text-[9px] md:text-[10px] uppercase font-bold text-gray-500">30-Day Return</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-1">
                    <Truck className="h-5 w-5 md:h-6 md:w-6 text-gray-400" />
                    <span className="text-[9px] md:text-[10px] uppercase font-bold text-gray-500">Fast Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ FIX 6: Tabbed section — only renders if at least one tab exists */}
          {tabs.length > 0 && (
            <div className="mt-8 md:mt-12">
              <div className="flex border-b border-gray-200 mb-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${activeTab === tab.id
                        ? 'border-blue-main text-blue-main'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* ✅ FIX 7: Corrected condition — was `length < 0` (always false bug) */}
              {activeTab === 'details' && hasOverview && (
                <div className="">
                  <section>
                    <div className="prose prose-sm md:prose-base prose-blue text-gray-600 leading-relaxed p-3 max-sm:text-sm">
                      {currentProduct.productDesc}
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'specifications' && hasSpecifications && (
                <section>
                  <div className="rounded-2xl overflow-hidden shadow-sm">
                    <dl className="divide-y divide-gray-50">
                      {currentProduct.specifications.map((spec, i) => (
                        <div key={i} className="flex justify-between p-4 hover:bg-gray-50 transition-colors">
                          <dt className="text-gray-500 text-sm font-medium">{spec.specificationName}</dt>
                          <dd className="text-gray-900 text-sm font-bold ml-4 text-right">{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </section>
              )}
            </div>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;