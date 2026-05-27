"use client";
// ____ Hooks ...
import { useServiceFilter, Catalog } from "@/features/services-listing";
import { Search, MapPin, ChevronDown, X, Star, Award, Navigation } from 'lucide-react';
// ____ Components and constants ...
import { serviceCategories } from "@/shared/constants";
import { Input } from "@/components/common";
import { useState } from "react";

const ServicesPage = () => {
  const { searchTerm, setSearchTerm, activeCategory, setActiveCategory } =
    useServiceFilter();
    
  const [searchFocused , setSearchFocused] = useState(false)

  return (

<main className="flex-grow">
  <section className="sticky top-[64px] z-40 bg-tertiary-cream pt-6 pb-4 px-4 md:px-8 space-y-4">
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
      <input 
        className="w-full h-12 pl-12 pr-4 bg-surface-container-lowest border border-muted/30 rounded-lg focus:outline-none focus:border-primary focus:ring-0 transition-all text-body-base" 
        placeholder="Search services..." 
        type="text"
        onFocus={() => setSearchFocused(true)} 
        onBlur={() => setSearchFocused(false)} 
      />

      <div className={`bg-surface-container-lowest absolute w-full h-[40vh] ${searchFocused? "" : "hidden"}`}>

      </div>
    </div>

    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
      <button className="px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all bg-secondary text-primary">All</button>
      <button className="px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:border-secondary">Salons</button>
      <button className="px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:border-secondary">Clinics</button>
      <button className="px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:border-secondary">Wellness</button>
      <button className="px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:border-secondary">Fitness</button>
      <button className="px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:border-secondary">Consulting</button>
      <button className="px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:border-secondary">Automotive</button>
      <button className="px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:border-secondary">Other</button>
    </div>
    
    <div className="flex flex-wrap gap-4 items-center justify-between">
      <div className="flex flex-wrap gap-2">
        <button className="flex items-center gap-1 px-4 py-2 bg-surface-container-lowest border border-outline-variant/20 rounded-lg text-body-small text-on-surface hover:bg-surface-container transition-colors">
          <MapPin size={18} />
          <span>Location</span>
          <ChevronDown size={18} />
        </button>
        <button className="flex items-center gap-1 px-4 py-2 bg-surface-container-lowest border border-outline-variant/20 rounded-lg text-body-small text-on-surface hover:bg-surface-container transition-colors">
          <span>Rating</span>
          <ChevronDown size={18} />
        </button>
        <button className="flex items-center gap-1 px-4 py-2 bg-surface-container-lowest border border-outline-variant/20 rounded-lg text-body-small text-on-surface hover:bg-surface-container transition-colors">
          <span>Trusted</span>
          <ChevronDown size={18} />
        </button>
      </div>
      <div className="flex items-center gap-2 px-4 py-1.5 bg-accent/15 rounded-full border border-accent/20">
        <Navigation size={16} className="text-primary" />
        <span className="font-semibold text-xs text-primary">Near Me: San Francisco, CA</span>
        <button className="hover:bg-accent/20 rounded-full transition-colors p-0.5">
          <X size={16} className="text-primary" />
        </button>
      </div>
    </div>
  </section>

  <section className="px-4 md:px-8 py-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="service-grid">
      {/* Service Card 1 */}
      <div className="group relative bg-surface-container-lowest rounded-xl p-4 border border-transparent transition-all card-hover custom-shadow overflow-hidden flex flex-col h-full">
        <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
          <img 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            alt="A bright, modern interior of a professional hair salon" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0uDUL2dvd4GDOQGxpgGagTnTWh0oEbs8ZnBxOsJ-I6se9jWN7tpD7uxq8JdwzmZ8w8vmMwOJac7gStV0AMJbYsgSr_8Dct7958jiCFaanXt4w3ANJOBUinDKJNS1rncjzJmFZww0eHhR_stZlXJJ_u1QkGsklRm7EXb8uqeqqucJthiqPhWE39v6_v2fUTuoolOzoeylf3qkVOKkTLlntz3oTjEselQSQmSTgnMBCdJTlAC_-mSLL77-TKpCZsG8uNVxGgHVyRKi3" 
          />
          <div className="absolute top-2 left-2 px-3 py-1 bg-secondary/15 backdrop-blur-md rounded-full">
            <span className="font-semibold text-xs text-secondary-dark">Salon</span>
          </div>
        </div>
        <div className="flex-grow space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-xl text-primary">Signature Haircut &amp; Style</h3>
            <div className="flex items-center gap-0.5">
              <Star size={16} className="text-[#F39C12] fill-[#F39C12]" />
              <span className="font-semibold text-xs">4.9</span>
            </div>
          </div>
          <p className="text-sm text-on-surface-variant">Luxe Artistry Studio</p>
          <div className="flex items-center gap-2 pt-1">
            <div className="px-2 py-0.5 bg-accent/15 rounded flex items-center gap-1">
              <Award size={14} className="text-primary fill-primary" />
              <span className="font-semibold text-[10px] text-primary">Most Trusted</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              <span className="text-xs text-on-surface-variant">Available</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-muted/10 flex justify-between items-center">
          <span className="font-bold text-xl text-primary">$85 / session</span>
          <button className="px-4 py-2 bg-secondary text-primary rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity">Book Now</button>
        </div>
      </div>

      {/* Service Card 2 */}
      <div className="group relative bg-surface-container-lowest rounded-xl p-4 border border-transparent transition-all card-hover custom-shadow overflow-hidden flex flex-col h-full">
        <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
          <img 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            alt="Serene spa environment" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCguMQzlIUJqdNySH3iiBR5qw530KVo8evCcaGHLcPN9-p3azyJ4-xcp22djvvp6znSX8XZSkyIHKQvvuoRaS-6XVCNwuP9dzAneqeGIBjfTlMz7SU346UdDRqS1h630ebgHy4RiyeDofpoRAXqUTT5XfWiCgWDieHLBrnvBrxKDsKwD1c_yHI2OY-kgUYmF9kCtlXix3fh6th5Zw9WMl2WoAornUJmRabV77k9PFJvXxAMSawM5kZPlEkV2pRO8RYMW9xfsCASxjne" 
          />
          <div className="absolute top-2 left-2 px-3 py-1 bg-secondary/15 backdrop-blur-md rounded-full">
            <span className="font-semibold text-xs text-secondary-dark">Wellness</span>
          </div>
        </div>
        <div className="flex-grow space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-xl text-primary">Deep Tissue Massage</h3>
            <div className="flex items-center gap-0.5">
              <Star size={16} className="text-[#F39C12] fill-[#F39C12]" />
              <span className="font-semibold text-xs">4.8</span>
            </div>
          </div>
          <p className="text-sm text-on-surface-variant">Serenity Health Spa</p>
          <div className="flex items-center gap-2 pt-1">
            <div className="px-2 py-0.5 bg-accent/15 rounded flex items-center gap-1">
              <Award size={14} className="text-primary fill-primary" />
              <span className="font-semibold text-[10px] text-primary">Most Trusted</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              <span className="text-xs text-on-surface-variant">Available</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-muted/10 flex justify-between items-center">
          <span className="font-bold text-xl text-primary">$120 / session</span>
          <button className="px-4 py-2 bg-secondary text-primary rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity">Book Now</button>
        </div>
      </div>

      {/* Service Card 3 */}
      <div className="group relative bg-surface-container-lowest rounded-xl p-4 border border-transparent transition-all card-hover custom-shadow overflow-hidden flex flex-col h-full">
        <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
          <img 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            alt="High-tech fitness studio" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAPLseKDje6_fqfrVHlpYq7a3vcwkpg8_nvySQEnu9MjxRkvP7t6hpztpZeQJQlGtM4pnic6akVUcgSwWQcnxMcDEZE99lApQ3BYdWt_oxS5r0-CcfOua0olsZDsIckGTcpRf8U59R88vwYXKyGuNTGbVj7KG66EOt6sNmcc2BLalntQkIvmEXTK94RNVF5AgDkunsB3LxSlJQX_GffY_Cv_XISueoMTtnbwcH8LwHGU2inRCIvj8osT2qyUnOPVnLe6h_apiGv-Zt" 
          />
          <div className="absolute top-2 left-2 px-3 py-1 bg-secondary/15 backdrop-blur-md rounded-full">
            <span className="font-semibold text-xs text-secondary-dark">Fitness</span>
          </div>
        </div>
        <div className="flex-grow space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-xl text-primary">Personal Training</h3>
            <div className="flex items-center gap-0.5">
              <Star size={16} className="text-[#F39C12] fill-[#F39C12]" />
              <span className="font-semibold text-xs">5.0</span>
            </div>
          </div>
          <p className="text-sm text-on-surface-variant">Peak Performance Gym</p>
          <div className="flex items-center gap-2 pt-1">
            <div className="px-2 py-0.5 bg-accent/15 rounded flex items-center gap-1">
              <Award size={14} className="text-primary fill-primary" />
              <span className="font-semibold text-[10px] text-primary">Most Trusted</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              <span className="text-xs text-on-surface-variant">Available</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-muted/10 flex justify-between items-center">
          <span className="font-bold text-xl text-primary">$60 / session</span>
          <button className="px-4 py-2 bg-secondary text-primary rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity">Book Now</button>
        </div>
      </div>
    </div>

    <div className="hidden flex-col items-center justify-center py-8 space-y-6 text-center" id="empty-state">
      <div className="w-64 h-64 opacity-80">
        <img alt="No results found" className="w-full h-full object-contain" src="" />
      </div>
      <div className="max-w-md space-y-2">
        <h2 className="font-bold text-3xl text-primary">No services found</h2>
        <p className="text-base text-on-surface-variant">We couldn't find anything matching your current filters. Try adjusting your search or location settings.</p>
      </div>
      <button 
        className="px-6 py-3 bg-primary text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity" 
        // onClick={() => window.resetFilters && window.resetFilters()}
      >
        Clear All Filters
      </button>
    </div>
  </section>
</main>

  );
};

