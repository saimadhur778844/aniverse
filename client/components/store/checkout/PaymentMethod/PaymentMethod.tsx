"use client";

import {
  CreditCard,
  Smartphone,
  Wallet,
  ShieldCheck,
  Zap,
} from "lucide-react";

import SectionCard from "@/components/shared/SectionCard";

export default function PaymentMethod() {
  return (
    <SectionCard className="relative overflow-hidden">

      {/* Glow */}

      <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative">

        <div className="mb-8 flex items-center gap-5">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20">

            <CreditCard className="text-emerald-400" />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Payment Method
            </h2>

            <p className="text-sm text-gray-400">
              Secure payments powered by Cashfree.
            </p>

          </div>

        </div>

        {/* Main Card */}

        <div className="rounded-3xl border border-[#343454] bg-gradient-to-br from-[#202033] to-[#171726] p-7">

          <div className="flex items-start justify-between gap-6">

            <div>

              <h3 className="text-xl font-bold text-white">
                Cashfree Payments
              </h3>

              <p className="mt-2 text-gray-400">
                Pay securely using your preferred payment method.
              </p>

            </div>

            <span className="rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-400">
              Recommended
            </span>

          </div>

          {/* Payment Options */}

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">

            <MethodCard
              icon={<Smartphone size={26} />}
              title="UPI"
            />

            <MethodCard
              icon={<CreditCard size={26} />}
              title="Cards"
            />

            <MethodCard
              icon={<Wallet size={26} />}
              title="Wallet"
            />

            <MethodCard
              icon={<CreditCard size={26} />}
              title="Banking"
            />

          </div>

          {/* Security */}

          <div className="mt-8 grid gap-4 md:grid-cols-2">

            <InfoBadge
              icon={<ShieldCheck size={18} />}
              title="256-bit SSL Encryption"
            />

            <InfoBadge
              icon={<Zap size={18} />}
              title="Instant Confirmation"
            />

          </div>

        </div>

      </div>

    </SectionCard>
  );
}

function MethodCard({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="rounded-2xl border border-[#343454] bg-[#171726] p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-pink-500/40 hover:shadow-lg hover:shadow-pink-500/10">

      <div className="mb-3 flex justify-center text-pink-400">
        {icon}
      </div>

      <p className="font-semibold text-white">
        {title}
      </p>

    </div>
  );
}

function InfoBadge({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#343454] bg-[#171726] px-5 py-4">

      <div className="text-emerald-400">
        {icon}
      </div>

      <span className="text-sm font-medium text-gray-300">
        {title}
      </span>

    </div>
  );
}