"use client";

import { Search } from "lucide-react";

import styles from "./OrderSearch.module.css";

interface OrderSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function OrderSearch({
  value,
  onChange,
}: OrderSearchProps) {
  return (
    <div className={styles.search}>
      <Search size={18} />

      <input
        type="text"
        placeholder="Search by order number or product..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}