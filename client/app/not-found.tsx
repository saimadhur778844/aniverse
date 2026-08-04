"use client";

import Link from "next/link";
import { Home, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#09090f] px-6">
      <div className="w-full max-w-xl rounded-3xl border border-zinc-800 bg-zinc-950 p-10 text-center shadow-2xl">

        <div className="mb-6 text-8xl">
          🎌
        </div>

        <h1 className="text-5xl font-extrabold text-white">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-white">
          Page Not Found
        </h2>

        <p className="mt-4 text-zinc-400">
          Looks like this page disappeared into another anime universe.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-500"
          >
            <Home size={18} />
            Home
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 font-semibold text-white transition hover:border-pink-500 hover:bg-zinc-800"
          >
            <ShoppingBag size={18} />
            Browse Products
          </Link>

        </div>

      </div>
    </main>
  );
}