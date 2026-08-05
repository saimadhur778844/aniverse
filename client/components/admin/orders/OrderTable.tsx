"use client";

import { Order } from "@/types/order";
import { User } from "@/types/user";
import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";

interface Props {
  orders: Order[];
  onSelect: (id: string) => void;
}

export default function OrderTable({
  orders,
  onSelect,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-zinc-950">
            <tr className="text-sm text-zinc-400">
              <th className="px-6 py-4 text-left">
                Order
              </th>

              <th className="px-6 py-4 text-left">
                Customer
              </th>

              <th className="px-6 py-4 text-left">
                Total
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Payment
              </th>

              <th className="px-6 py-4 text-left">
                Date
              </th>

              <th className="px-6 py-4"></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              const customer =
                typeof order.user === "string"
                  ? null
                  : (order.user as User);

              return (
                <tr
                  key={order._id}
                  className="border-t border-zinc-800 hover:bg-zinc-800/40"
                >
                  <td className="px-6 py-4 font-medium">
                    {order.orderNumber}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {customer?.name ?? "-"}
                      </span>

                      <span className="text-xs text-zinc-500">
                        {customer?.email}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    ₹{order.total.toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <OrderStatusBadge
                      status={order.orderStatus}
                    />
                  </td>

                  <td className="px-6 py-4">
                    <PaymentStatusBadge
                      status={order.payment.status}
                    />
                  </td>

                  <td className="px-6 py-4">
                    {new Date(
                        order.createdAt
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        onSelect(order._id)
                      }
                    className="rounded-lg bg-pink-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-pink-500"                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="py-10 text-center text-zinc-500"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}