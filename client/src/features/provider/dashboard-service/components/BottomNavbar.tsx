// components/layout/BottomNavBar.tsx
import type React from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  MessageSquare,
  Settings,
  Plus,
} from "lucide-react";

import Link from "next/link";

export const BottomNavBar: React.FC = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-t border-gray-200/10 px-4 py-2 flex justify-around items-center z-50">
      <Link href="#" className="flex flex-col items-center gap-1 text-gray-500">
        <LayoutDashboard size={20} />
        <span className="text-[10px] font-semibold">Overview</span>
      </Link>

      <Link href="#" className="flex flex-col items-center gap-1 text-blue-600">
        <CalendarCheck size={20} />
        <span className="text-[10px] font-semibold">Schedule</span>
      </Link>

      <div className="relative -top-6">
        <button
          type="button"
          className="bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:opacity-90 transition-all"
        >
          <Plus size={32} />
        </button>
      </div>

      <Link href="#" className="flex flex-col items-center gap-1 text-gray-500">
        <MessageSquare size={20} />
        <span className="text-[10px] font-semibold">Messages</span>
      </Link>

      <Link href="#" className="flex flex-col items-center gap-1 text-gray-500">
        <Settings size={20} />
        <span className="text-[10px] font-semibold">Settings</span>
      </Link>
    </nav>
  );
};
