import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu, X, User, ShoppingCart, Heart, ChevronDown, 
  Search, ChevronRight
} from 'lucide-react';
import Logo from "@/assets/logo.png";
import { useCartStore } from '@/stores/use-cart';
import { useCategoryStore } from '@/stores/use-categories';
import { useWishlistStore } from '@/stores/use-wishlist';
import { useProductData } from '@/stores/use-catalog';
import { Button } from '../ui/button';
import { CartSheet } from '../cart/CartSidebar';
import { megaMenuStructure } from './links';
import HeaderTop from './HeaderTop';

// Utility function to format category names
const formatCategoryName = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Helper function to split array into chunks
const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

const Header: React.FC = () => {
  const { wishlist } = useWishlistStore();
  const { fetchCategories } = useCategoryStore();
  const { items } = useCartStore();
  const { searchProducts, searchResults, isSearching } = useProductData();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout>();
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setOpenDropdown(null);
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setExpandedCategories([]);
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // Debounced search for suggestions
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      const trimmed = searchQuery.trim();
      setDebouncedSearch(trimmed);

      if (trimmed.length > 0) {
        searchProducts(trimmed, {}, 1, 7);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, searchProducts]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = useCallback((index: number) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  }, []);

  const handleNavigation = useCallback((href: string) => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
    setExpandedCategories([]);
    navigate(href);
  }, [navigate]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
      setIsSearchOpen(false);
    }
  }, [searchQuery, navigate]);

  const handleSuggestionClick = useCallback((product: any) => {
    setShowSuggestions(false);
    setSearchQuery('');
    navigate(`/products/${product.id}`);
  }, [navigate]);

  const handleViewAll = useCallback(() => {
    if (searchQuery.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
      setIsSearchOpen(false);
    }
  }, [searchQuery, navigate]);

  const toggleMobileMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
    setOpenDropdown(null);
    if (!isMenuOpen) {
      setExpandedCategories([]);
    }
  }, [isMenuOpen]);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen(prev => !prev);
    if (!isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  const toggleMobileCategory = (index: number) => {
    setExpandedCategories(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  if (location.pathname.startsWith('/admin')) return null;

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white shadow-sm'
          }`}
      >
        <HeaderTop/>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 lg:hidden">
              <button
                className="p-2 -ml-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100"
                onClick={toggleMobileMenu}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center">
                <img src={Logo} alt="Tech Waghera" className='h-10 w-auto' />
              </Link>
            </div>

            <Link to="/" className="hidden lg:flex items-center space-x-2 flex-shrink-0">
              <img src={Logo} alt="Tech Waghera" className='h-12 w-auto lg:h-14 transition-all duration-300' />
            </Link>

            {/* Desktop Search with Suggestions */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8" ref={searchContainerRef}>
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products, brands, and categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (debouncedSearch.length > 0 && searchResults.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setSearchQuery('');
                      setShowSuggestions(false);
                      setIsSearchOpen(false);
                    }
                  }}
                  className="w-full px-4 py-[7px] pr-12 border border-gray-300 rounded-lg 
                    focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 
                    transition-all placeholder-gray-400 text-sm"
                />
                <button type="submit" className="absolute right-0 top-0 h-full px-4 bg-blue-main text-white rounded-r-lg hover:bg-blue-main/10 transition-colors">
                  <Search className="h-4 w-4" />
                </button>

                {/* Search Suggestions Dropdown */}
                {showSuggestions && debouncedSearch.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                    {isSearching ? (
                      <div className="p-4 text-center text-sm text-gray-500">
                        Searching...
                      </div>
                    ) : searchResults.length > 0 ? (
                      <>
                        {searchResults.slice(0, 7).map((product) => (
                          <button
                            key={product.id}
                            onClick={() => handleSuggestionClick(product)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                          >
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {product.productName}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {product.brand && `${product.brand} • `}PKR {Number(product.price).toLocaleString()}
                            </p>
                          </button>
                        ))}
                        <div className="border-t border-gray-100">
                          <button
                            onClick={handleViewAll}
                            className="w-full text-center px-4 py-3 text-sm text-blue-600 hover:bg-blue-50 transition-colors font-medium rounded-b-lg"
                          >
                            View all results for "{debouncedSearch}"
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="p-4 text-center text-sm text-gray-500">
                        No products found
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>

            <div className="flex items-center space-x-1 lg:space-x-2">
              <button className="lg:hidden p-2 text-gray-700 hover:text-blue-600 rounded-lg hover:bg-gray-100" onClick={toggleSearch}>
                <Search className="h-5 w-5" />
              </button>

              <CartSheet>
                <Button variant="outline" className="relative h-9 w-9 p-0" aria-label="Shopping cart">
                  <ShoppingCart className="h-4 w-4" />
                  {items.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] rounded-full min-w-[16px] h-[16px] flex items-center justify-center font-medium px-0.5">
                      {items.length > 99 ? '99+' : items.length}
                    </span>
                  )}
                </Button>
              </CartSheet>

              <Link to="/wishlist" aria-label="Wishlist">
                <Button variant="outline" className="relative h-9 w-9 p-0">
                  <Heart className="h-4 w-4" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] rounded-full min-w-[16px] h-[16px] flex items-center justify-center font-medium px-0.5">
                      {wishlist.length > 99 ? '99+' : wishlist.length}
                    </span>
                  )}
                </Button>
              </Link>

              <Link to="/profile" aria-label="User profile">
                <Button variant="outline" className="relative h-9 w-9 p-0">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Search with Suggestions */}
          {isSearchOpen && (
            <div className="lg:hidden pb-4 border-t border-gray-100" ref={searchContainerRef}>
              <form onSubmit={handleSearch} className="relative mt-4">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (debouncedSearch.length > 0 && searchResults.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setSearchQuery('');
                      setShowSuggestions(false);
                      setIsSearchOpen(false);
                    }
                  }}
                  className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-sm"
                />
                <button type="submit" className="absolute right-0 top-0 h-full px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 hover:text-black">
                  <Search className="h-4 w-4" />
                </button>

                {/* Mobile Search Suggestions Dropdown */}
                {showSuggestions && debouncedSearch.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                    {isSearching ? (
                      <div className="p-4 text-center text-sm text-gray-500">
                        Searching...
                      </div>
                    ) : searchResults.length > 0 ? (
                      <>
                        {searchResults.slice(0, 7).map((product) => (
                          <button
                            key={product.id}
                            onClick={() => {
                              handleSuggestionClick(product);
                              setIsSearchOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                          >
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {product.productName}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {product.brand && `${product.brand} • `}PKR {Number(product.price).toLocaleString()}
                            </p>
                          </button>
                        ))}
                        <div className="border-t border-gray-100">
                          <button
                            onClick={() => {
                              handleViewAll();
                              setIsSearchOpen(false);
                            }}
                            className="w-full text-center px-4 py-3 text-sm text-blue-600 hover:bg-blue-50 transition-colors font-medium rounded-b-lg"
                          >
                            View all results for "{debouncedSearch}"
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="p-4 text-center text-sm text-gray-500">
                        No products found
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>
          )}
        </div>

        {/* Desktop Mega Menu Navigation */}
        <div className="hidden lg:block border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-center">
              {megaMenuStructure.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => item.type === 'mega' && handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.type === 'link' ? (
                    <Link
                      to={item.href}
                      className="p-2 text-xs font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50 transition-colors block"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <>
                      <button
                        className={`p-2 text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-1
                          ${openDropdown === index ? 'text-blue-600 bg-gray-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
                      >
                        <Link to={item.href} className="hover:text-blue-600">{item.name}</Link>
                        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${openDropdown === index ? 'rotate-180' : ''}`} />
                      </button>

                      {openDropdown === index && (
                        <div className={`absolute top-full ${index === megaMenuStructure.length - 2 ? "right-5" : "left-0"} bg-white shadow-2xl rounded-b-lg border border-gray-100 z-50 animate-fadeIn p-3`}>
                          {item.columns && item.columns.length > 20 ? (
                            // For large menus like ADDONS, split into multiple columns of 10
                            <div className="flex gap-4">
                              {chunkArray(item.columns, 10).map((chunk, chunkIndex) => (
                                <div key={chunkIndex} className="flex flex-col min-w-[150px]">
                                  {chunk.map((column, colIndex) => (
                                    <button
                                      key={colIndex}
                                      onClick={() => handleNavigation(column.href)}
                                      className="text-left px-2.5 py-1.5 text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors whitespace-nowrap"
                                    >
                                      {column.name}
                                    </button>
                                  ))}
                                </div>
                              ))}
                            </div>
                          ) : (
                            // For smaller menus, show subcategories with children in columns
                            <div className="flex flex-wrap gap-x-4 gap-y-0" style={{ maxWidth: '700px' }}>
                              {item.columns && item.columns.map((column, colIndex) => (
                                <div key={colIndex} className="min-w-[140px]">
                                  {column.children.length > 0 ? (
                                    <div className="group/col relative">
                                      <button
                                        onClick={() => handleNavigation(column.href)}
                                        className="flex items-center justify-between w-full px-2.5 py-1.5 text-xs text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors font-medium"
                                      >
                                        <span>{column.name}</span>
                                        <ChevronRight className="h-3 w-3 opacity-0 group-hover/col:opacity-100 transition-all ml-1" />
                                      </button>
                                      <div className="absolute left-full top-0 bg-white shadow-lg rounded-lg border border-gray-100 py-1.5 opacity-0 invisible group-hover/col:opacity-100 group-hover/col:visible transition-all duration-200 ml-0.5 min-w-[140px]">
                                        {column.children.map((child, childIndex) => (
                                          <button
                                            key={childIndex}
                                            onClick={() => handleNavigation(child.href)}
                                            className="block w-full text-left px-3 py-1.5 text-xs text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors whitespace-nowrap"
                                          >
                                            {child.name}
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => handleNavigation(column.href)}
                                      className="block w-full text-left px-2.5 py-1.5 text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors whitespace-nowrap"
                                    >
                                      {column.name}
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div ref={menuRef} className="lg:hidden fixed inset-0 top-0 z-50 overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
            <div className="flex items-center justify-between p-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center">
                <img src={Logo} alt="Tech Waghera" className='h-10 w-auto' />
              </Link>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {megaMenuStructure.map((item, index) => (
              <div key={index} className="border-b border-gray-50 last:border-0">
                {item.type === 'link' ? (
                  <Link
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-sm text-gray-800 hover:bg-gray-50 rounded-lg font-medium"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => toggleMobileCategory(index)}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-800 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedCategories.includes(index) ? 'rotate-180' : ''}`} />
                    </button>

                    {expandedCategories.includes(index) && (
                      <div className="bg-gray-50 rounded-lg mx-2 mb-2 py-1 animate-fadeIn">
                        {item.columns && item.columns.map((column, colIndex) => (
                          <div key={colIndex}>
                            {column.children.length > 0 ? (
                              <div>
                                <button
                                  onClick={() => handleNavigation(column.href)}
                                  className="w-full text-left px-6 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-between"
                                >
                                  <span>{column.name}</span>
                                  <ChevronRight className="h-3 w-3" />
                                </button>
                                <div className="pl-8 pb-1">
                                  {column.children.map((child, childIndex) => (
                                    <button
                                      key={childIndex}
                                      onClick={() => handleNavigation(child.href)}
                                      className="w-full text-left px-4 py-1.5 text-xs text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                    >
                                      {child.name}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleNavigation(column.href)}
                                className="w-full text-left px-6 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              >
                                {column.name}
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
      `}</style>
    </>
  );
};

export default Header;

