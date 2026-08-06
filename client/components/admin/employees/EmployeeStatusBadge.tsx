interface Props {
  active: boolean;
}

export default function EmployeeStatusBadge({
  active,
}: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
        active
          ? "border-green-500/30 bg-green-500/20 text-green-300"
          : "border-red-500/30 bg-red-500/20 text-red-300"
      }`}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
}   