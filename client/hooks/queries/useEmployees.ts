import { useQuery } from "@tanstack/react-query";

import employeeService, {
  GetEmployeesParams,
} from "@/services/employeeService";

import { QUERY_KEYS } from "@/constants/queryKeys";

export function useEmployees(
  params: GetEmployeesParams
) {
  return useQuery({
    queryKey: [
      ...QUERY_KEYS.employees,
      params,
    ],

    queryFn: () =>
      employeeService.getEmployees(params),

    placeholderData: (previousData) =>
      previousData,
  });
}

export function useEmployee(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.employee(id),

    queryFn: () =>
      employeeService.getEmployee(id),

    enabled: !!id,
  });
}