import api from "./api";

import type {
  Order,
  CreateShippingAddress,
} from "@/types/order";

export interface CreateOrderPayload {
  items: {
    product: string;
    quantity: number;
  }[];

  shippingAddress: CreateShippingAddress;

  couponCode?: string;
}

export interface CreateOrderResponse {
  success: boolean;

  message?: string;

  order: Order;
}

export interface OrdersResponse {
  success: boolean;

  orders: Order[];
}

export interface OrderResponse {
  success: boolean;

  order: Order;
}

class OrderService {
  async createOrder(
    payload: CreateOrderPayload
  ): Promise<CreateOrderResponse> {
    const { data } = await api.post(
      "/orders",
      payload
    );

    return data;
  }

  async getMyOrders(): Promise<Order[]> {
    const { data } =
      await api.get<OrdersResponse>(
        "/orders/my-orders"
      );

    return data.orders;
  }

  async getOrderById(
    id: string
  ): Promise<Order> {
    const { data } =
      await api.get<OrderResponse>(
        `/orders/${id}`
      );

    return data.order;
  }

  async cancelOrder(
    id: string
  ): Promise<void> {
    await api.patch(
      `/orders/${id}/cancel`
    );
  }

  async reorder(
    id: string
  ): Promise<CreateOrderResponse> {
    const { data } = await api.post(
      `/orders/${id}/reorder`
    );

    return data;
  }
}

const orderService = new OrderService();

export default orderService;