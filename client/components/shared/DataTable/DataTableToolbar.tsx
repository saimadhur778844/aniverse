"use client";

import { ReactNode } from "react";

interface Props {
  search?: ReactNode;

  filters?: ReactNode;

  actions?: ReactNode;
}

export default function DataTableToolbar({
  search,

  filters,

  actions,
}: Props) {
  return (
    <div className="flex flex-col gap-4 border-b border-zinc-800 p-5 lg:flex-row lg:items-center lg:justify-between">

      <div className="flex flex-1 gap-3">

        {search}

        {filters}

      </div>

      {actions && (
        <div className="flex gap-2">
          {actions}
        </div>
      )}

    </div>
  );
}