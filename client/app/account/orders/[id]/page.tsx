"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import orderService from "@/services/orderService";
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
          Loading...
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
}