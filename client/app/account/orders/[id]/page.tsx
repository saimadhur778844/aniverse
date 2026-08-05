"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { useParams } from "next/navigation";

import {
  ArrowLeft,
  RotateCcw,
  Download,
} from "lucide-react";

import orderService from "@/services/orderService";

import type { Order } from "@/types/order";

import OrderStatusBadge from "@/components/account/OrderStatusBadge/OrderStatusBadge";
import OrderTimeline from "@/components/account/OrderTimeline/OrderTimeline";
import AddressCard from "@/components/account/AddressCard/AddressCard";
import OrderSummary from "@/components/account/OrderSummary/OrderSummary";
import PaymentCard from "@/components/account/PaymentCard/PaymentCard";

import styles from "./OrderDetails.module.css";

export default function OrderDetailsPage() {
  const params = useParams();

  const [order, setOrder] =
    useState<Order | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (params.id) {
      loadOrder(
        params.id as string
      );
    }
  }, [params.id]);

  async function loadOrder(
    id: string
  ) {
    try {
      const data =
        await orderService.getOrderById(
          id
        );

      setOrder(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleReorder() {
    if (!order) return;

    try {
      await orderService.reorder(
        order._id
      );

      window.location.href =
        "/checkout";
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <div className={styles.page}>
        <h2
          style={{
            color: "white",
            textAlign: "center",
            padding: "100px",
          }}
        >
          Loading Order...
        </h2>
      </div>
    );
  }

  if (!order) {
    return (
      <div className={styles.page}>
        <h2
          style={{
            color: "white",
            textAlign: "center",
            padding: "100px",
          }}
        >
          Order not found.
        </h2>
      </div>
    );
  }

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
          <h1>{order.orderNumber}</h1>

          <p>
            Ordered on{" "}
            {new Date(
              order.createdAt
            ).toLocaleDateString(
              "en-IN",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </p>
        </div>

        <OrderStatusBadge
          status={order.orderStatus}
        />
      </div>

      <div className={styles.grid}>
        <div className={styles.left}>
                    <section className={styles.card}>
            <h2>Order Timeline</h2>

            <OrderTimeline
              status={order.orderStatus}
            />
          </section>

          <section className={styles.card}>
            <h2>Products</h2>

            <div className={styles.products}>
              {order.items.map((item) => (
                <div
                  key={
                    typeof item.product === "string"
                      ? item.product
                      : item.product._id
                  }
                  className={styles.product}
                >
                  <div className={styles.image}>
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={90}
                        height={90}
                      />
                    ) : (
                      <div className={styles.placeholder}>
                        No Image
                      </div>
                    )}
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
            address={order.shippingAddress}
          />
        </div>

        <div className={styles.right}>
                    <PaymentCard
            payment={order.payment}
          />

          <OrderSummary
            order={order}
          />

          <div className={styles.actions}>
            <button
              className={styles.primary}
              onClick={handleReorder}
            >
              <RotateCcw size={18} />
              Reorder
            </button>

            <button
              className={styles.secondary}
              onClick={() => window.print()}
            >
              <Download size={18} />
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}