import type { PaymentStatus } from "@/types/order";

interface Props {
  status: PaymentStatus;
}

const colors: Record<PaymentStatus, string> = {
  Pending:
    "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",

  Paid:
    "bg-green-500/20 text-green-300 border border-green-500/30",

  Failed:
    "bg-red-500/20 text-red-300 border border-red-500/30",

  Refunded:
    "bg-purple-500/20 text-purple-300 border border-purple-500/30",
};

export default function PaymentStatusBadge({
  status,
}: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        colors[status] ??
        "bg-zinc-700 text-zinc-300"
      }`}
    >
      {status}
    </span>
  );
}