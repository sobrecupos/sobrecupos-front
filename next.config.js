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
      {
        protocol: 'https',
        hostname: 'estebanandres.cl',
        port: '',
        pathname: '/sobrecupos/wp-content/**',
      },
    ],
  },
}

module.exports = nextConfig
