"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  HomeIcon,
  CubeIcon,
  TagIcon,
  ShoppingBagIcon,
  UserIcon,
  ArchiveBoxIcon,
  TicketIcon,
  Cog6ToothIcon,
  UsersIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

import { useAuth } from "@/context/AuthContext/AuthContext";
import { PERMISSIONS } from "@/utils/permissions";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { logout, can } = useAuth();

  const links = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: HomeIcon,
      permission: PERMISSIONS.DASHBOARD_VIEW,
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: CubeIcon,
      permission: PERMISSIONS.PRODUCTS_VIEW,
    },
    {
      name: "Categories",
      href: "/admin/categories",
      icon: TagIcon,
      permission: PERMISSIONS.CATEGORIES_VIEW,
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: ShoppingBagIcon,
      permission: PERMISSIONS.ORDERS_VIEW,
    },
    {
      name: "Customers",
      href: "/admin/customers",
      icon: UserIcon,
      permission: PERMISSIONS.CUSTOMERS_VIEW,
    },
    {
      name: "Inventory",
      href: "/admin/inventory",
      icon: ArchiveBoxIcon,
      permission: PERMISSIONS.INVENTORY_VIEW,
    },
    {
      name: "Coupons",
      href: "/admin/coupons",
      icon: TicketIcon,
      permission: PERMISSIONS.COUPONS_VIEW,
    },

    // Future modules

    {
      name: "Employees",
      href: "/admin/employees",
      icon: UsersIcon,
      permission: PERMISSIONS.EMPLOYEES_VIEW,
    },

    {
      name: "Settings",
      href: "/admin/settings",
      icon: Cog6ToothIcon,
      permission: PERMISSIONS.SETTINGS_VIEW,
    },


  ];

  const handleLogout = async () => {
    await logout();
    router.replace("/admin/login");
  };

  return (
    <aside className="flex h-screen w-64 flex-col bg-gray-900 text-white">

      <div className="border-b border-gray-700 p-6">
        <h1 className="text-2xl font-bold">
          Aniverse Admin
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Management Panel
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">

        {links
          .filter((link) =>
            can(link.permission)
          )
          .map((link) => {
            const Icon = link.icon;

            const active =
              pathname === link.href ||
              pathname.startsWith(
                link.href + "/"
              );

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                  active
                    ? "bg-indigo-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />

                <span>{link.name}</span>
              </Link>
            );
          })}

      </nav>

      <div className="border-t border-gray-700 p-4">

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 transition hover:bg-red-700"
        >
          <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />

          Logout
        </button>

      </div>

    </aside>
  );
}