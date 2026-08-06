"use client";

import { Employee } from "@/types/employee";
import EmployeeStatusBadge from "./EmployeeStatusBadge";

interface Props {
  employees: Employee[];
  onSelect: (id: string) => void;
}

export default function EmployeeTable({
  employees,
  onSelect,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-zinc-950">
            <tr className="text-sm text-zinc-400">
              <th className="px-6 py-4 text-left">
                Employee
              </th>

              <th className="px-6 py-4 text-left">
                Email
              </th>

              <th className="px-6 py-4 text-left">
                Role
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Last Login
              </th>

              <th className="px-6 py-4"></th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee._id}
                className="border-t border-zinc-800 hover:bg-zinc-800/40"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-600 text-sm font-bold text-white">
                      {employee.name
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <p className="font-medium text-white">
                        {employee.name}
                      </p>

                      <p className="text-xs text-zinc-500">
                        {employee.phone || "-"}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  {employee.email}
                </td>

                <td className="px-6 py-4 capitalize">
                  {employee.role}
                </td>

                <td className="px-6 py-4">
                  <EmployeeStatusBadge
                    active={employee.isActive}
                  />
                </td>

                <td className="px-6 py-4">
                  {employee.lastLogin
                    ? new Date(
                        employee.lastLogin
                      ).toLocaleString()
                    : "-"}
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      onSelect(employee._id)
                    }
                    className="font-medium text-pink-400 transition hover:text-pink-300"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {employees.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-zinc-500"
                >
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}