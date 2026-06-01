import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensures Three.js and GSAP are bundled correctly
  transpilePackages: ["three", "gsap"],
};

export default nextConfig;
