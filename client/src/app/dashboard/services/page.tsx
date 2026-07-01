"use client";

import type React from "react";
import { useState } from "react";
import {
  Plus,
  Sparkles,
  Clock,
  DollarSign,
  Timer,
  Tag,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  PackageOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useDashboard } from "@/features/provider/dashboard";

const ServicesPage: React.FC = () => {
  const { services } = useDashboard();

  const [currentPage, setCurrentPage] = useState(1);
  const totalServices = 12;
  const servicesPerPage = 3;

  const toggleServiceActive = (_id: string) => {
    // setServices(prev =>
    //   prev.map(service =>
    //     service.id === id ? { ...service, active: !serviceis_active } : service
    //   )
    // );
  };

  const deleteService = (_id: string) => {
    // setServices(prev => prev.filter(service => service.id !== id));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <main className="flex-grow flex flex-col min-w-0">
      <div className="p-margin-mobile md:p-margin-desktop max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-xl">
          <div>
            <h1 className="font-h1 text-h1 text-primary">Studio Services</h1>
            <p className="text-body-base text-on-surface-variant">
              Update your offerings, pricing, and availability for Aura Wellness
              Studio.
            </p>
          </div>
          <Link href={"/dashboard/services/create"}>
            <button className="bg-secondary-container text-on-secondary-container px-lg py-md rounded-lg font-label-bold text-label-bold flex items-center gap-sm shadow-sm hover:brightness-95 active:scale-95 transition-all">
              <Plus size={20} />
              Add New Service
            </button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md mb-xl">
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/10 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center gap-md">
            <div className="bg-secondary-container/20 p-sm rounded-lg text-on-secondary-container">
              <Sparkles size={24} />
            </div>
            <div>
              <p className="text-caption text-on-surface-variant">
                Total Active
              </p>
              <p className="font-h4 text-h4">
                {services.filter((s) => s.is_active).length} Services
              </p>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/10 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center gap-md">
            <div className="bg-primary-container/10 p-sm rounded-lg text-primary">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-caption text-on-surface-variant">
                Avg. Duration
              </p>
              <p className="font-h4 text-h4">
                {Math.round(
                  services.reduce((acc, s) => acc + s.duration, 0) /
                    services.length,
                )}{" "}
                Minutes
              </p>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/10 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center gap-md">
            <div className="bg-on-tertiary-container/10 p-sm rounded-lg text-on-tertiary-container">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-caption text-on-surface-variant">
                Revenue Target
              </p>
              <p className="font-h4 text-h4">$4,200 /mo</p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        {services.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
            {services.map((service) => (
              <div
                key={service.id}
                className="group bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/20 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)] hover:border-secondary transition-all flex gap-lg relative"
              >
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
                  <img
                    className="w-full h-full object-cover"
                    alt={service.name}
                    src={service.image}
                  />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-h4 text-h4 text-primary">
                        {service.name}
                      </h3>
                      <div className="flex items-center gap-md mt-xs text-on-surface-variant">
                        <div className="flex items-center gap-xs">
                          <Timer size={16} />
                          <span className="text-caption">
                            {service.duration} min
                          </span>
                        </div>
                        <div className="flex items-center gap-xs">
                          <Tag size={16} />
                          <span className="text-caption font-label-bold">
                            {formatPrice(service.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-xs">
                      <button className="p-xs text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors rounded">
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => deleteService(service.id)}
                        className="p-xs text-on-surface-variant hover:text-error hover:bg-error-container/20 transition-colors rounded"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-md pt-md border-t border-outline-variant/10">
                    <span className="text-caption font-label-bold text-on-surface-variant">
                      Service Status
                    </span>
                    <div className="flex items-center gap-sm">
                      <span className="text-caption text-on-surface-variant">
                        {service.is_active ? "Active" : "Inactive"}
                      </span>
                      <button
                        onClick={() => toggleServiceActive(service.id)}
                        className={cn(
                          "w-10 h-5 rounded-full p-0.5 transition-all focus:outline-none",
                          service.is_active
                            ? "bg-primary"
                            : "bg-surface-container",
                        )}
                      >
                        <div
                          className={cn(
                            "w-4 h-4 rounded-full transition-all",
                            service.is_active
                              ? "bg-white translate-x-5"
                              : "bg-outline translate-x-0",
                          )}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="col-span-full py-xl flex flex-col items-center justify-center bg-surface-container-low rounded-xl border-2 border-dashed border-outline-variant/30 text-center">
            <PackageOpen size={48} className="text-on-surface-variant mb-md" />
            <h3 className="font-h4 text-h4 text-primary">No services found</h3>
            <p className="text-body-base text-on-surface-variant mt-xs mb-lg">
              Start building your menu by adding your first service.
            </p>
            <button className="bg-secondary-container text-on-secondary-container px-lg py-md rounded-lg font-label-bold text-label-bold flex items-center gap-sm">
              <Plus size={20} />
              Create First Service
            </button>
          </div>
        )}

        {/* Pagination */}
        {services.length > 0 && (
          <div className="mt-xl flex items-center justify-between border-t border-outline-variant/20 pt-lg">
            <p className="text-caption text-on-surface-variant">
              Showing {services.length} of {totalServices} services
            </p>
            <div className="flex items-center gap-sm">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-sm text-on-surface-variant hover:bg-surface-container transition-colors rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-label-bold font-label-bold px-md">
                {currentPage}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage * servicesPerPage >= totalServices}
                className="p-sm text-on-surface-variant hover:bg-surface-container transition-colors rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ServicesPage;
