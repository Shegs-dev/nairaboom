/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
    domains: ["placehold.co", "nairaboom.com.ng", "unsplash.com"]
  }
};

module.exports = nextConfig;
