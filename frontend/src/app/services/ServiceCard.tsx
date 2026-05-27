"use client";

import React from "react";
import type { Service } from "./types";
import { MaterialSymbol } from "./MaterialSymbol";

interface ServiceCardProps {
  service: Service;
  onBookNow: (serviceId: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBookNow }) => {
  const {
    id,
    title,
    providerName,
    category,
    rating,
    price,
    priceUnit,
    imageUrl,
    imageAlt,
    isTrusted,
    isAvailable,
  } = service;

  return (
    <div className="group relative bg-surface-container-lowest rounded-xl p-md border border-transparent transition-all card-hover custom-shadow overflow-hidden flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-48 mb-md overflow-hidden rounded-lg">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          alt={imageAlt}
          src={imageUrl}
          loading="lazy"
        />
        <div className="absolute top-sm left-sm px-3 py-1 bg-brand-pink/15 backdrop-blur-md rounded-full">
          <span className="font-label-bold text-caption text-secondary capitalize">
            {category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-grow space-y-xs">
        <div className="flex justify-between items-start">
          <h3 className="font-h3 text-h3 text-primary line-clamp-2">{title}</h3>
          <div className="flex items-center gap-[2px] flex-shrink-0 ml-2">
            <MaterialSymbol
              icon="star"
              filled
              size={16}
              className="text-[#F39C12]"
            />
            <span className="font-label-bold text-caption">{rating.toFixed(1)}</span>
          </div>
        </div>

        <p className="font-body-small text-body-small text-on-surface-variant">
          {providerName}
        </p>

        {/* Badges */}
        <div className="flex items-center gap-sm pt-xs flex-wrap">
          {isTrusted && (
            <div className="px-2 py-0.5 bg-accent/15 rounded flex items-center gap-1">
              <MaterialSymbol
                icon="workspace_premium"
                filled
                size={14}
                className="text-primary"
              />
              <span className="font-label-bold text-[10px] text-primary">
                Most Trusted
              </span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <span
              className={`w-2 h-2 rounded-full ${
                isAvailable ? "bg-accent" : "bg-error"
              }`}
            />
            <span className="font-body-small text-[12px] text-on-surface-variant">
              {isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-md pt-md border-t border-muted/10 flex justify-between items-center">
        <span className="font-h3 text-h3 text-primary">
          ${price} / {priceUnit}
        </span>
        <button
          onClick={() => onBookNow(id)}
          disabled={!isAvailable}
          className={`px-md py-2 bg-brand-pink text-primary rounded-lg font-label-bold text-label-bold transition-opacity ${
            isAvailable
              ? "hover:opacity-90"
              : "opacity-50 cursor-not-allowed"
          }`}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};