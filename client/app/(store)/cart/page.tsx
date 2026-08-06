"use client";

import Image from "next/image";
import Link from "next/link";

import Card from "@/components/shared/Card";
import Button from "@/components/shared/Button";

import { useCart } from "@/context/CartContext";

import { getPrimaryImage, getSellingPrice } from "@/utils/product";


export default function CartPage() {
  const {
    items,
    subtotal,
    removeFromCart,
    updateQuantity,
    isEmpty,
  } = useCart();

  if (isEmpty) {
    return (
      <main className="min-h-screen bg-[#09090f] px-6 py-14">
        <div className="mx-auto max-w-7xl">

          <div className="mb-12">
            <h1 className="text-4xl font-extrabold text-white">
              Shopping Cart
            </h1>

            <p className="mt-3 text-gray-400">
              Your anime collection is waiting.
            </p>
          </div>

          <Card className="rounded-3xl border border-[#2b2b45] bg-[#171726] p-14 text-center">

            <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-[#202033] text-5xl">
              🛒
            </div>

            <h2 className="text-3xl font-bold text-white">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-gray-400">
              Looks like you haven't added any anime figures,
              collectibles or merchandise yet.
            </p>

            <div className="mt-10">

              <Link href="/products">

                <Button>
                  Continue Shopping
                </Button>

              </Link>

            </div>

          </Card>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#09090f] px-6 py-14">

      <div className="mx-auto max-w-7xl">

        <div className="mb-12">

          <h1 className="text-4xl font-extrabold text-white">
            Shopping Cart
          </h1>

          <p className="mt-3 text-gray-400">
            Review your favorite collectibles before checkout.
          </p>

        </div>

        <div className="grid gap-10 lg:grid-cols-3">

          <div className="space-y-7 lg:col-span-2">

            {items.map((item) => (

              <Card
                key={item.product._id}
                hover
                className="border border-[#2b2b45] bg-[#171726]"
              >

                <div className="flex flex-col gap-6 p-6 md:flex-row">

                  <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-[#202033] md:w-40">

                     <Image
                      src={getPrimaryImage(item.product)}
                      alt={item.product.name}
                      fill
                      className="object-cover transition duration-500 hover:scale-110"
                    />

                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                                        <div>

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <h2 className="text-2xl font-bold text-white">
                            {item.product.name}
                          </h2>

                          <p className="mt-2 text-sm text-purple-300">
                            {item.product.anime}
                          </p>

                          <div className="mt-4 inline-flex rounded-full bg-[#202033] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-pink-400">
                            Official Collection
                          </div>

                        </div>

                        <button
                          onClick={() =>
                            removeFromCart(item.product._id)
                          }
                          className="rounded-xl border border-red-500/30 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500 hover:text-white"
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                    <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                      <div className="flex w-fit items-center rounded-2xl border border-[#343454] bg-[#202033]">

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product._id,
                              item.quantity - 1
                            )
                          }
                          className="px-5 py-3 text-xl font-bold text-white transition hover:text-pink-400"
                        >
                          −
                        </button>

                        <span className="min-w-[70px] border-x border-[#343454] px-6 py-3 text-center text-lg font-bold text-white">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product._id,
                              item.quantity + 1
                            )
                          }
                          className="px-5 py-3 text-xl font-bold text-white transition hover:text-pink-400"
                        >
                          +
                        </button>

                      </div>

                      <div className="text-right">

                        <p className="text-sm text-gray-400">
                          Item Total
                        </p>

                        <p className="mt-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-3xl font-extrabold text-transparent">
                          ₹
                          {(
                            item.product.sellingPrice *
                            item.quantity
                          ).toLocaleString()}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </Card>

            ))}

          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
                        <Card className="rounded-3xl border border-[#2b2b45] bg-[#171726] p-8">

              <h2 className="mb-8 text-2xl font-bold text-white">
                Order Summary
              </h2>

              <div className="space-y-6">

                <div className="flex items-center justify-between">

                  <span className="text-gray-400">
                    Subtotal
                  </span>

                  <span className="text-lg font-semibold text-white">
                    ₹{subtotal.toLocaleString()}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-gray-400">
                    Shipping
                  </span>

                  <span className="font-semibold text-green-400">
                    FREE
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-gray-400">
                    GST
                  </span>

                  <span className="text-white">
                    Calculated at checkout
                  </span>

                </div>

                <div className="border-t border-[#343454]" />

                <div className="flex items-center justify-between">

                  <span className="text-xl font-semibold text-white">
                    Total
                  </span>

                  <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-3xl font-extrabold text-transparent">
                    ₹{subtotal.toLocaleString()}
                  </span>

                </div>

              </div>

              <div className="mt-10 space-y-4">

                <Link href="/checkout">

                  <Button
                    fullWidth
                    className="h-14 text-lg"
                  >
                    Proceed to Checkout
                  </Button>

                </Link>

                <Link href="/products">

                  <Button
                    variant="outline"
                    fullWidth
                    className="h-14"
                  >
                    Continue Shopping
                  </Button>

                </Link>

              </div>

              <div className="mt-10 rounded-2xl border border-[#343454] bg-[#202033] p-5">

                <h3 className="mb-3 font-semibold text-white">
                  Why shop with Aniverse?
                </h3>

                <ul className="space-y-3 text-sm text-gray-400">

                  <li className="flex items-center gap-3">
                    <span className="text-green-400">✓</span>
                    100% Authentic Anime Merchandise
                  </li>

                  <li className="flex items-center gap-3">
                    <span className="text-green-400">✓</span>
                    Secure Online Payments
                  </li>

                  <li className="flex items-center gap-3">
                    <span className="text-green-400">✓</span>
                    Premium Protective Packaging
                  </li>

                  <li className="flex items-center gap-3">
                    <span className="text-green-400">✓</span>
                    Dedicated Customer Support
                  </li>

                </ul>

              </div>

            </Card>

          </div>

        </div>

            <section className="mt-16">

          <Card className="border border-[#2b2b45] bg-gradient-to-r from-[#171726] via-[#1b1b2d] to-[#171726] p-8">

            <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">

              <div>

                <span className="inline-flex rounded-full bg-pink-500/15 px-4 py-2 text-sm font-semibold text-pink-400">
                  ANIVERSE PREMIUM
                </span>

                <h2 className="mt-5 text-3xl font-bold text-white">
                  Ready to complete your collection?
                </h2>

                <p className="mt-3 max-w-2xl text-gray-400">
                  Every order is carefully inspected, securely packed,
                  and shipped with extra protection so your collectibles
                  arrive in perfect condition.
                </p>

              </div>

              <div className="flex flex-wrap gap-4">

                <Link href="/products">
                  <Button variant="outline">
                    Browse More
                  </Button>
                </Link>

                <Link href="/checkout">
                  <Button>
                    Checkout Now
                  </Button>
                </Link>

              </div>

            </div>

          </Card>

        </section>

      </div>

    </main>
  );
}