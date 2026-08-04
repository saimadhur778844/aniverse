"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const router = useRouter();

  const {
    loading,
    isAuthenticated,
  } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [
    loading,
    isAuthenticated,
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

    <span>Loading account...</span>

  </div>

</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}