import express from "express";

import upload from "../middleware/upload.js";

import { uploadImage } from "../controllers/uploadController.js";

import protect from "../middleware/protect.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("admin", "superadmin"),
  upload.single("image"),
  uploadImage
);

export default router;