"use client";

import React, { useState } from "react";
import PortalSwitcher from "@/components/PortalSwitcher";
import ServiceDetails from "@/components/ServiceDetails";
import CustomerProfile from "@/components/CustomerProfile";
import ProviderDashboard from "@/components/ProviderDashboard";
import BookingFlow from "@/components/BookingFlow";

interface Appointment {
  service: string;
  date: string;
  provider: string;
  providerInitials: string;
  price: number;
  duration: string;
  status: "Completed" | "Upcoming" | "Pending";
}

export default function Home() {
  // Global View Navigation States
  const [portal, setPortal] = useState<"client" | "provider">("client");
  const [tab, setTab] = useState<string>("browse");

  // Shared Reactive Databases
  const [bookings, setBookings] = useState<Appointment[]>([
    {
      service: "Deep Tissue Recovery",
      date: "Oct 12, 2026",
      provider: "Sarah Miller",
      providerInitials: "SM",
      price: 120.0,
      duration: "60 mins",
      status: "Completed",
    },
    {
      service: "Swedish Massage",
      date: "Sep 15, 2026",
      provider: "David Wood",
      providerInitials: "DW",
      price: 95.0,
      duration: "60 mins",
      status: "Completed",
    },
    {
      service: "Hot Stone Therapy",
      date: "Aug 28, 2026",
      provider: "Sarah Miller",
      providerInitials: "SM",
      price: 160.0,
      duration: "90 mins",
      status: "Completed",
    },
    {
      service: "Signature Facial",
      date: "Jul 30, 2026",
      provider: "Laura Jones",
      providerInitials: "LJ",
      price: 85.0,
      duration: "45 mins",
      status: "Completed",
    },
  ]);

  const [earnings, setEarnings] = useState(4280.0);
  const [bookingsCount, setBookingsCount] = useState(18);

  // Booking Flow Overlay Trigger State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    day: number;
    time: string;
    price: number;
    discount?: boolean;
  } | null>(null);

  // Initiates checkout popup
  const handleInitiateBooking = (slot: {
    day: number;
    time: string;
    price: number;
    discount?: boolean;
  }) => {
    setSelectedSlot(slot);
    setBookingModalOpen(true);
  };

  // Callback when booking wizard confirms SSL payment
  const handleBookingComplete = (newBooking: {
    service: string;
    date: string;
    price: number;
    provider: string;
  }) => {
    // Add to Client Profile History
    const appointmentRecord: Appointment = {
      service: newBooking.service,
      date: newBooking.date,
      provider: newBooking.provider,
      providerInitials: "ER",
      price: newBooking.price,
      duration: "60 mins",
      status: "Upcoming",
    };

    setBookings([appointmentRecord, ...bookings]);

    // Update Provider Dashboard Financial metrics immediately!
    setEarnings((prev) => prev + newBooking.price);
    setBookingsCount((prev) => prev + 1);
  };

  // Callback when provider dashboard processes a pending booking request
  const handleAcceptNewBooking = (booking: {
    service: string;
    date: string;
    price: number;
    provider: string;
  }) => {
    // Append to general client appointments list in upcoming status
    const appointmentRecord: Appointment = {
      service: booking.service,
      date: booking.date,
      provider: booking.provider,
      providerInitials: "LA",
      price: booking.price,
      duration: "60 mins",
      status: "Upcoming",
    };

    setBookings([appointmentRecord, ...bookings]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Dynamic Sandbox Selector Bar */}
      <PortalSwitcher
        currentPortal={portal}
        onChangePortal={(p) => setPortal(p)}
        currentTab={tab}
        onChangeTab={(t) => setTab(t)}
      />

      {/* Primary Context Container */}
      <div className="flex-1">
        {portal === "client" ? (
          <>
            {tab === "browse" && (
              <ServiceDetails onInitiateBooking={handleInitiateBooking} />
            )}
            {tab === "profile" && (
              <CustomerProfile
                bookings={bookings}
                onAddBookingClick={() => {
                  setPortal("client");
                  setTab("browse");
                }}
              />
            )}
          </>
        ) : (
          <ProviderDashboard
            initialEarnings={earnings}
            initialBookingsCount={bookingsCount}
            onAcceptNewBooking={handleAcceptNewBooking}
          />
        )}
      </div>

      {/* Global Interactive Booking Checkout Modal */}
      <BookingFlow
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedSlot={selectedSlot}
        onBookingComplete={handleBookingComplete}
      />
    </div>
  );
}
