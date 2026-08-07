"use client";

import Modal from "@/components/shared/Modal";
import Button from "@/components/shared/Button";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  danger = true,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
    >
      <div className="space-y-6">

        <p className="text-zinc-400">
          {message}
        </p>

        <div className="flex justify-end gap-3">

          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </Button>

          <Button
            variant={
              danger
                ? "danger"
                : "primary"
            }
            onClick={onConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>

        </div>

      </div>
    </Modal>
  );
}