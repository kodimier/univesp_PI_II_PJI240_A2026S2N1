import type { NextConfig } from "next";

const apiHost = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const apiHostname = new URL(apiHost).hostname;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: apiHostname,
        pathname: "/static/**",
      },
    ],
  },
};

export default nextConfig;
