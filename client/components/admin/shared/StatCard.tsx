"use client";

import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: "pink" | "purple" | "blue" | "green" | "orange";
  change?: number;
  subtitle?: string;
  onClick?: () => void;
}

const colorMap = {
  pink: {
    bg: "bg-pink-500/15",
    icon: "text-pink-400",
    border: "border-pink-500/20",
  },
  purple: {
    bg: "bg-violet-500/15",
    icon: "text-violet-400",
    border: "border-violet-500/20",
  },
  blue: {
    bg: "bg-sky-500/15",
    icon: "text-sky-400",
    border: "border-sky-500/20",
  },
  green: {
    bg: "bg-emerald-500/15",
    icon: "text-emerald-400",
    border: "border-emerald-500/20",
  },
  orange: {
    bg: "bg-orange-500/15",
    icon: "text-orange-400",
    border: "border-orange-500/20",
  },
};

export default function StatCard({
  title,
  value,
  icon,
  color = "pink",
  change,
  subtitle,
  onClick,
}: StatCardProps) {
  const theme = colorMap[color];

  return (
    <div
      onClick={onClick}
      className={`group rounded-2xl border ${theme.border}
      bg-[#171726]
      p-6
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      hover:shadow-pink-500/10
      cursor-pointer`}
    >
      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-zinc-400">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-xs text-zinc-500">
              {subtitle}
            </p>
          )}

          {change !== undefined && (
            <div
              className={`mt-3 flex items-center gap-2 text-sm ${
                change >= 0
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {change >= 0 ? (
                <TrendingUp size={15} />
              ) : (
                <TrendingDown size={15} />
              )}

              {Math.abs(change)}%
            </div>
          )}

        </div>

        <div
          className={`${theme.bg}
          rounded-xl
          p-4
          ${theme.icon}`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}