"use client";

import { Eye } from "lucide-react";

import type { Customer } from "@/types/customer";

import CustomerStatusBadge from "./CustomerStatusBadge";

interface Props {
  customer: Customer;
  onView: (id: string) => void;
}

export default function CustomerRow({
  customer,
  onView,
}: Props) {
  return (
    <tr className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">

      <td className="p-4">
        <div>
          <p className="font-medium text-white">
            {customer.name}
          </p>

          <p className="text-xs text-zinc-500">
            {customer.email}
          </p>
        </div>
      </td>

      <td className="p-4">
        {customer.orders}
      </td>

      <td className="p-4">
        ₹{customer.spent.toLocaleString()}
      </td>

      <td className="p-4">
        ₹
        {customer.averageOrderValue.toFixed(2)}
      </td>

      <td className="p-4">
        <CustomerStatusBadge
          orders={customer.orders}
          spent={customer.spent}
        />
      </td>

      <td className="p-4">
        {new Date(
          customer.createdAt
        ).toLocaleDateString()}
      </td>

      <td className="p-4">
        <button
          onClick={() =>
            onView(customer._id)
          }
          className="rounded-lg bg-pink-600 p-2 hover:bg-pink-500"
          title="View Customer"
        >
          <Eye size={16} />
        </button>
      </td>

    </tr>
  );
}