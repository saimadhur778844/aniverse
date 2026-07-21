"use client";

import { useAuth } from "@/context/AuthContext";

export default function Topbar() {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-8">
      <h1 className="text-2xl font-bold">
        Admin Dashboard
      </h1>

      <div className="text-right">
        <p className="font-semibold">
          {user?.name}
        </p>

        <p className="text-gray-500 text-sm">
          {user?.email}
        </p>
      </div>
    </header>
  );
}