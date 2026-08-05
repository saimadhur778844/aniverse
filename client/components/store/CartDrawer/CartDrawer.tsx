"use client";

import Link from "next/link";

import { useCart } from "@/context/CartContext/CartContext";

export default function CartDrawer() {
  const { items, subtotal, isEmpty, removeFromCart, updateQuantity } = useCart();

  if (isEmpty) {
    return (
      <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-zinc-800 bg-zinc-950 p-6 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Your Cart</h2>
        </div>

        <div className="mt-10 flex flex-1 items-center justify-center text-center text-zinc-400">
          Your cart is empty.
        </div>

        <Link
          href="/products"
          className="mt-4 rounded-xl bg-pink-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-pink-500"
        >
          Continue Shopping
        </Link>
      </aside>
    );
  }

  return (
    <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-zinc-800 bg-zinc-950 p-6 text-white shadow-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <span className="text-sm text-zinc-400">{items.length} items</span>
      </div>

      <div className="mt-6 flex-1 space-y-4 overflow-y-auto">
        {items.map((item: any) => (
          <div key={item.product._id} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white">{item.product.name}</p>
                <p className="mt-1 text-sm text-zinc-400">₹{item.product.price}</p>
              </div>

              <button
                type="button"
                onClick={() => removeFromCart(item.product._id)}
                className="text-sm text-pink-400"
              >
                Remove
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                  className="rounded-lg border border-zinc-700 px-2 py-1 text-white"
                >
                  -
                </button>
                <span className="min-w-8 text-center">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                  className="rounded-lg border border-zinc-700 px-2 py-1 text-white"
                >
                  +
                </button>
              </div>

              <span className="font-semibold text-white">₹{item.product.price * item.quantity}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-zinc-900 p-4">
        <div className="flex items-center justify-between text-sm text-zinc-400">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
      </div>

      <Link
        href="/checkout"
        className="mt-4 rounded-xl bg-pink-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-pink-500"
      >
        Proceed to Checkout
      </Link>
    </aside>
  );
}
