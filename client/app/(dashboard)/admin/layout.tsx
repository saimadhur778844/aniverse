"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/admin/Sidebar/Sidebar";
import Topbar from "@/components/admin/Topbar/Topbar";
import { useAuth } from "@/context/AuthContext/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/admin/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-slate-100 text-slate-900">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto bg-slate-100 p-8 text-slate-900">
          {children}
        </main>
      </div>
    </div>
  );
}