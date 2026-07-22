import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "aniverse/products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  }),
});

export default multer({ storage });