// components/appointments/Pagination.tsx
import type React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200/20">
      <span className="text-xs text-gray-500">
        Showing {(currentPage - 1) * 10 + 1} to{" "}
        {Math.min(currentPage * 10, totalItems)} of {totalItems} appointments
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={18} />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-lg font-semibold text-sm transition-all",
              page === currentPage
                ? "bg-accent text-black"
                : "hover:bg-gray-100 text-gray-600",
            )}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};
