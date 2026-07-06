"use client";
// pages/appointments.tsx (or app/appointments/page.tsx for App Router)
import type React from "react";
import { useState } from "react";
import { AppointmentFilters, AppointmentTable, InsightCards, Pagination } from "@/features/provider/appointments";

const AppointmentsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      {/* Page Header */}
      {/* Insight Cards */}
      <InsightCards />

      {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-lg mb-xl">
            <div className="md:hidden">
              <h1 className="font-h1 text-h1 text-on-background">Appointments</h1>
            </div>
            <button className="bg-brand-secondary text-primary font-label-bold text-label-bold px-lg py-md rounded-lg shadow-sm hover:brightness-95 transition-all flex items-center gap-sm">
              <CalendarPlus size={20}/>
              Manual Booking
            </button>
          </div> */}

      {/* Filters */}
      <AppointmentFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Content */}
      <div className="bg-surface-container-lowest rounded-xl shadow-[0px_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
        <AppointmentTable />
        <Pagination
          currentPage={currentPage}
          totalPages={5}
          totalItems={42}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default AppointmentsPage;
