/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["drive.google.com"],
  },
};

module.exports = nextConfig;
