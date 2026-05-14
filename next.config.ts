import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Static HTML export for Netlify — emits to ./out
  output: "export",
  // The home page redirect uses next/navigation's redirect() which doesn't
  // work in static export; we keep that page as a passthrough at build time.
  trailingSlash: true,
  images: {
    // Static export can't use the Image Optimization server.
    unoptimized: true,
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
