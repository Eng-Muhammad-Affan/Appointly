import { HiArrowSmallDown, HiArrowSmallUp } from "react-icons/hi2";

const SingleStatsV2 = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-2 bg-blue-main/5 font-bold text-blue-main w-72 px-5 py-5 rounded-xl flex-1 min-w-[200px] mr-4 mb-4">
      {children}
    </div>
  );
};

const StatsCategory = ({
  statsCategory,
  children,
}: {
  statsCategory: string;
  children: React.ReactNode;
}) => {
  return (
    <p className="flex items-center gap-1 text-blackPrimary">
      {children}
      <span className="text-xl">{statsCategory}</span>
    </p>
  );
};

const MoneyStats = ({
  moneyAmount,
  type = "inc",
  percentage = "0%",
}: {
  moneyAmount: string;
  type?: "inc" | "dec";
  percentage?: string;
}) => {
  const isPositive = type === "inc";
  const ArrowIcon = isPositive ? HiArrowSmallUp : HiArrowSmallDown;
  const textColor = isPositive ? "text-green-500" : "text-red-500";

  return (
    <div className="flex gap-3 items-center">
      <p className="text-3xl font-semibold dark:text-whiteSecondary text-blackPrimary">
        {moneyAmount}
      </p>
      <p className={`${textColor} flex gap-1 items-center font-semibold text-sm`}>
        <ArrowIcon className="text-base" />
        <span>{percentage}</span>
      </p>
    </div>
  );
};


const PercentageStats = ({
  isPositive,
  percentage,
}: {
  percentage: string;
  isPositive: boolean;
}) => {
  return (
    <p
      className={
        isPositive
          ? `dark:text-green-600 text-green-500 font-semibold`
          : `dark:text-red-600 text-red-500 font-semibold`
      }
    >
      {isPositive ? "+" : "-"}
      {percentage} than last month
    </p>
  );
};

export default SingleStatsV2;

SingleStatsV2.StatsCategory = StatsCategory;
SingleStatsV2.MoneyStats = MoneyStats;
SingleStatsV2.PercentageStats = PercentageStats;
