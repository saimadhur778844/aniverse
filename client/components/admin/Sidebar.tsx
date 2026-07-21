"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  CubeIcon,
  TagIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const links = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: HomeIcon,
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: CubeIcon,
    },
    {
      name: "Categories",
      href: "/admin/categories",
      icon: TagIcon,
    },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Aniverse Admin
      </div>

      <nav className="flex-1 p-4">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                pathname === link.href
                  ? "bg-indigo-600"
                  : "hover:bg-gray-800"
              }`}
            >
              <Icon className="w-5 h-5" />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={logout}
        className="m-4 flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg"
      >
        <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
        Logout
      </button>
    </aside>
  );
}