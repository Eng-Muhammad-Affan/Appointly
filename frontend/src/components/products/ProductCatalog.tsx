import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  FaFilter,
  FaSortAmountDown,
  FaSpinner,
} from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

import type { UserProduct } from "@/types/user";
import { useProductData } from "@/stores/use-catalog";
import { useCategoryStore } from "@/stores/use-categories";
import { UserProductCard } from "../home/UserProductCards";
import Header from "../user/Header";
import Footer from "../user/Footer";

const ProductCatalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL is the single source of truth - read all values directly
  const localCategory = searchParams.get("category") || "";
  const selectedBrands = searchParams.getAll("brands");



  const priceRange: [number, number] = [
    searchParams.get("min_price") ? Number(searchParams.get("min_price")) : 0,
    searchParams.get("max_price") ? Number(searchParams.get("max_price")) : 1000000,
  ];
  const sortBy = (searchParams.get("sort_by") || "price-asc") as "price-asc" | "price-desc" | "name";
  const inStock = searchParams.get("in_stock") === "true";

  const [showFilters, setShowFilters] = useState(false);

  const {
    products,
    pagination,
    isLoading,
    isFetchingMore,
    isError,
    fetchProducts,
    fetchMoreProducts,
    fetchCategories,
  } = useProductData();

  const { categories } = useCategoryStore();

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Get available brands for selected category
  const categoryBrands = useMemo(() => {
    if (localCategory && categories.length > 0) {
      const category = categories.find(cat => cat.slug === localCategory);
      return category?.brands || [];
    }
    return [];
  }, [localCategory, categories]);

  // Helper to update a single filter in URL
  const updateURLParam = useCallback((key: string, value: string | string[] | null) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);

    if (value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
      // Remove the param
    } else if (Array.isArray(value)) {
      value.forEach(v => params.append(key, v));
    } else {
      params.set(key, value);
    }

    setSearchParams(params, { replace: true });
  }, [searchParams, setSearchParams]);

  // Fetch products when URL filters change
  useEffect(() => {
    const params: Record<string, any> = {};

    if (localCategory) params.category = localCategory;
    if (selectedBrands.length > 0) params.brands = selectedBrands;
    if (priceRange[0] > 0) params.min_price = priceRange[0];
    if (priceRange[1] < 1000000) params.max_price = priceRange[1];
    if (inStock) params.in_stock = true;

    const sortMapping: Record<string, string> = {
      "price-asc": "price",
      "price-desc": "price",
      "name": "productName",
    };
    const backendSortField = sortMapping[sortBy];
    if (backendSortField) params.sort_by = backendSortField;

    fetchProducts(params, 1, 30);
  }, [localCategory, selectedBrands.join(","), priceRange[0], priceRange[1], inStock, sortBy, fetchProducts]);

  // Handle filter changes - update URL directly
  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    params.delete("brands"); // Reset brands when category changes
    setSearchParams(params, { replace: true });
  };

  const handleBrandToggle = (brand: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete("brands");

    const currentBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];

    currentBrands.forEach(b => params.append("brands", b));
    setSearchParams(params, { replace: true });
  };
  const handlePriceChange = (index: number, value: number) => {
    const params = new URLSearchParams(searchParams);
    if (index === 0) {
      if (value > 0) {
        params.set("min_price", value.toString());
      } else {
        params.delete("min_price");
      }
    } else {
      if (value < 1000000) {
        params.set("max_price", value.toString());
      } else {
        params.delete("max_price");
      }
    }
    setSearchParams(params, { replace: true });
  };

  const handleSortChange = (sort: "price-asc" | "price-desc" | "name") => {
    const params = new URLSearchParams(searchParams);
    if (sort !== "price-asc") {
      params.set("sort_by", sort);
    } else {
      params.delete("sort_by");
    }
    setSearchParams(params, { replace: true });
  };

  const handleInStockToggle = () => {
    const params = new URLSearchParams(searchParams);
    if (!inStock) {
      params.set("in_stock", "true");
    } else {
      params.delete("in_stock");
    }
    setSearchParams(params, { replace: true });
  };

  const handleResetFilters = () => {
    setSearchParams({}, { replace: true });
  };

  // Local sorting
  const displayProducts = useMemo(() => {
    let productData = [...products];

    switch (sortBy) {
      case "price-desc":
        productData.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "price-asc":
        productData.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "name":
        productData.sort((a, b) =>
          a.productName.localeCompare(b.productName)
        );
        break;
    }

    return productData;
  }, [products, sortBy]);

  // Infinite scroll
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && pagination?.has_next && !isFetchingMore && !isLoading) {
        const params: Record<string, any> = {};
        if (localCategory) params.category = localCategory;
        if (selectedBrands.length > 0) params.brands = selectedBrands;
        if (priceRange[0] > 0) params.min_price = priceRange[0];
        if (priceRange[1] < 1000000) params.max_price = priceRange[1];
        if (inStock) params.in_stock = true;

        const sortMapping: Record<string, string> = {
          "price-asc": "price",
          "price-desc": "price",
          "name": "productName",
        };
        const backendSortField = sortMapping[sortBy];
        if (backendSortField) params.sort_by = backendSortField;

        fetchMoreProducts(params);
      }
    },
    [pagination, isFetchingMore, isLoading, localCategory, selectedBrands, priceRange, inStock, sortBy, fetchMoreProducts]
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    });

    observerRef.current.observe(element);
    return () => {
      observerRef.current?.disconnect();
    };
  }, [handleObserver]);

  // Get current category name
  const currentCategoryName = useMemo(() => {
    if (localCategory) {
      const category = categories.find(cat => cat.slug === localCategory);
      return category?.name || null;
    }
    return null;
  }, [localCategory, categories]);

  return (
    <>
      <Header />
      <section id="catalog" className="py-38 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 space-y-6">
            {currentCategoryName && (
              <div className="text-lg font-bold">
               {pagination?.total_count || displayProducts.length} &nbsp;
                {currentCategoryName.replace("-", " ").toLowerCase()} handpicked for you 
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl border border-gray-300 hover:border-blue-500 hover:text-blue-500"
              >
                <FaFilter className="h-5 w-5" />
                <span className="text-sm font-medium">Filters</span>
              </button>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value as any)}
                  className="appearance-none bg-white pl-4 pr-10 py-3 rounded-xl border border-gray-300"
                >
                  <option value="price-desc">Price: High to Low</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="name">Name</option>
                </select>
                <FaSortAmountDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button onClick={handleResetFilters} className="text-blue-500 text-sm font-medium">
                    Reset All
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={localCategory}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300"
                    >
                      <option value="">All Categories</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.slug}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Brand Filter - Checkboxes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brands
                    </label>
                    {localCategory ? (
                      categoryBrands.length > 0 ? (
                        <div className="max-h-48 overflow-y-auto space-y-2 border border-gray-300 rounded-lg p-3">
                          {categoryBrands.map((brand) => (
                            <label
                              key={brand}
                              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded"
                            >
                              <input
                                type="checkbox"
                                checked={selectedBrands.includes(brand)}
                                onChange={() => handleBrandToggle(brand)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700">{brand}</span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No brands available for this category</p>
                      )
                    ) : (
                      <p className="text-sm text-gray-500">Select a category to see brands</p>
                    )}
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range: PKR {priceRange[0].toLocaleString()} - PKR {priceRange[1].toLocaleString()}
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="1000000"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                        className="w-full accent-blue-500"
                      />
                      <input
                        type="range"
                        min="0"
                        max="1000000"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                        className="w-full accent-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* In Stock Filter */}
                {/* <div className="mt-4">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStock}
                      onChange={handleInStockToggle}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-700">
                      In Stock Only
                    </span>
                  </label>
                </div> */}
              </div>
            )}
          </div>

          {/* Results Count */}
          {/* <div className="mb-6">
            <p className="text-gray-600">
              {currentCategoryName ? (
                <>
                  <span className="font-semibold text-gray-900">
                    {pagination?.total_count || displayProducts.length}
                  </span>
                  &nbsp; products in <span className="font-medium">   {currentCategoryName.replace("-", " ").toLowerCase()}</span>
                </>
              ) : (
                <>
                  Showing
                  <span className="font-semibold text-gray-900 ml-1">
                    {pagination?.total_count || displayProducts.length}
                  </span>
                  products
                </>
              )}
            </p>
          </div> */}

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-16">
              <FaSpinner className="animate-spin h-12 w-12 text-blue-500" />
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && !isError && displayProducts.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-6 lg:gap-10 px-4 sm:px-0">
              {displayProducts.map((product: UserProduct) => (
                <UserProductCard key={product.id} product={product}/>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && displayProducts.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your filters</p>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-red-600 mb-2">Error loading products</h3>
              <p className="text-gray-600">Please try again later</p>
            </div>
          )}

          {/* Loading More */}
          {isFetchingMore && (
            <div className="flex justify-center items-center py-8">
              <FaSpinner className="animate-spin h-8 w-8 text-blue-500" />
            </div>
          )}

          {/* Infinite Scroll Observer */}
          {pagination?.has_next && <div ref={loadMoreRef} className="h-10" />}

          {/* Total Count Indicator */}
          {pagination && pagination.total_count > displayProducts.length && (
            <div className="text-center py-4 text-sm text-gray-500">
              Showing {displayProducts.length} of {pagination.total_count} products
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductCatalog;