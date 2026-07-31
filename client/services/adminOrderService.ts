import api from "./api";
import type { Order } from "@/types/order";

export interface AdminOrdersResponse {
  success: boolean;
  orders: Order[];
  total: number;
  page: number;
  pages: number;
}

export interface GetOrdersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  paymentStatus?: string;
}

class AdminOrderService {
  async getOrders(
    params: GetOrdersParams = {}
  ): Promise<AdminOrdersResponse> {
    const { data } = await api.get("/orders", {
      params,
    });

    return data;
  }

  async getOrder(id: string): Promise<Order> {
    const { data } = await api.get(`/orders/${id}`);
    return data.order;
  }

  async updateStatus(
    id: string,
    status: string
  ): Promise<Order> {
    const { data } = await api.patch(
      `/orders/${id}/status`,
      { status }
    );

    return data.order;
  }
}

export default new AdminOrderService();