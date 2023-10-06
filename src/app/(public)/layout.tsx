import { specialtiesService } from "@marketplace/data-access/specialties/specialties.service";
import { Button } from "@marketplace/ui/button";
import { Footer } from "@marketplace/ui/footer";
import { Navbar } from "@marketplace/ui/navbar";
import { PropsWithChildren } from "react";

export const revalidate = 60 * 15;

const PublicLayout = async ({
  children,
}: PropsWithChildren<Record<never, never>>) => {
  const specialties = await specialtiesService.list();

  return (
    <>
      <Navbar
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
        cta={<Button>¿Eres médico?</Button>}
      />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default PublicLayout;
