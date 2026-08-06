"use client";

import Image from "next/image";

import SectionCard from "@/components/shared/SectionCard";
import LoadingButton from "@/components/auth/LoadingButton/LoadingButton";
import { getPrimaryImage } from "@/utils/product";

import { CartItem } from "@/types/cart";

type Props = {
  items: CartItem[];

  subtotal: number;

  shipping: number;

  discount: number;

  couponCode: string;

  couponLoading: boolean;

  appliedCoupon: string;

  onCouponChange: (
    value: string
  ) => void;

  onApplyCoupon: () => void;

  onRemoveCoupon: () => void;

  total: number;

  loading: boolean;

  onCheckout: () => void;
};

export default function OrderSummary({
  items,

  subtotal,

  shipping,

  discount,

  couponCode,

  couponLoading,

  appliedCoupon,

  onCouponChange,

  onApplyCoupon,

  onRemoveCoupon,

  total,

  loading,

  onCheckout,
}: Props) {
  const remaining = Math.max(
    0,
    1999 - subtotal
  );

  const progress = Math.min(
    (subtotal / 1999) * 100,
    100
  );

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
                {items.length} item
                {items.length > 1
                  ? "s"
                  : ""}
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
                style={{
                  width: `${progress}%`,
                }}
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
                     src={getPrimaryImage(item.product)}
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
                       ₹
                       {(
                         item.product.sellingPrice *
                         item.quantity
                       ).toLocaleString()}
                     </p>

                </div>

              </div>

            ))}

          </div>
                    {/* Coupon */}

          <div className="mt-8 rounded-2xl border border-[#343454] bg-[#202033] p-5">

            <h3 className="mb-4 text-lg font-semibold text-white">
              Have a Coupon?
            </h3>

            <div className="flex gap-3">

              <input
                value={couponCode}
                onChange={(e) =>
                  onCouponChange(
                    e.target.value.toUpperCase()
                  )
                }
                placeholder="Enter coupon code"
                className="flex-1 rounded-xl border border-[#343454] bg-[#171726] px-4 py-3 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-pink-500"
              />

              {appliedCoupon ? (

                <button
                  type="button"
                  onClick={onRemoveCoupon}
                  className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-500"
                >
                  Remove
                </button>

              ) : (

                <LoadingButton
                  type="button"
                  loading={couponLoading}
                  loadingText="Applying..."
                  onClick={onApplyCoupon}
                  className="rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:from-pink-500 hover:to-purple-500"
                >
                  Apply
                </LoadingButton>

              )}

            </div>

            {appliedCoupon && (

              <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">

                <p className="text-sm font-semibold text-emerald-400">
                  ✓ Coupon "{appliedCoupon}" applied successfully
                </p>

              </div>

            )}

          </div>

          {/* Divider */}

          <div className="my-8 border-t border-[#343454]" />

          {/* Totals */}

          <div className="space-y-5">

            <PriceRow
              title="Subtotal"
              value={`₹${subtotal.toLocaleString()}`}
            />

            <PriceRow
              title="Shipping"
              value={
                shipping === 0
                  ? "FREE"
                  : `₹${shipping.toLocaleString()}`
              }
            />

            {discount > 0 && (

              <PriceRow
                title="Discount"
                value={`-₹${discount.toLocaleString()}`}
              />

            )}

            <PriceRow
              title="GST"
              value="Included"
            />

          </div>

          <div className="my-8 border-t border-[#343454]" />

          {/* Grand Total */}

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
                    {/* Checkout Button */}

          <LoadingButton
            type="button"
            loading={loading}
            loadingText="Preparing Checkout..."
            onClick={onCheckout}
            className="mt-8 h-16 w-full rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-pink-500/30"
          >
            🔒 Proceed to Secure Payment
          </LoadingButton>

          <p className="mt-4 text-center text-xs text-gray-500">
            Your payment is encrypted and securely processed through
            Cashfree Payments.
          </p>

          {/* Trust Section */}

          <div className="mt-10">

            <h3 className="mb-5 text-center text-sm font-semibold uppercase tracking-wider text-gray-400">
              Why Shop With Aniverse?
            </h3>

            <div className="grid grid-cols-2 gap-4">

              <TrustCard
                emoji="🛡️"
                title="100% Authentic"
                subtitle="Official licensed collectibles"
              />

              <TrustCard
                emoji="📦"
                title="Premium Packaging"
                subtitle="Extra-safe packing for figures"
              />

              <TrustCard
                emoji="💳"
                title="Secure Payments"
                subtitle="Protected by Cashfree"
              />

              <TrustCard
                emoji="🎧"
                title="24×7 Support"
                subtitle="We're here whenever you need us"
              />

            </div>

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
    <div className="flex items-center justify-between">

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
  subtitle,
}: {
  emoji: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-2xl border border-[#343454] bg-[#202033] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/10">

      <div className="text-4xl">
        {emoji}
      </div>

      <h4 className="mt-3 font-semibold text-white">
        {title}
      </h4>

      <p className="mt-2 text-xs leading-5 text-gray-400">
        {subtitle}
      </p>

    </div>
  );
}