"use client";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";

import {
  Plus,
  RefreshCw,
  Search,
  Users,
  Shield,
  UserCheck,
  Briefcase,
} from "lucide-react";

import EmployeeTable from "@/components/admin/employees/EmployeeTable";
import EmployeeDetailsDrawer from "@/components/admin/employees/EmployeeDetailsDrawer";

import employeeService from "@/services/employeeService";

import type { Employee } from "@/types/employee";

export default function EmployeesPage() {
  const [employees, setEmployees] =
    useState<Employee[]>([]);

  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [role, setRole] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [pages, setPages] =
    useState(1);

  async function loadEmployees() {
    try {
      setLoading(true);

      const data =
        await employeeService.getEmployees({
          page,
          limit: 10,
          search,
          role,
          status,
        });

      setEmployees(data.employees);
      setPages(data.pages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEmployees();
  }, [page, role, status]);

  async function handleView(id: string) {
    try {
      const employee =
        await employeeService.getEmployee(id);

      setSelectedEmployee(employee);
      setDrawerOpen(true);
    } catch (error) {
      console.error(error);
    }
  }

  const stats = useMemo(() => {
    return {
      total: employees.length,

      active: employees.filter(
        (e) => e.isActive
      ).length,

      managers: employees.filter(
        (e) => e.role === "manager"
      ).length,

      admins: employees.filter(
        (e) =>
          e.role === "admin" ||
          e.role === "superadmin"
      ).length,
    };
  }, [employees]);

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-white">
            Employees
          </h1>

          <p className="text-zinc-400">
            Manage your staff and permissions
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={loadEmployees}
            className="flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 transition hover:bg-zinc-800"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

          <Link
            href="/admin/employees/new"
            className="flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2 transition hover:bg-pink-500"
          >
            <Plus size={18} />
            Add Employee
          </Link>

        </div>

      </div>

      {/* Stats */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          icon={<Users size={20} />}
          title="Employees"
          value={stats.total}
        />

        <StatCard
          icon={<UserCheck size={20} />}
          title="Active"
          value={stats.active}
        />

        <StatCard
          icon={<Briefcase size={20} />}
          title="Managers"
          value={stats.managers}
        />

        <StatCard
          icon={<Shield size={20} />}
          title="Admins"
          value={stats.admins}
        />

      </div>

      {/* Filters */}

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">

        <div className="grid gap-4 lg:grid-cols-3">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-3 text-zinc-500"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setPage(1);
                  loadEmployees();
                }
              }}
              placeholder="Search employee..."
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 py-2 pl-10 pr-3"
            />

          </div>

          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
          >
            <option value="">
              All Roles
            </option>

            <option value="employee">
              Employee
            </option>

            <option value="manager">
              Manager
            </option>

            <option value="admin">
              Admin
            </option>

          </select>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
          >
            <option value="">
              All Status
            </option>

            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>

          </select>

        </div>

      </div>

      {/* Table */}

      {loading ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 py-24 text-center text-zinc-400">
          Loading employees...
        </div>
      ) : (
        <EmployeeTable
          employees={employees}
          onSelect={handleView}
        />
      )}

      {/* Pagination */}

      <div className="flex items-center justify-between">

        <button
          disabled={page === 1}
          onClick={() =>
            setPage((p) => p - 1)
          }
          className="rounded-lg border border-zinc-700 px-4 py-2 disabled:opacity-40"
        >
          Previous
        </button>

        <span className="text-zinc-400">
          Page {page} of {pages}
        </span>

        <button
          disabled={page === pages}
          onClick={() =>
            setPage((p) => p + 1)
          }
          className="rounded-lg border border-zinc-700 px-4 py-2 disabled:opacity-40"
        >
          Next
        </button>

      </div>

      <EmployeeDetailsDrawer
        employee={selectedEmployee}
        open={drawerOpen}
        onClose={() =>
          setDrawerOpen(false)
        }
        onUpdated={loadEmployees}
      />

    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">

      <div className="mb-4 flex items-center justify-between">

        <div className="rounded-lg bg-pink-600/20 p-3 text-pink-400">
          {icon}
        </div>

      </div>

      <h3 className="text-sm text-zinc-400">
        {title}
      </h3>

      <p className="mt-2 text-3xl font-bold text-white">
        {value}
      </p>

    </div>
  );
}