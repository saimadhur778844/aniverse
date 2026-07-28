"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

import useCart from "@/lib/hooks/useCart";
import { useWishlist } from "@/context/WishlistContext/WishlistContext";
import { useAuth } from "@/context/AuthContext/AuthContext";

import { CartDrawer } from "@/components/store/cart";

import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  LogOut,
} from "lucide-react";

import { navigation } from "@/data/navigation";

import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { totalItems } = useCart();

  const { totalItems: wishlistItems } = useWishlist();

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    router.push("/");
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <Link
          href="/"
          className={styles.logo}
        >
          <span className={styles.logoAccent}>
            ANI
          </span>
          VERSE
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.menu}>
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={clsx(styles.link, {
                [styles.active]:
                  pathname === item.href,
              })}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className={styles.actions}>
          {/* Wishlist */}
          <Link
            href="/wishlist"
            className={styles.iconButton}
            aria-label="Wishlist"
          >
            <Heart size={22} />

            {wishlistItems > 0 && (
              <span className={styles.badge}>
                {wishlistItems > 99
                  ? "99+"
                  : wishlistItems}
              </span>
            )}
          </Link>

          {/* Cart */}
          <button
            className={styles.iconButton}
            onClick={() =>
              setCartOpen(true)
            }
            aria-label="Cart"
          >
            <ShoppingCart size={22} />

            {totalItems > 0 && (
              <span className={styles.badge}>
                {totalItems > 99
                  ? "99+"
                  : totalItems}
              </span>
            )}
          </button>

          {/* Search */}
          <div
            className={`${styles.searchWrapper} ${
              searchOpen
                ? styles.searchOpen
                : ""
            }`}
          >
            {searchOpen ? (
              <>
                <Search
                  size={18}
                  className={
                    styles.searchIcon
                  }
                />

                <input
                  type="search"
                  placeholder="Search anime, figures..."
                  className={
                    styles.searchInput
                  }
                  autoFocus
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter"
                    ) {
                      const value =
                        e.currentTarget.value.trim();

                      if (!value) return;

                      router.push(
                        `/products?search=${encodeURIComponent(
                          value
                        )}`
                      );

                      setSearchOpen(false);
                    }
                  }}
                />

                <button
                  className={
                    styles.closeSearch
                  }
                  onClick={() =>
                    setSearchOpen(false)
                  }
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              <button
                className={
                  styles.iconButton
                }
                onClick={() =>
                  setSearchOpen(true)
                }
                aria-label="Search"
              >
                <Search size={22} />
              </button>
            )}
          </div>

          {/* Authentication */}
          {isAuthenticated ? (
            <>
              <Link
                href="/account"
                className={styles.loginButton}
              >
                <User size={18} />
                {user?.name}
              </Link>

              <button
                onClick={handleLogout}
                className={styles.iconButton}
                aria-label="Logout"
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className={styles.loginButton}
            >
              <User size={18} />
              Login
            </Link>
          )}

          {/* Mobile */}
          <button
            className={styles.mobileButton}
            onClick={() =>
              setMobileOpen(!mobileOpen)
            }
            aria-label="Menu"
          >
            {mobileOpen ? (
              <X size={26} />
            ) : (
              <Menu size={26} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className={styles.mobileMenu}>
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={clsx(
                styles.mobileLink,
                {
                  [styles.active]:
                    pathname ===
                    item.href,
                }
              )}
              onClick={() =>
                setMobileOpen(false)
              }
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/wishlist"
            className={
              styles.mobileLink
            }
            onClick={() =>
              setMobileOpen(false)
            }
          >
            ❤️ Wishlist
            {wishlistItems > 0 &&
              ` (${wishlistItems})`}
          </Link>

          <button
            className={
              styles.mobileCart
            }
            onClick={() => {
              setCartOpen(true);
              setMobileOpen(false);
            }}
          >
            🛒 Cart
            {totalItems > 0 &&
              ` (${totalItems})`}
          </button>

          {isAuthenticated ? (
            <>
              <Link
                href="/account"
                className={
                  styles.mobileLink
                }
                onClick={() =>
                  setMobileOpen(false)
                }
              >
                👤 {user?.name}
              </Link>

              <button
                className={
                  styles.mobileCart
                }
                onClick={handleLogout}
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className={
                styles.mobileLink
              }
              onClick={() =>
                setMobileOpen(false)
              }
            >
              👤 Login
            </Link>
          )}
        </nav>
      )}

      <CartDrawer
        open={cartOpen}
        onClose={() =>
          setCartOpen(false)
        }
      />
    </header>
  );
}