"use client";

import React from "react";
import { MaterialSymbol } from "./MaterialSymbol";
import { useBrowseStore } from "./browse-store";

export const SearchBar: React.FC = () => {
  const { filters, setSearch } = useBrowseStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="relative w-full">
      <span className="absolute left-4 top-1/2 -translate-y-1/2">
        <MaterialSymbol icon="search" className="text-muted" />
      </span>
      <input
        className="w-full h-[48px] pl-12 pr-4 bg-surface-container-lowest border border-muted/30 rounded-lg focus:outline-none focus:border-primary focus:ring-0 transition-all font-body-base"
        placeholder="Search services..."
        type="text"
        value={filters.search}
        onChange={handleChange}
        aria-label="Search services"
      />
    </div>
  );
};