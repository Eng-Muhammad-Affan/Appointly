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
    FaTimes,
    FaSpinner,
} from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

import type { UserProduct } from "@/types/user";
import { useProductData } from "@/stores/use-catalog";
import { useCategoryStore } from "@/stores/use-categories";
import { UserProductCard } from "@/components/home/UserProductCards";
import Footer from "@/components/user/Footer";
import Header from "@/components/user/Header";

const SearchPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Read all filters from URL
    const keyword = searchParams.get("keyword") || "";
    const urlCategory = searchParams.get("category") || "";
    const urlBrands = searchParams.get("brand") ? searchParams.getAll("brand") : [];
    const urlMinPrice = searchParams.get("min_price") || "";
    const urlMaxPrice = searchParams.get("max_price") || "";
    const urlSortBy = searchParams.get("sort_by") || "price-asc";
    const urlInStock = searchParams.get("in_stock") === "true";

    const [showFilters, setShowFilters] = useState(false);
    const [localCategory, setLocalCategory] = useState(urlCategory);
    const [selectedBrands, setSelectedBrands] = useState<string[]>(urlBrands);
    const [priceRange, setPriceRange] = useState<[number, number]>([
        urlMinPrice ? Number(urlMinPrice) : 0,
        urlMaxPrice ? Number(urlMaxPrice) : 1000000,
    ]);
    const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name">(
        urlSortBy as "price-asc" | "price-desc" | "name"
    );
    const [inStock, setInStock] = useState(urlInStock);

    const {
        searchResults,
        searchPagination,
        isSearching,
        isSearchingMore,
        searchAvailableBrands, // Add this
        isError,
        searchProducts,
        loadMoreSearchResults,
        clearSearch,
    } = useProductData();

    const { categories } = useCategoryStore();

    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const previousFiltersRef = useRef<string>("");

    // Get available brands for selected category
    // const availableBrands = useMemo(() => {
    //     if (localCategory && categories.length > 0) {
    //         const category = categories.find(cat => cat.slug === localCategory);
    //         return category?.brands || [];
    //     }
    //     return [];
    // }, [localCategory, categories]);


    // Update URL when filters change
    const updateURL = useCallback(() => {
        const params = new URLSearchParams();

        if (keyword) params.set("keyword", keyword);
        if (localCategory) params.set("category", localCategory);
        selectedBrands.forEach(brand => params.append("brand", brand));
        if (priceRange[0] > 0) params.set("min_price", priceRange[0].toString());
        if (priceRange[1] < 1000000) params.set("max_price", priceRange[1].toString());
        if (sortBy !== "price-asc") params.set("sort_by", sortBy);
        if (inStock) params.set("in_stock", "true");

        setSearchParams(params, { replace: true });
    }, [keyword, localCategory, selectedBrands, priceRange, sortBy, inStock, setSearchParams]);

    // Build API params
    const apiParams = useMemo(() => {
        const params: Record<string, any> = {};

        if (localCategory) {
            params.category = localCategory;
        }

        if (selectedBrands.length > 0) {
            params.brands = selectedBrands;
        }

        if (priceRange[0] > 0) {
            params.min_price = priceRange[0];
        }
        if (priceRange[1] < 1000000) {
            params.max_price = priceRange[1];
        }

        if (inStock) {
            params.in_stock = true;
        }

        const sortMapping: Record<string, string> = {
            "price-asc": "price",
            "price-desc": "price",
            "name": "productName",
        };

        const backendSortField = sortMapping[sortBy];
        if (backendSortField) {
            params.sort_by = backendSortField;
        }

        return params;
    }, [localCategory, selectedBrands, priceRange, inStock, sortBy]);

    // Detect filter changes
    const filtersKey = useMemo(() => {
        return JSON.stringify({
            keyword,
            ...apiParams,
        });
    }, [keyword, apiParams]);

    // Main fetch effect
    // Main fetch effect
    useEffect(() => {
        if (keyword.trim().length > 0) {
            searchProducts(keyword, apiParams, 1, 30);
        } else {
            clearSearch();
        }
    }, [keyword, localCategory, JSON.stringify(selectedBrands), priceRange[0], priceRange[1], inStock, sortBy, searchProducts, clearSearch]);

    // Sync URL changes back to local state
    // useEffect(() => {
    //     setLocalCategory(urlCategory);
    //     setSelectedBrands(urlBrands);
    //     setPriceRange([
    //         urlMinPrice ? Number(urlMinPrice) : 0,
    //         urlMaxPrice ? Number(urlMaxPrice) : 1000000,
    //     ]);
    //     setSortBy(urlSortBy as "price-asc" | "price-desc" | "name");
    //     setInStock(urlInStock);
    // }, [urlCategory, urlBrands, urlMinPrice, urlMaxPrice, urlSortBy, urlInStock]);

    // Handle filter changes with URL update
    const handleCategoryChange = (category: string) => {
        setLocalCategory(category);
        setSelectedBrands([]);
        updateURL(); // Remove setTimeout
    };

    const handleBrandToggle = (brand: string) => {
        setSelectedBrands(prev => {
            const newBrands = prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand];
            return newBrands;
        });
        // Can't call updateURL here because setSelectedBrands is async
    };

    useEffect(() => {
        updateURL();
    }, [localCategory, selectedBrands, priceRange, sortBy, inStock]);

    const handlePriceChange = (index: number, value: number) => {
        setPriceRange(prev => {
            const newRange: [number, number] = [...prev] as [number, number];
            newRange[index] = value;
            setTimeout(updateURL, 0);
            return newRange;
        });
    };

    const handleSortChange = (sort: "price-asc" | "price-desc" | "name") => {
        setSortBy(sort);
        setTimeout(updateURL, 0);
    };

    const handleInStockToggle = () => {
        setInStock(prev => {
            setTimeout(updateURL, 0);
            return !prev;
        });
    };

    const handleResetFilters = () => {
        setLocalCategory("");
        setSelectedBrands([]);
        setPriceRange([0, 1000000]);
        setSortBy("price-asc");
        setInStock(false);

        const params = new URLSearchParams();
        if (keyword) params.set("keyword", keyword);
        setSearchParams(params, { replace: true });
    };

    // Local sorting
    const displayProducts = useMemo(() => {
        let productData = [...searchResults];

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
    }, [searchResults, sortBy]);

    // Infinite scroll
    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const [entry] = entries;

            if (
                entry.isIntersecting &&
                searchPagination?.has_next &&
                !isSearchingMore &&
                !isSearching
            ) {
                loadMoreSearchResults(keyword, apiParams);
            }
        },
        [
            searchPagination,
            isSearchingMore,
            isSearching,
            keyword,
            apiParams,
            loadMoreSearchResults,
        ]
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
            <section id="search-page" className="py-38 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 space-y-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Search results for "{keyword}"
                            </h1>
                            {currentCategoryName && (
                                <p className="text-gray-600 mt-1">
                                    in category: <span className="font-semibold">{currentCategoryName}</span>
                                </p>
                            )}
                        </div>

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
                                        {searchAvailableBrands.length > 0 ? (
                                            <div className="max-h-48 overflow-y-auto space-y-2 border border-gray-300 rounded-lg p-3">
                                                {searchAvailableBrands.map((brand) => (
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
                                            <p className="text-sm text-gray-500">No brands available</p>
                                        )}
                                        {/* {availableBrands.length > 0 ? (
                                        <div className="max-h-48 overflow-y-auto space-y-2 border border-gray-300 rounded-lg p-3">
                                            {availableBrands.map((brand) => (
                                           
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            {localCategory ? "No brands available for this category" : "Select a category to see brands"}
                                        </p>
                                    )} */}
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
                                <div className="mt-4">
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
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Results Count */}
                    <div className="mb-6">
                        <p className="text-gray-600">
                            <span className="font-semibold text-gray-900">
                                {searchPagination?.total_count || displayProducts.length}
                            </span>
                            {currentCategoryName ? (
                                <> products found in <span className="font-medium">{currentCategoryName}</span></>
                            ) : (
                                <> products found</>
                            )}
                        </p>
                    </div>

                    {/* Loading State */}
                    {isSearching && (
                        <div className="flex justify-center items-center py-16">
                            <FaSpinner className="animate-spin h-12 w-12 text-blue-500" />
                        </div>
                    )}

                    {/* Products Grid */}
                    {!isSearching && !isError && displayProducts.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-10 px-4 sm:px-0">
                            {displayProducts.map((product: UserProduct) => (
                                <UserProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!isSearching && !isError && displayProducts.length === 0 && (
                        <div className="text-center py-16">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-600">Try adjusting your search term or filters</p>
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
                    {isSearchingMore && (
                        <div className="flex justify-center items-center py-8">
                            <FaSpinner className="animate-spin h-8 w-8 text-blue-500" />
                        </div>
                    )}

                    {/* Infinite Scroll Observer */}
                    {searchPagination?.has_next && <div ref={loadMoreRef} className="h-10" />}

                    {/* Total Count Indicator */}
                    {searchPagination && searchPagination.total_count > displayProducts.length && (
                        <div className="text-center py-4 text-sm text-gray-500">
                            Showing {displayProducts.length} of {searchPagination.total_count} products
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default SearchPage;