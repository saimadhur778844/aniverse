/*
|--------------------------------------------------------------------------
| Permission Keys
|--------------------------------------------------------------------------
*/

export const PERMISSIONS = {
  // Dashboard
  DASHBOARD_VIEW: "dashboard.view",

  // Orders
  ORDERS_VIEW: "orders.view",
  ORDERS_UPDATE: "orders.update",
  ORDERS_DELETE: "orders.delete",

  // Products
  PRODUCTS_VIEW: "products.view",
  PRODUCTS_CREATE: "products.create",
  PRODUCTS_UPDATE: "products.update",
  PRODUCTS_DELETE: "products.delete",

  // Categories
  CATEGORIES_VIEW: "categories.view",
  CATEGORIES_CREATE: "categories.create",
  CATEGORIES_UPDATE: "categories.update",
  CATEGORIES_DELETE: "categories.delete",

  // Customers
  CUSTOMERS_VIEW: "customers.view",
  CUSTOMERS_UPDATE: "customers.update",

  // Inventory
  INVENTORY_VIEW: "inventory.view",
  INVENTORY_UPDATE: "inventory.update",

  // Coupons
  COUPONS_VIEW: "coupons.view",
  COUPONS_CREATE: "coupons.create",
  COUPONS_UPDATE: "coupons.update",
  COUPONS_DELETE: "coupons.delete",

  // Reviews
  REVIEWS_VIEW: "reviews.view",
  REVIEWS_DELETE: "reviews.delete",

  // Analytics
  ANALYTICS_VIEW: "analytics.view",

  // Employees
  EMPLOYEES_VIEW: "employees.view",
  EMPLOYEES_CREATE: "employees.create",
  EMPLOYEES_UPDATE: "employees.update",
  EMPLOYEES_DELETE: "employees.delete",

  // Settings
  SETTINGS_VIEW: "settings.view",
  SETTINGS_UPDATE: "settings.update",
} as const;

export type Permission =
  (typeof PERMISSIONS)[keyof typeof PERMISSIONS];