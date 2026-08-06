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
  FormSwitch,
} from "@/components/shared/Form";

import Badge from "@/components/shared/Badge";

export default function Inventory() {
  const { watch } = useFormContext();

  const stock =
    Number(watch("stock")) || 0;

  const minimumStock =
    Number(watch("minimumStock")) || 0;

  const trackInventory =
    watch("trackInventory");

  const continueSelling =
    watch("continueSelling");

  const inventoryStatus =
    useMemo(() => {
      if (!trackInventory) {
        return {
          label: "Inventory Tracking Disabled",
          variant: "secondary" as const,
        };
      }

      if (stock <= 0) {
        return {
          label: "Out of Stock",
          variant: "danger" as const,
        };
      }

      if (stock <= minimumStock) {
        return {
          label: "Low Stock",
          variant: "warning" as const,
        };
      }

      return {
        label: "In Stock",
        variant: "success" as const,
      };
    }, [
      stock,
      minimumStock,
      trackInventory,
    ]);

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Inventory
        </CardTitle>

        <CardDescription>
          Manage stock and inventory settings.
        </CardDescription>

      </CardHeader>

      <CardContent>

        <div className="grid gap-6 md:grid-cols-2">

          <FormInput
            name="stock"
            label="Available Stock"
            type="number"
            placeholder="0"
          />

          <FormInput
            name="minimumStock"
            label="Low Stock Alert"
            type="number"
            placeholder="5"
          />

        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">

            <FormSwitch
              name="trackInventory"
              label="Track Inventory"
            />

            <p className="mt-2 text-sm text-zinc-500">
              Automatically reduce stock after successful orders.
            </p>

          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">

            <FormSwitch
              name="continueSelling"
              label="Continue Selling When Out of Stock"
            />

            <p className="mt-2 text-sm text-zinc-500">
              Allow customers to purchase even when stock reaches zero.
            </p>

          </div>

        </div>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950 p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-zinc-400">
                Inventory Status
              </p>

              <p className="mt-2 text-lg font-semibold text-white">
                {stock} units available
              </p>

            </div>

            <Badge
              variant={inventoryStatus.variant}
            >
              {inventoryStatus.label}
            </Badge>

          </div>

          {continueSelling &&
            stock <= 0 && (
              <div className="mt-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3 text-sm text-yellow-300">
                This product can still be purchased because
                <strong> Continue Selling</strong> is enabled.
              </div>
            )}

        </div>

      </CardContent>

    </Card>
  );
}