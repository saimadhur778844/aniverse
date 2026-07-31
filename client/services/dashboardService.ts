import api from "./api";

export interface RecentOrder {
  _id: string;
  orderNumber?: string;
  total: number;
  orderStatus: string;
  payment?: {
    status: string;
  };
  createdAt: string;
  user?: {
    name: string;
    email: string;
  };
}

export interface ProductSummary {
  _id: string;
  name: string;
  stock: number;
  sold?: number;
  images?: string[];
}

export interface MonthlySale {
  _id: {
    year: number;
    month: number;
  };
  revenue: number;
  orders: number;
}

export interface OrderStatus {
  _id: string;
  count: number;
}

export interface DashboardStats {
  products: number;
  categories: number;
  orders: number;
  customers: number;
  featuredProducts: number;
  lowStockProducts: number;

  revenue: number;

  recentOrders: RecentOrder[];

  lowStockItems: ProductSummary[];

  topProducts: ProductSummary[];

  orderStatus: OrderStatus[];

  monthlySales: MonthlySale[];
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get("/dashboard");

  return response.data.stats;
};