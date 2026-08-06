"use client";

import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

import Card, {
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/shared/Card";

import {
  FormInput,
} from "@/components/shared/Form";

import Badge from "@/components/shared/Badge";

export default function Pricing() {
  const {
    watch,
  } = useFormContext();

  const mrp =
    Number(watch("mrp")) || 0;

  const sellingPrice =
    Number(
      watch("sellingPrice")
    ) || 0;

  const costPrice =
    Number(
      watch("costPrice")
    ) || 0;

  const {
    discount,

    profit,

    margin,
  } = useMemo(() => {
    const discount =
      mrp > 0
        ? (
            ((mrp -
              sellingPrice) /
              mrp) *
            100
          ).toFixed(1)
        : "0";

    const profit =
      sellingPrice -
      costPrice;

    const margin =
      sellingPrice > 0
        ? (
            (profit /
              sellingPrice) *
            100
          ).toFixed(1)
        : "0";

    return {
      discount,

      profit,

      margin,
    };
  }, [
    mrp,
    sellingPrice,
    costPrice,
  ]);

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Pricing
        </CardTitle>

        <CardDescription>
          Manage pricing and profit.
        </CardDescription>

      </CardHeader>

      <CardContent>

        <div className="grid gap-6 md:grid-cols-3">

          <FormInput
            name="mrp"
            type="number"
            label="MRP"
            placeholder="0"
          />

          <FormInput
            name="sellingPrice"
            type="number"
            label="Selling Price"
            placeholder="0"
          />

          <FormInput
            name="costPrice"
            type="number"
            label="Cost Price"
            placeholder="0"
          />

          <FormInput
            name="discount"
            type="number"
            label="Discount (%)"
            placeholder="0"
          />

          <FormInput
            name="tax"
            type="number"
            label="Tax (%)"
            placeholder="18"
          />

        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-sm text-zinc-400">
              Discount
            </p>

            <div className="mt-2">

              <Badge variant="warning">
                {discount}%
              </Badge>

            </div>

          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-sm text-zinc-400">
              Estimated Profit
            </p>

            <p className="mt-2 text-2xl font-bold text-green-400">
              ₹{profit.toFixed(2)}
            </p>

          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-sm text-zinc-400">
              Profit Margin
            </p>

            <Badge
              variant={
                Number(margin) >= 30
                  ? "success"
                  : Number(
                      margin
                    ) >= 15
                  ? "warning"
                  : "danger"
              }
            >
              {margin}%
            </Badge>

          </div>

        </div>

      </CardContent>

    </Card>
  );
}