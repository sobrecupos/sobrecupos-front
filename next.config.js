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
        source: "/invitacion-founder",
        destination:
          "https://app.sobrecupos.com/registro?referralCode=INVITACION_FOUNDER",
        permanent: true,
      },
      {
        source: "/invitacion-dr-mencia",
        destination:
          "https://app.sobrecupos.com/registro?referralCode=INVITACION_DR_MENCIA",
        permanent: true,
      },
      {
        source: "/invitacion-dr-escobedo",
        destination:
          "https://app.sobrecupos.com/registro?referralCode=INVITACION_DR_ESCOBEDO",
        permanent: true,
      },
      {
        source: "/invitacion-dr-retuert",
        destination:
          "https://app.sobrecupos.com/registro?referralCode=INVITACION_DR_RETUERT",
        permanent: true,
      },
      {
        source: "/invitacion-pasteur",
        destination:
          "https://app.sobrecupos.com/registro?referralCode=INVITACION_PASTEUR",
        permanent: true,
      },
    ];
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
