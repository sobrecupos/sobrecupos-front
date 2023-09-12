import { authService } from "@marketplace/data-access/auth/auth.service";
import { SignInForm } from "@marketplace/features/sign-in-form";
import { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Iniciar sesión | Sobrecupos",
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

export default SignIn;
