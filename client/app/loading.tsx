"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#09090f]">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-pink-500/30" />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-pink-500/40 bg-zinc-900">
            <Loader2
              size={34}
              className="animate-spin text-pink-500"
            />
          </div>
        </div>

        <div className="space-y-2 text-center">
          <h2 className="text-xl font-bold text-white">
            Loading Aniverse...
          </h2>

          <p className="text-zinc-400">
            Preparing your anime collection.
          </p>
        </div>
      </div>
    </main>
  );
}