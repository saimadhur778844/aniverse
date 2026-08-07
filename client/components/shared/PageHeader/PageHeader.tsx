"use client";

import { ReactNode } from "react";

interface Props {
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  action,
}: Props) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

      <div>

        <h1 className="text-3xl font-bold text-white">
          {title}
        </h1>

        {description && (
          <p className="mt-2 text-zinc-400">
            {description}
          </p>
        )}

      </div>

      {action}

    </div>
  );
}