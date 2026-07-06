"use client";

import React from "react";
import { User, Shield, Sparkles, RefreshCw } from "lucide-react";

interface PortalSwitcherProps {
  currentPortal: "client" | "provider";
  onChangePortal: (portal: "client" | "provider") => void;
  currentTab: string;
  onChangeTab: (tab: string) => void;
}

export default function PortalSwitcher({
  currentPortal,
  onChangePortal,
  currentTab,
  onChangeTab,
}: PortalSwitcherProps) {
  return (
    <div className="sticky top-0 z-50 w-full bg-black text-white px-4 md:px-8 py-2.5 flex flex-wrap justify-between items-center gap-3 border-b border-zinc-800 shadow-lg text-[13px] font-sans">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="font-semibold tracking-wide uppercase text-[11px] text-zinc-400">
          Stitch Sandbox
        </span>
        <span className="hidden sm:inline text-zinc-600">|</span>
        <span className="hidden sm:inline text-zinc-300 font-medium">
          Appointly Unified System
        </span>
      </div>

      {/* Role Selector Controls */}
      <div className="flex items-center gap-2 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
        <button
          onClick={() => {
            onChangePortal("client");
            onChangeTab("browse");
          }}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all font-medium ${
            currentPortal === "client"
              ? "bg-secondary text-primary font-bold shadow-md"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <User size={14} strokeWidth={2.5} />
          <span>Client View</span>
        </button>

        <button
          onClick={() => {
            onChangePortal("provider");
            onChangeTab("overview");
          }}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all font-medium ${
            currentPortal === "provider"
              ? "bg-[#92E889] text-black font-bold shadow-md"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Shield size={14} strokeWidth={2.5} />
          <span>Provider View</span>
        </button>
      </div>

      {/* Mode Status Information */}
      <div className="flex items-center gap-4 text-zinc-400">
        <div className="hidden lg:flex items-center gap-1.5">
          <Sparkles size={14} className="text-secondary" />
          <span>
            {currentPortal === "client"
              ? "Acting as Jane Cooper (Platinum Member)"
              : "Acting as Luxe Artistry (Studio Owner)"}
          </span>
        </div>
        <div className="flex gap-2">
          {currentPortal === "client" ? (
            <>
              <button
                onClick={() => onChangeTab("browse")}
                className={`px-2 py-0.5 rounded ${
                  currentTab === "browse" ? "text-white bg-zinc-800" : "hover:text-white"
                }`}
              >
                Elena's Massage
              </button>
              <button
                onClick={() => onChangeTab("profile")}
                className={`px-2 py-0.5 rounded ${
                  currentTab === "profile" ? "text-white bg-zinc-800" : "hover:text-white"
                }`}
              >
                Jane's Profile
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onChangeTab("overview")}
                className={`px-2 py-0.5 rounded ${
                  currentTab === "overview" ? "text-white bg-zinc-800" : "hover:text-white"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => onChangeTab("settings")}
                className={`px-2 py-0.5 rounded ${
                  currentTab === "settings" ? "text-white bg-zinc-800" : "hover:text-white"
                }`}
              >
                Edit Services
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
