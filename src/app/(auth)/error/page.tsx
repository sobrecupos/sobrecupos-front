import { Metadata } from "next";
import Link from "next/link";
import { authLayoutClasses } from "../classes";

const ErrorPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => (
  <>
    <h1 className={authLayoutClasses.title}>Algo salió mal</h1>
    {searchParams.error === "Verification" ? (
      <p>El link expiró o ya fue usado.</p>
    ) : (
      <p>No fue posible iniciar sesión.</p>
    )}
    <Link href="/iniciar">Inicia sesión nuevamente.</Link>
  </>
);

export const metadata: Metadata = {
  title: "Algo salió mal | Sobrecupos",
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

export default ErrorPage;
