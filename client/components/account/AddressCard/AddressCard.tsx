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
        <p>
          <strong>{address.fullName}</strong>
        </p>

        <p>{address.address}</p>

        <p>
          {address.city}, {address.state}
        </p>

        <p>{address.pincode}</p>

        <p>{address.country}</p>

        <p>{address.phone}</p>

        <p>{address.email}</p>
      </div>
    </div>
  );
}