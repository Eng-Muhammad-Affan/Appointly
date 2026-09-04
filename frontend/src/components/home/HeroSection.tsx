import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Banner1 from "@/assets/banners/desktop/banner-1.jpeg";
import Banner2 from "@/assets/banners/desktop/banner-2.jpeg";
import Banner1Mobile from "@/assets/banners/mobile/banner-1.jpeg";
import Banner2Mobile from "@/assets/banners/mobile/banner-2.jpeg";

const heroSlidesDesktop = [
  {
    headline: 'Upgrade Your\nDigital World',
    sub: 'Discover a massive collection of premium tech for work and play.',
    cta: 'Shop Now',
    ctaLink: '/products',
    img: Banner1,
  },
  {
    headline: 'Unleash gaming \n power',
    sub: 'High performance gaming gear and PCs',
    cta: 'Explore',
    ctaLink: '/search?keyword=gaming',
    img: Banner2,
  },
];

const heroSlidesMobile = [
  {
    headline: 'Upgrade Your\nDigital World',
    sub: 'Discover a massive collection of premium tech for work and play.',
    cta: 'Shop Now',
    ctaLink: '/products',
    img: Banner1Mobile,
  },
  {
    headline: 'Unleash gaming \n power',
    sub: 'High performance gaming gear and PCs',
    cta: 'Explore',
    ctaLink: '/search?keyword=gaming',
    img: Banner2Mobile,
  },
];

const HeroSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  
  const slides = isMobile ? heroSlidesMobile : heroSlidesDesktop;

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track current slide
  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Autoplay plugin
  const autoplayPlugin = React.useMemo(
    () =>
      Autoplay({
        delay: 5000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    []
  );

  return (
    <section className="h-[60vh] md:h-[65vh] lg:h-[85vh] max-sm:mt-16 relative overflow-hidden w-full">
      <Carousel
        setApi={setApi}
        className="w-full h-full"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[autoplayPlugin]}
      >
        <CarouselContent className="h-full ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-full pl-0 relative w-full flex-shrink-0">
              <img
                src={slide.img}
                alt=""
                className="w-full h-full object-cover select-none"
              />
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Content overlay - safely bounded inside parent metrics */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-full flex items-center">
            <div className="max-w-xl sm:max-w-2xl pointer-events-auto pr-4">
              {/* Animated headline */}
              <div className="overflow-hidden mb-3 sm:mb-4 lg:mb-6">
                <div
                  key={current}
                  className="animate-slideUp"
                >
                  <h1 className="text-2xl sm:text-4xl lg:text-6xl font-black text-white max-sm:leading-tight leading-none font-audio-wide break-words">
                    {slides[current]?.headline.split('\n').map((line, i) => (
                      <span key={i} className="block">
                        {line}
                      </span>
                    ))}
                  </h1>
                </div>
              </div>

              {/* Animated subtitle */}
              <div className="overflow-hidden mb-6 sm:mb-8 lg:mb-10">
                <div
                  key={`sub-${current}`}
                  className="animate-slideUp"
                  style={{ animationDelay: '0.1s' }}
                >
                  <p className="text-gray-200 text-xs sm:text-sm lg:text-base leading-relaxed max-w-md sm:max-w-lg">
                    {slides[current]?.sub}
                  </p>
                </div>
              </div>

              {/* Animated buttons */}
              <div className="overflow-hidden">
                <div
                  key={`btn-${current}`}
                  className="flex flex-wrap gap-4 animate-slideUp"
                  style={{ animationDelay: '0.2s' }}
                >
                  <Link
                    to={slides[current]?.ctaLink || '#'}
                    className="group inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-xs sm:text-sm px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {slides[current]?.cta}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Animated decorative element */}
            <div className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-orange-400/20 to-pink-500/20 blur-3xl animate-pulse" />
            </div>
          </div>
        </div>

        {/* Navigation arrows - adapted for smaller viewports */}
        <div className="absolute bottom-4 right-4 sm:bottom-8 md:bottom-10 sm:right-8 z-20 flex gap-2">
          <button
            onClick={() => api?.scrollPrev()}
            className="h-8 w-8 sm:h-10 sm:w-10 bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white rounded-lg transition-all duration-300 flex items-center justify-center group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={() => api?.scrollNext()}
            className="h-8 w-8 sm:h-10 sm:w-10 bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white rounded-lg transition-all duration-300 flex items-center justify-center group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Slide indicators - scaled down slightly for mobile layout safety */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`relative group transition-all duration-300 ${
                  i === current
                    ? 'w-8 sm:w-12 h-2 sm:h-3 bg-white'
                    : 'w-2 sm:w-3 h-2 sm:h-3 bg-white/40 hover:bg-white/60'
                } rounded-full`}
                aria-label={`Go to slide ${i + 1}`}
              >
                {i === current && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                    0{i + 1}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </Carousel>

      {/* CSS animations */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;