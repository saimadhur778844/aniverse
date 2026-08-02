"use client";

import { useState } from "react";

export default function useConfirm() {
  const [id, setId] =
    useState<string | null>(null);

  return {
    id,
    open: !!id,

    ask(id: string) {
      setId(id);
    },

    cancel() {
      setId(null);
    },
  };
}