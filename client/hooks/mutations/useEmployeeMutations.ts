import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import employeeService from "@/services/employeeService";

import { QUERY_KEYS } from "@/constants/queryKeys";

export function useCreateEmployee() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      employeeService.createEmployee,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey:
          QUERY_KEYS.employees,
      });

      toast.success(
        "Employee created successfully."
      );
    },

    onError(error: any) {
      toast.error(
        error.message ??
          "Failed to create employee."
      );
    },
  });
}

export function useUpdateEmployee() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;

      data: any;
    }) =>
      employeeService.updateEmployee(
        id,
        data
      ),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey:
          QUERY_KEYS.employees,
      });

      toast.success(
        "Employee updated."
      );
    },

    onError(error: any) {
      toast.error(
        error.message ??
          "Update failed."
      );
    },
  });
}

export function useUpdateEmployeeStatus() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      isActive,
    }: {
      id: string;

      isActive: boolean;
    }) =>
      employeeService.updateStatus(
        id,
        isActive
      ),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey:
          QUERY_KEYS.employees,
      });

      toast.success(
        "Status updated."
      );
    },

    onError(error: any) {
      toast.error(
        error.message ??
          "Status update failed."
      );
    },
  });
}