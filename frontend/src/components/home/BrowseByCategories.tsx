import { useCategoryStore } from '@/stores/use-categories';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

// Unsplash image collections for each category
const categoryImages: Record<string, string> = {
  'laptops': 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop',
  'desktop-pcs': 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&h=400&fit=crop',
  'tablets': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=400&fit=crop',
  'drives': 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=600&h=400&fit=crop',
  'printers': 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&h=400&fit=crop',
  'monitors': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=400&fit=crop',
  'network': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
  'used': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop',
  'default': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop'
};

// Category metadata
const categoryMetadata: Record<string, { description: string; color: string }> = {
  'laptops': { description: 'Ultrabooks, Gaming, Business', color: '#3B82F6' },
  'desktop-pcs': { description: 'Gaming Rigs, Workstations', color: '#8B5CF6' },
  'tablets': { description: 'Android, iPad, Windows', color: '#EC4899' },
  'drives': { description: 'SSD, HDD, External, NVMe', color: '#10B981' },
  'printers': { description: 'Laser, Inkjet, All-in-One', color: '#F59E0B' },
  'monitors': { description: '4K, Gaming, Ultrawide', color: '#6366F1' },
  'network': { description: 'Routers, Switches, Cables', color: '#64748B' },
  'used': { description: 'Certified Refurbished Deals', color: '#EF4444' },
};

const BrowseByCategories = () => {
  const { fetchCategories, categories, isLoading } = useCategoryStore();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const updatedCategories = useMemo(() => {
    return categories.map((cat) => {
      const label = cat.slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      const metadata = categoryMetadata[cat.slug] || {
        description: 'Explore our collection',
        color: '#6B7280'
      };

      const imageUrl = categoryImages[cat.slug] || categoryImages.default;

      return {
        id: cat.id,
        slug: cat.slug,
        label,
        image: imageUrl,
        description: metadata.description,
        color: metadata.color,
      };
    });
  }, [categories]);

  const handleImageError = (slug: string) => {
    setImageErrors(prev => ({ ...prev, [slug]: true }));
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <div className="h-4 w-32 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
          <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-3 animate-pulse" />
          <div className="h-4 w-96 bg-gray-200 rounded mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-6 space-y-3">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-6 w-32 bg-gray-200 rounded" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section id="categories" className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-main px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Browse Categories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-audio-wide">
            Explore Our Tech Universe
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            From cutting-edge laptops to essential networking gear — discover everything you need in one place.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
          {updatedCategories.map((cat, index) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.slug}`}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-48 md:h-48 overflow-hidden">
                <img
                  src={imageErrors[cat.slug] ? categoryImages.default : cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={() => handleImageError(cat.slug)}
                  loading="lazy"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className="px-3 py-1.5 rounded-lg text-white text-xs font-semibold backdrop-blur-md"
                    style={{ backgroundColor: cat.color + 'CC' }}
                  >
                    {cat.label}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                  {cat.label}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {cat.description}
                </p>
                
                <div className="flex items-center justify-between pt-4">
                  <span className="text-sm font-medium text-gray-500">Browse Products</span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-blue-main text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-main/80 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategories;