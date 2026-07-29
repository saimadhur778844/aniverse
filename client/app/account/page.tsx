"use client";

import Link from "next/link";
import {
  Package,
  Heart,
  MapPin,
  User,
  ArrowRight,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext/AuthContext";
import { useWishlist } from "@/context/WishlistContext/WishlistContext";

import styles from "./Dashboard.module.css";

export default function AccountDashboard() {
  const { user } = useAuth();
  const { totalItems } = useWishlist();

  return (
    <div className={styles.dashboard}>
      {/* Welcome */}
      <section className={styles.hero}>
        <div>
          <h1>
            Welcome back,
            <span> {user?.name}</span> 👋
          </h1>

          <p>
            Manage your orders, profile,
            wishlist and addresses from one place.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        <div className={styles.card}>
          <Package size={28} />
          <h2>0</h2>
          <p>Total Orders</p>
        </div>

        <div className={styles.card}>
          <Heart size={28} />
          <h2>{totalItems}</h2>
          <p>Wishlist Items</p>
        </div>

        <div className={styles.card}>
          <MapPin size={28} />
          <h2>0</h2>
          <p>Saved Addresses</p>
        </div>

        <div className={styles.card}>
          <User size={28} />
          <h2>Profile</h2>
          <p>Account Settings</p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className={styles.quickActions}>
        <h2>Quick Actions</h2>

        <div className={styles.grid}>
          <Link
            href="/products"
            className={styles.action}
          >
            Browse Products
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/account/orders"
            className={styles.action}
          >
            View Orders
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/wishlist"
            className={styles.action}
          >
            Wishlist
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/account/profile"
            className={styles.action}
          >
            Edit Profile
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Recent Orders */}
      <section className={styles.orders}>
        <div className={styles.sectionHeader}>
          <h2>Recent Orders</h2>
        </div>

        <div className={styles.empty}>
          <Package size={48} />

          <h3>No Orders Yet</h3>

          <p>
            Your recent orders will appear here.
          </p>

          <Link
            href="/products"
            className={styles.shopButton}
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
}