/**
 * ============================================================================
 * User Roles
 * ============================================================================
 */

export const ROLES = {
  USER: "user",
  EMPLOYEE: "employee",
  MANAGER: "manager",
  ADMIN: "admin",
  SUPER_ADMIN: "superadmin",
} as const;

/**
 * ============================================================================
 * Role Type
 * ============================================================================
 */

export type Role =
  (typeof ROLES)[keyof typeof ROLES];

/**
 * ============================================================================
 * Admin Roles
 * ============================================================================
 */

export const ADMIN_ROLES: Role[] = [
  ROLES.EMPLOYEE,
  ROLES.MANAGER,
  ROLES.ADMIN,
  ROLES.SUPER_ADMIN,
];

/**
 * ============================================================================
 * Roles Allowed To Access Admin Dashboard
 * ============================================================================
 */

export const DASHBOARD_ROLES: Role[] = [
  ROLES.EMPLOYEE,
  ROLES.MANAGER,
  ROLES.ADMIN,
  ROLES.SUPER_ADMIN,
];

/**
 * ============================================================================
 * Roles Allowed To Manage Employees
 * ============================================================================
 */

export const EMPLOYEE_MANAGEMENT_ROLES: Role[] = [
  ROLES.ADMIN,
  ROLES.SUPER_ADMIN,
];

/**
 * ============================================================================
 * Roles Allowed To Create Admin Accounts
 * ============================================================================
 */

export const ADMIN_CREATION_ROLES: Role[] = [
  ROLES.SUPER_ADMIN,
];