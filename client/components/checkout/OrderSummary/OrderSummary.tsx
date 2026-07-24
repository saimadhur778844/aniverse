"use client";

import Image from "next/image";

import Button from "@/components/shared/Button";
import SectionCard from "@/components/shared/SectionCard";

import { CartItem } from "@/types/cart";

type Props = {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  loading: boolean;
  onCheckout: () => void;
};

export default function OrderSummary({
  items,
  subtotal,
  shipping,
  total,
  loading,
  onCheckout,
}: Props) {
  const remaining = Math.max(0, 1999 - subtotal);
  const progress = Math.min((subtotal / 1999) * 100, 100);

  return (
    <div className="sticky top-24">

      <div className="relative">

        {/* Glow */}

        <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 blur-xl" />

        <SectionCard className="relative">

          {/* Header */}

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold text-white">
                Order Summary
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                {items.length} item{items.length > 1 ? "s" : ""}
              </p>

            </div>

            <span className="rounded-full bg-pink-500/10 px-4 py-2 text-sm font-semibold text-pink-400">
              Secure
            </span>

          </div>

          {/* Free Shipping */}

          <div className="mt-8 rounded-2xl border border-[#343454] bg-[#202033] p-5">

            <div className="flex items-center justify-between">

              <span className="text-sm text-white">
                Free Shipping Progress
              </span>

              <span className="text-sm text-pink-400">
                {progress.toFixed(0)}%
              </span>

            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#343454]">

              <div
                style={{ width: `${progress}%` }}
                className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500"
              />

            </div>

            <p className="mt-4 text-sm text-gray-400">

              {remaining === 0
                ? "🎉 Congratulations! You unlocked FREE shipping."
                : `Add ₹${remaining.toLocaleString()} more for FREE shipping.`}

            </p>

          </div>

          {/* Products */}

          <div className="mt-8 space-y-4">

            {items.map((item) => (

              <div
                key={item.product._id}
                className="flex gap-4 rounded-2xl border border-[#343454] bg-[#202033] p-4 transition hover:border-pink-500/40"
              >

                <div className="relative h-16 w-16 overflow-hidden rounded-xl">

                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />

                </div>

                <div className="min-w-0 flex-1">

                  <h3 className="truncate font-semibold text-white">
                    {item.product.name}
                  </h3>

                  <p className="text-sm text-gray-400">
                    Qty: {item.quantity}
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-bold text-pink-400">
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </p>

                </div>

              </div>

            ))}

          </div>

          {/* Totals */}

          <div className="my-8 border-t border-[#343454]" />

          <div className="space-y-5">

            <PriceRow
              title="Subtotal"
              value={`₹${subtotal.toLocaleString()}`}
            />

            <PriceRow
              title="Shipping"
              value={shipping === 0 ? "FREE" : `₹${shipping}`}
            />

            <PriceRow
              title="GST"
              value="Included"
            />

          </div>

          <div className="my-8 border-t border-[#343454]" />

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-400">
                Grand Total
              </p>

              <h2 className="mt-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-4xl font-black text-transparent">
                ₹{total.toLocaleString()}
              </h2>

            </div>

            <span className="rounded-full bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-400">
              Secure
            </span>

          </div>

          <Button
            fullWidth
            onClick={onCheckout}
            disabled={loading}
            className="mt-8 h-16 text-lg"
          >
            {loading
              ? "Processing..."
              : "🔒 Proceed to Secure Payment"}
          </Button>

          {/* Trust */}

          <div className="mt-8 grid grid-cols-2 gap-4">

            <TrustCard
              emoji="🛡️"
              title="Authentic"
            />

            <TrustCard
              emoji="📦"
              title="Packaging"
            />

            <TrustCard
              emoji="💳"
              title="Secure"
            />

            <TrustCard
              emoji="🎧"
              title="Support"
            />

          </div>

        </SectionCard>

      </div>

    </div>
  );
}

function PriceRow({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex justify-between">

      <span className="text-gray-400">
        {title}
      </span>

      <span className="font-semibold text-white">
        {value}
      </span>

    </div>
  );
}

function TrustCard({
  emoji,
  title,
}: {
  emoji: string;
  title: string;
}) {
  return (
    <div className="rounded-2xl border border-[#343454] bg-[#202033] p-4 text-center transition hover:border-pink-500/40">

      <div className="text-3xl">
        {emoji}
      </div>

      <p className="mt-2 font-semibold text-white">
        {title}
      </p>

    </div>
  );
}