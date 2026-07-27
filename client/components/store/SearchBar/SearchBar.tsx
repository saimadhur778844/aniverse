"use client";

import { useEffect, useState } from "react";

import styles from "./SearchBar.module.css";

interface SearchBarProps {
  value: string;
  onSearch: (value: string) => void;
  placeholder?: string;
}

const DEBOUNCE_DELAY = 300;

export default function SearchBar({
  value,
  onSearch,
  placeholder = "Search anime figures, statues...",
}: SearchBarProps) {
  const [search, setSearch] =
    useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      onSearch(search.trim());
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [search, onSearch]);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  const clearSearch = () => {
    setSearch("");
    onSearch("");
  };

  return (
    <div className={styles.container}>
      <span
        className={styles.icon}
        aria-hidden="true"
      >
        🔍
      </span>

      <input
        type="search"
        value={search}
        placeholder={placeholder}
        aria-label="Search products"
        autoComplete="off"
        spellCheck={false}
        className={styles.input}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {search && (
        <button
          type="button"
          className={styles.clear}
          onClick={clearSearch}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}