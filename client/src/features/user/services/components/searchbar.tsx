"use client";
import { Search } from "lucide-react";
import { useState } from "react";

export const SearchBar = () => {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="relative w-full">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        size={20}
      />
      <input
        className="w-full h-12 pl-12 pr-4 bg-surface-container-lowest border border-muted/30 rounded-lg focus:outline-none focus:border-primary focus:ring-0 transition-all text-body-base"
        placeholder="Search services..."
        type="text"
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
      />
      <div
        className={`bg-surface-container-lowest absolute w-full h-[40vh] ${searchFocused ? "" : "hidden"}`}
      ></div>
    </div>
  );
};
