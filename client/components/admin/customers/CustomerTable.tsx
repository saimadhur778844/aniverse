"use client";

import DataTable from "@/components/admin/shared/DataTable";

import type { Customer } from "@/types/customer";

import CustomerRow from "./CustomerRow";

interface Props {
  customers: Customer[];
  loading: boolean;
  onView: (id: string) => void;
}

export default function CustomerTable({
  customers,
  loading,
  onView,
}: Props) {
  return (
    <DataTable
      columns={[
        "Customer",
        "Orders",
        "Spent",
        "Average",
        "Status",
        "Joined",
        "Actions",
      ]}
      data={customers}
      loading={loading}
      emptyMessage="No customers found."
      renderRow={(customer) => (
        <CustomerRow
          key={customer._id}
          customer={customer}
          onView={onView}
        />
      )}
    />
  );
}