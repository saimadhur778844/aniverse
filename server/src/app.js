import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

import * as CF from "cashfree-pg";

const app = express();
// const orderRoutes = require("./routes/orderRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use(
  "/api/inventory",
  inventoryRoutes
);
app.use(
  "/api/customers",
  customerRoutes
);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Aniverse API Running 🚀");
});

// console.log(CF);
// process.exit(0);

export default app;