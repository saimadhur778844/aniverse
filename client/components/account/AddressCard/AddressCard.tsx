"use client";

import type { ShippingAddress } from "@/types/order";

import styles from "./AddressCard.module.css";

interface AddressCardProps {
  address: ShippingAddress;
}

export default function AddressCard({
  address,
}: AddressCardProps) {
  return (
    <div className={styles.card}>
      <h3>Shipping Address</h3>

      <div className={styles.content}>
        <p>{address.name}</p>

        <p>{address.address}</p>

        <p>
          {address.city}
          {address.state
            ? `, ${address.state}`
            : ""}
        </p>

        <p>{address.postalCode}</p>

        <p>{address.country}</p>

        {address.phone && (
          <p>{address.phone}</p>
        )}
      </div>
    </div>
  );
}