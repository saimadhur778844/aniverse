"use client";

import { useState } from "react";
import Link from "next/link";
import { load } from "@cashfreepayments/cashfree-js";

import {
  retryPayment,
} from "@/services/paymentService";

import { notify } from "@/utils/toast";

export default function PaymentFailedPage() {
  const [loading, setLoading] =
    useState(false);

  const handleRetry =
    async () => {
      const orderId =
        sessionStorage.getItem(
          "pendingOrder"
        );

      if (!orderId) {
        notify.error(
          "No pending order found."
        );
        return;
      }

      try {
        setLoading(true);

        const loadingToast =
          notify.loading(
            "Preparing payment..."
          );

        const session =
          await retryPayment(
            orderId
          );

        const cashfree =
          await load({
            mode:
              process.env
                .NEXT_PUBLIC_CASHFREE_ENV ===
              "PRODUCTION"
                ? "production"
                : "sandbox",
          });

        if (!cashfree) {
          throw new Error(
            "Unable to initialize Cashfree."
          );
        }

        notify.dismiss(
          loadingToast
        );

        await cashfree.checkout({
          paymentSessionId:
            session.payment_session_id,

          redirectTarget:
            "_self",
        });
      } catch (error: any) {
        console.error(error);

        notify.error(
          error.message ??
            "Unable to retry payment."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <main className="min-h-screen bg-[#09090f] flex items-center justify-center px-6">
      <div className="w-full max-w-xl rounded-3xl border border-zinc-800 bg-zinc-950 p-10 text-center shadow-2xl">

        <div className="text-7xl">
          ❌
        </div>

        <h1 className="mt-6 text-4xl font-bold text-red-500">
          Payment Failed
        </h1>

        <p className="mt-4 text-zinc-400">
          Your payment could not be completed.
        </p>

        <p className="mt-2 text-sm text-zinc-500">
          Your order is still safe.
          You can retry the payment without
          creating another order.
        </p>

        <div className="mt-10 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-5 text-left">

          <h3 className="font-semibold text-yellow-400">
            Possible reasons
          </h3>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
            <li>
              Payment was cancelled.
            </li>

            <li>
              UPI request expired.
            </li>

            <li>
              Bank declined the
              transaction.
            </li>

            <li>
              Temporary network issue.
            </li>
          </ul>

        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <button
            onClick={handleRetry}
            disabled={loading}
            className="rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Preparing..."
              : "Retry Payment"}
          </button>

          <Link
            href="/products"
            className="rounded-xl border border-zinc-700 px-6 py-3 font-semibold text-white transition hover:bg-zinc-900"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    </main>
  );
}