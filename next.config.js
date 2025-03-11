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
      {
        protocol: "https",
        hostname: "qzkuh5webgfly0z2.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path+(!brand-logo-v2.svg)",
        destination: "/",
        permanent: false,
      },
    ];
  },
  /* Original rewrites
  async rewrites() {
    return {
      beforeFiles: [],
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
  */
};

module.exports = nextConfig;
