"use client";

import React from "react";
import { useBrowseStore } from "./browse-store";
import type { ServiceCategory } from "./types";

const categories: { value: ServiceCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "salons", label: "Salons" },
  { value: "clinics", label: "Clinics" },
  { value: "wellness", label: "Wellness" },
  { value: "fitness", label: "Fitness" },
  { value: "consulting", label: "Consulting" },
  { value: "automotive", label: "Automotive" },
  { value: "other", label: "Other" },
];

export const CategoryPills: React.FC = () => {
  const { filters, setCategory } = useBrowseStore();
  const activeCategory = filters.category;

  return (
    <div className="flex gap-sm overflow-x-auto no-scrollbar pb-2" role="tablist">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.value;
        return (
          <button
            key={cat.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => setCategory(cat.value)}
            className={`px-6 py-2 rounded-full font-label-bold text-label-bold whitespace-nowrap transition-all ${
              isActive
                ? "bg-brand-pink text-primary"
                : "bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:border-brand-pink"
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};