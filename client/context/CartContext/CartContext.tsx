"use client";

import {
  createContext,
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

export const CartContext =
  createContext<CartContextType | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({
  children,
}: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart
  useEffect(() => {
    const stored = localStorage.getItem("aniverse-cart");

    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  // Save cart
  useEffect(() => {
    localStorage.setItem(
      "aniverse-cart",
      JSON.stringify(items)
    );
  }, [items]);

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
        quantity: Math.min(quantity, product.stock),
      },
    ];
  });
};

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

  const updateQuantity = (
    productId: string,
    quantity: number
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product._id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.quantity,
        0
      ),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum +
          item.product.price *
            item.quantity,
        0
      ),
    [items]
  );

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}