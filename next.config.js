/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sobrecupos.com',
        port: '',
        pathname: '/wp-content/**',
      },
    ],
  },
}

module.exports = nextConfig
