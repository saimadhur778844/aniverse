import Product from "../models/Product.js";
import { STOCK_MOVEMENT } from "../constants/inventory.js";

/*
|--------------------------------------------------------------------------
| Inventory List
|--------------------------------------------------------------------------
*/

export const getInventory = async ({
  page = 1,
  limit = 10,
  search = "",
  lowStock = false,
}) => {
  const query = {};

  if (search) {
    query.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        sku: {
          $regex: search,
          $options: "i",
        },
      },
      {
        anime: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (lowStock) {
    query.$expr = {
      $lte: ["$stock", "$minimumStock"],
    };
  }

  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find(query)
      .populate("category", "name")
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit),

    Product.countDocuments(query),
  ]);

  return {
    products,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

/*
|--------------------------------------------------------------------------
| Stock Adjustment
|--------------------------------------------------------------------------
*/

export const adjustStock = async ({
  productId,
  quantity,
  type,
  reason,
  user,
}) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found.");
  }

  const newStock = product.stock + quantity;

  if (newStock < 0) {
    throw new Error("Insufficient stock.");
  }

  product.stock = newStock;

  product.stockHistory.unshift({
    quantity,
    type,
    reason,
    user,
  });

  await product.save();

  return product;
};

/*
|--------------------------------------------------------------------------
| Inventory Analytics
|--------------------------------------------------------------------------
*/

export const getInventoryAnalytics =
  async () => {
    const products = await Product.find();

    let inventoryValue = 0;

    let lowStock = 0;

    let outOfStock = 0;

    let incoming = 0;

    products.forEach((product) => {
      inventoryValue +=
        product.purchasePrice *
        product.stock;

      incoming +=
        product.incomingStock;

      if (
        product.stock <=
        product.minimumStock
      ) {
        lowStock++;
      }

      if (product.stock === 0) {
        outOfStock++;
      }
    });

    return {
      inventoryValue,
      lowStock,
      outOfStock,
      incoming,
    };
  };