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
      // {
      //   source: "/invitacion-founder",
      //   destination:
      //     "https://app.sobrecupos.com/registro?referralCode=INVITACION_FOUNDER",
      //   permanent: true,
      // },
      // {
      //   source: "/invitacion-dr-mencia",
      //   destination:
      //     "https://app.sobrecupos.com/registro?referralCode=INVITACION_DR_MENCIA",
      //   permanent: true,
      // },
      // {
      //   source: "/invitacion-dr-escobedo",
      //   destination:
      //     "https://app.sobrecupos.com/registro?referralCode=INVITACION_DR_ESCOBEDO",
      //   permanent: true,
      // },
      // {
      //   source: "/invitacion-dr-retuert",
      //   destination:
      //     "https://app.sobrecupos.com/registro?referralCode=INVITACION_DR_RETUERT",
      //   permanent: true,
      // },
      // {
      //   source: "/invitacion-pasteur",
      //   destination:
      //     "https://app.sobrecupos.com/registro?referralCode=INVITACION_PASTEUR",
      //   permanent: true,
      // },
      // {
      //   source: "/",
      //   destination: "/",
      //   permanent: false, // Evita redirigir la ruta raíz
      // },
      {
        source: "/especialidades/:path*", // Captura cualquier ruta que no sea la raíz "/"
        destination: "/",
        permanent: false, // Redirige al home "/"
      },
      {
        source: "/politicas-de-privacidad", // Captura cualquier ruta que no sea la raíz "/"
        destination: "/",
        permanent: false, // Redirige al home "/"
      },
      {
        source: "/terminos-y-condiciones", // Captura cualquier ruta que no sea la raíz "/"
        destination: "/",
        permanent: false, // Redirige al home "/"
      },
      {
        source: "/preguntas-frecuentess", // Captura cualquier ruta que no sea la raíz "/"
        destination: "/",
        permanent: false, // Redirige al home "/"
      },
      {
        source: "/profesional/:path*", // Captura cualquier ruta que no sea la raíz "/"
        destination: "/",
        permanent: false, // Redirige al home "/"
      },
      {
        source: "/resumen", // Captura cualquier ruta que no sea la raíz "/"
        destination: "/",
        permanent: false, // Redirige al home "/"
      },
      {
        source: "/app/:path*", // Captura cualquier ruta que no sea la raíz "/"
        destination: "/",
        permanent: false, // Redirige al home "/"
      },
      {
        source: "/iniciar/:path*", // Captura cualquier ruta que no sea la raíz "/"
        destination: "/",
        permanent: false, // Redirige al home "/"
      },
      {
        source: "/registro/:path*", // Captura cualquier ruta que no sea la raíz "/"
        destination: "/",
        permanent: false, // Redirige al home "/"
      },
      {
        source: "/salir/:path*", // Captura cualquier ruta que no sea la raíz "/"
        destination: "/",
        permanent: false, // Redirige al home "/"
      },
      {
        source: "/verificacion/:path*", // Captura cualquier ruta que no sea la raíz "/"
        destination: "/",
        permanent: false, // Redirige al home "/"
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        // {
        //   source: "/:path*",
        //   has: [
        //     {
        //       type: "host",
        //       value: "profesionales.sobrecupos.com",
        //     },
        //   ],
        //   destination: "https://sobrecupos.pro/:path*",
        // },
      ],
      afterFiles: [],
      fallback: [
        // {
        //   source: "/:path*",
        //   has: [
        //     {
        //       type: "host",
        //       value: "app.sobrecupos.com",
        //     },
        //   ],
        //   destination: "/app/:path*",
        // },
        // {
        //   source: "/:path*",
        //   has: [
        //     {
        //       type: "host",
        //       value: "admin.sobrecupos.com",
        //     },
        //   ],
        //   destination: "/admin/:path*",
        // },
      ],
    };
  },
};

module.exports = nextConfig;
