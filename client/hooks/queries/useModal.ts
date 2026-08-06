"use client";

import { useState } from "react";

export default function useModal<T>() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] =
    useState<T | null>(null);

  const show = (item?: T) => {
    setSelected(item ?? null);
    setOpen(true);
  };

  const close = () => {
    setSelected(null);
    setOpen(false);
  };

  return {
    open,
    selected,
    show,
    close,
  };
}