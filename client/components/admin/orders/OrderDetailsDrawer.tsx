"use client";

import { X } from "lucide-react";
import { Order } from "@/types/order";
import OrderStatusBadge from "./OrderStatusBadge";

interface Props {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}

export default function OrderDetailsDrawer({
  order,
  open,
  onClose,
}: Props) {
  if (!order) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        open ? "visible" : "invisible"
      }`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`absolute right-0 top-0 h-full w-full max-w-xl bg-zinc-950 border-l border-zinc-800 overflow-y-auto transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-zinc-800 p-6">
          <div>
            <h2 className="text-2xl font-bold">
              {order.orderNumber}
            </h2>

            <p className="text-zinc-400 text-sm">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="space-y-8 p-6">

          <section>

            <h3 className="mb-3 font-semibold text-lg">
              Customer
            </h3>

            {typeof order.user === "string" ? (
              <p>-</p>
            ) : (
              <div className="space-y-1">
                <p>{order.user.name}</p>
                <p className="text-zinc-400">
                  {order.user.email}
                </p>
              </div>
            )}

          </section>

          <section>

            <h3 className="mb-3 font-semibold text-lg">
              Shipping
            </h3>

            <div className="space-y-1 text-zinc-300">

              <p>
                {order.shippingAddress.name}
              </p>

              <p>
                {order.shippingAddress.address}
              </p>

              <p>
                {order.shippingAddress.city}
              </p>

              <p>
                {order.shippingAddress.state}
              </p>

              <p>
                {order.shippingAddress.postalCode}
              </p>

              <p>
                {order.shippingAddress.country}
              </p>

            </div>

          </section>

          <section>

            <h3 className="mb-3 font-semibold text-lg">
              Items
            </h3>

            <div className="space-y-4">

              {order.items.map((item) => (
                <div
                  key={item.name}
                  className="flex gap-4 rounded-lg bg-zinc-900 p-3"
                >
                  <img
                    src={item.image}
                    className="h-20 w-20 rounded-lg object-cover"
                    alt={item.name}
                  />

                  <div className="flex-1">

                    <h4>{item.name}</h4>

                    <p className="text-zinc-400">
                      Qty : {item.quantity}
                    </p>

                    <p className="font-semibold">
                      ₹{item.price}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </section>

          <section>

            <h3 className="mb-3 font-semibold text-lg">
              Payment
            </h3>

            <div className="space-y-2">

              <p>
                Method : {order.payment.method}
              </p>

              <p>
                Status : {order.payment.status}
              </p>

            </div>

          </section>

          <section>

            <h3 className="mb-3 font-semibold text-lg">
              Order Status
            </h3>

            <OrderStatusBadge
              status={order.orderStatus}
            />

          </section>

          <section className="rounded-xl bg-zinc-900 p-5">

            <h3 className="mb-4 font-semibold">
              Order Summary
            </h3>

            <div className="space-y-2">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  ₹{order.subtotal}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  ₹{order.shippingCharge}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>
                  ₹{order.tax}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span>
                  ₹{order.discount}
                </span>
              </div>

              <div className="mt-4 flex justify-between border-t border-zinc-700 pt-4 text-lg font-bold">
                <span>Total</span>
                <span>
                  ₹{order.total}
                </span>
              </div>

            </div>

          </section>

        </div>

      </div>

    </div>
  );
}