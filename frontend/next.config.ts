import type { NextConfig } from "next";

const apiHost = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const apiHostname = new URL(apiHost).hostname;

// STATIC_EXPORT=true gera o site estático em out/ para a hospedagem via FTP.
const staticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(staticExport && { output: "export", trailingSlash: true }),
  images: {
    unoptimized: staticExport,
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
