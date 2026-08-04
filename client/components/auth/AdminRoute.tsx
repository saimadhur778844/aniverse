"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext/AuthContext";

interface AdminRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function AdminRoute({
  children,
  redirectTo = "/",
}: AdminRouteProps) {
  const router = useRouter();

  const {
    loading,
    isAuthenticated,
    isAdmin,
  } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (!isAdmin) {
      router.replace(redirectTo);
    }
  }, [
    loading,
    isAuthenticated,
    isAdmin,
    router,
    redirectTo,
  ]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "grid",
          placeItems: "center",
          color: "white",
        }}
      >
        <div
  style={{
    minHeight: "60vh",
    display: "grid",
    placeItems: "center",
  }}
>

  <div className="flex items-center gap-3 text-white">

    <div className="h-6 w-6 animate-spin rounded-full border-2 border-pink-500 border-t-transparent" />

    <span>Checking permissions...</span>

  </div>

</div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return <>{children}</>;
}