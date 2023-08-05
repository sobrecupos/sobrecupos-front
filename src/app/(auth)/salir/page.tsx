import { SignOutForm } from "@marketplace/features/sign-out-form";
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

export default SignOut;
