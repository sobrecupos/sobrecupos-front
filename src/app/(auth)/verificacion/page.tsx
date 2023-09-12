import { Metadata } from "next";
import { authLayoutClasses } from "../classes";

const VerifyRequest = () => (
  <>
    <h1 className={authLayoutClasses.title}>Revisa tu correo</h1>
    <p>Te enviamos un link para iniciar sesión</p>
  </>
);

export const metadata: Metadata = {
  title: "Revisa tu correo | Sobrecupos",
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

export default VerifyRequest;
