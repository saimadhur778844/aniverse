"use client";

import Button from "@/components/shared/Button";

interface PaginationProps {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  pages,
  onPageChange,
}: PaginationProps) {
  if (pages <= 1) {
    return null;
  }

  return (
    <div className="mt-6 flex items-center justify-between">

      <Button
        variant="secondary"
        disabled={page === 1}
        onClick={() =>
          onPageChange(page - 1)
        }
      >
        Previous
      </Button>

      <div className="flex gap-2">

        {Array.from(
          { length: pages },
          (_, index) => index + 1
        ).map((number) => (
          <Button
            key={number}
            variant={
              number === page
                ? "primary"
                : "ghost"
            }
            size="sm"
            onClick={() =>
              onPageChange(number)
            }
          >
            {number}
          </Button>
        ))}

      </div>

      <Button
        variant="secondary"
        disabled={page === pages}
        onClick={() =>
          onPageChange(page + 1)
        }
      >
        Next
      </Button>

    </div>
  );
}