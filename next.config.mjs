// @ts-check

/**Author: Olexiy Prokhvatylo B00847680 */

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  modularizeImports: {
    "@heroicons/react/20/solid": {
      transform: "@heroicons/react/20/solid/{{member}}",
    },
    "@heroicons/react/24/solid": {
      transform: "@heroicons/react/24/solid/{{member}}",
    },
    "@heroicons/react/24/outline": {
      transform: "@heroicons/react/24/outline/{{member}}",
    },
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};
export default config;
