"use client";

import React from "react";
import { MaterialSymbol } from "./MaterialSymbol";
import { useBrowseStore } from "./browse-store";

export const FilterBar: React.FC = () => {
  const {
    filters,
    setMinRating,
    setTrustedOnly,
    clearLocation,
  } = useBrowseStore();

  const { location, trustedOnly } = filters;

  const handleRatingFilter = () => {
    // Cycle through rating filters: null -> 4 -> 3 -> 2 -> null
    const ratingCycle = [null, 4, 3, 2];
    const currentIndex = ratingCycle.indexOf(filters.minRating);
    const nextIndex = (currentIndex + 1) % ratingCycle.length;
    setMinRating(ratingCycle[nextIndex]);
  };

  const handleTrustedToggle = () => {
    setTrustedOnly(!trustedOnly);
  };

  return (
    <div className="flex flex-wrap gap-md items-center justify-between">
      <div className="flex flex-wrap gap-sm">
        {/* Location Filter */}
        <button
          className="flex items-center gap-xs px-md py-2 bg-surface-container-lowest border border-outline-variant/20 rounded-lg font-body-small text-on-surface hover:bg-surface-container transition-colors"
          aria-label="Filter by location"
        >
          <MaterialSymbol icon="location_on" size={18} />
          <span>Location</span>
          <MaterialSymbol icon="expand_more" size={18} />
        </button>

        {/* Rating Filter */}
        <button
          onClick={handleRatingFilter}
          className={`flex items-center gap-xs px-md py-2 rounded-lg font-body-small transition-colors ${
            filters.minRating !== null
              ? "bg-brand-pink/15 border border-brand-pink text-primary"
              : "bg-surface-container-lowest border border-outline-variant/20 text-on-surface hover:bg-surface-container"
          }`}
          aria-label="Filter by rating"
        >
          <span>Rating{filters.minRating ? `: ${filters.minRating}+` : ""}</span>
          <MaterialSymbol icon="expand_more" size={18} />
        </button>

        {/* Trusted Filter */}
        <button
          onClick={handleTrustedToggle}
          className={`flex items-center gap-xs px-md py-2 rounded-lg font-body-small transition-colors ${
            trustedOnly
              ? "bg-brand-pink/15 border border-brand-pink text-primary"
              : "bg-surface-container-lowest border border-outline-variant/20 text-on-surface hover:bg-surface-container"
          }`}
          aria-label="Filter by trusted providers"
        >
          <span>Trusted</span>
          <MaterialSymbol icon="expand_more" size={18} />
        </button>
      </div>

      {/* Location Badge */}
      {location && (
        <div className="flex items-center gap-sm px-md py-1.5 bg-accent/15 rounded-full border border-accent/20">
          <MaterialSymbol icon="location_on" filled size={16} className="text-primary" />
          <span className="font-label-bold text-caption text-primary">
            Near Me: {location}
          </span>
          <button
            onClick={clearLocation}
            className="text-primary hover:bg-accent/20 rounded-full transition-colors p-0.5"
            aria-label="Clear location filter"
          >
            <MaterialSymbol icon="close" size={16} />
          </button>
        </div>
      )}
    </div>
  );
};