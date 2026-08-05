import mongoose from "mongoose";

import {
  getCustomers as getCustomersService,
  getCustomerById as getCustomerByIdService,
} from "../services/customerService.js";

/*
|--------------------------------------------------------------------------
| Get Customers
|--------------------------------------------------------------------------
*/

export const getCustomers = async (
  req,
  res,
  next
) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
    } = req.query;

    const result =
      await getCustomersService({
        page: Number(page),
        limit: Number(limit),
        search: search.trim(),
      });

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Customer By ID
|--------------------------------------------------------------------------
*/

export const getCustomerById = async (
  req,
  res,
  next
) => {
  try {
    if (
      !mongoose.isValidObjectId(
        req.params.id
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid customer id.",
      });
    }

    const customer =
      await getCustomerByIdService(
        req.params.id
      );

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    res.status(200).json({
      success: true,
      customer,
    });
  } catch (error) {
    next(error);
  }
};