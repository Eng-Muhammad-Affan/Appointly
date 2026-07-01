"use client";
import { Verified } from "lucide-react";

export const LeftImageSection = () => {
  return (
    <section className="hidden md:flex flex-1 flex-col justify-center items-center bg-tertiary p-8 relative">
      <div className="z-10 text-center max-w-md">
        <div className="mb-8 flex justify-center">
          {/* Brand Identity as Anchor */}
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-primary">Appointly</span>
          </div>
        </div>

        <div className="relative group">
          {/* Image provided via placeholder */}
          <img
            alt="Appointly Illustration"
            className="w-[400px] h-auto object-contain transform group-hover:scale-105 transition-transform duration-500 ease-out"
            src="/images/login-illustration.png"
          />
          {/* Decorative Soft Ambient Shadows as per Style Guide */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-64 h-4 bg-primary/5 blur-2xl rounded-full"></div>
        </div>

        <p className="mt-8 text-2xl font-bold text-primary leading-tight">
          Your next appointment, <br />
          <span className="text-secondary-container bg-primary px-2 py-1 inline-block">
            just a tap away.
          </span>
        </p>

        <div className="mt-6 flex gap-1 justify-center items-center text-on-surface-variant text-sm">
          <Verified size={18} />
          <span>Fast, secure, and always synchronized.</span>
        </div>
      </div>

      {/* Pattern Overlay (Subtle Tonal Layering) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, black 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      ></div>
    </section>
  );
};
