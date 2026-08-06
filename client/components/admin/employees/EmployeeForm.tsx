"use client";

import { useEffect, useState } from "react";

import type {
  Employee,
  EmployeeRole,
} from "@/types/employee";

interface Props {
  initialData?: Employee | null;

  loading?: boolean;

  onSubmit: (data: {
    name: string;
    email: string;
    password?: string;
    phone: string;
    avatar: string;
    role: EmployeeRole;
    permissions: string[];
  }) => void;
}

const roleOptions: EmployeeRole[] = [
  "employee",
  "manager",
  "admin",
];

export default function EmployeeForm({
  initialData,
  loading = false,
  onSubmit,
}: Props) {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [avatar, setAvatar] =
    useState("");

  const [role, setRole] =
    useState<EmployeeRole>(
      "employee"
    );

  const [permissions, setPermissions] =
    useState<string[]>([]);

  useEffect(() => {
    if (!initialData) return;

    setName(initialData.name);
    setEmail(initialData.email);
    setPhone(initialData.phone);
    setAvatar(initialData.avatar);
    setRole(initialData.role);
    setPermissions(
      initialData.permissions
    );
  }, [initialData]);

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    onSubmit({
      name,
      email,
      password:
        password || undefined,
      phone,
      avatar,
      role,
      permissions,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Name
          </label>

          <input
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-pink-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-pink-500"
          />
        </div>

        {!initialData && (
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
              minLength={6}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-pink-500"
            />
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Phone
          </label>

          <input
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-pink-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Avatar URL
          </label>

          <input
            value={avatar}
            onChange={(e) =>
              setAvatar(
                e.target.value
              )
            }
            placeholder="https://..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-pink-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Role
          </label>

          <select
            value={role}
            onChange={(e) =>
              setRole(
                e.target
                  .value as EmployeeRole
              )
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-pink-500"
          >
            {roleOptions.map(
              (role) => (
                <option
                  key={role}
                  value={role}
                >
                  {role
                    .charAt(0)
                    .toUpperCase() +
                    role.slice(1)}
                </option>
              )
            )}
          </select>
        </div>

      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-pink-600 px-6 py-3 font-medium text-white transition hover:bg-pink-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : initialData
            ? "Update Employee"
            : "Create Employee"}
        </button>
      </div>
    </form>
  );
}