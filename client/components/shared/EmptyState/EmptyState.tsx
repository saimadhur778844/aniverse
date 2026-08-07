"use client";

import { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export default function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-8 py-20">

      <div className="mx-auto max-w-md text-center">

        {icon && (
          <div className="mb-6 flex justify-center">
            {icon}
          </div>
        )}

        <h2 className="text-2xl font-bold text-white">
          {title}
        </h2>

        {description && (
          <p className="mt-3 text-zinc-400">
            {description}
          </p>
        )}

        {action && (
          <div className="mt-8">
            {action}
          </div>
        )}

      </div>

    </div>
  );
}