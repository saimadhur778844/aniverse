"use client";

import Modal from "@/components/shared/Modal";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
    >
      <div className="space-y-6">

        <p className="text-zinc-300">
          {message}
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-zinc-700 px-4 py-2 hover:bg-zinc-800"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-500"
          >
            {loading
              ? "Please wait..."
              : confirmText}
          </button>

        </div>

      </div>
    </Modal>
  );
}