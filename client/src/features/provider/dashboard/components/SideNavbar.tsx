// components/layout/SideNavBar.tsx
"use client";
import type React from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CalendarCheck,
  MessageSquare,
  Wallet,
  Settings,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const navigationItems: NavItem[] = [
  {
    icon: <LayoutDashboard size={20} />,
    label: "Overview",
    href: "/dashboard",
  },
  {
    icon: <CalendarCheck size={20} />,
    label: "Services",
    href: "/dashboard/services",
  },
  {
    icon: <CalendarCheck size={20} />,
    label: "Appointments",
    href: "/dashboard/appointments",
  },
  {
    icon: <MessageSquare size={20} />,
    label: "Messages",
    href: "/dashboard/messages",
  },
  { icon: <Wallet size={20} />, label: "Wallet", href: "/dashboard/wallet" },
  {
    icon: <Settings size={20} />,
    label: "Settings",
    href: "/dashboard/settings",
  },
];

export const SideNavBar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 sticky left-0 top-0 bg-white py-6 px-4 border-r border-gray-200/20 z-50">
      <div className="mb-6 px-4">
        <h1 className="text-2xl font-bold text-black">Appointly</h1>
      </div>

      <div className="flex items-center gap-4 mb-6 px-4">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
          <Image
            width={100}
            height={100}
            alt="Provider Profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5Wz0UErGpyiseGaPLDEokeOjSaOd6q1mL9VSCaC_chd33M4Ps-tOcWMzcRV4szk3re6_z7i9GnT_r2wfUSs_-K2Fv6I50sAgjVoW0WtF4YlzYo3YyrVbEun6dIhCypVBQ94ncS657T1NEwQ0ZYGEXK2mSCEQGUoUV01h31omoj0RTjRKnTFI3CfZAi-f_NVnd9AW_Vy5L3vIk5EjVR7Gw4W4W5Q6FvaDb2G4QR75uriYVQUtKOHVSM2JdrukJq1A2N5upAx5IYttK"
          />
        </div>
        <div>
          <p className="font-semibold text-sm text-gray-900">
            Appointly Provider
          </p>
          <p className="text-xs text-gray-500">Managing Studio</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-2 rounded-lg transition-all",
                isActive
                  ? "bg-secondary active:opacity-80"
                  : "text-black hover:bg-brand-secondary",
              )}
            >
              {item.icon}
              <span className="font-semibold text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-4">
        <button
          type="button"
          className="w-full bg-black text-white font-semibold text-sm py-3 rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Book New
        </button>
      </div>
    </aside>
  );
};
