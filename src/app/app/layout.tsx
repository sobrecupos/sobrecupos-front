import { Navbar } from "@marketplace/ui/navbar";
import { NavbarConfig } from "@marketplace/ui/navbar/navbar.types";
import { PropsWithChildren } from "react";

const navbarConfig = [
  {
    id: "action",
    path: "/app/sobrecupos",
    label: "Sobrecupos",
    contents: [],
  },
  {
    id: "action",
    path: "/app/perfil",
    label: "Mi perfil",
    contents: [],
  },
  {
    id: "action",
    path: "/sign-out",
    label: "Cerrar sesión",
    contents: [],
  },
] satisfies NavbarConfig;

const AppLayout = async ({
  children,
}: PropsWithChildren<Record<never, never>>) => {
  return (
    <>
      <Navbar config={navbarConfig} />
      {children}
    </>
  );
};

export default AppLayout;
