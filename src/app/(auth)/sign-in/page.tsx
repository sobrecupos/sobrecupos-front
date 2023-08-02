import { SignInForm } from "@marketplace/features/sign-in-form";
import { getCsrfToken } from "next-auth/react";
import { redirect } from "next/navigation";
import { authLayoutClasses } from "../classes";

const SignIn = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const csrfToken = await getCsrfToken();

  if (typeof searchParams.callbackUrl === "string") {
    redirect(searchParams.callbackUrl);
  }

  return (
    <>
      <h1 className={authLayoutClasses.title}>Iniciar Sesión</h1>
      <SignInForm csrfToken={csrfToken} />
    </>
  );
};

export default SignIn;
