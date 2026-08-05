"use client";

import {
  Edit,
  Trash2,
  Power,
} from "lucide-react";

import type { Coupon } from "@/types/coupon";

import CouponStatusBadge from "./CouponStatusBadge";

interface Props {
  coupon: Coupon;
  onEdit: (coupon: Coupon) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function CouponRow({
  coupon,
  onEdit,
  onDelete,
  onToggle,
}: Props) {
  return (
    <tr className="border-b border-zinc-800 hover:bg-zinc-900/50">

      <td className="p-4 font-medium">
        {coupon.code}
      </td>

      <td className="p-4">
        {coupon.type === "percentage"
          ? `${coupon.value}%`
          : `₹${coupon.value}`}
      </td>

      <td className="p-4">
        ₹{coupon.minimumOrderAmount}
      </td>

      <td className="p-4">
        {coupon.usedCount} / {coupon.usageLimit}
      </td>

      <td className="p-4">
        <CouponStatusBadge
          active={coupon.active}
          expiryDate={coupon.expiryDate}
        />
      </td>

      <td className="p-4">
        {new Date(
          coupon.expiryDate
        ).toLocaleDateString()}
      </td>

      <td className="p-4">
        <div className="flex gap-2">

          <button
            onClick={() =>
              onEdit(coupon)
            }
            className="rounded-lg bg-blue-600 p-2 hover:bg-blue-500"
          >
            <Edit size={16} />
          </button>

          <button
            onClick={() =>
              onToggle(coupon._id)
            }
            className="rounded-lg bg-yellow-600 p-2 hover:bg-yellow-500"
          >
            <Power size={16} />
          </button>

          <button
            onClick={() =>
              onDelete(coupon._id)
            }
            className="rounded-lg bg-red-600 p-2 hover:bg-red-500"
          >
            <Trash2 size={16} />
          </button>

        </div>
      </td>

    </tr>
  );
}