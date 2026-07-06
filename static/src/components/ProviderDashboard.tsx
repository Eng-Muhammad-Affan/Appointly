"use client";

import React, { useState, useEffect } from "react";
import { DollarSign, Calendar, Star, Check, X, ShieldAlert, Plus, Edit2, Sparkles, MessageSquare, Trash2, ArrowUpRight } from "lucide-react";

interface ServiceItem {
  id: string;
  name: string;
  price: number;
  duration: string;
  category: string;
}

interface ProviderDashboardProps {
  initialEarnings: number;
  initialBookingsCount: number;
  onAcceptNewBooking: (booking: {
    service: string;
    date: string;
    price: number;
    provider: string;
  }) => void;
}

export default function ProviderDashboard({
  initialEarnings,
  initialBookingsCount,
  onAcceptNewBooking,
}: ProviderDashboardProps) {
  // Dynamic Greeting States
  const [greeting, setGreeting] = useState("Good morning");
  const [earnings, setEarnings] = useState(initialEarnings);
  const [bookingsCount, setBookingsCount] = useState(initialBookingsCount);

  // Active View Tab
  const [activeTab, setActiveTab] = useState<"overview" | "services">("overview");

  // Mock schedule database
  const [schedule, setSchedule] = useState([
    { time: "09:00 AM", client: "Sarah Jenkins", service: "Signature Hydrafacial", duration: "60 min", color: "bg-secondary" },
    { time: "11:30 AM", client: "Michael Chen", service: "Men's Executive Sculpt", duration: "45 min", color: "bg-primary" },
    { time: "02:00 PM", client: "Aria Stark", service: "Bridal Consultation", duration: "90 min", color: "bg-accent" },
  ]);

  // Mock pending bookings
  const [pendingRequests, setPendingRequests] = useState([
    { id: "1", client: "Elena Gilbert", service: "Deep Tissue Massage", time: "Tomorrow, 10:00 AM", price: 120 },
    { id: "2", client: "Damon Salvatore", service: "Beard Grooming", time: "Oct 26, 3:30 PM", price: 45 },
  ]);

  // Service list database
  const [services, setServices] = useState<ServiceItem[]>([
    { id: "1", name: "Swedish Massage", price: 85, duration: "60 mins", category: "Wellness" },
    { id: "2", name: "Deep Tissue Recovery", price: 120, duration: "60 mins", category: "Therapeutic" },
    { id: "3", name: "Hot Stone Therapy", price: 160, duration: "90 mins", category: "Wellness" },
    { id: "4", name: "Signature Hydrafacial", price: 110, duration: "60 mins", category: "Facials" },
  ]);

  // Form states for adding/editing services
  const [showAddModal, setShowAddModal] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServicePrice, setNewServicePrice] = useState("95");
  const [newServiceDuration, setNewServiceDuration] = useState("60 mins");
  const [newServiceCategory, setNewServiceCategory] = useState("Wellness");

  // Dynamic Greeting based on real hour
  useEffect(() => {
    const hr = new Date().getHours();
    if (hr < 12) setGreeting("Good morning");
    else if (hr < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  // Accept Appointment handler
  const handleAcceptRequest = (id: string) => {
    const request = pendingRequests.find((r) => r.id === id);
    if (!request) return;

    // Remove from pending
    setPendingRequests(pendingRequests.filter((r) => r.id !== id));
    
    // Add to schedule list
    setSchedule([
      ...schedule,
      {
        time: "04:30 PM", // scheduled slot placeholder
        client: request.client,
        service: request.service,
        duration: "60 min",
        color: "bg-secondary",
      },
    ]);

    // Update parent booking logs & local dashboard metrics
    setEarnings((prev) => prev + request.price);
    setBookingsCount((prev) => prev + 1);

    onAcceptNewBooking({
      service: request.service,
      date: request.time.includes("Tomorrow") ? "Tomorrow" : request.time,
      price: request.price,
      provider: "Luxe Artistry",
    });
  };

  // Decline Appointment handler
  const handleDeclineRequest = (id: string) => {
    setPendingRequests(pendingRequests.filter((r) => r.id !== id));
  };

  // Add Service handler
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim()) return;

    const item: ServiceItem = {
      id: Date.now().toString(),
      name: newServiceName,
      price: parseFloat(newServicePrice) || 85,
      duration: newServiceDuration,
      category: newServiceCategory,
    };

    setServices([...services, item]);
    setNewServiceName("");
    setShowAddModal(false);
  };

  // Delete Service handler
  const handleDeleteService = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
  };

  return (
    <div className="bg-surface text-on-surface font-sans flex hover-card-transition-duration-300 min-h-screen">
      
      {/* SideNavBar (Desktop Only) */}
      <aside className="hidden md:flex flex-col h-screen w-64 sticky left-0 top-[45px] lg:top-0 py-8 px-4 border-r border-outline-variant/20 bg-surface z-20">
        <div className="flex flex-col gap-1 mb-8 px-4">
          <p className="font-h4 text-h4 text-primary font-h4">Appointly Provider</p>
          <p className="font-caption text-caption text-on-surface-variant">Luxe Artistry Studio</p>
        </div>
        <nav className="flex flex-col gap-2 flex-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-label-bold text-label-bold text-left transition-all ${
              activeTab === "overview"
                ? "bg-secondary-container text-on-secondary-container font-bold border-l-4 border-secondary-dark shadow-sm"
                : "text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === "overview" ? "'FILL' 1" : "'FILL' 0" }}>dashboard</span>
            <span>Dashboard Overview</span>
          </button>
          
          <button
            onClick={() => setActiveTab("services")}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-label-bold text-label-bold text-left transition-all ${
              activeTab === "services"
                ? "bg-secondary-container text-on-secondary-container font-bold border-l-4 border-secondary-dark shadow-sm"
                : "text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined">list_alt</span>
            <span>Service Catalog</span>
          </button>

          <a className="flex items-center gap-3 px-4 py-2.5 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all font-label-bold text-label-bold" href="#messages">
            <span className="material-symbols-outlined">chat_bubble</span>
            <span>Messages</span>
          </a>

          <a className="flex items-center gap-3 px-4 py-2.5 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all font-label-bold text-label-bold" href="#wallet">
            <span className="material-symbols-outlined">account_balance_wallet</span>
            <span>Wallet &amp; Cashout</span>
          </a>
        </nav>

        <button
          onClick={() => {
            setActiveTab("services");
            setShowAddModal(true);
          }}
          className="mt-auto bg-secondary text-primary font-label-bold text-label-bold py-3.5 rounded-button shadow-sm hover:opacity-95 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Plus size={16} />
          <span>New Catalog Item</span>
        </button>
      </aside>

      {/* Main Canvas */}
      <main className="flex-1 p-6 md:p-8 overflow-x-hidden space-y-8">
        
        {/* Welcome Dashboard Greeting */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-h1 text-h1 text-primary tracking-tight">
              {greeting}, Luxe Artistry
            </h1>
            <p className="font-body-base text-body-base text-on-surface-variant mt-0.5">
              Here is what is happening in your scheduling calendar today.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-4 py-2 bg-surface-container-lowest border border-outline-variant/35 rounded-lg text-caption font-label-bold flex items-center gap-1.5 text-primary">
              <Calendar size={14} />
              <span>Oct 24, 2026</span>
            </span>
          </div>
        </header>

        {/* Dynamic Views Tab Render */}
        {activeTab === "overview" && (
          <>
            {/* Bento Statistics Deck */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Stat 1: Total Earnings */}
              <div className="bg-surface-container-lowest p-6 rounded-card card-shadow border border-outline-variant/10 hover-card-transition">
                <div className="flex justify-between items-start mb-4">
                  <span className="p-2.5 bg-secondary-container rounded-lg text-secondary-dark">
                    <DollarSign size={20} />
                  </span>
                  <span className="text-accent font-label-bold text-caption bg-[#92E889]/15 border border-[#92E889]/30 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <ArrowUpRight size={12} />
                    <span>+12%</span>
                  </span>
                </div>
                <p className="text-caption text-on-surface-variant uppercase tracking-wider font-label-bold">Total Earnings</p>
                <h2 className="text-h1 font-h1 text-primary mt-1">${earnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                <p className="text-caption text-on-surface-variant mt-2">Adjusted for accepted bookings</p>
              </div>

              {/* Stat 2: New Bookings */}
              <div className="bg-surface-container-lowest p-6 rounded-card card-shadow border border-outline-variant/10 hover-card-transition">
                <div className="flex justify-between items-start mb-4">
                  <span className="p-2.5 bg-tertiary rounded-lg text-primary border border-outline-variant/15">
                    <Calendar size={20} />
                  </span>
                  <span className="text-on-surface-variant font-label-bold text-caption">24 total logs</span>
                </div>
                <p className="text-caption text-on-surface-variant uppercase tracking-wider font-label-bold">Confirmed Sessions</p>
                <h2 className="text-h1 font-h1 text-primary mt-1">{bookingsCount}</h2>
                <p className="text-caption text-on-surface-variant mt-2">Booked in current term</p>
              </div>

              {/* Stat 3: Average Rating */}
              <div className="bg-surface-container-lowest p-6 rounded-card card-shadow border border-outline-variant/10 hover-card-transition">
                <div className="flex justify-between items-start mb-4">
                  <span className="p-2.5 bg-accent/20 rounded-lg text-[#1B4316] border border-accent/35">
                    <Star size={20} fill="currentColor" />
                  </span>
                  <span className="text-on-surface-variant font-label-bold text-caption">128 reviews total</span>
                </div>
                <p className="text-caption text-on-surface-variant uppercase tracking-wider font-label-bold">Average Studio Rating</p>
                <h2 className="text-h1 font-h1 text-primary mt-1">4.9</h2>
                <div className="flex gap-0.5 mt-2.5 text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" stroke="none" />
                  ))}
                </div>
              </div>

            </section>

            {/* Central Scheduling TIMELINE & SVG CHART Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Today's Schedule */}
              <section className="lg:col-span-8 bg-surface-container-lowest p-6 rounded-card card-shadow border border-outline-variant/10 space-y-6">
                <div className="flex justify-between items-center pb-2 border-b border-outline-variant/10">
                  <h3 className="font-h2 text-h2 text-primary">Today's Schedule</h3>
                  <span className="text-caption font-bold text-secondary uppercase tracking-wider">
                    {schedule.length} active sessions
                  </span>
                </div>

                <div className="space-y-4">
                  {schedule.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 hover:bg-surface-container-low transition-colors rounded-lg group border border-transparent hover:border-outline-variant/15">
                      <div className="flex flex-col items-center justify-center min-w-[70px] border-r border-outline-variant/15 pr-2">
                        <span className="font-bold text-body-base text-primary">{item.time.split(" ")[0]}</span>
                        <span className="text-caption text-on-surface-variant font-bold">{item.time.split(" ")[1]}</span>
                      </div>
                      <div className={`w-1.5 h-10 ${item.color} rounded-full`} />
                      <div className="flex-1">
                        <p className="font-h4 text-body-base text-primary font-bold">{item.client}</p>
                        <p className="text-body-small text-on-surface-variant mt-0.5">{item.service}</p>
                      </div>
                      <span className="px-3 py-1 bg-surface-container rounded-pill text-caption font-label-bold text-on-surface-variant">
                        {item.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Sidebar: Pending Bookings & Reviews */}
              <aside className="lg:col-span-4 flex flex-col gap-6">
                
                {/* Pending Requests Box */}
                <div className="bg-surface-container-lowest p-5 rounded-card card-shadow border border-outline-variant/10 space-y-4">
                  <h3 className="font-h4 text-h4 text-primary flex items-center gap-2">
                    <ShieldAlert size={18} className="text-secondary-dark" />
                    <span>Pending Requests ({pendingRequests.length})</span>
                  </h3>

                  <div className="space-y-3">
                    {pendingRequests.length === 0 ? (
                      <div className="p-6 text-center text-on-surface-variant text-body-small">
                        🎉 All requests reviewed!
                      </div>
                    ) : (
                      pendingRequests.map((item) => (
                        <div key={item.id} className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/15 space-y-2">
                          <div className="flex justify-between items-start">
                            <p className="font-label-bold text-body-small text-primary">{item.client}</p>
                            <span className="text-caption font-extrabold text-primary">${item.price}</span>
                          </div>
                          <p className="text-body-small text-on-surface-variant leading-relaxed">
                            {item.service} • {item.time}
                          </p>
                          <div className="flex gap-2 pt-1">
                            <button
                              onClick={() => handleAcceptRequest(item.id)}
                              className="flex-1 py-1.5 bg-primary text-white hover:bg-zinc-800 text-caption font-label-bold rounded-lg transition-all active:scale-[0.97] cursor-pointer flex items-center justify-center gap-1"
                            >
                              <Check size={12} strokeWidth={2.5} />
                              <span>Accept</span>
                            </button>
                            <button
                              onClick={() => handleDeclineRequest(item.id)}
                              className="flex-1 py-1.5 bg-white border border-outline hover:bg-zinc-50 text-primary text-caption font-label-bold rounded-lg transition-all active:scale-[0.97] cursor-pointer flex items-center justify-center gap-1"
                            >
                              <X size={12} strokeWidth={2.5} />
                              <span>Decline</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Interactive SVG Earnings Bar Chart */}
                <div className="bg-surface-container-lowest p-5 rounded-card card-shadow border border-outline-variant/10 space-y-5">
                  <div className="flex justify-between items-center">
                    <h3 className="font-h4 text-h4 text-primary">Weekly Earnings</h3>
                    <span className="text-caption font-bold text-accent-success uppercase tracking-tight">Active</span>
                  </div>

                  {/* Simple CSS-driven graph */}
                  <div className="h-32 flex items-end gap-2 px-1 relative">
                    {[
                      { day: "Mon", height: "h-[40%]", amount: "$420" },
                      { day: "Tue", height: "h-[65%]", amount: "$580" },
                      { day: "Wed", height: "h-[90%]", amount: "$840", active: true },
                      { day: "Thu", height: "h-[30%]", amount: "$310" },
                      { day: "Fri", height: "h-[75%]", amount: "$690" },
                      { day: "Sat", height: "h-[55%]", amount: "$510" },
                      { day: "Sun", height: "h-[45%]", amount: "$440" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 rounded-t-lg transition-all relative group cursor-pointer ${
                          item.active
                            ? "bg-primary"
                            : "bg-surface-container-high hover:bg-secondary"
                        } ${item.height}`}
                      >
                        {/* Interactive tooltip */}
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] px-1.5 py-0.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 font-bold font-mono">
                          {item.amount}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between text-caption font-semibold text-outline px-1 border-t border-outline-variant/10 pt-2 uppercase tracking-wide">
                    <span>M</span><span>T</span><span className="text-primary font-bold">W</span><span>T</span><span>F</span><span>S</span><span className="text-secondary-dark font-bold">S</span>
                  </div>
                </div>

              </aside>

            </div>
          </>
        )}

        {/* Dynamic Services Catalog View */}
        {activeTab === "services" && (
          <div className="bg-surface-container-lowest p-6 rounded-card border border-outline-variant/10 card-shadow space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant/10">
              <div>
                <h3 className="font-h2 text-h2 text-primary">Service Catalog</h3>
                <p className="text-body-small text-on-surface-variant">List of salon services Jane Cooper and other clients can book.</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-primary text-on-primary hover:bg-zinc-800 px-4 py-2.5 rounded-lg font-label-bold text-label-bold active:scale-95 transition-all cursor-pointer flex items-center gap-1"
              >
                <Plus size={16} />
                <span>Add Custom Service</span>
              </button>
            </div>

            {/* List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((item) => (
                <div key={item.id} className="p-4 rounded-xl border border-outline-variant/20 hover:border-secondary transition-all hover-card-transition-duration-300 flex justify-between items-start bg-surface-container-low">
                  <div className="space-y-1">
                    <span className="text-[10px] bg-primary text-white font-label-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="font-bold text-body-base text-primary pt-1">{item.name}</h4>
                    <p className="text-caption text-on-surface-variant flex items-center gap-2">
                      <span>⏱️ {item.duration}</span>
                      <span>•</span>
                      <span>No pre-payment required</span>
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-extrabold text-body-base text-primary">${item.price}</span>
                    <button
                      onClick={() => handleDeleteService(item.id)}
                      className="p-1 hover:bg-red-50 text-red-600 hover:text-red-700 rounded transition-colors"
                      title="Delete Service"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Service Modal Overlay */}
            {showAddModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                <form
                  onSubmit={handleAddService}
                  className="bg-white p-6 rounded-modal border border-outline-variant/30 modal-shadow w-full max-w-md space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-h3 text-h3 text-primary">New Catalog Item</h4>
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="p-1 rounded-full hover:bg-zinc-100 text-on-surface-variant"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                        Service Name
                      </label>
                      <input
                        type="text"
                        required
                        value={newServiceName}
                        onChange={(e) => setNewServiceName(e.target.value)}
                        className="w-full bg-white border border-outline-variant hover:border-outline focus:border-primary focus:ring-0 focus:outline-none rounded-input px-3.5 py-2 text-body-small focus:border-2 font-medium"
                        placeholder="e.g. Couples Therapeutic Spa"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                          Price ($)
                        </label>
                        <input
                          type="number"
                          required
                          value={newServicePrice}
                          onChange={(e) => setNewServicePrice(e.target.value)}
                          className="w-full bg-white border border-outline-variant hover:border-outline focus:border-primary focus:ring-0 focus:outline-none rounded-input px-3.5 py-2 text-body-small focus:border-2 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                          Duration (mins)
                        </label>
                        <input
                          type="text"
                          required
                          value={newServiceDuration}
                          onChange={(e) => setNewServiceDuration(e.target.value)}
                          className="w-full bg-white border border-outline-variant hover:border-outline focus:border-primary focus:ring-0 focus:outline-none rounded-input px-3.5 py-2 text-body-small focus:border-2 font-medium"
                          placeholder="60 mins"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                        Category
                      </label>
                      <select
                        value={newServiceCategory}
                        onChange={(e) => setNewServiceCategory(e.target.value)}
                        className="w-full bg-white border border-outline-variant focus:border-primary rounded-input px-3 py-2 text-body-small font-medium"
                      >
                        <option value="Wellness">Wellness &amp; Health</option>
                        <option value="Therapeutic">Therapeutic Recovery</option>
                        <option value="Facials">Facials &amp; Makeup</option>
                        <option value="Grooming">Hair &amp; Beard Grooming</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 py-2.5 border border-outline text-primary rounded-lg font-label-bold text-label-bold hover:bg-zinc-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-primary text-white rounded-lg font-label-bold text-label-bold hover:bg-zinc-800"
                    >
                      Add to Catalog
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

      </main>

    </div>
  );
}
