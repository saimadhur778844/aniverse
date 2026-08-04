"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#09090f] px-6">
      <div className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-950 p-10 text-center shadow-2xl">

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
          <AlertTriangle
            size={42}
            className="text-red-500"
          />
        </div>

        <h1 className="text-3xl font-bold text-white">
          Oops!
        </h1>

        <p className="mt-4 text-zinc-400">
          Something went wrong while loading this page.
        </p>

        <p className="mt-2 text-sm text-zinc-500">
          Please try again. If the problem continues,
          contact support.
        </p>

        <button
          onClick={reset}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-500"
        >
          <RefreshCw size={18} />
          Try Again
        </button>
      </div>
    </main>
  );
}