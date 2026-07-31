import api from "./api";

export interface DashboardStats {
  products: number;
  categories: number;
  orders: number;
  customers: number;
  featuredProducts: number;
  lowStockProducts: number;
}

class DashboardService {
  async getStats(): Promise<DashboardStats> {
    const { data } = await api.get("/dashboard/stats");
    return data.stats;
  }
}

export default new DashboardService();