"use client";

import { useEffect, useState } from "react";

import Modal from "@/components/shared/Modal";

import type { Coupon } from "@/types/coupon";

interface Props {
  open: boolean;
  coupon: Coupon | null;
  onClose: () => void;
  onSave: (data: Partial<Coupon>) => Promise<void>;
}

const initialForm: Partial<Coupon> = {
  code: "",
  description: "",
  type: "percentage",
  value: 0,
  minimumOrderAmount: 0,
  maximumDiscount: 0,
  usageLimit: 100,
  usagePerUser: 1,
  startDate: "",
  expiryDate: "",
  active: true,
};

export default function CouponModal({
  open,
  coupon,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] =
    useState<Partial<Coupon>>(initialForm);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!open) return;

    if (coupon) {
      setForm({
        ...coupon,
        startDate: coupon.startDate?.slice(0, 10),
        expiryDate: coupon.expiryDate?.slice(0, 10),
      });
    } else {
      setForm(initialForm);
    }

    setError("");
  }, [coupon, open]);

  function update<K extends keyof Coupon>(
    key: K,
    value: Coupon[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function validate() {
    if (!form.code?.trim())
      return "Coupon code is required.";

    if (!form.value || form.value <= 0)
      return "Discount value must be greater than 0.";

    if (
      form.type === "percentage" &&
      Number(form.value) > 100
    ) {
      return "Percentage cannot exceed 100.";
    }

    if (!form.startDate)
      return "Start date is required.";

    if (!form.expiryDate)
      return "Expiry date is required.";

    if (
      new Date(form.expiryDate) <=
      new Date(form.startDate)
    ) {
      return "Expiry date must be after start date.";
    }

    if (
      (form.usageLimit ?? 0) < 1
    ) {
      return "Usage limit must be at least 1.";
    }

    if (
      (form.usagePerUser ?? 0) < 1
    ) {
      return "Usage per user must be at least 1.";
    }

    return "";
  }

  async function handleSave() {
    const validation = validate();

    if (validation) {
      setError(validation);
      return;
    }

    try {
      setSaving(true);

      await onSave(form);

      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        coupon
          ? "Edit Coupon"
          : "Create Coupon"
      }    >
      <div className="space-y-6">

        {error && (
          <div className="rounded-lg border border-red-500 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Coupon Code
            </label>

            <input
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
              value={form.code ?? ""}
              onChange={(e) =>
                update(
                  "code",
                  e.target.value.toUpperCase()
                )
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Discount Type
            </label>

            <select
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
              value={form.type}
              onChange={(e) =>
                update(
                  "type",
                  e.target.value as Coupon["type"]
                )
              }
            >
              <option value="percentage">
                Percentage
              </option>

              <option value="fixed">
                Fixed Amount
              </option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-zinc-300">
              Description
            </label>

            <textarea
              rows={3}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
              value={form.description ?? ""}
              onChange={(e) =>
                update(
                  "description",
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Discount Value
            </label>

            <input
              type="number"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
              value={form.value ?? 0}
              onChange={(e) =>
                update(
                  "value",
                  Number(e.target.value)
                )
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Minimum Order
            </label>

            <input
              type="number"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
              value={
                form.minimumOrderAmount ?? 0
              }
              onChange={(e) =>
                update(
                  "minimumOrderAmount",
                  Number(e.target.value)
                )
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Maximum Discount
            </label>

            <input
              type="number"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
              value={
                form.maximumDiscount ?? 0
              }
              onChange={(e) =>
                update(
                  "maximumDiscount",
                  Number(e.target.value)
                )
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Usage Limit
            </label>

            <input
              type="number"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
              value={
                form.usageLimit ?? 100
              }
              onChange={(e) =>
                update(
                  "usageLimit",
                  Number(e.target.value)
                )
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Usage Per User
            </label>

            <input
              type="number"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
              value={
                form.usagePerUser ?? 1
              }
              onChange={(e) =>
                update(
                  "usagePerUser",
                  Number(e.target.value)
                )
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Start Date
            </label>

            <input
              type="date"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
              value={form.startDate ?? ""}
              onChange={(e) =>
                update(
                  "startDate",
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Expiry Date
            </label>

            <input
              type="date"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
              value={form.expiryDate ?? ""}
              onChange={(e) =>
                update(
                  "expiryDate",
                  e.target.value
                )
              }
            />
          </div>

        </div>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.active ?? true}
            onChange={(e) =>
              update(
                "active",
                e.target.checked
              )
            }
          />

          <span className="text-sm text-zinc-300">
            Active Coupon
          </span>
        </label>

        <div className="flex justify-end gap-3 border-t border-zinc-800 pt-6">

          <button
            onClick={onClose}
            className="rounded-lg border border-zinc-700 px-5 py-2 hover:bg-zinc-800"
          >
            Cancel
          </button>

          <button
            disabled={saving}
            onClick={handleSave}
            className="rounded-lg bg-pink-600 px-5 py-2 text-white hover:bg-pink-500 disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : coupon
              ? "Update Coupon"
              : "Create Coupon"}
          </button>

        </div>

      </div>
    </Modal>
  );
}