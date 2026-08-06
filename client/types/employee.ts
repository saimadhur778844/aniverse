export type EmployeeRole =
  | "employee"
  | "manager"
  | "admin"
  | "superadmin";

export interface Employee {
  _id: string;

  name: string;

  email: string;

  phone: string;

  avatar: string;

  role: EmployeeRole;

  permissions: string[];

  isActive: boolean;

  lastLogin: string | null;

  createdBy?:
    | string
    | {
        _id: string;
        name: string;
      };

  createdAt: string;

  updatedAt: string;
}

export interface EmployeesResponse {
  success: boolean;

  employees: Employee[];

  total: number;

  page: number;

  pages: number;
}