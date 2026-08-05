"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import {
  Download,
  Loader2,
  Save,
  X,
} from "lucide-react";

import { Order } from "@/types/order";

import adminOrderService from "@/services/adminOrderService";

import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";

interface Props {
  order: Order | null;
  open: boolean;
  onClose: () => void;
  onUpdated?: () => void;
}
const STATUSES = [
  "Pending",
  "Confirmed",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled",
] as const;

export default function OrderDetailsDrawer({
  order,
  open,
  onClose,
  onUpdated,
}: Props) {
  const [status, setStatus] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    if (order) {
      setStatus(order.orderStatus);
    }
  }, [order]);

async function handleStatusUpdate() {
  if (!order) return;

  try {
    setSaving(true);

    await adminOrderService.updateStatus(
      order._id,
      status
    );

    onUpdated?.();

    setTimeout(() => {
      onClose();
    }, 400);

  } catch (error) {
    console.error(error);
  } finally {
    setSaving(false);
  }
}

  if (!order) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        open
          ? "visible"
          : "invisible"
      }`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/70 transition-opacity ${
          open
            ? "opacity-100"
            : "opacity-0"
        }`}
      />

      <div
        className={`absolute right-0 top-0 h-full w-full max-w-2xl overflow-y-auto border-l border-zinc-800 bg-zinc-950 transition-transform duration-300 ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-800 bg-zinc-950 p-6">

          <div>

            <h2 className="text-2xl font-bold">
              {order.orderNumber}
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              {new Date(
                order.createdAt
              ).toLocaleString()}
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-zinc-800"
          >
            <X />
          </button>

        </div>

        <div className="space-y-8 p-6">
                    {/* Customer */}

          <section>

            <h3 className="mb-3 text-lg font-semibold">
              Customer
            </h3>

            {typeof order.user === "string" ? (
              <p className="text-zinc-400">
                Customer information unavailable
              </p>
            ) : (
              <div className="space-y-2 rounded-xl border border-zinc-800 bg-zinc-900 p-4">

                <div className="flex justify-between">
                  <span className="text-zinc-400">
                    Name
                  </span>

                  <span>
                    {order.user.name}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400">
                    Email
                  </span>

                  <span>
                    {order.user.email}
                  </span>
                </div>

              </div>
            )}

          </section>

          {/* Shipping */}

          <section>

            <h3 className="mb-3 text-lg font-semibold">
              Shipping Address
            </h3>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 space-y-2">

              <p className="font-semibold">
                {order.shippingAddress.fullName}
              </p>

              <p>
                {order.shippingAddress.address}
              </p>

              <p>
                {order.shippingAddress.city},{" "}
                {order.shippingAddress.state}
              </p>

              <p>
                {order.shippingAddress.pincode}
              </p>

              <p>
                {order.shippingAddress.country}
              </p>

              <p>
                {order.shippingAddress.phone}
              </p>

            </div>

          </section>

          {/* Products */}

          <section>

            <h3 className="mb-3 text-lg font-semibold">
              Ordered Products
            </h3>

            <div className="space-y-4">

              {order.items.map((item) => (

                <div
                  key={
                    typeof item.product === "string"
                      ? item.product
                      : item.product._id
                  }
                  className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4"
                >

                  <div className="relative h-20 w-20 overflow-hidden rounded-lg">

                    {item.image ? (

                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />

                    ) : (

                      <div className="flex h-full items-center justify-center bg-zinc-800 text-xs text-zinc-500">
                        No Image
                      </div>

                    )}

                  </div>

                  <div className="flex flex-1 flex-col justify-center">

                    <h4 className="font-semibold">
                      {item.name}
                    </h4>

                    <p className="text-sm text-zinc-400">
                      Quantity: {item.quantity}
                    </p>

                    <p className="mt-1 font-semibold">
                      ₹
                      {item.price.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </section>

          {/* Payment */}

          <section>

            <h3 className="mb-3 text-lg font-semibold">
              Payment
            </h3>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 space-y-3">

              <div className="flex justify-between items-center">

                <span className="text-zinc-400">
                  Status
                </span>

                <PaymentStatusBadge
                  status={order.payment.status}
                />

              </div>

              <div className="flex justify-between">

                <span className="text-zinc-400">
                  Method
                </span>

                <span>
                  {order.payment.method ??
                    "Cashfree"}
                </span>

              </div>

              {order.payment.gatewayPaymentId && (

                <div className="flex justify-between gap-4">

                  <span className="text-zinc-400">
                    Payment ID
                  </span>

                  <span className="max-w-xs break-all text-right text-xs text-zinc-400">
                    {order.payment.gatewayPaymentId}
                  </span>

                </div>

              )}

            </div>

          </section>

          {/* Summary */}

          <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">

            <h3 className="mb-4 text-lg font-semibold">
              Order Summary
            </h3>

            <div className="space-y-3">

              <div className="flex justify-between">
                <span>Subtotal</span>

                <span>
                  ₹
                  {order.subtotal.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>

                <span>
                  ₹
                  {order.shippingCharge.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>

                <span>
                  ₹
                  {order.tax.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>

                <span>
                  ₹
                  {order.discount.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>

              <div className="mt-4 flex justify-between border-t border-zinc-700 pt-4 text-lg font-bold">

                <span>Total</span>

                <span>
                  ₹
                  {order.total.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

            </div>

          </section>
                    {/* Status */}

          <section>

            <h3 className="mb-3 text-lg font-semibold">
              Order Status
            </h3>

            <div className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">

              <OrderStatusBadge
                status={status as Order["orderStatus"]}
              />

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:border-pink-500"
              >
                {STATUSES.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>

              <button
                onClick={handleStatusUpdate}
                disabled={
                  saving ||
                  status === order.orderStatus
                }
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-pink-600 py-3 font-semibold transition hover:bg-pink-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={18} />

                    Update Status
                  </>
                )}
              </button>

            </div>

          </section>

          {/* Actions */}

          <section>

            <h3 className="mb-3 text-lg font-semibold">
              Actions
            </h3>

            <div className="grid gap-3">

              <button
                onClick={() =>
                  window.print()
                }
                className="flex items-center justify-center gap-2 rounded-lg border border-zinc-700 py-3 transition hover:bg-zinc-900"
              >
                <Download size={18} />

                Download Invoice
              </button>

              <button
                onClick={onClose}
                className="rounded-lg border border-zinc-700 py-3 transition hover:bg-zinc-900"
              >
                Close
              </button>

            </div>

          </section>

        </div>

      </div>

    </div>
  );
}