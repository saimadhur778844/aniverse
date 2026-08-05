"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import paymentService from "@/services/paymentService";

import type { Order } from "@/types/order";

export default function PaymentSuccessPage() {
  const searchParams =
    useSearchParams();

  const gatewayOrderId =
    searchParams.get("order_id");

  const [loading, setLoading] =
    useState(true);

  const [order, setOrder] =
    useState<Order | null>(null);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!gatewayOrderId) {
      setError("Missing order id.");

      setLoading(false);

      return;
    }

    verifyPayment();
  }, [gatewayOrderId]);

  async function verifyPayment() {
    try {
      const response =
        await paymentService.verifyPayment(
          gatewayOrderId!
        );

      setOrder(response.order);
    } catch (err: any) {
      setError(
        err.message ??
          "Unable to verify payment."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-24">

        <div className="mx-auto max-w-lg rounded-xl border bg-white p-10 text-center shadow">

          <div className="text-5xl">
            ⏳
          </div>

          <h1 className="mt-6 text-3xl font-bold">
            Verifying Payment
          </h1>

          <p className="mt-4 text-gray-600">
            Please wait while we confirm your payment.
          </p>

        </div>

      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-24">

        <div className="mx-auto max-w-lg rounded-xl border bg-white p-10 text-center shadow">

          <div className="text-6xl">
            ⚠️
          </div>

          <h1 className="mt-6 text-3xl font-bold text-red-600">
            Verification Failed
          </h1>

          <p className="mt-4 text-gray-600">
            {error}
          </p>

          <Link
            href="/orders"
            className="mt-8 inline-block rounded bg-black px-6 py-3 text-white"
          >
            View Orders
          </Link>

        </div>

      </div>
    );
  }
    return (
    <div className="container mx-auto py-24">

      <div className="mx-auto max-w-2xl rounded-xl border bg-white p-10 shadow">

        <div className="text-center">

          <div className="text-7xl">
            🎉
          </div>

          <h1 className="mt-6 text-4xl font-bold text-green-600">
            Payment Successful
          </h1>

          <p className="mt-4 text-gray-600">
            Thank you for shopping with
            <span className="font-semibold">
              {" "}Aniverse
            </span>.
          </p>

        </div>

        <div className="mt-10 rounded-xl bg-gray-100 p-6">

          <InfoRow
            label="Order Number"
            value={order?.orderNumber}
          />

          <InfoRow
            label="Payment Status"
            value={order?.payment.status}
          />

          <InfoRow
            label="Order Status"
            value={order?.orderStatus}
          />

          <InfoRow
            label="Amount Paid"
            value={`₹${order?.total.toLocaleString()}`}
          />

          <InfoRow
            label="Payment Method"
            value={
              order?.payment.method ??
              "Cashfree"
            }
          />

          {order?.payment
            ?.gatewayPaymentId && (
            <InfoRow
              label="Payment ID"
              value={
                order.payment
                  .gatewayPaymentId
              }
            />
          )}

          {order?.coupon && (
            <InfoRow
              label="Coupon"
              value={`${order.coupon.code} (${order.coupon.value}${
                order.coupon.type ===
                "percentage"
                  ? "%"
                  : "₹"
              })`}
            />
          )}

        </div>

        <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-5">

          <h3 className="font-semibold text-green-700">
            What's next?
          </h3>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">

            <li>
              Your order has been
              received.
            </li>

            <li>
              We'll begin processing it
              shortly.
            </li>

            <li>
              You'll receive shipping
              updates once your order
              is dispatched.
            </li>

          </ul>

        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <Link
            href="/orders"
            className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-zinc-800"
          >
            View Orders
          </Link>

          <Link
            href="/products"
            className="rounded-lg border px-6 py-3 transition hover:bg-gray-100"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) {
  return (
    <div className="flex items-center justify-between border-b py-3 last:border-0">

      <span className="font-medium text-gray-600">
        {label}
      </span>

      <span className="font-semibold text-gray-900 break-all">
        {value ?? "-"}
      </span>

    </div>
  );
}