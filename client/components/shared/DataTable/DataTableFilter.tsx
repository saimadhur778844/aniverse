"use client";

interface Option {
  label: string;

  value: string;
}

interface Props {
  value: string;

  onChange(value: string): void;

  options: Option[];
}

export default function DataTableFilter({
  value,
  onChange,
  options,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-white outline-none transition focus:border-pink-500"
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}