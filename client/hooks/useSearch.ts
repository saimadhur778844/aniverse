"use client";

import { useState } from "react";

export default function useSearch(
  initial = ""
) {
  const [search, setSearch] =
    useState(initial);

  return {
    search,
    setSearch,
  };
}