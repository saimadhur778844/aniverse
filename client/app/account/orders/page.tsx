"use client";

import { useMemo, useState } from "react";
import { Package } from "lucide-react";

import type { Order } from "@/types/order";

import OrderCard from "@/components/account/OrderCard/OrderCard";
import OrderStats from "@/components/account/OrderStats/OrderStats";
import OrderSearch from "@/components/account/OrderSearch/OrderSearch";
import OrderFilters, {
  OrderFilter,
} from "@/components/account/OrderFilters/OrderFilters";

import styles from "./Orders.module.css";

const MOCK_ORDERS: Order[] = [
  {
    _id: "1",
    orderNumber: "ANV-20260729-0001",
    user: "1",
    items: [
      {
        product: "1",
        name: "Monkey D. Luffy Gear 5 Figure",
        image: "https://placehold.co/200x200/png?text=Luffy",
        quantity: 1,
        price: 4299,
      },
    ],
    shippingAddress: {
      name: "Sai Madhu",
      address: "Street 1",
      city: "Hyderabad",
      postalCode: "500001",
      country: "India",
    },
    subtotal: 4299,
    total: 4299,
    status: "delivered",
    paymentStatus: "paid",
    createdAt: "2026-07-29",
  },
  {
    _id: "2",
    orderNumber: "ANV-20260729-0002",
    user: "1",
    items: [
      {
        product: "2",
        name: "Roronoa Zoro - King of Hell Figure",
        image: "https://placehold.co/200x200/png?text=Zoro",
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
    subtotal: 3599,
    total: 3599,
    status: "processing",
    paymentStatus: "paid",
    createdAt: "2026-07-28",
  },
];

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] =
    useState<OrderFilter>("all");

  const filteredOrders = useMemo(() => {
    return MOCK_ORDERS.filter((order) => {
      const matchesSearch =
        order.orderNumber
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        order.items.some((item) =>
          item.name
            .toLowerCase()
            .includes(search.toLowerCase())
        );

      const matchesFilter =
        filter === "all" ||
        order.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>My Orders</h1>

          <p>
            Track your purchases, monitor deliveries,
            and manage your orders.
          </p>
        </div>
      </div>

      <OrderStats orders={MOCK_ORDERS} />

      <div className={styles.toolbar}>
        <OrderSearch
          value={search}
          onChange={setSearch}
        />

        <OrderFilters
          value={filter}
          onChange={setFilter}
        />
      </div>

      {filteredOrders.length === 0 ? (
        <div className={styles.empty}>
          <Package size={60} />

          <h2>No Orders Found</h2>

          <p>
            We couldn't find any orders matching your
            search or selected filter.
          </p>
        </div>
      ) : (
        <div className={styles.orders}>
          {filteredOrders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
            />
          ))}
        </div>
      )}
    </div>
  );
}