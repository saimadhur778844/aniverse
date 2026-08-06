"use client";

import { useEffect, useState } from "react";
import type { EmployeeRole } from "@/types/employee";
import {
  X,
  Save,
  Shield,
  Lock,
  UserCog,
} from "lucide-react";

import employeeService from "@/services/employeeService";

import type { Employee } from "@/types/employee";

interface Props {
  employee: Employee | null;
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
}



export default function EmployeeDetailsDrawer({
  employee,
  open,
  onClose,
  onUpdated,
}: Props) {

    
  const [saving, setSaving] =
    useState(false);

const [role, setRole] =
  useState<EmployeeRole>("employee");

  const [isActive, setIsActive] =
    useState(true);

  const [password, setPassword] =
    useState("");

  useEffect(() => {
    if (!employee) return;

    setRole(employee.role);
    setIsActive(employee.isActive);
    setPassword("");
  }, [employee]);

  if (!employee) return null;

async function handleSave() {
  if (!employee) return;

  try {
    setSaving(true);

    await employeeService.updateEmployee(
      employee._id,
      {
        role,
      }
    );

    await employeeService.updateStatus(
      employee._id,
      isActive
    );

    onUpdated();

    onClose();
  } catch (error) {
    console.error(error);
  } finally {
    setSaving(false);
  }
}

 async function handlePasswordReset() {
  if (!employee) return;

  if (!password.trim()) return;

  try {
    setSaving(true);

    await employeeService.resetPassword(
      employee._id,
      password
    );

    setPassword("");
  } catch (error) {
    console.error(error);
  } finally {
    setSaving(false);
  }
}

  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        open
          ? "visible"
          : "invisible"
      }`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/70 transition-opacity ${
          open
            ? "opacity-100"
            : "opacity-0"
        }`}
      />

      <div
        className={`absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto border-l border-zinc-800 bg-zinc-950 transition-transform duration-300 ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Employee Details
            </h2>

            <p className="text-sm text-zinc-500">
              Manage employee account
            </p>

          </div>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="space-y-8 p-6">

          <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-600 text-xl font-bold">
                {employee.name
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>

                <h3 className="text-lg font-semibold">
                  {employee.name}
                </h3>

                <p className="text-zinc-400">
                  {employee.email}
                </p>

                <p className="text-sm text-zinc-500">
                  {employee.phone || "-"}
                </p>

              </div>

            </div>

          </section>

          <section className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5">

            <div className="flex items-center gap-2 text-lg font-semibold">

              <UserCog size={18} />

              Account

            </div>

            <div>

              <label className="mb-2 block text-sm text-zinc-400">
                Role
              </label>

              <select
            value={role}
            onChange={(e) =>
                setRole(
                e.target.value as EmployeeRole
                )
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            >
            <option value="employee">
                Employee
            </option>

            <option value="manager">
                Manager
            </option>

            <option value="admin">
                Admin
            </option>

            <option value="superadmin">
                Super Admin
            </option>
            </select>

            </div>

            <div className="flex items-center justify-between rounded-lg border border-zinc-800 p-3">

              <div>

                <p className="font-medium">
                  Active Account
                </p>

                <p className="text-sm text-zinc-500">
                  Allow employee login
                </p>

              </div>

              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) =>
                  setIsActive(
                    e.target.checked
                  )
                }
                className="h-5 w-5"
              />

            </div>

          </section>

          <section className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5">

            <div className="flex items-center gap-2 text-lg font-semibold">

              <Lock size={18} />

              Reset Password

            </div>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="New password"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            />

            <button
              onClick={handlePasswordReset}
              disabled={saving}
              className="rounded-lg bg-orange-600 px-4 py-2 transition hover:bg-orange-500"
            >
              Reset Password
            </button>

          </section>

          <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-pink-600 px-4 py-3 transition hover:bg-pink-500"
            >
              <Save size={18} />

              Save Changes
            </button>

          </section>

        </div>
      </div>
    </div>
  );
}