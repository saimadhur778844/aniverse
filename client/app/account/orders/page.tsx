"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Package } from "lucide-react";

import orderService from "@/services/orderService";

import type { Order } from "@/types/order";

import OrderCard from "@/components/account/OrderCard/OrderCard";
import OrderStats from "@/components/account/OrderStats/OrderStats";
import OrderSearch from "@/components/account/OrderSearch/OrderSearch";
import OrderFilters, {
  OrderFilter,
} from "@/components/account/OrderFilters/OrderFilters";

import styles from "./Orders.module.css";

export default function OrdersPage() {
  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState<OrderFilter>("all");

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const data =
        await orderService.getMyOrders();

      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredOrders =
    useMemo(() => {
      return orders.filter(
        (order) => {
          const matchesSearch =
            order.orderNumber
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            order.items.some((item) =>
              item.name
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )
            );

          const matchesFilter =
            filter === "all" ||
            order.orderStatus?.toLowerCase() ===
              filter.toLowerCase();

          return (
            matchesSearch &&
            matchesFilter
          );
        }
      );
    }, [
      orders,
      search,
      filter,
    ]);

  if (loading) {
    return (
      <div className={styles.page}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "80px",
            color: "white",
            fontSize: "20px",
          }}
        >
          Loading Orders...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>My Orders</h1>

          <p>
            Track your purchases,
            monitor deliveries,
            and manage your
            orders.
          </p>
        </div>
      </div>

      <OrderStats
        orders={orders}
      />

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

      {filteredOrders.length ===
      0 ? (
        <div
          className={
            styles.empty
          }
        >
          <Package
            size={60}
          />

          <h2>
            No Orders Found
          </h2>

          <p>
            We couldn't find
            any orders
            matching your
            search or
            selected filter.
          </p>
        </div>
      ) : (
        <div
          className={
            styles.orders
          }
        >
          {filteredOrders.map(
            (order) => (
              <OrderCard
                key={
                  order._id
                }
                order={
                  order
                }
              />
            )
          )}
        </div>
      )}
    </div>
  );
}