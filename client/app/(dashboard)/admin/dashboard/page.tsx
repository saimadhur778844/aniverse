"use client";

import { useEffect, useState } from "react";
import {
  Package,
  ShoppingCart,
  Users,
  LayoutGrid,
  Star,
  AlertTriangle,
  IndianRupee,
} from "lucide-react";

import {
  DashboardStats,
  getDashboardStats,
} from "@/services/dashboardService";

const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) => (
  <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-zinc-400">{title}</p>
        <h2 className="mt-2 text-3xl font-bold text-white">{value}</h2>
      </div>

      <div className="rounded-lg bg-pink-500/20 p-3 text-pink-400">
        {icon}
      </div>
    </div>
  </div>
);

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

   const loadDashboard = async () => {
     try {
       const data = await getDashboardStats();

       setStats(data);
     } catch (error) {
       console.error("Failed to load dashboard:", error);
     } finally {
       setLoading(false);
     }
   };

  if (loading) {
    return (
      <div className="p-6 text-white">
        Loading dashboard...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-6 text-red-400">
        Unable to load dashboard.
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-zinc-400">
          Welcome back to Aniverse Admin.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Revenue"
          value={`₹${stats.revenue.toLocaleString()}`}
          icon={<IndianRupee size={26} />}
        />

        <StatCard
          title="Orders"
          value={stats.orders}
          icon={<ShoppingCart size={26} />}
        />

        <StatCard
          title="Customers"
          value={stats.customers}
          icon={<Users size={26} />}
        />

        <StatCard
          title="Products"
          value={stats.products}
          icon={<Package size={26} />}
        />

        <StatCard
          title="Categories"
          value={stats.categories}
          icon={<LayoutGrid size={26} />}
        />

        <StatCard
          title="Featured Products"
          value={stats.featuredProducts}
          icon={<Star size={26} />}
        />

        <StatCard
          title="Low Stock"
          value={stats.lowStockProducts}
          icon={<AlertTriangle size={26} />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">

          <h2 className="mb-4 text-xl font-semibold text-white">
            Recent Orders
          </h2>

          <div className="space-y-3">

            {stats.recentOrders.length === 0 && (
              <p className="text-zinc-500">
                No orders found.
              </p>
            )}

            {stats.recentOrders.map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between rounded-lg bg-zinc-800 p-3"
              >
                <div>
                  <p className="font-medium text-white">
                    {order.orderNumber || order._id.slice(-6)}
                  </p>

                  <p className="text-sm text-zinc-400">
                    {order.user?.name || "Guest"}
                  </p>
                </div>

                <div className="text-right">

                  <p className="font-semibold text-white">
                    ₹{order.total}
                  </p>

                  <span className="text-xs text-pink-400">
                    {order.orderStatus}
                  </span>

                </div>
              </div>
            ))}

          </div>

        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">

          <h2 className="mb-4 text-xl font-semibold text-white">
            Low Stock Products
          </h2>

          <div className="space-y-3">

            {stats.lowStockItems.length === 0 && (
              <p className="text-zinc-500">
                Everything is well stocked.
              </p>
            )}

            {stats.lowStockItems.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between rounded-lg bg-zinc-800 p-3"
              >
                <p className="text-white">
                  {product.name}
                </p>

                <span className="rounded bg-red-600 px-2 py-1 text-xs text-white">
                  {product.stock} Left
                </span>

              </div>
            ))}

          </div>

        </div>

      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">

        <h2 className="mb-4 text-xl font-semibold text-white">
          Top Selling Products
        </h2>

        <div className="space-y-3">

          {stats.topProducts.length === 0 && (
            <p className="text-zinc-500">
              No sales data available.
            </p>
          )}

          {stats.topProducts.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between rounded-lg bg-zinc-800 p-3"
            >
              <div>
                <p className="font-medium text-white">
                  {product.name}
                </p>

                <p className="text-sm text-zinc-400">
                  Stock: {product.stock}
                </p>
              </div>

              <span className="rounded bg-green-600 px-3 py-1 text-sm text-white">
                {product.sold ?? 0} Sold
              </span>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}