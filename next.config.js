/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: [
      "@react-email/components",
      "@react-email/render",
    ],
  },
  images: {
    domains: ["drive.google.com"],
  },
};

module.exports = nextConfig;
