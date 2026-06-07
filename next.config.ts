import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.aliexpress.com",
      },
      {
        protocol: "https",
        hostname: "down-br.img.susercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.susercontent.com",
      },
    ],
  },
};

export default nextConfig;
