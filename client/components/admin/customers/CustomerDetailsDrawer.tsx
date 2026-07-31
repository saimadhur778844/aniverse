"use client";

import Modal from "@/components/shared/Modal";

import type {
  CustomerDetails,
} from "@/types/customer";

interface Props {
  open: boolean;
  customer: CustomerDetails | null;
  onClose: () => void;
}

export default function CustomerDetailsDrawer({
  open,
  customer,
  onClose,
}: Props) {
  if (!customer) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Customer Details"
      width="lg"
    >
      <div className="space-y-6">

        <div>
          <h3 className="text-xl font-semibold text-white">
            {customer.name}
          </h3>

          <p className="text-zinc-400">
            {customer.email}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-xl bg-zinc-900 p-4">
            <p className="text-zinc-400">
              Lifetime Spend
            </p>

            <p className="mt-2 text-2xl font-bold text-white">
              ₹{customer.spent.toLocaleString()}
            </p>
          </div>

          <div className="rounded-xl bg-zinc-900 p-4">
            <p className="text-zinc-400">
              Orders
            </p>

            <p className="mt-2 text-2xl font-bold text-white">
              {customer.orders.length}
            </p>
          </div>

        </div>

        <div>

          <h4 className="mb-3 font-semibold text-white">
            Recent Orders
          </h4>

          <div className="space-y-2">

            {customer.orders.length === 0 && (
              <p className="text-zinc-500">
                No orders yet.
              </p>
            )}

            {customer.orders.map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between rounded-lg bg-zinc-900 p-3"
              >
                <span>
                  {order.orderNumber ||
                    order._id}
                </span>

                <span>
                  ₹{order.total}
                </span>
              </div>
            ))}

          </div>

        </div>

      </div>
    </Modal>
  );
}