export default ServicesPage;

// <main>
//   <article>
//     <section>
//       <div className="min-h-screen bg-gray-50 font-sans px-4 py-16 sm:px-8 sm:py-20 md:px-12 md:py-26">
//         <div className="max-w-7xl mx-auto py-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             Available Services
//           </h1>
//           <p className="text-sm sm:text-md text-gray-600 mb-8">
//             Browse and book appointments with our top providers.
//           </p>
//           {/* Search Bar */}
//           <div className="relative mb-8">
//             <Input
//               type="text"
//               placeholder="Search for services or providers..."
//               className="placeholder:text-sm w-full md:w-[60vw] w-[80vw] border-none pl-12 pr-4 py-3 transition-all duration-300 shadow-sm text-gray-700 bg-gray-300"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
//           </div>
//           {/* Categories Scrollbar */}
//           <div className="flex overflow-x-auto no-scrollbar pb-4 mb-8 space-x-3">
//             {serviceCategories.map((category) => (
//               <button
//                 type="button"
//                 key={category}
//                 onClick={() => setActiveCategory(category)}
//                 className={`px-5 py-2 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap transition-colors duration-300 ${
//                   activeCategory === category
//                     ? "bg-pink text-white shadow-lg"
//                     : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                 }`}
//               >
//                 {category.charAt(0).toUpperCase() + category.slice(1)}
//               </button>
//             ))}
//           </div>
//           {/* Services Grid */}
//           <Catalog />
//         </div>
//       </div>
//     </section>
//   </article>
// </main>