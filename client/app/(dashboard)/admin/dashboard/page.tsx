"use client";

import {
  CubeIcon,
  TagIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import { useDashboard } from "@/lib/hooks/useDashboard";

export default function DashboardPage() {
  const { data: stats, isLoading, isError } = useDashboard();

  const StatCard = ({
    title,
    value,
    icon,
    iconBg,
    iconColor,
  }: {
    title: string;
    value: number;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
  }) => (
    <div className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          {isLoading ? (
            <div className="mt-3 h-10 w-16 animate-pulse rounded bg-gray-200" />
          ) : (
            <p className="mt-3 text-4xl font-bold">{value}</p>
          )}
        </div>

        <div className={`rounded-xl p-3 ${iconBg}`}>
          <div className={iconColor}>{icon}</div>
        </div>
      </div>
    </div>
  );

  if (isError) {
    return (
      <div className="rounded-xl bg-red-50 p-8 text-red-600">
        Failed to load dashboard statistics.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">
          Dashboard
        </h2>

        <p className="mt-2 text-gray-500">
          Welcome back! Here's what's happening in your store.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Products"
          value={stats?.products ?? 0}
          icon={<CubeIcon className="h-7 w-7" />}
          iconBg="bg-indigo-100"
          iconColor="text-indigo-600"
        />

        <StatCard
          title="Categories"
          value={stats?.categories ?? 0}
          icon={<TagIcon className="h-7 w-7" />}
          iconBg="bg-pink-100"
          iconColor="text-pink-600"
        />

        <StatCard
          title="Orders"
          value={stats?.orders ?? 0}
          icon={<ShoppingCartIcon className="h-7 w-7" />}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />

        <StatCard
          title="Customers"
          value={stats?.customers ?? 0}
          icon={<UsersIcon className="h-7 w-7" />}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
        />

      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="mb-5 text-xl font-semibold">
            Featured Products
          </h3>

          <div className="flex items-center justify-between rounded-xl bg-indigo-50 p-6">
            <span className="text-gray-600">
              Featured Products
            </span>

            <span className="text-3xl font-bold text-indigo-600">
              {isLoading ? "..." : stats?.featuredProducts ?? 0}
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="mb-5 text-xl font-semibold">
            Low Stock Alert
          </h3>

          <div className="flex items-center justify-between rounded-xl bg-red-50 p-6">
            <span className="text-gray-600">
              Products below stock limit
            </span>

            <span className="text-3xl font-bold text-red-600">
              {isLoading ? "..." : stats?.lowStockProducts ?? 0}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}