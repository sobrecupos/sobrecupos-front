import { SignInForm } from "@marketplace/features/sign-in-form";
import { authOptions } from "@marketplace/libs/auth/options";
import { getServerSession } from "next-auth";
import { getCsrfToken } from "next-auth/react";
import { redirect } from "next/navigation";
import { authLayoutClasses } from "../classes";

const SignIn = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const csrfToken = await getCsrfToken();
  const session = await getServerSession(authOptions);

  if (typeof searchParams.callbackUrl === "string" && session?.user) {
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
