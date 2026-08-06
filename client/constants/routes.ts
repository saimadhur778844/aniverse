/**
 * ============================================================================
 * Public Routes
 * ============================================================================
 */

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  CART: "/cart",
  CHECKOUT: "/checkout",
  WISHLIST: "/wishlist",
  ORDERS: "/orders",

  PRODUCTS: "/products",
  CATEGORIES: "/categories",
  SEARCH: "/search",

  ABOUT: "/about",
  CONTACT: "/contact",

  /**
   * ========================================================================
   * Admin Routes
   * ========================================================================
   */

  ADMIN: {
    LOGIN: "/admin/login",

    DASHBOARD: "/admin/dashboard",

    PRODUCTS: "/admin/products",
    PRODUCT_NEW: "/admin/products/new",

    CATEGORIES: "/admin/categories",
    CATEGORY_NEW: "/admin/categories/new",

    ORDERS: "/admin/orders",

    CUSTOMERS: "/admin/customers",

    EMPLOYEES: "/admin/employees",
    EMPLOYEE_NEW: "/admin/employees/new",

    INVENTORY: "/admin/inventory",

    COUPONS: "/admin/coupons",
    COUPON_NEW: "/admin/coupons/new",

    REVIEWS: "/admin/reviews",

    SETTINGS: "/admin/settings",
  },
} as const;

/**
 * ============================================================================
 * Dynamic Route Helpers
 * ============================================================================
 */

export const routeHelpers = {
  product: (slug: string) =>
    `/products/${slug}`,

  category: (slug: string) =>
    `/categories/${slug}`,

  order: (id: string) =>
    `/orders/${id}`,

  adminProduct: (id: string) =>
    `/admin/products/${id}`,

  adminCategory: (id: string) =>
    `/admin/categories/${id}`,

  adminOrder: (id: string) =>
    `/admin/orders/${id}`,

  adminCustomer: (id: string) =>
    `/admin/customers/${id}`,

  adminEmployee: (id: string) =>
    `/admin/employees/${id}`,

  adminCoupon: (id: string) =>
    `/admin/coupons/${id}`,
} as const;