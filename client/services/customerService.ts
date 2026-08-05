import api from "./api";

import type {
  Customer,
  CustomerDetails,
} from "@/types/customer";

export interface CustomersResponse {
  success: boolean;
  customers: Customer[];
  total: number;
  page: number;
  pages: number;
}

export interface CustomerResponse {
  success: boolean;
  customer: CustomerDetails;
}

class CustomerService {
  async getCustomers(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<CustomersResponse> {
    const { data } = await api.get<CustomersResponse>(
      "/customers",
      {
        params,
      }
    );

    return data;
  }

  async getCustomer(
    id: string
  ): Promise<CustomerDetails> {
    const { data } =
      await api.get<CustomerResponse>(
        `/customers/${id}`
      );

    return data.customer;
  }
}

export default new CustomerService();