import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: 'cdn.sanity.io' }],
  },
  experimental: {
    // Bløde overgange mellem sider (View Transitions API)
    viewTransition: true,
  },
};

export default nextConfig;
