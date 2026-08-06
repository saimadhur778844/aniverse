"use client";

import { useState } from "react";

export default function useCrud<T>() {
  const [items, setItems] =
    useState<T[]>([]);

  const [loading, setLoading] =
    useState(true);

  return {
    items,
    setItems,

    loading,
    setLoading,
  };
}