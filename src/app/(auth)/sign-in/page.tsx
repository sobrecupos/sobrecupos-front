import { SignInForm } from "@marketplace/features/sign-in-form";
import { getCsrfToken } from "next-auth/react";
import { authLayoutClasses } from "../classes";

const SignIn = async () => {
  const csrfToken = await getCsrfToken();

  return (
    <>
      <h1 className={authLayoutClasses.title}>Iniciar Sesión</h1>
      <SignInForm csrfToken={csrfToken} />
    </>
  );
};

export default SignIn;
