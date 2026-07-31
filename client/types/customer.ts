export interface CustomerOrderSummary {
  _id: string;
  orderNumber?: string;
  total: number;
  createdAt: string;
}

export interface Customer {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;

  orders: number;
  spent: number;
  averageOrderValue: number;

  lastOrder?: CustomerOrderSummary | null;
}

export interface CustomerDetails extends Customer {
  orders: CustomerOrderSummary[];
}