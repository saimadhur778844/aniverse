"use client";

interface LoadingSkeletonProps {
  rows?: number;
}

export default function LoadingSkeleton({
  rows = 5,
}: LoadingSkeletonProps) {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="h-14 rounded-xl bg-zinc-800"
        />
      ))}
    </div>
  );
}