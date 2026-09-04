
// export default HomePage;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Star, ArrowRight,
  Shield, Truck, CreditCard, Headphones, TrendingUp,
  Package, RefreshCw, Award
} from 'lucide-react';
import Header from '@/components/user/Header';
import BrowseByCategories from '@/components/home/BrowseByCategories';
import Footer from '@/components/user/Footer';
import HeroSection from '@/components/home/HeroSection';
import { PromoCards } from '@/components/home/PromoCards';
import FeaturesSection from '@/components/home/Features';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';

// ─── Types ──────────────────────────────────────────────────────────────────

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  category: string;
}

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

const featuredProducts: Product[] = [
  {
    id: 1, name: 'MacBook Pro M3 14"', price: 299999, originalPrice: 329999,
    rating: 4.9, reviews: 342, category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80',
    badge: 'Best Seller'
  },
  {
    id: 2, name: 'Dell XPS Gaming Desktop', price: 189999,
    rating: 4.7, reviews: 218, category: 'Desktop PCs',
    image: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=400&q=80',
    badge: 'New'
  },
  {
    id: 3, name: 'Samsung 27" 4K Monitor', price: 69999, originalPrice: 84999,
    rating: 4.8, reviews: 156, category: 'Monitors',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80',
    badge: 'Sale'
  },
  {
    id: 4, name: 'Samsung 990 Pro 2TB NVMe', price: 24999, originalPrice: 29999,
    rating: 4.9, reviews: 589, category: 'Drives',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80',
    badge: 'Hot'
  },
  {
    id: 5, name: 'iPad Pro 12.9" M2', price: 179999,
    rating: 4.8, reviews: 274, category: 'Tablets',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80',
  },
  {
    id: 6, name: 'TP-Link Archer AX90', price: 29999, originalPrice: 36999,
    rating: 4.6, reviews: 198, category: 'Network',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    badge: 'Sale'
  },
];

const testimonials: Testimonial[] = [
  {
    name: 'Ahmed Raza', role: 'Software Engineer, Karachi',
    text: 'Got my MacBook Pro delivered in 2 days. Build quality check was thorough and the price beat every other store in the city.',
    rating: 5, avatar: 'AR'
  },
  {
    name: 'Fatima Khan', role: 'Graphic Designer, Lahore',
    text: 'The refurbished Dell monitor I bought looks brand new. Saved 40% and got a 6-month warranty. Absolutely recommended.',
    rating: 5, avatar: 'FK'
  },
  {
    name: 'Usman Tariq', role: 'IT Manager, Islamabad',
    text: 'Ordered 20 laptops for our office. Bulk pricing was unbeatable and every single unit was delivered perfectly packed.',
    rating: 5, avatar: 'UT'
  },
];

const brands = ['Dell', 'HP', 'Apple', 'Lenovo', 'Samsung', 'Asus', 'Acer', 'LG', 'TP-Link', 'Seagate'];

// ─── Sub-components ───────────────────────────────────────────────────────────

