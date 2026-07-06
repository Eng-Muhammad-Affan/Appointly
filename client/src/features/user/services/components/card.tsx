import { Award, Star } from "lucide-react";
import type { ClientService } from "../types";
import Image from "next/image";
import Link from "next/link";

export const Card = ({
  service
}: {
  service: ClientService}) => {
  return (
    <div className="group relative bg-surface-container-lowest rounded-xl p-4 border border-transparent transition-all card-hover custom-shadow overflow-hidden flex flex-col h-full">
      <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
        <Image
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          alt={service.name}
          src={service.image}
          width={300}
          height={300}
        />
        <div className="absolute top-2 left-2 px-3 py-1 bg-secondary/15 backdrop-blur-md rounded-full">
          <span className="font-semibold text-xs text-secondary-dark">
            Salon
          </span>
        </div>
      </div>
      <div className="flex-grow space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-xl text-primary">{service.name}</h3>
          <div className="flex items-center gap-0.5">
            <Star size={16} className="text-[#F39C12] fill-[#F39C12]" />
            <span className="font-semibold text-xs">4.9</span>
          </div>
        </div>
        <p className="text-sm text-on-surface-variant">{service.description}</p>
        <div className="flex items-center gap-2 pt-1">
          <div className="px-2 py-0.5 bg-accent/15 rounded flex items-center gap-1">
            <Award size={14} className="text-primary fill-primary" />
            <span className="font-semibold text-[10px] text-primary">
              Most Trusted
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-accent"></span>
            <span className="text-xs text-on-surface-variant">Available</span>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-muted/10 flex justify-between items-center">
        <span className="font-bold text-xl text-primary">
          {service.currency.toUpperCase()}
          {service.price} / session
        </span>
        <Link href={`/services/${service.id}`}>
          <button
            type="button"
            className="px-4 py-2 bg-secondary text-primary rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
};
