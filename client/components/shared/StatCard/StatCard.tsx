"use client";

import { ReactNode } from "react";

interface Props {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  color = "text-pink-500",
}: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-zinc-400">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white">
            {value}
          </h3>

        </div>

        {icon && (
          <div className={color}>
            {icon}
          </div>
        )}

      </div>

    </div>
  );
}