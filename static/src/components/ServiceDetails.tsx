"use client";

import React, { useState } from "react";
import { Star, ShieldCheck, Clock, Calendar, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

interface ServiceDetailsProps {
  onInitiateBooking: (slot: {
    day: number;
    time: string;
    price: number;
    discount?: boolean;
  }) => void;
}

export default function ServiceDetails({ onInitiateBooking }: ServiceDetailsProps) {
  // Calendar States
  const [selectedDay, setSelectedDay] = useState<number>(9);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number>(0);

  const daysInOctober = [
    { day: 27, currentMonth: false, activeDot: false },
    { day: 28, currentMonth: false, activeDot: false },
    { day: 29, currentMonth: false, activeDot: false },
    { day: 30, currentMonth: false, activeDot: false },
    { day: 1, currentMonth: true, activeDot: false },
    { day: 2, currentMonth: true, activeDot: true }, // has active appointments
    { day: 3, currentMonth: true, activeDot: false },
    { day: 4, currentMonth: true, activeDot: false },
    { day: 5, currentMonth: true, activeDot: false },
    { day: 6, currentMonth: true, activeDot: false }, // highlighted active selection
    { day: 7, currentMonth: true, activeDot: false },
    { day: 8, currentMonth: true, activeDot: true },
    { day: 9, currentMonth: true, activeDot: false }, // selected day
    { day: 10, currentMonth: true, activeDot: false },
    { day: 11, currentMonth: true, activeDot: false },
    { day: 12, currentMonth: true, activeDot: false },
    { day: 13, currentMonth: true, activeDot: false },
    { day: 14, currentMonth: true, activeDot: false },
    { day: 15, currentMonth: true, activeDot: false },
  ];

  const slots = [
    { time: "09:00 AM - 10:00 AM", price: 68, discount: true, label: "📉 20% Happy Hour Off" },
    { time: "11:30 AM - 12:30 PM", price: 85, discount: false },
    { time: "02:00 PM - 03:00 PM", price: 85, discount: false },
  ];

  const handleBookClick = () => {
    const activeSlot = slots[selectedSlotIndex];
    onInitiateBooking({
      day: selectedDay,
      time: activeSlot.time,
      price: activeSlot.price,
      discount: activeSlot.discount,
    });
  };

  return (
    <div className="bg-tertiary min-h-screen text-on-surface font-sans flex flex-col hover-card-transition-duration-300">
      {/* Top Header Navbar */}
      <nav className="sticky top-0 w-full z-40 flex justify-between items-center px-4 md:px-12 bg-surface-container-lowest h-[64px] border-b border-outline-variant/10 shadow-sm">
        <div className="flex items-center gap-8">
          <span className="text-h2 font-bold text-primary font-h2">Appointly</span>
          <div className="hidden md:flex items-center gap-6">
            <a className="font-label-bold text-label-bold text-primary border-b-2 border-primary pb-1" href="#browse">
              Browse Services
            </a>
            <a className="font-label-bold text-label-bold text-on-surface-variant hover:text-secondary transition-colors" href="#account">
              My Account
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-outline-variant/20">
            <img
              alt="User Jane Cooper Profile Avatar"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPLZae6ZPc3ti0QDLx0dbOYRCXiHRLT2ydTSROU36hn91ck_jnbpvKEy5wImp9aXJT1hwaYABy3XrrnGQeh3dKyGtJ7zH7_FYAjJ13HJpkVHllETNyu5b4JgUIcj8jMErIOLwnuaPzFmI_xi5ajUB471E20SupoxCjzFUOm7k2ia5PJEAraQga0nyliYtu3l-S4dCRld01DhURf3Ul77AEPisjMWxoLxqqtFhenmS1RNoVw5Nq-KpsnV4MSBew1CtjtzfjwVZwdzkj"
            />
          </div>
          <span className="hidden sm:inline font-label-bold text-label-bold text-primary">Jane Cooper</span>
        </div>
      </nav>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-12 py-8 space-y-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-body-small text-outline font-body-small">
          <span className="hover:text-primary cursor-pointer transition-colors">Services</span>
          <ChevronRight size={14} />
          <span className="hover:text-primary cursor-pointer transition-colors">Wellness</span>
          <ChevronRight size={14} />
          <span className="text-on-surface font-medium">Swedish Massage</span>
        </nav>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SECTION (Column size: 8/12) */}
          <section className="lg:col-span-8 space-y-8 bg-surface-container-lowest p-6 md:p-8 rounded-card border border-outline-variant/15 card-shadow">
            
            {/* Header info */}
            <div>
              <span className="inline-block bg-primary text-on-primary px-3.5 py-1 rounded-pill text-[10px] font-label-bold mb-3 uppercase tracking-widest">
                Wellness Studio
              </span>
              <h1 className="font-h1 text-h1 text-on-surface mb-2 leading-tight">Swedish Massage</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-body-small">
                <span className="text-body-base font-semibold text-primary">by Elena Rodriguez</span>
                <div className="flex items-center gap-0.5 text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" stroke="none" />
                  ))}
                  <span className="text-on-surface-variant font-medium ml-1.5 text-body-small">4.9 (128 reviews)</span>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-0.5 bg-accent/20 text-[#1B4316] rounded-lg text-caption font-label-bold">
                  <ShieldCheck size={14} />
                  <span>250+ Appointments Confirmed</span>
                </div>
              </div>

              <div className="mt-4">
                <span className="font-h2 text-h2 text-primary">
                  $85 <span className="text-body-base font-normal text-on-surface-variant">/ session</span>
                </span>
              </div>
            </div>

            {/* Premium Spa Image placeholder */}
            <div className="h-[250px] md:h-[400px] rounded-xl overflow-hidden shadow-sm relative group border border-outline-variant/10">
              <img
                alt="A peaceful luxury room for a Swedish Massage wellness experience"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJb2IQPIGd5eSkOipeoVd-HwGVjjODnxlS4xMpvD5FnhYuTQ_gEJ-5DqyYdpAjLwNxzxnDBH9Ar0nTZvabm3gsl_GMczJanTPoOkOvPFMhuWdMGBJ7RYT9-M29tYF4a-3icN9MWXb4grzCLCeUOmu_00GCQ3TGh2eEJll1FieddHrkyeH1LNaibdyCWmiW6_E2Ms8NVDtpfcGkgQujGBmLxwisYSFscfOsUlE1BAk6IPNjZuMjDNpSYv4G3_BzrnoVHBX1upP7ZfdH"
              />
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-pill text-[11px] font-medium tracking-wide">
                🌸 Luxe Treatment Room
              </div>
            </div>

            {/* About content */}
            <div className="space-y-3">
              <h3 className="font-h3 text-h3 text-primary">About This Service</h3>
              <p className="text-body-base text-on-surface-variant leading-relaxed">
                Indulge in a classic Swedish Massage designed to melt away stress and tension. This therapeutic technique uses long, gliding strokes and gentle kneading to improve circulation, ease muscle stiffness, and promote total body relaxation.
              </p>
              <p className="text-body-base text-on-surface-variant leading-relaxed">
                Whether you're looking to recover from a long week or simply want to treat yourself to some much-needed self-care, this session is tailored to your comfort level and specific areas of tension.
              </p>
            </div>

            {/* Whats Included */}
            <div className="space-y-3.5">
              <h3 className="font-h3 text-h3 text-primary">What's Included</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "60-minute full body session",
                  "Organic essential botanical oils",
                  "Heated professional massage table",
                  "Post-treatment premium herbal tea",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-accent" />
                    <span className="text-body-base text-on-surface">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Availability info */}
            <div className="space-y-3">
              <h3 className="font-h3 text-h3 text-primary">Elena's Core Schedule</h3>
              <div className="flex flex-wrap gap-2">
                {["Mon 9:00 - 18:00", "Tue 9:00 - 18:00", "Wed 9:00 - 18:00", "Fri 10:00 - 19:00", "Sat 10:00 - 15:00"].map((day, idx) => (
                  <div key={idx} className="px-3.5 py-1.5 bg-accent/10 border border-accent/20 rounded-lg text-body-small font-label-bold text-on-surface">
                    {day}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="space-y-4 pt-4 border-t border-outline-variant/10">
              <div className="flex justify-between items-center">
                <h3 className="font-h3 text-h3 text-primary">Customer Reviews</h3>
                <button className="text-secondary font-label-bold hover:underline cursor-pointer">
                  See All Reviews →
                </button>
              </div>

              <div className="grid gap-4">
                {/* Review Card 1 */}
                <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 card-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold text-body-small">
                      JD
                    </div>
                    <div>
                      <div className="font-label-bold text-body-small text-primary">Jane Doe</div>
                      <div className="flex text-secondary">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} fill="currentColor" stroke="none" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-body-small text-on-surface-variant leading-relaxed">
                    Absolutely wonderful session. Elena has magic hands and the environment was incredibly relaxing. Will definitely be back!
                  </p>
                </div>

                {/* Review Card 2 */}
                <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 card-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-full bg-[#fdadc7] flex items-center justify-center text-primary font-bold text-body-small">
                      MS
                    </div>
                    <div>
                      <div className="font-label-bold text-body-small text-primary">Mark Smith</div>
                      <div className="flex text-secondary">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} fill="currentColor" stroke="none" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-body-small text-on-surface-variant leading-relaxed">
                    Highly professional. The deep tissue work really helped my back pain. The booking process was so fast too.
                  </p>
                </div>
              </div>
            </div>

          </section>

          {/* RIGHT SECTION: Interactive Booking Panel (Column size: 4/12) */}
          <aside className="lg:col-span-4 sticky top-[96px] bg-surface-container-lowest p-6 rounded-card shadow-[0px_8px_32px_rgba(0,0,0,0.1)] border border-outline-variant/10 space-y-6">
            <h3 className="font-h3 text-h3 text-primary">Book This Service</h3>

            {/* Custom Interactive Calendar Widget */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-label-bold text-body-base text-primary">October 2026</span>
                <div className="flex gap-1">
                  <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors">
                    <ChevronLeft size={16} />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 text-center text-caption font-label-bold text-outline mb-2">
                <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
              </div>

              {/* Day Cells Grid */}
              <div className="grid grid-cols-7 gap-1 text-center font-body-small">
                {daysInOctober.map((item, index) => {
                  const isSelected = selectedDay === item.day;
                  const isDayHighlighted = item.day === 6; // matching design Highlight state

                  return (
                    <button
                      key={index}
                      onClick={() => item.currentMonth && setSelectedDay(item.day)}
                      disabled={!item.currentMonth}
                      className={`h-9 w-9 flex items-center justify-center rounded-lg relative cursor-pointer ${
                        !item.currentMonth
                          ? "text-outline opacity-40 cursor-default"
                          : isSelected
                          ? "bg-secondary text-primary font-bold shadow-sm"
                          : isDayHighlighted
                          ? "bg-secondary-container/30 border border-secondary/30 font-bold"
                          : "hover:bg-surface-container-low text-on-surface"
                      } ${item.activeDot ? "active-dot" : ""}`}
                    >
                      {item.day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Time Slot Selector */}
            <div className="space-y-3">
              <h4 className="font-h4 text-h4 text-primary flex items-center gap-1.5">
                <Clock size={16} className="text-secondary-dark" />
                <span>Available Slots</span>
              </h4>

              <div className="space-y-2.5">
                {slots.map((slot, index) => {
                  const isActive = selectedSlotIndex === index;

                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedSlotIndex(index)}
                      className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition-all duration-200 ${
                        isActive
                          ? "bg-secondary-container/30 border-secondary ring-1 ring-secondary shadow-sm"
                          : slot.discount
                          ? "border-l-4 border-l-accent border-outline-variant/15 bg-surface-container-low hover:border-secondary"
                          : "border-outline-variant/15 hover:border-secondary"
                      }`}
                    >
                      <div>
                        <div className="font-label-bold text-body-small text-primary">{slot.time}</div>
                        {slot.discount && (
                          <span className="text-[10px] bg-accent text-[#1B4316] px-2 py-0.5 rounded-pill font-bold mt-1 inline-block">
                            {slot.label}
                          </span>
                        )}
                      </div>
                      <span className={`text-body-small font-bold ${isActive || slot.discount ? "text-primary font-extrabold" : "text-on-surface-variant"}`}>
                        ${slot.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Trigger Button */}
            <div className="space-y-3">
              <button
                onClick={handleBookClick}
                className="w-full bg-[#92E889] hover:bg-[#7EDC73] text-black py-4 rounded-button font-label-bold text-body-base transition-all shadow-sm hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
              >
                Book My Slot
              </button>
              <p className="text-center text-caption text-outline">
                🔒 Direct reservation. Free cancellations anytime.
              </p>
            </div>
          </aside>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full flex flex-col md:flex-row justify-between items-center px-4 md:px-12 py-5 bg-primary text-tertiary-fixed text-body-small gap-3 mt-12">
        <div className="flex items-center gap-4">
          <span className="text-h4 font-bold text-tertiary-fixed font-h4">Appointly</span>
          <span className="text-tertiary-fixed/80">© 2026 Appointly. All rights reserved.</span>
        </div>
        <div className="flex gap-4">
          <a className="hover:text-white transition-colors" href="#privacy">Privacy Policy</a>
          <a className="hover:text-white transition-colors" href="#terms">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
