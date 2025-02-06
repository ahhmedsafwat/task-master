import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: ["images.pexels.com", "cdn.pixabay.com"],
  },
};

export default nextConfig;
