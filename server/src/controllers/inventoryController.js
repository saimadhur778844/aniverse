import mongoose from "mongoose";

import {
  getInventory,
  adjustStock,
  getInventoryAnalytics,
} from "../services/inventoryService.js";

/*
|--------------------------------------------------------------------------
| GET Inventory
|--------------------------------------------------------------------------
*/

export const getInventoryList = async (
  req,
  res,
  next
) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      lowStock = false,
    } = req.query;

    const data =
      await getInventory({
        page: Number(page),
        limit: Number(limit),
        search,
        lowStock:
          lowStock === "true",
      });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| GET Analytics
|--------------------------------------------------------------------------
*/

export const getAnalytics = async (
  req,
  res,
  next
) => {
  try {
    const data =
      await getInventoryAnalytics();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| PATCH Stock
|--------------------------------------------------------------------------
*/

export const updateStock = async (
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
        message:
          "Invalid product id.",
      });
    }

    const quantity = Number(
      req.body.quantity
    );

    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message:
          "Quantity must be greater than zero.",
      });
    }

    const product =
      await adjustStock({
        productId: req.params.id,
        quantity,
        type: req.body.type,
        reason: req.body.reason,
        user:
          req.user?._id ?? null,
      });

    res.status(200).json({
      success: true,
      message:
        "Inventory updated successfully.",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};