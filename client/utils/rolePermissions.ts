import {
  PERMISSIONS,
  Permission,
} from "./permissions";

export const ROLE_PERMISSIONS: Record<
  string,
  Permission[]
> = {
  user: [],

  employee: [
    PERMISSIONS.DASHBOARD_VIEW,

    PERMISSIONS.ORDERS_VIEW,
    PERMISSIONS.ORDERS_UPDATE,

    PERMISSIONS.PRODUCTS_VIEW,

    PERMISSIONS.CATEGORIES_VIEW,

    PERMISSIONS.CUSTOMERS_VIEW,

    PERMISSIONS.INVENTORY_VIEW,
    PERMISSIONS.INVENTORY_UPDATE,

    PERMISSIONS.REVIEWS_VIEW,
  ],

  admin: Object.values(PERMISSIONS),

  superadmin: Object.values(PERMISSIONS),
};