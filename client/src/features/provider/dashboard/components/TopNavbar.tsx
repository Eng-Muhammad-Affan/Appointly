// components/layout/TopNavBar.tsx
import type React from "react";
import { Menu, Search, Bell, HelpCircle, UserCircle } from "lucide-react";

interface TopNavBarProps {
  title?: string;
  onMenuClick?: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  title = "Appointments",
  onMenuClick,
}) => {
  return (
    <header className="w-full top-0 sticky flex justify-between items-center h-16 px-4 md:px-8 z-40 shadow-sm bg-white">
      <div className="flex items-center gap-4 md:hidden">
        <button type="button" onClick={onMenuClick} className="text-primary">
          <Menu size={24} />
        </button>
        <span className="text-xl font-bold text-black">Appointly</span>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <h2 className="text-xl font-bold text-primary">{title}</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            className="pl-10 pr-4 py-2 rounded-lg bg-gray-50 border-none focus:ring-2 focus:ring-blue-600 text-sm w-64"
            placeholder="Search clients..."
            type="text"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer active:scale-95 transition-transform text-gray-600"
          >
            <Bell size={20} />
          </button>
          <button
            type="button"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer active:scale-95 transition-transform text-gray-600"
          >
            <HelpCircle size={20} />
          </button>
          <button
            type="button"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer active:scale-95 transition-transform text-gray-600"
          >
            <UserCircle size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};
