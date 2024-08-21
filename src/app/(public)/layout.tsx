import { specialtiesService } from "@marketplace/data-access/specialties/specialties.service";
import { PropsWithChildren } from "react";
import "./layout.scss";

export const revalidate = 60 * 15;

const PublicLayout = async ({
  children,
}: PropsWithChildren<Record<never, never>>) => {
  const specialties = await specialtiesService.list();

  return (
    <>
      {/* Para activar las vistas estas deben ser descomentadas */}

      {/* <Navbar
        config={[
          {
            id: "action" as const,
            path: "/",
            label: "Inicio",
            contents: [],
          },
          {
            id: "submenu" as const,
            path: "/especialidades",
            label: "Especialidades",
            contents: specialties.map((specialty) => ({
              id: "action",
              path: `/especialidades/${specialty.code}`,
              label: specialty.name,
              contents: [],
            })),
          },
          {
            id: "action" as const,
            path: "/preguntas-frecuentes",
            label: "Preguntas frecuentes",
            contents: [],
          },
        ]}
        cta={
          <ButtonLink href="/iniciar">
            Acceso médicos
          </ButtonLink>
        }
      /> */}
      <main className="ui-mp-layout__main">{children}</main>
      {/* Para activar las vistas estas deben ser descomentadas */}

      {/* <Footer /> */}
    </>
  );
};

export default PublicLayout;
