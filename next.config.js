/** @type {import('next').NextConfig} */

let isBuilding = false;
if (!process.env.PREBUILD || !process.env.POSTBUILD) {
  console.warn("Failed to determine building status. Check the prebuild and postbuild scripts.");
} else {
  isBuilding = process.env.PREBUILD === "true" && process.env.POSTBUILD !== "true";
}

const nextConfig = {
  reactStrictMode: false,
  serverRuntimeConfig: {
    isBuilding,
  },
  publicRuntimeConfig: {
    debugMode: true,
    isBuilding,
  }
}

module.exports = nextConfig
