"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Award, Calendar, CheckCircle2, FileText, Camera, Search, Filter, Download, ArrowLeft } from "lucide-react";

interface Appointment {
  service: string;
  date: string;
  provider: string;
  providerInitials: string;
  price: number;
  duration: string;
  status: "Completed" | "Upcoming" | "Pending";
}

interface CustomerProfileProps {
  bookings: Appointment[];
  onAddBookingClick?: () => void;
}

export default function CustomerProfile({ bookings, onAddBookingClick }: CustomerProfileProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Completed" | "Upcoming">("All");

  // Calculate dynamic stats
  const totalBookings = bookings.length;
  const lifetimeValue = bookings.reduce((sum, b) => sum + b.price, 0);

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = b.service.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === "All" || b.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-surface min-h-screen text-on-surface font-sans flex hover-card-transition-duration-300">
      
      {/* Sidebar Navigation - Shared JSON Style Layout */}
      <aside className="hidden lg:flex flex-col h-screen w-64 bg-surface-container-low border-r border-outline-variant/20 sticky top-0 py-8 px-4 gap-6">
        <div className="flex items-center gap-2 mb-6 px-2">
          <span className="text-h2 font-bold text-primary font-h2">Appointly</span>
        </div>
        <nav className="flex flex-col gap-1 flex-grow">
          <a className="flex items-center gap-3 p-3 rounded-lg text-on-surface-variant hover:bg-secondary-container/10 hover:text-secondary transition-all" href="#dashboard">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-label-bold text-label-bold">Dashboard</span>
          </a>
          <a className="flex items-center gap-3 p-3 rounded-lg text-on-surface-variant hover:bg-secondary-container/10 hover:text-secondary transition-all" href="#calendar">
            <span className="material-symbols-outlined">calendar_today</span>
            <span className="font-label-bold text-label-bold">Calendar</span>
          </a>
          <a className="flex items-center gap-3 p-3 rounded-lg text-primary font-bold bg-secondary-container/20 transition-all border-l-4 border-primary" href="#customers">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
            <span className="font-label-bold text-label-bold">Customers</span>
          </a>
          <a className="flex items-center gap-3 p-3 rounded-lg text-on-surface-variant hover:bg-secondary-container/10 hover:text-secondary transition-all" href="#services">
            <span className="material-symbols-outlined">list_alt</span>
            <span className="font-label-bold text-label-bold">Services</span>
          </a>
        </nav>
        <div className="mt-auto pt-6 border-t border-outline-variant/10">
          <button className="w-full py-3 bg-primary text-on-primary font-label-bold text-label-bold rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all">
            Upgrade Studio
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-grow flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="flex justify-between items-center w-full px-6 md:px-8 h-16 bg-surface shadow-sm border-b border-outline-variant/20 sticky top-[45px] lg:top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-surface-container-low border-none rounded-full pl-10 pr-4 py-1.5 w-64 text-body-small focus:ring-1 focus:ring-primary focus:outline-none font-medium"
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onAddBookingClick}
              className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-bold text-label-bold hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer"
            >
              Add Appointment
            </button>
          </div>
        </header>

        {/* Core Canvas */}
        <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
          
          {/* Breadcrumbs & Header Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <nav className="flex items-center gap-1.5 text-caption font-caption text-on-surface-variant">
                <span>Customers</span>
                <span className="text-outline">/</span>
                <span className="text-primary font-bold">Jane Cooper</span>
              </nav>
              <div className="flex items-center gap-3">
                <h1 className="font-h1 text-h1 text-primary">Jane Cooper</h1>
                <span className="px-3 py-0.5 bg-accent/20 text-[#1B4316] font-label-bold text-label-bold rounded-full border border-accent/30 text-caption">
                  Regular member
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 border border-outline rounded-lg font-label-bold text-label-bold hover:bg-surface-container-low transition-colors">
                <span>Message</span>
              </button>
              <button
                onClick={onAddBookingClick}
                className="flex items-center gap-2 px-4 py-2.5 bg-secondary-container text-primary border border-secondary/35 rounded-lg font-label-bold text-label-bold hover:shadow-md transition-all active:scale-95"
              >
                <span>Book Appointment</span>
              </button>
            </div>
          </div>

          {/* Profile Overview Bento Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Profile details card */}
            <div className="lg:col-span-4 bg-surface-container-lowest p-6 rounded-card shadow-sm border border-outline-variant/15 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img
                  alt="Jane Cooper Profile Headshot"
                  className="w-24 h-24 rounded-full ring-4 ring-secondary/20 object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcdIQb0MwqXqdxKrhmhx79OMoOgP9sbF2SURfinwf58bllkxqFvH5LRga3ofuaQS1j0nFQyID-DeDqz4aJORRbC4WsGoGSMdz025QKXefM_kHU79V9fVMobrk8LW9gmJKbcJ1PQL5vQBIL9PDzYe2vnlaNps-dshsv9odKCQIIrpXdpAQYBd7614F7x5TqcLQM6wDy4vHMltbifyGzcnvUuaqD4-l52WrW6tBynDTSKkLqT-lpKcJeUNWsxY4PX4GoBDL9teIUR6Oy"
                />
                <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white border-2 border-white shadow">
                  <Award size={12} strokeWidth={2.5} />
                </div>
              </div>
              <h3 className="font-h3 text-h3 text-primary mb-1">Jane Cooper</h3>
              <p className="font-body-small text-body-small text-on-surface-variant mb-6">
                Platinum Client since 2023
              </p>

              {/* Contact info deck */}
              <div className="w-full space-y-3 text-left">
                <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg border border-outline-variant/10">
                  <Mail size={16} className="text-secondary-dark" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">Email</p>
                    <p className="font-body-small text-body-small text-primary font-medium">jane.cooper@example.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg border border-outline-variant/10">
                  <Phone size={16} className="text-secondary-dark" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">Phone</p>
                    <p className="font-body-small text-body-small text-primary font-medium">+1 (555) 234-5678</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg border border-outline-variant/10">
                  <MapPin size={16} className="text-secondary-dark" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">Location</p>
                    <p className="font-body-small text-body-small text-primary font-medium">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Quick Stats & Highlight Card */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              {/* Stats bento units */}
              <div className="bg-surface-container-lowest p-4 rounded-card border border-outline-variant/15 shadow-sm flex flex-col justify-center items-center text-center hover-card-transition group hover:border-secondary">
                <Calendar size={20} className="text-secondary mb-1 group-hover:scale-110 transition-transform" />
                <p className="font-body-small text-caption text-on-surface-variant uppercase tracking-wider">Total Bookings</p>
                <p className="font-h2 text-h2 text-primary mt-1">{totalBookings}</p>
              </div>

              <div className="bg-surface-container-lowest p-4 rounded-card border border-outline-variant/15 shadow-sm flex flex-col justify-center items-center text-center hover-card-transition group hover:border-secondary">
                <CheckCircle2 size={20} className="text-secondary mb-1 group-hover:scale-110 transition-transform" />
                <p className="font-body-small text-caption text-on-surface-variant uppercase tracking-wider">Lifetime Value</p>
                <p className="font-h2 text-h2 text-primary mt-1">${lifetimeValue}</p>
              </div>

              <div className="bg-surface-container-lowest p-4 rounded-card border border-outline-variant/15 shadow-sm flex flex-col justify-center items-center text-center hover-card-transition group hover:border-secondary">
                <span className="material-symbols-outlined text-secondary mb-1 group-hover:scale-110 transition-transform text-[20px]">history</span>
                <p className="font-body-small text-caption text-on-surface-variant uppercase tracking-wider">Last Visit</p>
                <p className="font-label-bold text-label-bold text-primary mt-2">Oct 12, 2026</p>
              </div>

              <div className="bg-surface-container-lowest p-4 rounded-card border border-outline-variant/15 shadow-sm flex flex-col justify-center items-center text-center hover-card-transition group hover:border-secondary">
                <span className="material-symbols-outlined text-secondary mb-1 group-hover:scale-110 transition-transform text-[20px]">verified_user</span>
                <p className="font-body-small text-caption text-on-surface-variant uppercase tracking-wider">Member Since</p>
                <p className="font-label-bold text-label-bold text-primary mt-2">Jan 2023</p>
              </div>

              {/* Upcoming Appointment Highlight Block */}
              <div className="col-span-full bg-primary text-on-primary p-6 rounded-card shadow-lg relative overflow-hidden">
                <div className="relative z-10 space-y-4">
                  <p className="font-label-bold text-label-bold text-outline-variant uppercase tracking-widest text-[11px] opacity-80">
                    Next Session Highlight
                  </p>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-secondary text-primary p-3 rounded-lg flex flex-col items-center justify-center min-w-[70px] border border-secondary-container">
                        <span className="text-[10px] font-bold tracking-wider">OCT</span>
                        <span className="text-h2 font-black">30</span>
                      </div>
                      <div>
                        <h2 className="font-h2 text-h2 text-white">Aromatherapy Ritual</h2>
                        <p className="font-body-base text-body-base text-zinc-300 mt-0.5">
                          Wednesday at 10:00 AM • 90 Minutes Treatment
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="px-4 py-2 border border-white/20 hover:bg-white/10 rounded-lg text-body-small font-label-bold text-white transition-all">
                        Reschedule
                      </button>
                      <button className="px-4 py-2 bg-white text-black hover:bg-zinc-100 rounded-lg text-body-small font-label-bold transition-all">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
                {/* Visual glass aura */}
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-secondary/15 rounded-full blur-3xl" />
              </div>

            </div>
          </section>

          {/* Bottom Sections: Notes & Appointment History List */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Private Notes & Session Photos */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Private Notes Card */}
              <section className="bg-surface-container-lowest p-6 rounded-card border border-outline-variant/15 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-h4 text-h4 text-primary flex items-center gap-1.5">
                    <FileText size={16} className="text-secondary-dark" />
                    <span>Private Notes</span>
                  </h3>
                  <button className="text-secondary font-label-bold hover:underline text-body-small">Edit</button>
                </div>
                <div className="bg-tertiary p-3 rounded-lg border-l-4 border-secondary">
                  <p className="font-body-small text-body-small italic text-on-surface-variant leading-relaxed">
                    "Prefers lavender oil for all rituals. Sensitive skin on hands; avoid citrus-based scrubs. Usually books early morning sessions."
                  </p>
                </div>
              </section>

              {/* Photos Gallery */}
              <section className="bg-surface-container-lowest p-6 rounded-card border border-outline-variant/15 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-h4 text-h4 text-primary flex items-center gap-1.5">
                    <Camera size={16} className="text-secondary-dark" />
                    <span>Session Photos</span>
                  </h3>
                  <button className="text-secondary font-label-bold hover:underline text-body-small">Upload</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="aspect-square rounded-lg bg-surface-container-high overflow-hidden group cursor-pointer relative border border-outline-variant/10">
                    <img
                      alt="Aromatherapy flower massage oils"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPUGtFLgzh9R-meyx8DxeP7FQR8SKJsMT-Wz7StL6nm5E9AQUiYXsLv0Kxp5-p3_5JcbPnnsU4smCIbsXv6hVQNx29hedZEDDwotvEPGzYZrcQQAQjFanHb71Dyn1awRzcXQKYA8aVqMOjeMCcBb5Txh3lnNshFPIuhQw7XzIA56uMSugxToJNw1tiCOpHTnhE5fa7bS9DMP9HmT7XsKnP6dmiH0avFPO-_Tc7aUG1aWrs4seSpYTKUhJ53Q_iSnfv3YUWQc3g1ymg"
                    />
                  </div>
                  <div className="aspect-square rounded-lg bg-surface-container-high overflow-hidden group cursor-pointer relative border border-outline-variant/10">
                    <img
                      alt="Swedish Massage treatment sessions"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoEt_KVckCR8Lm5Z0eovyIAqJZ6zOMUuGpRFkRwwyzBEtD3sBijEpu9Cp0pIaKq1_59L96UGh-PeLO5lcBSiHaT5zl8VkqFqz_JU8pLW1Iy7S8lQ7sNEd6yzK9QPe7DeaXgNVBRPMYVgX9bNmf1XsdGZsA33nxLMXdfe7tnNaR-nHYGP7JO9wITjmLWiA7xus6S2zb-7bG4mDkJjlzMrnD_B2cLft0C_QHNNlC7xunkzeZ-L6sEYtNV8JAU7RO3nFmsKjkgAY9yNMa"
                    />
                  </div>
                </div>
              </section>

            </div>

            {/* Right Column: Appointment History Table */}
            <div className="lg:col-span-2">
              <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 shadow-sm overflow-hidden flex flex-col h-full">
                
                {/* Header Actions */}
                <div className="p-5 border-b border-outline-variant/10 flex justify-between items-center">
                  <h3 className="font-h4 text-h4 text-primary">Appointment History</h3>
                  
                  {/* Table Toolbar controls */}
                  <div className="flex items-center gap-4">
                    <div className="flex bg-surface-container rounded-lg p-0.5 border border-outline-variant/10 text-body-small">
                      <button
                        onClick={() => setStatusFilter("All")}
                        className={`px-2.5 py-1 rounded-md transition-all ${
                          statusFilter === "All" ? "bg-white text-primary font-bold shadow-sm" : "text-on-surface-variant"
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setStatusFilter("Completed")}
                        className={`px-2.5 py-1 rounded-md transition-all ${
                          statusFilter === "Completed" ? "bg-white text-primary font-bold shadow-sm" : "text-on-surface-variant"
                        }`}
                      >
                        Completed
                      </button>
                    </div>

                    <div className="flex gap-1.5">
                      <button className="p-1.5 hover:bg-surface-container-high rounded text-on-surface-variant transition-colors">
                        <Filter size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-surface-container-high rounded text-on-surface-variant transition-colors">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Ledger Listing Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-surface-container-low text-on-surface-variant font-label-bold text-[11px] uppercase tracking-wider border-b border-outline-variant/15">
                      <tr>
                        <th className="px-5 py-3">Treatment / Duration</th>
                        <th className="px-5 py-3">Scheduled Date</th>
                        <th className="px-5 py-3">Practitioner</th>
                        <th className="px-5 py-3 text-right">Fee Paid</th>
                        <th className="px-5 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10">
                      {filteredBookings.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-5 py-8 text-center text-on-surface-variant text-body-small">
                            No appointments found matching filters.
                          </td>
                        </tr>
                      ) : (
                        filteredBookings.map((item, idx) => (
                          <tr key={idx} className="hover:bg-surface-container-low/40 transition-colors">
                            <td className="px-5 py-4">
                              <div className="font-label-bold text-body-small text-primary">{item.service}</div>
                              <div className="text-caption text-on-surface-variant mt-0.5">{item.duration}</div>
                            </td>
                            <td className="px-5 py-4 text-body-small text-on-surface font-medium">{item.date}</td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2 text-body-small text-primary font-medium">
                                <div className="w-6 h-6 rounded-full bg-secondary-container flex items-center justify-center text-[10px] font-bold text-primary">
                                  {item.providerInitials}
                                </div>
                                <span>{item.provider}</span>
                              </div>
                            </td>
                            <td className="px-5 py-4 text-right font-label-bold text-primary">${item.price.toFixed(2)}</td>
                            <td className="px-5 py-4">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                  item.status === "Completed"
                                    ? "bg-accent/15 text-[#1B4316]"
                                    : item.status === "Upcoming"
                                    ? "bg-secondary/20 text-secondary-dark"
                                    : "bg-surface-container-highest text-on-surface-variant"
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="p-5 border-t border-outline-variant/10 mt-auto flex items-center justify-center">
                  <span className="text-caption text-outline font-medium">
                    Displaying {filteredBookings.length} of {totalBookings} records
                  </span>
                </div>
              </section>
            </div>

          </div>

        </main>
      </div>

    </div>
  );
}
