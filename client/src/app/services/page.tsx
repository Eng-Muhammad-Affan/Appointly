"use client";
// ____ Hooks ...
import { MapPin, ChevronDown, X, Navigation } from "lucide-react";
import {
  Card,
  NotFound,
  SearchBar,
  useServiceFilter,
} from "@/features/user/services";

const ServicesPage = () => {
  const {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    filteredServices,
  } = useServiceFilter();

  return (
    <main className="flex-grow">
      <section className="sticky top-[64px] z-40 bg-tertiary-cream pt-6 pb-4 px-4 md:px-8 space-y-4">
        <SearchBar />

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          <button className="px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all bg-secondary text-primary">
            All
          </button>
          <button className="px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:border-secondary">
            Salons
          </button>
          <button className="px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:border-secondary">
            Clinics
          </button>
          <button className="px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:border-secondary">
            Wellness
          </button>
          <button className="px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:border-secondary">
            Fitness
          </button>
          <button className="px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:border-secondary">
            Consulting
          </button>
          <button className="px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:border-secondary">
            Automotive
          </button>
          <button className="px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:border-secondary">
            Other
          </button>
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
            <span className="font-semibold text-xs text-primary">
              Near Me: San Francisco, CA
            </span>
            <button className="hover:bg-accent/20 rounded-full transition-colors p-0.5">
              <X size={16} className="text-primary" />
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 py-6">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          id="service-grid"
        >
          {filteredServices.map((service, idx) => (
            <Card key={idx} index={idx} service={service} />
          ))}
        </div>

        <NotFound />
      </section>
    </main>
  );
};

export default ServicesPage;
