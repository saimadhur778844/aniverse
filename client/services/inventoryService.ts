import api from "./api";

import type {
  InventoryAnalytics,
  InventoryResponse,
} from "@/types/inventory";

class InventoryService {
  async getInventory(params?: {
    page?: number;
    limit?: number;
    search?: string;
    lowStock?: boolean;
  }) {
    const { data } =
      await api.get("/inventory", {
        params,
      });

    return data.data as InventoryResponse;
  }

  async getAnalytics() {
    const { data } =
      await api.get(
        "/inventory/analytics"
      );

    return data.data as InventoryAnalytics;
  }
async adjustStock(
    id: string,
    payload: {
        quantity: number;
        type: string;
        reason: string;
    }
) {
    const { data } =
        await api.patch(
            `/inventory/${id}/adjust`,
            payload
        );

    return data.data;
}
}


export default new InventoryService();