import { SignUpForm } from "@marketplace/features/sign-up-form";
import { Metadata } from "next";
import { authLayoutClasses } from "../classes";

const SignUpPage = ({
  searchParams,
}: {
  searchParams: { referralCode?: string };
}) => (
  <>
    <h1 className={authLayoutClasses.title}>Regístrate</h1>
    <SignUpForm referralCode={searchParams.referralCode} />
  </>
);

export const metadata: Metadata = {
  title: "Registrarme | Sobrecupos",
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

export default SignUpPage;
