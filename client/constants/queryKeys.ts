export const QUERY_KEYS = {
  dashboard: ["dashboard"],

  products: ["products"],

  product: (id: string) => [
    "product",
    id,
  ],

  categories: ["categories"],

  category: (id: string) => [
    "category",
    id,
  ],

  orders: ["orders"],

  order: (id: string) => [
    "order",
    id,
  ],

  customers: ["customers"],

  customer: (id: string) => [
    "customer",
    id,
  ],

  employees: ["employees"],

  employee: (id: string) => [
    "employee",
    id,
  ],

  inventory: ["inventory"],

  coupons: ["coupons"],

  reviews: ["reviews"],

  dashboardStats: [
    "dashboard-stats",
  ],
} as const;