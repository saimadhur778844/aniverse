"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  Heart,
  MapPin,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext/AuthContext";

import styles from "./Sidebar.module.css";

const menuItems = [
  {
    label: "Dashboard",
    href: "/account",
    icon: LayoutDashboard,
  },
  {
    label: "My Orders",
    href: "/account/orders",
    icon: Package,
  },
  {
    label: "Wishlist",
    href: "/wishlist",
    icon: Heart,
  },
  {
    label: "Addresses",
    href: "/account/addresses",
    icon: MapPin,
  },
  {
    label: "Profile",
    href: "/account/profile",
    icon: User,
  },
  {
    label: "Settings",
    href: "/account/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <div className={styles.avatar}>
          {user?.name?.charAt(0).toUpperCase() ?? "U"}
        </div>

        <h3>{user?.name}</h3>

        <p>{user?.email}</p>
      </div>

      <nav className={styles.menu}>
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            (item.href !== "/account" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.item} ${
                active ? styles.active : ""
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button
        className={styles.logout}
        onClick={handleLogout}
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
}