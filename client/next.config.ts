import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "res.cloudinary.com",
    },
    {
      protocol: "https",
      hostname: "placehold.co",
    },
  ],
},
turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;

