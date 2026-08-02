"use client";

import DataTable from "@/components/admin/shared/DataTable";

import type { Coupon } from "@/types/coupon";

import CouponRow from "./CouponRow";

interface Props {
  coupons: Coupon[];
  loading: boolean;
  onEdit: (coupon: Coupon) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function CouponTable({
  coupons,
  loading,
  onEdit,
  onDelete,
  onToggle,
}: Props) {
  return (
    <DataTable
      columns={[
        "Code",
        "Discount",
        "Minimum Order",
        "Usage",
        "Status",
        "Expiry",
        "Actions",
      ]}
      data={coupons}
      loading={loading}
      emptyMessage="No coupons found."
      renderRow={(coupon) => (
        <CouponRow
          key={coupon._id}
          coupon={coupon}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      )}
    />
  );
}