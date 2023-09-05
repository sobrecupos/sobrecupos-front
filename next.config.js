/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sobrecupos.com",
        port: "",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "estebanandres.cl",
        port: "",
        pathname: "/sobrecupos/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "scsobrecupos-marketplace.s3.us-east-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/:path*",
          has: [
            {
              type: "host",
              value: "profesionales.sobrecupos.com",
            },
          ],
          destination: "https://sobrecupos.pro/:path*",
        },
      ],
      afterFiles: [],
      fallback: [
        {
          source: "/:path*",
          has: [
            {
              type: "host",
              value: "app.sobrecupos.com",
            },
          ],
          destination: "/app/:path*",
        },
        {
          source: "/:path*",
          has: [
            {
              type: "host",
              value: "admin.sobrecupos.com",
            },
          ],
          destination: "/admin/:path*",
        },
      ],
    };
  },
};

module.exports = nextConfig;
