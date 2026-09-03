// QuickStats.tsx
import { Calendar, Package, CheckCircle, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useProfile } from "@/features/user/account";

const QuickStats = () => {
  const {appointments, completedAppointments, cancelledAppointments} = useProfile()

  const quickStats = [
    { label: "Upcoming", value: 2, icon: Calendar, color: "text-[var(--color-secondary-dark)]" },
    { label: "Completed", value: completedAppointments.length, icon: CheckCircle, color: "text-[var(--color-accent-success)]" },
    { label: "Cancelled", value: cancelledAppointments.length, icon: XCircle, color: "text-[var(--color-error)]" },
    { label: "Reschedules", value: 20, icon: Package, color: "text-[var(--color-muted)]" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-1 sm:gap-3">
      {quickStats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card
            key={index}
            className="text-center shadow-md transition-all duration-300 border-[var(--color-secondary)] group flex flex-col justify-center items-center gap-4"
          >
            <div className={`${stat.color} mx-auto  rounded-full bg-current/10 w-fit group-hover:scale-110 transition-transform duration-300`}>
              <IconComponent className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-[var(--color-on-surface)]">
              {stat.value}
            </p>
            <p className="text-caption text-[var(--color-on-surface-variant)]">
              {stat.label}
            </p>
          </Card>
        );
      })}
    </div>
  );
};

export default QuickStats;