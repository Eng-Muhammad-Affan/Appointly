import { Sidebar, SingleStatsV2, TotalSavings } from "@/components";
import {
  HiArrowSmallDown,
  HiCurrencyDollar,
  HiUserGroup,
} from "react-icons/hi2";
import { HiArrowSmallUp } from "react-icons/hi2";
import { HiShoppingCart } from "react-icons/hi2";
import ChartItem from "../components/chart/ChartItem";
import RechartsAreaChart from "@/components/chart/RechartsAreaChart";
import RechartsBarChart from "@/components/chart/RechartsBarChart";
import RechartsLineChart from "@/components/chart/RechartsLineChart";
import useDashboardOrders from "@/stores/admin/use-orders-admin";
import { useMemo } from "react";

const Landingv2 = () => {
  const {orders} = useDashboardOrders()

  const calculateRevenue = useMemo(() => {
    return orders.reduce((acc, curr) => acc+curr.total_amount, 0)
  },[orders])
  
  return (
    <div className="bg-whiteSecondary w-full pt-6 pl-9 max-sm:pt-6 max-sm:pl-1">
      <h3 className="text-3xl dark:text-whiteSecondary text-blackPrimary font-bold mb-7 max-sm:text-2xl px-5">
        Overview
      </h3>
      
      {/* stats */}
      <div className="flex flex-wrap items-stretch px-5 w-[95%] -ml-1">
        <SingleStatsV2>
          <SingleStatsV2.StatsCategory statsCategory="Revenue">
            <HiCurrencyDollar className="text-2xl" />
          </SingleStatsV2.StatsCategory>
          <SingleStatsV2.MoneyStats moneyAmount={`Rs ${calculateRevenue}`}>
          </SingleStatsV2.MoneyStats>
          <SingleStatsV2.PercentageStats
            isPositive={true}
            percentage="15.2%"
          />
        </SingleStatsV2>

        <SingleStatsV2>
          <SingleStatsV2.StatsCategory statsCategory="New Users">
            <HiUserGroup className="text-2xl" />
          </SingleStatsV2.StatsCategory>
          <SingleStatsV2.MoneyStats moneyAmount="450">
          </SingleStatsV2.MoneyStats>
          <SingleStatsV2.PercentageStats
            isPositive={true}
            percentage="9.8%"
          />
        </SingleStatsV2>

        {/* Add more cards as needed */}
      </div>
      
      <div className="w-[95%] px-5 mt-10 max-md:w-[90%] max-[400px]:w-[95%] dark:bg-black bg-whiteSecondary">
        <ChartItem title="Revenue VS Profit">
          <RechartsBarChart />
        </ChartItem>
        <TotalSavings isPositive={true} percentage="25%" />
      </div>
    </div>
  );
};

export default Landingv2;