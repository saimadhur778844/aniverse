"use client";

import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import {
  Save,
  Eye,
  RotateCcw,
  X,
  FileText,
} from "lucide-react";

import Button from "@/components/shared/Button";

interface Props {
  loading?: boolean;

  onCancel?: () => void;

  onPreview?: () => void;
}

export default function ProductActions({
  loading = false,
  onCancel,
  onPreview,
}: Props) {
  const {
    reset,
    formState,
  } = useFormContext();

  const {
    isDirty,
    isSubmitting,
    isValid,
  } = formState;

  const isLoading =
    loading || isSubmitting;

  const status = useMemo(() => {
    if (isSubmitting)
      return "Saving...";

    if (!isDirty)
      return "No changes";

    if (!isValid)
      return "Validation Required";

    return "Ready to Save";
  }, [
    isDirty,
    isSubmitting,
    isValid,
  ]);

  return (
    <div className="sticky bottom-0 z-20 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-2xl">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <p className="text-sm font-medium text-white">
            {status}
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            Remember to review pricing,
            inventory and SEO before
            publishing.
          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <Button
            type="button"
            variant="outline"
            leftIcon={
              <RotateCcw size={16} />
            }
            disabled={
              !isDirty || isLoading
            }
            onClick={() =>
              reset()
            }
          >
            Reset
          </Button>

          <Button
            type="button"
            variant="secondary"
            leftIcon={
              <Eye size={16} />
            }
            disabled={isLoading}
            onClick={onPreview}
          >
            Preview
          </Button>

          <Button
            type="button"
            variant="ghost"
            leftIcon={
              <X size={16} />
            }
            disabled={isLoading}
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            leftIcon={
              <Save size={16} />
            }
            loading={isLoading}
            disabled={!isValid}
          >
            Save Product
          </Button>

          <Button
            type="submit"
            variant="success"
            leftIcon={
              <FileText size={16} />
            }
            loading={isLoading}
            disabled={!isValid}
          >
            Save & Publish
          </Button>

        </div>

      </div>

    </div>
  );
}