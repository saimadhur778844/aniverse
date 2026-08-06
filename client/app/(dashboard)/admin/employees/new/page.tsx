"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import EmployeeForm from "@/components/admin/employees/EmployeeForm";
import employeeService from "@/services/employeeService";

import type {
  EmployeeRole,
} from "@/types/employee";

export default function NewEmployeePage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function handleCreate(data: {
    name: string;
    email: string;
    password?: string;
    phone: string;
    avatar: string;
    role: EmployeeRole;
    permissions: string[];
  }) {
    try {
      setLoading(true);

      await employeeService.createEmployee({
        ...data,
        password: data.password!,
      });

      router.push("/admin/employees");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center gap-3">

        <Link
          href="/admin/employees"
          className="rounded-lg border border-zinc-700 p-2 transition hover:bg-zinc-800"
        >
          <ArrowLeft size={18} />
        </Link>

        <div>

          <h1 className="text-3xl font-bold text-white">
            Add Employee
          </h1>

          <p className="text-zinc-400">
            Create a new employee account
          </p>

        </div>

      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

        <EmployeeForm
          loading={loading}
          onSubmit={handleCreate}
        />

      </div>

    </div>
  );
}