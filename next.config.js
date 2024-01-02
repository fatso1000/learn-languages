/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["lolg-cdn.porofessor.gg"],
  },
};

module.exports = nextConfig;
