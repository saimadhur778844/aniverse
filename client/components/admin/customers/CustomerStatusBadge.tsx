"use client";

interface Props {
  orders: number;
  spent: number;
}

export default function CustomerStatusBadge({
  orders,
  spent,
}: Props) {
  if (spent >= 50000) {
    return (
      <span className="rounded-full bg-purple-500/15 px-3 py-1 text-xs font-medium text-purple-400">
        VIP
      </span>
    );
  }

  if (orders >= 1) {
    return (
      <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-400">
        Active
      </span>
    );
  }

  return (
    <span className="rounded-full bg-zinc-700 px-3 py-1 text-xs font-medium text-zinc-300">
      New
    </span>
  );
}