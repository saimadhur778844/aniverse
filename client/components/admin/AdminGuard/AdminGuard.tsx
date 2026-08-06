"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext/AuthContext";

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({
  children,
}: AdminGuardProps) {
  const {
    loading,
    isAuthenticated,
    isAdmin,
  } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // User not logged in
    if (!isAuthenticated) {
      router.replace("/admin/login");
      return;
    }

    // Logged in but not an admin
    if (!isAdmin) {
      router.replace("/");
      return;
    }
  }, [
    loading,
    isAuthenticated,
    isAdmin,
    router,
  ]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink-500 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return <>{children}</>;
}