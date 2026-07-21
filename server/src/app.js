import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);


app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Aniverse API Running 🚀");
});

export default app;