import { SignOutForm } from "@marketplace/features/sign-out-form";
import { Metadata } from "next";
import { getCsrfToken } from "next-auth/react";
import { authLayoutClasses } from "../classes";

const SignOut = async () => {
  const csrfToken = await getCsrfToken();

  return (
    <>
      <h1 className={authLayoutClasses.title}>Cerrar sesión</h1>
      <p>¿Estás seguro que quieres salir?</p>
      <SignOutForm csrfToken={csrfToken} />
    </>
  );
};

export const metadata: Metadata = {
  title: "Salir | Sobrecupos",
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default SignOut;
