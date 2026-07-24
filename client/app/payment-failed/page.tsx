"use client";

import Link from "next/link";

export default function PaymentFailedPage() {
  return (
    <div className="container mx-auto py-24">
      <div className="mx-auto max-w-lg rounded-lg border bg-white p-8 text-center shadow">
        <div className="text-6xl mb-4">❌</div>

        <h1 className="text-3xl font-bold text-red-600">
          Payment Failed
        </h1>

        <p className="mt-4 text-gray-600">
          Your payment could not be completed.
        </p>

        <Link
          href="/checkout"
          className="mt-8 inline-block rounded bg-black px-6 py-3 text-white"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}