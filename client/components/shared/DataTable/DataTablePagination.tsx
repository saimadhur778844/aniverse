"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import Button from "@/components/shared/Button";

interface Props {
  page: number;

  pages: number;

  onPrevious(): void;

  onNext(): void;
}

export default function DataTablePagination({
  page,

  pages,

  onPrevious,

  onNext,
}: Props) {
  return (
    <div className="flex items-center justify-between border-t border-zinc-800 px-6 py-4">

      <Button
        variant="outline"
        disabled={page === 1}
        onClick={onPrevious}
        leftIcon={<ChevronLeft size={16} />}
      >
        Previous
      </Button>

      <span className="text-sm text-zinc-400">
        Page {page} of {pages}
      </span>

      <Button
        variant="outline"
        disabled={page === pages}
        onClick={onNext}
        rightIcon={<ChevronRight size={16} />}
      >
        Next
      </Button>

    </div>
  );
}