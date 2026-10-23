import type { NextConfig } from "next";

const apiHost = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const apiHostname = new URL(apiHost).hostname;

// STATIC_EXPORT=true gera o site estático em out/ (GitHub Pages ou FTP).
const staticExport = process.env.STATIC_EXPORT === "true";
// BASE_PATH publica o site em subcaminho, ex.: /<repositório> no GitHub Pages.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(staticExport && { output: "export", trailingSlash: true }),
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
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
