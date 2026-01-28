/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // produce a standalone build for smaller Docker images
  output: 'standalone',
}

module.exports = nextConfig
