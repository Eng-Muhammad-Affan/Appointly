import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { HiOutlinePencil } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlineEye } from "react-icons/hi";
import useDashboardOrders from "@/stores/admin/use-orders-admin";
import formatDate from "@/utils/format-date";
// import { orderAdminItems } from "../utils/data";

const OrderTable = () => {
  const { orders } = useDashboardOrders()
  
  return (
    // Add wrapper with overflow-x-auto
    <div className="w-full overflow-x-auto">
      <table className="mt-6 w-full whitespace-nowrap text-left">
        <colgroup>
          <col className="w-full sm:w-4/12" />
          <col className="lg:w-4/12" />
          <col className="lg:w-2/12" />
          <col className="lg:w-1/12" />
          <col className="lg:w-1/12" />
        </colgroup>
        <thead className="border-b border-white/10 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary">
          <tr>
            <th
              scope="col"
              className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
            >
              Customer
            </th>
            <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell">
              Status
            </th>
            <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell">
              Total
            </th>
            <th
              scope="col"
              className="py-2 pl-0 pr-8 font-semibold table-cell lg:pr-20"
            >
              Date
            </th>
            <th
              scope="col"
              className="py-2 pl-0 pr-4 text-right font-semibold table-cell sm:pr-6 lg:pr-8"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {orders.map((item) => {
            return (
              <tr key={nanoid()}>
                <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                  <div className="flex items-center gap-x-4">
                    <img
                      src={item.items[0].product.productImages[0].thumbnailFile}
                      alt=""
                      className="h-8 w-8 rounded-full bg-gray-800"
                    />
                    <div className="truncate text-sm font-medium leading-6 dark:text-whiteSecondary text-blackPrimary">
                      {item.user_name}
                    </div>
                  </div>
                </td>
                <td className="py-4 pl-0 pr-4 table-cell pr-8">
                  {/* <div className="flex gap-x-3">
                    <div
                    className={`text-sm leading-6 py-1 px-2 font-semibold ${
                      item.status === "completed" &&
                      "bg-green-700 text-whiteSecondary"
                    } ${
                      item.status === "On hold" &&
                      "bg-yellow-700 text-whiteSecondary"
                    } ${
                      item.status === "cancelled" &&
                      "bg-red-700 text-whiteSecondary"
                    } ${
                      item.status === "" &&
                      "bg-blue-700 text-whiteSecondary"
                    }`}
                  >
                    {item.status}
                  </div>
                  </div> */}
                </td>
                <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                  <div className="flex items-center gap-x-2 justify-start">
                    <div className="text-blue-main block font-bold">
                      {item.total_amount}
                    </div>
                  </div>
                </td>
                <td className="py-4 pl-0 pr-8 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell lg:pr-20">
                  {formatDate(item.created_at)}
                </td>
                <td className="py-4 pl-0 pr-4 text-right text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell pr-6 lg:pr-8">
                  <div className="flex gap-x-1 justify-end">
                    <Link
                      to="/admin/orders/1"
                      className="dark:bg-blackPrimary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 flex justify-center items-center cursor-pointer dark:hover:border-gray-500 hover:border-gray-400"
                    >
                      <HiOutlinePencil className="text-lg" />
                    </Link>
                    <Link
                      to={`/admin/orders/${item.id}`}
                      className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 flex justify-center items-center cursor-pointer dark:hover:border-gray-500 hover:border-gray-400"
                    >
                      <HiOutlineEye className="text-lg" />
                    </Link>
                    <Link
                      to="#"
                      className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 flex justify-center items-center cursor-pointer dark:hover:border-gray-500 hover:border-gray-400"
                    >
                      <HiOutlineTrash className="text-lg" />
                    </Link>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};
export default OrderTable;