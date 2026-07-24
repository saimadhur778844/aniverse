"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

import { Product } from "@/types/product";
import {
  CartContextType,
  CartItem,
} from "@/types/cart";

const CART_STORAGE_KEY = "aniverse-cart";

export const CartContext =
  createContext<CartContextType | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({
  children,
}: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);

      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(items)
    );
  }, [items]);

  // Add item to cart
  const addToCart = (
    product: Product,
    quantity: number
  ) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.product._id === product._id
      );

      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + quantity,
                  product.stock
                ),
              }
            : item
        );
      }

      return [
        ...prev,
        {
          product,
          quantity: Math.min(
            quantity,
            product.stock
          ),
        },
      ];
    });
  };

  // Remove item
  const removeFromCart = (
    productId: string
  ) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          item.product._id !== productId
      )
    );
  };

  // Update quantity
  const updateQuantity = (
    productId: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.product._id !== productId) {
          return item;
        }

        return {
          ...item,
          quantity: Math.min(
            quantity,
            item.product.stock
          ),
        };
      })
    );
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
  };

  // Total quantity
  const totalItems = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }, [items]);

  // Subtotal
  const subtotal = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum +
        item.product.price *
          item.quantity,
      0
    );
  }, [items]);

  // Empty cart check
  const isEmpty = items.length === 0;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isEmpty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used within CartProvider."
    );
  }

  return context;
}