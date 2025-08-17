/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'standalone' - this can cause issues on Vercel
  trailingSlash: false,
  // Optimize for Vercel
  swcMinify: true,
}

module.exports = nextConfig