// const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
//   <div className="flex gap-0.5">
//     {[1, 2, 3, 4, 5].map(i => (
//       <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? 'fill-blue-400 text-blue-400' : 'text-gray-300'}`} />
//     ))}
//   </div>
// );

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (

    <div
      className={`group relative bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 cursor-pointer
        ${hovered ? 'shadow-2xl shadow-blue-100 -translate-y-1 border-blue-200' : 'shadow-sm hover:shadow-lg'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Badge */}
      {product.badge && (
        <span className={`absolute top-3 left-3 z-10 text-xs font-bold px-2.5 py-1 rounded-full
          ${product.badge === 'Sale' ? 'bg-red-500 text-white' :
            product.badge === 'New' ? 'bg-green-500 text-white' :
              product.badge === 'Hot' ? 'bg-blue-main text-white' :
                'bg-blue-main text-white'}`}>
          {product.badge}
        </span>
      )}

      {/* Image */}
      <div className="relative h-48 bg-gray-50 overflow-hidden">
        <img
          src={product.image} alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${hovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`} />

        {/* Quick Add */}
        <div className={`absolute bottom-3 left-0 right-0 flex justify-center transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Link to="/laptops" className="bg-blue-main hover:bg-blue-main text-white text-sm font-semibold px-5 py-2 rounded-full shadow-lg">
            View Product
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-blue-main font-semibold uppercase tracking-wider mb-1">{product.category}</p>
        <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-blue-main transition-colors">
          {product.name}
        </h3>
        {/* <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-500">({product.reviews.toLocaleString()})</span>
        </div> */}
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xl font-extrabold text-gray-900">
              Rs. {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-400 line-through">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          {discount && (
            <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-lg">
              -{discount}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const HomePage: React.FC = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [testimonialIdx, setTestimonialIdx] = useState(0);


  // Intersection observer for fade-in sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, e.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);


  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 mt-16 lg:mt-24 font-sans">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}

        <HeroSection />
        {/* ── TRUST BAR ────────────────────────────────────────────────────── */}
       <FeaturesSection/>

        {/* ── PROMO Cards ─────────────────────────────────────────────────── */}
        <PromoCards />

        {/* ── CATEGORIES ───────────────────────────────────────────────────── */}
        <BrowseByCategories />


        {/* ── FEATURED PRODUCTS ─────────────────────────────────────────────── */}
        <FeaturedProducts/>
        {/* ── WHY CHOOSE US ─────────────────────────────────────────────────── */}
        <section className="bg-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-blue-main font-bold text-sm uppercase tracking-widest">Why Tech Waghera?</span>
              <h2 className="text-4xl font-audio-wide font-black text-white mt-2" style={{ letterSpacing: '-0.02em' }}>
                The Smart Shopper's Choice
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Award className="w-7 h-7" />,
                  title: 'Authentic Guarantee',
                  desc: 'Every product we sell is 100% genuine, sourced directly from authorized distributors and brand partners.',
                  color: 'text-blue-400 bg-blue-main/10'
                },
                {
                  icon: <Truck className="w-7 h-7" />,
                  title: 'Nationwide Delivery',
                  desc: 'We deliver to all major cities across Pakistan within 24–72 hours with real-time tracking.',
                  color: 'text-blue-400 bg-blue-main/10'
                },
                {
                  icon: <CreditCard className="w-7 h-7" />,
                  title: 'Flexible Payments',
                  desc: 'Easy EMI on all banks, cash on delivery, JazzCash, EasyPaisa — pay however you want.',
                  color: 'text-green-400 bg-green-500/10'
                },
                {
                  icon: <Shield className="w-7 h-7" />,
                  title: 'Full Warranty Support',
                  desc: 'We handle all warranty claims on your behalf. No running around service centers.',
                  color: 'text-purple-400 bg-purple-500/10'
                },
                {
                  icon: <Headphones className="w-7 h-7" />,
                  title: 'Expert Tech Support',
                  desc: 'Our team of certified engineers is available 7 days a week to help you make the right choice.',
                  color: 'text-pink-400 bg-pink-500/10'
                },
                {
                  icon: <RefreshCw className="w-7 h-7" />,
                  title: '7-Day Easy Returns',
                  desc: 'Not satisfied? Return it within 7 days, no questions asked. Your satisfaction is everything.',
                  color: 'text-yellow-400 bg-yellow-500/10'
                },
              ].map(item => (
                <div key={item.title} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-blue-main/30 transition-all duration-300 group">
                  <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <h3 className="text-white font-extrabold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BRANDS ───────────────────────────────────────────────────────── */}
        <section className="bg-white py-14 overflow-hidden border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
            <p className="text-gray-400 text-sm font-semibold uppercase tracking-widest">Trusted Brands We Carry</p>
          </div>
          <div className="relative">
            <div className="flex animate-marquee gap-12 whitespace-nowrap">
              {[...brands, ...brands].map((b, i) => (
                <span key={i} className="text-2xl font-black text-gray-300 hover:text-blue-main transition-colors cursor-default flex-shrink-0">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14">
            <span className="text-blue-main font-bold text-sm uppercase tracking-widest">Customer Love</span>
            <h2 className="text-4xl font-audio-wide font-black text-gray-900 mt-2" style={{ letterSpacing: '-0.02em' }}>
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 p-7 flex flex-col gap-4">
                <div className="flex gap-1">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-blue-400 text-blue-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed text-sm flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-main to-red-500 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-extrabold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── NEWSLETTER / CTA ─────────────────────────────────────────────── */}
        <section className="bg-gradient-to-r from-blue-main to-red-600 py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}
          />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-audio-wide sm:text-4xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
              Get Exclusive Deals First
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Join 50,000+ subscribers who get early access to flash sales and new arrivals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email" placeholder="Enter your email address"
                className="flex-1 bg-white/20 backdrop-blur border border-white/30 text-white placeholder-blue-200 px-5 py-3.5 rounded-2xl focus:outline-none focus:bg-white/30 transition-all"
              />
              <button className="bg-white text-blue-main font-extrabold px-7 py-3.5 rounded-2xl hover:bg-blue-50 transition-colors shadow-lg flex-shrink-0">
                Subscribe
              </button>
            </div>
            <p className="text-blue-200 text-xs mt-4">No spam ever. Unsubscribe anytime.</p>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}

        <Footer />
        {/* Marquee animation */}
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&display=swap');

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 18s linear infinite;
          display: inline-flex;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      </div>
    </>
  );
};

export default HomePage;