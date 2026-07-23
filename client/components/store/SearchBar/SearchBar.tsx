"use client";

import { useEffect, useState } from "react";

import styles from "./SearchBar.module.css";

interface SearchBarProps {
  value: string;
  onSearch: (value: string) => void;
}

export default function SearchBar({
  value,
  onSearch,
}: SearchBarProps) {
  const [search, setSearch] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, onSearch]);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className={styles.input}
    />
  );
}