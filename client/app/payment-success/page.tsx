"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import paymentService from "@/services/paymentService";

import { useCart } from "@/context/CartContext/CartContext";

import type { Order } from "@/types/order";

export default function PaymentSuccessPage() {
  const searchParams =
    useSearchParams();

  const gatewayOrderId =
    searchParams.get("order_id");

  const { clearCart } = useCart();

  const [loading, setLoading] =
    useState(true);

  const [verified, setVerified] =
    useState(false);

  const [order, setOrder] =
    useState<Order | null>(null);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (
      !gatewayOrderId ||
      verified
    ) {
      return;
    }

    setVerified(true);

    verifyPayment();
  }, [gatewayOrderId, verified]);

  async function verifyPayment() {
    if (!gatewayOrderId) {
      setError("Missing order id.");
      setLoading(false);
      return;
    }

    try {
      const response =
        await paymentService.verifyPayment(
          gatewayOrderId
        );

      setOrder(response.order);

      /*
      ----------------------------------
      Payment verified successfully
      ----------------------------------
      */

      clearCart();

      sessionStorage.removeItem(
        "pendingOrder"
      );
    } catch (err: any) {
      setError(
        err.message ??
          "Unable to verify payment."
      );
    } finally {
      setLoading(false);
    }
  }

  /*
  ----------------------------------
  Loading
  ----------------------------------
  */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#09090f] flex items-center justify-center px-6">
        <div className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-950 p-10 text-center shadow-2xl">

          <div className="text-6xl">
            ⏳
          </div>

          <h1 className="mt-6 text-3xl font-bold text-white">
            Verifying Payment
          </h1>

          <p className="mt-4 text-zinc-400">
            Please wait while we confirm
            your payment.
          </p>

        </div>
      </main>
    );
  }

  /*
  ----------------------------------
  Error
  ----------------------------------
  */

  if (error) {
    return (
      <main className="min-h-screen bg-[#09090f] flex items-center justify-center px-6">
        <div className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-950 p-10 text-center shadow-2xl">

          <div className="text-6xl">
            ⚠️
          </div>

          <h1 className="mt-6 text-3xl font-bold text-red-500">
            Verification Failed
          </h1>

          <p className="mt-4 text-zinc-400">
            {error}
          </p>

          <Link
            href="/"
            className="mt-8 inline-block rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-500"
          >
            Back to Home
          </Link>

        </div>
      </main>
    );
  }

  /*
  ----------------------------------
  Success
  ----------------------------------
  */

  return (
    <main className="min-h-screen bg-[#09090f] px-6 py-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-950 p-10 shadow-2xl">

        <div className="text-center">

          <div className="text-7xl">
            🎉
          </div>

          <h1 className="mt-6 text-4xl font-bold text-green-500">
            Payment Successful
          </h1>

          <p className="mt-4 text-zinc-400">
            Thank you for shopping with{" "}
            <span className="font-semibold text-white">
              Aniverse
            </span>
          </p>

        </div>

        <div className="mt-10 rounded-2xl bg-zinc-900 p-6">

          <InfoRow
            label="Order Number"
            value={order?.orderNumber}
          />

          <InfoRow
            label="Payment Status"
            value={
              order?.payment.status
            }
          />

          <InfoRow
            label="Order Status"
            value={
              order?.orderStatus
            }
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

        <div className="mt-8 rounded-2xl border border-green-500/30 bg-green-500/10 p-5">

          <h3 className="font-semibold text-green-400">
            What's Next?
          </h3>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">

            <li>
              Your order has been
              successfully placed.
            </li>

            <li>
              Our team will begin
              processing it shortly.
            </li>

            <li>
              You'll receive shipping
              updates by email.
            </li>

          </ul>

        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <Link
            href="/products"
            className="rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-500"
          >
            Continue Shopping
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-zinc-700 px-6 py-3 font-semibold text-white transition hover:bg-zinc-900"
          >
            Back to Home
          </Link>

        </div>

      </div>
    </main>
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
    <div className="flex items-center justify-between border-b border-zinc-800 py-4 last:border-0">

      <span className="font-medium text-zinc-400">
        {label}
      </span>

      <span className="break-all font-semibold text-white">
        {value ?? "-"}
      </span>

    </div>
  );
}