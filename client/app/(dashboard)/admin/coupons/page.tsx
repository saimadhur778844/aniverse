"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/admin/shared/PageHeader";
import PageToolbar from "@/components/admin/shared/PageToolbar";
import Pagination from "@/components/admin/shared/Pagination";
import ConfirmDialog from "@/components/admin/shared/ConfirmDialog";

import CouponTable from "@/components/admin/coupons/CouponTable";
import CouponModal from "@/components/admin/coupons/CouponModal";

import couponService from "@/services/couponService";

import type { Coupon } from "@/types/coupon";

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] =
    useState<Coupon | null>(null);

  const [deleteId, setDeleteId] =
    useState<string | null>(null);

  useEffect(() => {
    loadCoupons();
  }, [page, search]);

  async function loadCoupons() {
    try {
      setLoading(true);

      const data =
        await couponService.getCoupons({
          page,
          limit: 10,
          search,
        });

      setCoupons(data.coupons);
      setPages(data.pages);
    } catch (error) {
      console.error("Failed to load coupons:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(
    payload: Partial<Coupon>
  ) {
    try {
      if (selectedCoupon) {
        await couponService.updateCoupon(
          selectedCoupon._id,
          payload
        );
      } else {
        await couponService.createCoupon(
          payload
        );
      }

      setModalOpen(false);
      setSelectedCoupon(null);

      await loadCoupons();
    } catch (error) {
      console.error(
        "Failed to save coupon:",
        error
      );
    }
  }

  async function handleDelete() {
    if (!deleteId) return;

    try {
      await couponService.deleteCoupon(
        deleteId
      );

      setDeleteId(null);

      await loadCoupons();
    } catch (error) {
      console.error(
        "Failed to delete coupon:",
        error
      );
    }
  }

  async function handleToggle(
    id: string
  ) {
    try {
      const updatedCoupon =
        await couponService.toggleCoupon(id);

      setCoupons((prev) =>
        prev.map((coupon) =>
          coupon._id === updatedCoupon._id
            ? updatedCoupon
            : coupon
        )
      );
    } catch (error) {
      console.error(
        "Failed to update coupon:",
        error
      );
    }
  }

  return (
    <div className="space-y-8">

      <PageHeader
        title="Coupons"
        description="Create and manage discount coupons."
      />

      <PageToolbar
        search={search}
        onSearchChange={setSearch}
        onRefresh={loadCoupons}
        primaryAction={{
          label: "New Coupon",
          onClick: () => {
            setSelectedCoupon(null);
            setModalOpen(true);
          },
        }}
      />

      <CouponTable
        coupons={coupons}
        loading={loading}
        onEdit={(coupon) => {
          setSelectedCoupon(coupon);
          setModalOpen(true);
        }}
        onDelete={(id) =>
          setDeleteId(id)
        }
        onToggle={handleToggle}
      />

      <Pagination
        page={page}
        pages={pages}
        onChange={setPage}
      />

      <CouponModal
        open={modalOpen}
        coupon={selectedCoupon}
        onClose={() => {
          setModalOpen(false);
          setSelectedCoupon(null);
        }}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Coupon"
        message="Are you sure you want to delete this coupon?"
        onCancel={() =>
          setDeleteId(null)
        }
        onConfirm={handleDelete}
      />

    </div>
  );
}