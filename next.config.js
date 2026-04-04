/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disabled: StrictMode double-mount destroys WebGL context
  // produce a standalone build for smaller Docker images
  output: 'standalone',
}

module.exports = nextConfig
