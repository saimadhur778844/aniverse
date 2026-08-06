import express from "express";

import protect from "../middleware/protect.js";
import authorize from "../middleware/authorize.js";

import {
  getEmployeesList,
  getEmployee,
  createNewEmployee,
  updateEmployeeDetails,
  changeEmployeeStatus,
  changePermissions,
  resetPassword,
} from "../controllers/employeeController.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Employees
|--------------------------------------------------------------------------
*/

/**
 * GET    /api/employees
 * POST   /api/employees
 */

router
  .route("/")
  .get(
    protect,
    authorize(
      "admin",
      "superadmin"
    ),
    getEmployeesList
  )
  .post(
    protect,
    authorize(
      "admin",
      "superadmin"
    ),
    createNewEmployee
  );

/**
 * GET    /api/employees/:id
 * PUT    /api/employees/:id
 */

router
  .route("/:id")
  .get(
    protect,
    authorize(
      "admin",
      "superadmin"
    ),
    getEmployee
  )
  .put(
    protect,
    authorize(
      "admin",
      "superadmin"
    ),
    updateEmployeeDetails
  );

/**
 * PATCH /api/employees/:id/status
 */

router.patch(
  "/:id/status",
  protect,
  authorize(
    "admin",
    "superadmin"
  ),
  changeEmployeeStatus
);

/**
 * PATCH /api/employees/:id/permissions
 */

router.patch(
  "/:id/permissions",
  protect,
  authorize(
    "superadmin"
  ),
  changePermissions
);

/**
 * PATCH /api/employees/:id/reset-password
 */

router.patch(
  "/:id/reset-password",
  protect,
  authorize(
    "admin",
    "superadmin"
  ),
  resetPassword
);

export default router;