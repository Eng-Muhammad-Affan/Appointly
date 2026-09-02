"use client";

import { authClient } from "@/lib/auth-client";
import { Calendar, CalendarX, History, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const SideBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    {
      path: "/account/appointments",
      label: "Upcoming",
      icon: Calendar,
    },
    {
      path: "/account/cancelled",
      label: "Cancelled",
      icon: CalendarX,
    },
    {
      path: "/account/reschedule",
      label: "Reschedules",
      icon: History,
    },
    { path: "/account/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-[280px] hidden md:flex flex-col bg-surface-container-lowest border-r border-outline-variant/10 p-6 sticky h-screen">
      {/* User Profile Header */}
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center text-black text-2xl font-bold mb-4 border-2 border-white shadow-sm">
          J
        </div>
        <h3 className="text-xl font-bold text-on-surface">Jane Doe</h3>
        <p className="text-sm text-on-surface-variant">jane@example.com</p>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-4 px-4 py-2 rounded-lg font-semibold transition-colors ${
                isActive
                  ? "bg-secondary-container/20 text-primary"
                  : "text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Action */}
      <div className="mt-auto pt-6">
        <button
          type="button"
          className="w-full flex items-center gap-4 px-4 py-2 rounded-lg text-[#E74C3C] hover:bg-red-50 transition-colors font-semibold"
          onClick={async () => {
            await authClient.signOut();
            router.push("/");
          }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
