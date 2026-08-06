// import adminApi from "./adminApi";
import api from "./api";

import type {
  Employee,
  EmployeesResponse,
} from "@/types/employee";

export interface GetEmployeesParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
}

class EmployeeService {
  async getEmployees(
    params: GetEmployeesParams = {}
  ): Promise<EmployeesResponse> {
    const { data } =
      await api.get(
        "/employees",
        {
          params,
        }
      );

    return data;
  }

  async getEmployee(
    id: string
  ): Promise<Employee> {
    const { data } =
      await api.get(
        `/employees/${id}`
      );

    return data.employee;
  }

  async createEmployee(
    payload: Partial<Employee> & {
      password: string;
    }
  ) {
    const { data } =
      await api.post(
        "/employees",
        payload
      );

    return data;
  }

  async updateEmployee(
    id: string,
    payload: Partial<Employee>
  ) {
    const { data } =
      await api.put(
        `/employees/${id}`,
        payload
      );

    return data.employee;
  }

  async updateStatus(
    id: string,
    isActive: boolean
  ) {
    const { data } =
      await api.patch(
        `/employees/${id}/status`,
        {
          isActive,
        }
      );

    return data.employee;
  }

  async updatePermissions(
    id: string,
    permissions: string[]
  ) {
    const { data } =
      await api.patch(
        `/employees/${id}/permissions`,
        {
          permissions,
        }
      );

    return data.employee;
  }

  async resetPassword(
    id: string,
    password: string
  ) {
    const { data } =
      await api.patch(
        `/employees/${id}/reset-password`,
        {
          password,
        }
      );

    return data;
  }
}

export default new EmployeeService();