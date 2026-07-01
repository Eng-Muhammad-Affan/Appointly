import { useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "react-day-picker/style.css";
import dayjs from "dayjs";

export function Calendar() {
  const [selected, setSelected] = useState<Date>(dayjs().toDate());
  const [month, setMonth] = useState<Date>(new Date()); // October 2026
  const _defaultClassNames = getDefaultClassNames();

  // Sample dates with events (dots)
  const eventDates: Date[] = [
    new Date(2026, 9, 2),
    new Date(2026, 9, 8),
    new Date(2026, 9, 15),
    new Date(2026, 9, 22),
  ];

  const hasEvent = (date: Date) => {
    return eventDates.some(
      (eventDate) =>
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear(),
    );
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <DayPicker
        required
        mode="single"
        selected={selected}
        onSelect={setSelected}
        month={month}
        onMonthChange={setMonth}
        showOutsideDays
        className="rdp-custom"
        components={{
          // Chevron handles both previous and next icons (v9+)
          Chevron: (props) => {
            if (props.orientation === "left") {
              return <ChevronLeft size={20} />;
            }
            return <ChevronRight size={20} />;
          },
          // Custom day rendering with event dots
          DayButton: (props) => {
            const { day, modifiers, ...rest } = props;
            const date = day.date;
            const isOutside = modifiers.outside;
            const hasEventDot = !isOutside && hasEvent(date);

            let className =
              "h-10 w-10 flex items-center justify-center rounded-lg mx-auto transition-colors";

            if (modifiers.selected) {
              className +=
                " bg-secondary/20 font-bold border border-secondary/30 text-black";
            } else if (modifiers.today) {
              className +=
                "bg-surface-container-low rounded-full text-accent font-bold";
            } else if (isOutside) {
              className += " text-gray-400";
            } else {
              className += " hover:bg-gray-100";
            }

            return (
              <button
                {...rest}
                className={className}
                style={{ position: "relative" }}
              >
                {date.getDate()}
                {hasEventDot && (
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: "#92E889" }}
                  />
                )}
              </button>
            );
          },
        }}
        classNames={{
          month: "w-full",
          caption: "flex justify-between items-center mb-4 px-2 relative",
          caption_label: "font-semibold text-base",
          nav: "flex gap-2",
          weekdays:
            "grid grid-cols-7 text-center text-xs font-semibold text-gray-500 mb-2",
          weekday: "block",
          weeks: "grid grid-cols-7 gap-1 text-center text-sm",
          week: "contents",
          day: "block p-0 relative",
          selected:
            "bg-secondary rounded-md font-bold border border-secondary/30 text-black",
          today: "text-accent font-semibold",
          outside: "text-gray-400",
        }}
      />

      {/* Show selected date info */}
      {selected && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center text-sm">
          Selected:{" "}
          {selected.toLocaleDateString("default", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      )}
    </div>
  );
}
