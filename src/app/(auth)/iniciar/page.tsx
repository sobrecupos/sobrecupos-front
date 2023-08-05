import { authService } from "@marketplace/data-access/auth/auth.service";
import { SignInForm } from "@marketplace/features/sign-in-form";
import { getServerSession } from "next-auth";
import { getCsrfToken } from "next-auth/react";
import { redirect } from "next/navigation";
import { authLayoutClasses } from "../classes";

const SignIn = async ({
  searchParams,
}: {
  searchParams: { callbackUrl?: string; email?: string };
}) => {
  const csrfToken = await getCsrfToken();
  const session = await getServerSession(authService.options);

  if (typeof searchParams.callbackUrl === "string" && session?.user) {
    redirect(searchParams.callbackUrl);
  }

  return (
    <>
      <h1 className={authLayoutClasses.title}>Iniciar Sesión</h1>
      <SignInForm csrfToken={csrfToken} defaultEmail={searchParams.email} />
    </>
  );
};

export default SignIn;
