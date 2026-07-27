"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
  useCallback,
} from "react";

import { Product } from "@/types/product";
import { WishlistContextType } from "@/types/wishlist";

const WISHLIST_STORAGE_KEY =
  "aniverse-wishlist";

export const WishlistContext =
  createContext<WishlistContextType | null>(
    null
  );

interface WishlistProviderProps {
  children: ReactNode;
}

export function WishlistProvider({
  children,
}: WishlistProviderProps) {
  const [items, setItems] = useState<Product[]>(
    []
  );

  // Load wishlist
  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(
          WISHLIST_STORAGE_KEY
        );

      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (error) {
      console.error(
        "Failed to load wishlist:",
        error
      );
    }
  }, []);

  // Save wishlist
  useEffect(() => {
    try {
      localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(items)
      );
    } catch (error) {
      console.error(
        "Failed to save wishlist:",
        error
      );
    }
  }, [items]);

  const addToWishlist = useCallback(
    (product: Product) => {
      setItems((prev) => {
        const exists = prev.some(
          (item) =>
            item._id === product._id
        );

        if (exists) {
          return prev;
        }

        return [...prev, product];
      });
    },
    []
  );

  const removeFromWishlist =
    useCallback((productId: string) => {
      setItems((prev) =>
        prev.filter(
          (item) =>
            item._id !== productId
        )
      );
    }, []);

  const toggleWishlist =
    useCallback((product: Product) => {
      setItems((prev) => {
        const exists = prev.some(
          (item) =>
            item._id === product._id
        );

        if (exists) {
          return prev.filter(
            (item) =>
              item._id !== product._id
          );
        }

        return [...prev, product];
      });
    }, []);

  const clearWishlist =
    useCallback(() => {
      setItems([]);
    }, []);

  const isInWishlist =
    useCallback(
      (productId: string) => {
        return items.some(
          (item) =>
            item._id === productId
        );
      },
      [items]
    );

  const totalItems = useMemo(
    () => items.length,
    [items]
  );

  const isEmpty = items.length === 0;

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
        isInWishlist,
        totalItems,
        isEmpty,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context =
    useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used within WishlistProvider."
    );
  }

  return context;
}