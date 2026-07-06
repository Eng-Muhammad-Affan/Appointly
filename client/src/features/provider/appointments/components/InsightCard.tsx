// components/appointments/InsightCards.tsx
import type React from "react";
import {
  BarChart3,
  Clock,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface InsightCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const InsightCard: React.FC<InsightCardProps> = ({
  icon,
  title,
  value,
  subtitle,
  trend,
}) => {
  return (
    <div className="p-6 bg-gray-50 rounded-xl flex flex-col gap-3 hover:bg-gray-100 transition-colors">
      <div className="text-gray-600">{icon}</div>
      <p className="font-semibold text-sm text-gray-700">{title}</p>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend && (
          <span
            className={`font-semibold text-xs flex items-center gap-1 ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.isPositive ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
            {trend.value}
          </span>
        )}
        {subtitle && <span className="text-gray-500 text-xs">{subtitle}</span>}
      </div>
    </div>
  );
};

export const InsightCards: React.FC = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
      <InsightCard
        icon={<BarChart3 size={24} />}
        title="Weekly Capacity"
        value="84%"
        trend={{ value: "+12%", isPositive: true }}
      />
      <InsightCard
        icon={<Clock size={24} />}
        title="Pending Approvals"
        value="5"
        subtitle="Needs attention"
      />
      <InsightCard
        icon={<DollarSign size={24} />}
        title="Estimated Revenue"
        value="$2,450"
        subtitle="This week"
      />
    </div>
  );
};
