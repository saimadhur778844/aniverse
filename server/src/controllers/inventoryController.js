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

    const data = await getInventory({
      page: Number(page),
      limit: Number(limit),
      search,
      lowStock:
        lowStock === "true",
    });

    res.json({
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

    res.json({
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
    const product =
      await adjustStock({
        productId: req.params.id,
        quantity: Number(
          req.body.quantity
        ),
        type: req.body.type,
        reason: req.body.reason,
        user:
          req.user?._id || null,
      });

    res.json({
      success: true,
      message:
        "Inventory updated successfully.",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};