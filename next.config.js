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
    domains: ["drive.google.com", "www.katywang.co.uk"],
  },
};

module.exports = nextConfig;
