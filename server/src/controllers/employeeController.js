import asyncHandler from "../utils/asyncHandler.js";

import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  updateEmployeeStatus,
  updateEmployeePermissions,
  resetEmployeePassword,
} from "../services/employeeService.js";

/*
|--------------------------------------------------------------------------
| Get Employees
|--------------------------------------------------------------------------
*/

export const getEmployeesList = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    role,
    status,
  } = req.query;

  const result = await getEmployees({
    page: Number(page),
    limit: Number(limit),
    search,
    role,
    status,
  });

  return res.status(200).json({
    success: true,
    ...result,
  });
});

/*
|--------------------------------------------------------------------------
| Get Employee
|--------------------------------------------------------------------------
*/

export const getEmployee = asyncHandler(async (req, res) => {
  const employee = await getEmployeeById(req.params.id);

  if (!employee) {
    res.status(404);
    throw new Error("Employee not found.");
  }

  return res.status(200).json({
    success: true,
    employee,
  });
});

/*
|--------------------------------------------------------------------------
| Create Employee
|--------------------------------------------------------------------------
*/

export const createNewEmployee = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    avatar,
    role,
    permissions = [],
  } = req.body;

  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error("Please fill all required fields.");
  }

  const allowedRoles = [
    "employee",
    "manager",
    "admin",
  ];

  if (!allowedRoles.includes(role)) {
    res.status(400);
    throw new Error("Invalid employee role.");
  }

  /*
  |--------------------------------------------------------------------------
  | Role Hierarchy
  |--------------------------------------------------------------------------
  */

  if (
    req.user.role === "admin" &&
    role === "admin"
  ) {
    res.status(403);

    throw new Error(
      "Only Super Admin can create Admin accounts."
    );
  }

  if (
    req.user.role === "manager"
  ) {
    res.status(403);

    throw new Error(
      "Managers cannot create employees."
    );
  }

  const employee = await createEmployee({
    name,
    email,
    password,
    phone,
    avatar,
    role,
    permissions,
    createdBy: req.user._id,
  });

  return res.status(201).json({
    success: true,
    message:
      "Employee created successfully.",
    employee,
  });
});

/*
|--------------------------------------------------------------------------
| Update Employee
|--------------------------------------------------------------------------
*/

export const updateEmployeeDetails = asyncHandler(async (req, res) => {
  const employee = await updateEmployee(
    req.params.id,
    req.body
  );

  return res.status(200).json({
    success: true,
    message:
      "Employee updated successfully.",
    employee,
  });
});

/*
|--------------------------------------------------------------------------
| Activate / Deactivate Employee
|--------------------------------------------------------------------------
*/

export const changeEmployeeStatus = asyncHandler(async (req, res) => {
  const { isActive } = req.body;

  if (typeof isActive !== "boolean") {
    res.status(400);

    throw new Error(
      "isActive must be true or false."
    );
  }

  const employee =
    await updateEmployeeStatus(
      req.params.id,
      isActive
    );

  return res.status(200).json({
    success: true,
    message: isActive
      ? "Employee activated successfully."
      : "Employee deactivated successfully.",
    employee,
  });
});

/*
|--------------------------------------------------------------------------
| Update Permissions
|--------------------------------------------------------------------------
*/

export const changePermissions = asyncHandler(async (req, res) => {
  const { permissions } = req.body;

  if (!Array.isArray(permissions)) {
    res.status(400);

    throw new Error(
      "Permissions must be an array."
    );
  }

  const employee =
    await updateEmployeePermissions(
      req.params.id,
      permissions
    );

  return res.status(200).json({
    success: true,
    message:
      "Permissions updated successfully.",
    employee,
  });
});

/*
|--------------------------------------------------------------------------
| Reset Password
|--------------------------------------------------------------------------
*/

export const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;

  if (!password) {
    res.status(400);

    throw new Error(
      "Password is required."
    );
  }

  if (password.length < 6) {
    res.status(400);

    throw new Error(
      "Password must be at least 6 characters."
    );
  }

  await resetEmployeePassword(
    req.params.id,
    password
  );

  return res.status(200).json({
    success: true,
    message:
      "Password reset successfully.",
  });
});