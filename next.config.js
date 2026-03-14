/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable static export for Cloudflare Pages
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Ensure trailing slashes for static export
  trailingSlash: true,
  // Configure base path if needed
  basePath: '',
  // Disable i18n for static export
  i18n: undefined,
};

module.exports = nextConfig;
