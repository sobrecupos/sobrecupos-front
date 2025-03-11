// import { specialtiesService } from "@marketplace/data-access/specialties/specialties.service";
// import { PropsWithChildren } from "react";
// import { ButtonLink } from "../../ui/button";
// import { Footer } from "../../ui/footer";
// import { Navbar } from "../../ui/navbar";
// import "./layout.scss";

// export const revalidate = 60 * 15;

// const PublicLayout = async ({
//   children,
// }: PropsWithChildren<Record<never, never>>) => {
//   const specialties = await specialtiesService.list();

//   return (
//     <>
//       <Navbar
//         config={[
//           {
//             id: "action" as const,
//             path: "/",
//             label: "Inicio",
//             contents: [],
//           },
//           {
//             id: "submenu" as const,
//             path: "/especialidades",
//             label: "Especialidades",
//             contents: specialties.map((specialty) => ({
//               id: "action",
//               path: `/especialidades/${specialty.code}`,
//               label: specialty.name,
//               contents: [],
//             })),
//           },
//           {
//             id: "action" as const,
//             path: "/preguntas-frecuentes",
//             label: "Preguntas frecuentes",
//             contents: [],
//           },
//         ]}
//         cta={<ButtonLink href="/iniciar">Acceso médicos</ButtonLink>}
//       />
//       <main className="ui-mp-layout__main">{children}</main>

//       <Footer />
//     </>
//   );
// };

// export default PublicLayout;

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CL">
      <body>{children}</body>
    </html>
  );
}
