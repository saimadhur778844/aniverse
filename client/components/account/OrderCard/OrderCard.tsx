"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, Package } from "lucide-react";

import type { Order } from "@/types/order";

import OrderStatusBadge from "../OrderStatusBadge/OrderStatusBadge";

import styles from "./OrderCard.module.css";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({
  order,
}: OrderCardProps) {
  const firstItem = order.items[0];

  const itemCount = order.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div>
          <p className={styles.orderNumber}>
            {order.orderNumber ?? order._id}
          </p>

          <div className={styles.meta}>
            <CalendarDays size={15} />

            <span>
              {order.createdAt
                ? new Date(order.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )
                : "Recently"}
            </span>
          </div>
        </div>
          <OrderStatusBadge
            status={order.orderStatus}
          />
      </div>

      <div className={styles.body}>
        <div className={styles.imageWrapper}>
          {firstItem.image ? (
            <Image
              src={firstItem.image}
              alt={firstItem.name}
              fill
              sizes="80px"
              className={styles.image}
            />
          ) : (
            <Package size={34} />
          )}
        </div>

        <div className={styles.content}>
          <h3>{firstItem.name}</h3>

          <p>
            {itemCount} item{itemCount > 1 ? "s" : ""}
            {order.items.length > 1 &&
              ` • +${order.items.length - 1} more`}
          </p>

          <div className={styles.total}>
            ₹{order.total.toLocaleString("en-IN")}
          </div>
        </div>

        <Link
          href={`/account/orders/${order._id}`}
          className={styles.button}
        >
          View Details

          <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  );
}