"use client";

import { CreditCard } from "lucide-react";

import type { PaymentInfo } from "@/types/order";

import styles from "./PaymentCard.module.css";

interface PaymentCardProps {
  payment: PaymentInfo;
}

export default function PaymentCard({
  payment,
}: PaymentCardProps) {
  return (
    <div className={styles.card}>
      <h3>Payment Details</h3>

      <div className={styles.item}>
        <span>Status</span>

        <strong>{payment.status}</strong>
      </div>

      <div className={styles.item}>
        <span>Method</span>

        <strong>
          {payment.paymentMode ??
            payment.method ??
            "Cashfree"}
        </strong>
      </div>

      <div className={styles.item}>
        <span>Gateway</span>

        <strong>Cashfree</strong>
      </div>

      {payment.gatewayPaymentId && (
        <div className={styles.item}>
          <span>Transaction ID</span>

          <small>
            {payment.gatewayPaymentId}
          </small>
        </div>
      )}

      {payment.paidAt && (
        <div className={styles.item}>
          <span>Paid On</span>

          <strong>
            {new Date(
              payment.paidAt
            ).toLocaleString("en-IN")}
          </strong>
        </div>
      )}

      <div className={styles.icon}>
        <CreditCard size={28} />
      </div>
    </div>
  );
}