"use client";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortDropdown({
  value,
  onChange,
}: SortDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-lg px-4 py-2 bg-white"
    >
      <option value="newest">Newest</option>
      <option value="price-asc">
        Price: Low to High
      </option>
      <option value="price-desc">
        Price: High to Low
      </option>
      <option value="rating">
        Highest Rated
      </option>
    </select>
  );
}