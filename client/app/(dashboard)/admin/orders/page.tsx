"use client";

import { useState } from "react";
import { RefreshCw, Search } from "lucide-react";

import OrderTable from "@/components/admin/orders/OrderTable";
import OrderDetailsDrawer from "@/components/admin/orders/OrderDetailsDrawer";

import { useOrders } from "@/hooks";

import type { Order } from "@/types/order";

export default function AdminOrdersPage() {
  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [paymentStatus, setPaymentStatus] =
    useState("");

  const [page, setPage] =
    useState(1);

  const {
    data,
    isLoading,
    refetch,
  } = useOrders({
    page,
    limit: 10,
    search,
    status,
    paymentStatus,
  });

  const orders =
    data?.orders ?? [];

  const pages =
    data?.pages ?? 1;

  const handleViewOrder = (
    id: string
  ) => {
    const order = orders.find(
      (o) => o._id === id
    );

    if (!order) return;

    setSelectedOrder(order);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Orders
          </h1>

          <p className="text-zinc-400">
            Manage all customer orders
          </p>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2 transition hover:bg-pink-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={18}
            className={
              isLoading
                ? "animate-spin"
                : ""
            }
          />

          Refresh
        </button>

      </div>

      {/* Filters */}

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">

        <div className="grid gap-4 lg:grid-cols-3">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-3 text-zinc-500"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setPage(1);
                  refetch();
                }
              }}
              placeholder="Search order, customer..."
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 py-2 pl-10 pr-3 outline-none transition focus:border-pink-500"
            />

          </div>

          <select
            value={status}
            onChange={(e) => {
              setStatus(
                e.target.value
              );

              setPage(1);
            }}
            className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
          >
            <option value="">
              All Status
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Confirmed">
              Confirmed
            </option>

            <option value="Packed">
              Packed
            </option>

            <option value="Shipped">
              Shipped
            </option>

            <option value="Delivered">
              Delivered
            </option>

            <option value="Cancelled">
              Cancelled
            </option>

          </select>

          <select
            value={paymentStatus}
            onChange={(e) => {
              setPaymentStatus(
                e.target.value
              );

              setPage(1);
            }}
            className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
          >
            <option value="">
              All Payments
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Paid">
              Paid
            </option>

            <option value="Failed">
              Failed
            </option>

            <option value="Refunded">
              Refunded
            </option>

          </select>

        </div>

      </div>

      {/* Table */}

      {isLoading ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 py-24">

          <div className="flex items-center justify-center gap-3 text-zinc-400">

            <RefreshCw
              size={22}
              className="animate-spin"
            />

            Loading orders...

          </div>

        </div>
      ) : (
        <OrderTable
          orders={orders}
          onSelect={handleViewOrder}
        />
      )}

      {/* Pagination */}

      <div className="flex items-center justify-between">

        <button
          disabled={page === 1}
          onClick={() =>
            setPage((p) => p - 1)
          }
          className="rounded-lg border border-zinc-700 px-4 py-2 transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <span className="text-zinc-400">
          Page {page} of {pages}
        </span>

        <button
          disabled={page === pages}
          onClick={() =>
            setPage((p) => p + 1)
          }
          className="rounded-lg border border-zinc-700 px-4 py-2 transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>

      </div>

      <OrderDetailsDrawer
        order={selectedOrder}
        open={drawerOpen}
        onClose={() =>
          setDrawerOpen(false)
        }
        onUpdated={refetch}
      />

    </div>
  );
}