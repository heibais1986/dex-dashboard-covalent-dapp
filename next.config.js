/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure compatibility with Cloudflare Pages
  images: {
    domains: ['cryptologos.cc', 'encrypted-tbn0.gstatic.com', 'assets.coingecko.com'],
  },
};

module.exports = nextConfig;
