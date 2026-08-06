import bcrypt from "bcrypt";
import User from "../models/User.js";

/*
|--------------------------------------------------------------------------
| Get Employees
|--------------------------------------------------------------------------
*/

export const getEmployees = async ({
  page = 1,
  limit = 10,
  search = "",
  role,
  status,
}) => {
  const query = {
    role: {
      $in: [
        "employee",
        "manager",
        "admin",
      ],
    },
  };

  if (role) {
    query.role = role;
  }

  if (status !== undefined && status !== "") {
    query.isActive =
      status === "active";
  }

  if (search) {
    query.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const skip =
    (page - 1) * limit;

  const [employees, total] =
    await Promise.all([
      User.find(query)
        .select("-password")
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit),

      User.countDocuments(query),
    ]);

  return {
    employees,
    total,
    page,
    pages: Math.ceil(
      total / limit
    ),
  };
};

/*
|--------------------------------------------------------------------------
| Get Employee
|--------------------------------------------------------------------------
*/

export const getEmployeeById =
  async (id) => {
    return await User.findById(id)
      .select("-password");
  };

/*
|--------------------------------------------------------------------------
| Create Employee
|--------------------------------------------------------------------------
*/

export const createEmployee =
  async ({
    name,
    email,
    password,
    phone,
    avatar,
    role,
    permissions,
    createdBy,
  }) => {
    const exists =
      await User.findOne({
        email,
      });

    if (exists) {
      throw new Error(
        "Employee already exists."
      );
    }

    const employee =
      await User.create({
        name,
        email,
        password,
        phone,
        avatar,
        role,
        permissions,
        createdBy,
      });

    return employee;
  };

/*
|--------------------------------------------------------------------------
| Update Employee
|--------------------------------------------------------------------------
*/

export const updateEmployee =
  async (
    id,
    payload
  ) => {
    const employee =
      await User.findById(id);

    if (!employee) {
      throw new Error(
        "Employee not found."
      );
    }

    employee.name =
      payload.name ??
      employee.name;

    employee.email =
      payload.email ??
      employee.email;

    employee.phone =
      payload.phone ??
      employee.phone;

    employee.avatar =
      payload.avatar ??
      employee.avatar;

    employee.role =
      payload.role ??
      employee.role;

    employee.permissions =
      payload.permissions ??
      employee.permissions;

    await employee.save();

    return employee;
  };

/*
|--------------------------------------------------------------------------
| Activate / Deactivate
|--------------------------------------------------------------------------
*/

export const updateEmployeeStatus =
  async (
    id,
    isActive
  ) => {
    const employee =
      await User.findById(id);

    if (!employee) {
      throw new Error(
        "Employee not found."
      );
    }

    employee.isActive =
      isActive;

    await employee.save();

    return employee;
  };

/*
|--------------------------------------------------------------------------
| Update Permissions
|--------------------------------------------------------------------------
*/

export const updateEmployeePermissions =
  async (
    id,
    permissions
  ) => {
    const employee =
      await User.findById(id);

    if (!employee) {
      throw new Error(
        "Employee not found."
      );
    }

    employee.permissions =
      permissions;

    await employee.save();

    return employee;
  };

/*
|--------------------------------------------------------------------------
| Reset Password
|--------------------------------------------------------------------------
*/

export const resetEmployeePassword =
  async (
    id,
    password
  ) => {
    const employee =
      await User.findById(id);

    if (!employee) {
      throw new Error(
        "Employee not found."
      );
    }

    employee.password = password;

    await employee.save();

    return employee;
  };