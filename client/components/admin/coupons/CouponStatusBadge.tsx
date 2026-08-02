"use client";

interface Props {
  active: boolean;
  expiryDate: string;
}

export default function CouponStatusBadge({
  active,
  expiryDate,
}: Props) {
  const expired =
    new Date(expiryDate) < new Date();

  if (!active) {
    return (
      <span className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-medium text-red-400">
        Disabled
      </span>
    );
  }

  if (expired) {
    return (
      <span className="rounded-full bg-orange-500/15 px-3 py-1 text-xs font-medium text-orange-400">
        Expired
      </span>
    );
  }

  return (
    <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-400">
      Active
    </span>
  );
}