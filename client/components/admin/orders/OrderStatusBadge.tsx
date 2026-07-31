interface Props {
  status: string;
}

const colors: Record<string, string> = {
  Pending:
    "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",

  Processing:
    "bg-blue-500/20 text-blue-300 border border-blue-500/30",

  Shipped:
    "bg-purple-500/20 text-purple-300 border border-purple-500/30",

  Delivered:
    "bg-green-500/20 text-green-300 border border-green-500/30",

  Cancelled:
    "bg-red-500/20 text-red-300 border border-red-500/30",
};

export default function OrderStatusBadge({
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