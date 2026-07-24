"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("order_id");

  return (
    <div className="container mx-auto py-24">
      <div className="mx-auto max-w-lg rounded-lg border bg-white p-8 text-center shadow">
        <div className="text-6xl mb-4">🎉</div>

        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for shopping with Aniverse.
        </p>

        {orderId && (
          <div className="mt-6 rounded bg-gray-100 p-4">
            <p className="font-semibold">Order ID</p>
            <p className="break-all">{orderId}</p>
          </div>
        )}

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