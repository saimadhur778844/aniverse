"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  CreditCard,
  RotateCcw,
  Download,
} from "lucide-react";

import type { Order } from "@/types/order";

import OrderStatusBadge from "@/components/account/OrderStatusBadge/OrderStatusBadge";
import OrderTimeline from "@/components/account/OrderTimeline/OrderTimeline";
import AddressCard from "@/components/account/AddressCard/AddressCard";
import OrderSummary from "@/components/account/OrderSummary/OrderSummary";

import styles from "./OrderDetails.module.css";

const MOCK_ORDER: Order = {
  _id: "1",
  orderNumber: "ANV-20260729-0001",
  user: "1",
  items: [
    {
      product: "1",
      name: "Monkey D. Luffy Gear 5 Figure",
      image: "https://placehold.co/160x160/png?text=Luffy",
      quantity: 1,
      price: 4299,
    },
    {
      product: "2",
      name: "Roronoa Zoro Figure",
      image: "https://placehold.co/160x160/png?text=Zoro",
      quantity: 1,
      price: 3599,
    },
  ],
  shippingAddress: {
    name: "Sai Madhu",
    address: "Street 1",
    city: "Hyderabad",
    postalCode: "500001",
    country: "India",
  },
  subtotal: 7898,
  shippingCost: 0,
  total: 7898,
  status: "delivered",
  paymentStatus: "paid",
  paymentMethod: "Cashfree",
  paymentId: "PAY123456789",
  createdAt: "2026-07-29",
};

export default function OrderDetailsPage() {
  return (
    <div className={styles.page}>
      <Link
        href="/account/orders"
        className={styles.back}
      >
        <ArrowLeft size={18} />
        Back to Orders
      </Link>

      <div className={styles.header}>
        <div>
          <h1>{MOCK_ORDER.orderNumber}</h1>

          <p>
            Ordered on{" "}
            {new Date(
              MOCK_ORDER.createdAt!
            ).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <OrderStatusBadge
          status={MOCK_ORDER.status}
        />
      </div>

      <div className={styles.grid}>
        <div className={styles.left}>
          <section className={styles.card}>
            <h2>Order Timeline</h2>

            <OrderTimeline
              status={MOCK_ORDER.status}
            />
          </section>

          <section className={styles.card}>
            <h2>Products</h2>

            <div className={styles.products}>
              {MOCK_ORDER.items.map((item) => (
                <div
                  key={item.name}
                  className={styles.product}
                >
                  <div className={styles.image}>
                    <Image
                      src={
                        item.image ??
                        "/placeholder-product.png"
                      }
                      alt={item.name}
                      width={90}
                      height={90}
                    />
                  </div>

                  <div className={styles.info}>
                    <h3>{item.name}</h3>

                    <p>
                      Quantity: {item.quantity}
                    </p>

                    <strong>
                      ₹
                      {item.price.toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <AddressCard
            address={MOCK_ORDER.shippingAddress}
          />
        </div>

        <div className={styles.right}>
          <section className={styles.card}>
            <h2>Payment</h2>

            <div className={styles.payment}>
              <CreditCard size={20} />

              <div>
                <strong>
                  {MOCK_ORDER.paymentMethod}
                </strong>

                <p>
                  {MOCK_ORDER.paymentStatus}
                </p>

                <small>
                  {MOCK_ORDER.paymentId}
                </small>
              </div>
            </div>
          </section>

          <OrderSummary order={MOCK_ORDER} />

          <div className={styles.actions}>
            <button className={styles.primary}>
              <RotateCcw size={18} />
              Reorder
            </button>

            <button className={styles.secondary}>
              <Download size={18} />
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}