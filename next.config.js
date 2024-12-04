const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@react-email/components", "@react-email/render"],
  images: {
    domains: ["drive.google.com", "www.katywang.co.uk"],
  },
};

module.exports = withNextIntl(nextConfig);
