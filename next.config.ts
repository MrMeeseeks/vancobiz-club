import type { NextConfig } from "next";

// GitHub Pages serves the site from /<repo-name>. The deploy workflow sets this;
// local dev and other hosts leave it empty.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Exposed so plain <img> paths can be prefixed (next/image doesn't add basePath to static strings).
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  trailingSlash: true,
  images: { unoptimized: true },
  // cacheComponents / partialPrefetching are left off: they need PPR, which static export can't use.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
