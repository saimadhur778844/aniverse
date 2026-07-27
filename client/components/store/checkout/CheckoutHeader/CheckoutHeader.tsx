"use client";

import { ShieldCheck } from "lucide-react";

export default function CheckoutHeader() {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-[#2b2b45] bg-gradient-to-br from-[#171726] via-[#1d1d30] to-[#111119] px-8 py-14">

      {/* Background Glow */}

      <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />

      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-6">

        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-5 py-2 text-sm font-semibold text-pink-300">

          <ShieldCheck size={18} />

          Secure Checkout

        </span>

        <div>

          <h1 className="text-5xl font-black tracking-tight text-white lg:text-6xl">
            Complete Your
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
              {" "}
              Order
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-400">
            You're just one step away from owning your next collectible.
            Every order is packed with premium collector protection and
            processed securely through Cashfree Payments.
          </p>

        </div>

        {/* Features */}

        <div className="mt-4 flex flex-wrap gap-4">

          <Feature text="100% Authentic Merchandise" />

          <Feature text="Collector Safe Packaging" />

          <Feature text="Secure Cashfree Payments" />

          <Feature text="Fast Dispatch" />

        </div>

      </div>

    </section>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-[#343454] bg-[#202033]/70 px-5 py-3 backdrop-blur-sm transition hover:border-pink-500/40">

      <div className="flex items-center gap-3">

        <div className="h-2.5 w-2.5 rounded-full bg-pink-400" />

        <span className="text-sm font-medium text-gray-200">
          {text}
        </span>

      </div>

    </div>
  );
}