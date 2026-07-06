"use client";

import React, { useState } from "react";
import { X, CreditCard, ShieldCheck, CheckCircle2, Sparkles, Loader2, Calendar, Clock } from "lucide-react";

interface BookingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSlot: {
    day: number;
    time: string;
    price: number;
    discount?: boolean;
  } | null;
  onBookingComplete: (newBooking: {
    service: string;
    date: string;
    price: number;
    provider: string;
  }) => void;
}

export default function BookingFlow({
  isOpen,
  onClose,
  selectedSlot,
  onBookingComplete,
}: BookingFlowProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [cardHolder, setCardHolder] = useState("Jane Cooper");
  const [cardNumber, setCardNumber] = useState("4111 2222 3333 4444");
  const [expiry, setExpiry] = useState("10/29");
  const [cvv, setCvv] = useState("123");

  if (!isOpen || !selectedSlot) return null;

  const handlePay = () => {
    setStep(2);
    // Simulate secure transaction
    setTimeout(() => {
      setStep(3);
      onBookingComplete({
        service: "Swedish Massage",
        date: `Oct ${selectedSlot.day}, 2026`,
        price: selectedSlot.price,
        provider: "Elena Rodriguez",
      });
    }, 2800);
  };

  const handleDone = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-modal border border-outline-variant/30 modal-shadow overflow-hidden flex flex-col relative">
        {step !== 2 && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors"
          >
            <X size={20} />
          </button>
        )}

        {/* STEP 1: SUMMARY & PAYMENT */}
        {step === 1 && (
          <div className="p-6 md:p-8 space-y-6">
            <div>
              <span className="inline-block bg-secondary text-primary px-3 py-0.5 rounded-full text-[10px] font-label-bold mb-2 uppercase tracking-widest">
                Checkout Funnel
              </span>
              <h3 className="text-h2 text-primary font-bold">Review &amp; Pay</h3>
              <p className="text-body-small text-on-surface-variant mt-1">
                Confirm your wellness slot details below.
              </p>
            </div>

            {/* Service details ticket */}
            <div className="bg-tertiary p-4 rounded-card border border-outline-variant/20 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-body-base text-primary">Swedish Massage</h4>
                  <p className="text-caption text-on-surface-variant mt-0.5">by Elena Rodriguez</p>
                </div>
                <span className="text-h3 text-primary font-extrabold">${selectedSlot.price}</span>
              </div>
              <hr className="border-outline-variant/20" />
              <div className="flex gap-4 text-body-small text-on-surface">
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} className="text-muted" />
                  <span>Oct {selectedSlot.day}, 2026</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={16} className="text-muted" />
                  <span>{selectedSlot.time}</span>
                </div>
              </div>
              {selectedSlot.discount && (
                <div className="bg-accent/25 text-[#1B4316] text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                  📉 20% Happy Hour Discount Applied
                </div>
              )}
            </div>

            {/* Payment Details Form */}
            <div className="space-y-4">
              <h4 className="text-label-bold text-primary flex items-center gap-2">
                <CreditCard size={18} className="text-secondary-dark" />
                <span>Credit Card Details</span>
              </h4>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full bg-white border border-outline-variant hover:border-outline focus:border-primary focus:ring-0 focus:outline-none rounded-input px-3.5 py-2 text-body-small transition-all focus:border-2 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-white border border-outline-variant hover:border-outline focus:border-primary focus:ring-0 focus:outline-none rounded-input px-3.5 py-2 text-body-small transition-all focus:border-2 font-mono font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full bg-white border border-outline-variant hover:border-outline focus:border-primary focus:ring-0 focus:outline-none rounded-input px-3.5 py-2 text-body-small transition-all focus:border-2 font-mono font-medium"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                      CVV / Security Code
                    </label>
                    <input
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-full bg-white border border-outline-variant hover:border-outline focus:border-primary focus:ring-0 focus:outline-none rounded-input px-3.5 py-2 text-body-small transition-all focus:border-2 font-mono font-medium"
                      placeholder="•••"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action booking Trigger */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handlePay}
                className="w-full bg-accent hover:bg-[#7EDC73] text-black font-label-bold py-4 rounded-button text-body-base shadow-sm transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Authorize &amp; Book Now</span>
              </button>
              <div className="flex justify-center items-center gap-1.5 text-[11px] text-outline">
                <ShieldCheck size={14} className="text-accent" />
                <span>Zero charge today. Pay at studio after session completion.</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PROCESSING TRANSACTION */}
        {step === 2 && (
          <div className="p-12 flex flex-col items-center justify-center text-center space-y-6 bg-white min-h-[420px]">
            {/* Tactile secure booking micro-animation */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-outline-variant/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-t-secondary rounded-full animate-spin" />
              <Loader2 size={36} className="text-secondary animate-pulse" />
            </div>

            <div className="space-y-2 max-w-xs">
              <h3 className="text-h3 text-primary font-bold">Securing Your Appointment...</h3>
              <p className="text-body-small text-on-surface-variant leading-relaxed">
                Appointly is authenticating Jane Cooper's reservation with Elena Rodriguez's wellness calendar.
              </p>
            </div>

            <div className="px-4 py-2 bg-surface-container rounded-pill border border-outline-variant/35 text-[11px] font-label-bold text-on-surface-variant">
              🔒 SSL Encrypted &amp; Direct Calendar Sync
            </div>
          </div>
        )}

        {/* STEP 3: TRANSACTION SUCCESS */}
        {step === 3 && (
          <div className="p-8 md:p-10 text-center flex flex-col items-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center border-2 border-accent text-accent animate-bounce">
              <CheckCircle2 size={36} strokeWidth={2.5} />
            </div>

            <div className="space-y-2">
              <h3 className="text-h2 text-primary font-black">Booking Confirmed!</h3>
              <p className="text-body-base text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                Your massage is locked in! A confirmation slip has been sent to{" "}
                <span className="font-semibold text-primary">jane.cooper@example.com</span>.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="w-full bg-surface-container-low p-4 rounded-card border border-outline-variant/20 text-left space-y-2">
              <div className="flex justify-between text-body-small">
                <span className="text-on-surface-variant">Booking Reference</span>
                <span className="font-mono font-bold text-primary">AP-9472-TX</span>
              </div>
              <div className="flex justify-between text-body-small">
                <span className="text-on-surface-variant">Service</span>
                <span className="font-bold text-primary">Swedish Massage (Elena R.)</span>
              </div>
              <div className="flex justify-between text-body-small">
                <span className="text-on-surface-variant">Scheduled Slot</span>
                <span className="font-bold text-primary">
                  Oct {selectedSlot.day}, 2026 at {selectedSlot.time}
                </span>
              </div>
              <div className="flex justify-between text-body-small pt-1 border-t border-outline-variant/10">
                <span className="text-on-surface-variant">Total Payable</span>
                <span className="font-extrabold text-primary">${selectedSlot.price}</span>
              </div>
            </div>

            <button
              onClick={handleDone}
              className="w-full bg-primary hover:bg-zinc-800 text-white font-label-bold py-3.5 rounded-button text-body-base transition-all hover:scale-[1.01]"
            >
              Back to Services
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
