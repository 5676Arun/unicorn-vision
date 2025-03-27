/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: {
    // Disable ESLint during production builds for deployment
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; 