import { Metadata } from "next";
import Image from "next/image";
// import { AboutUs } from "../../features/home/about-us";
// import { Enrollment } from "../../features/home/enrollment";
// import { Header } from "../../features/home/header";
// import { Specialties } from "../../features/home/specialties";
import "./page.scss";

export const revalidate = 60 * 15;

// Original homepage implementation
/*
const HomePage = async () => {
  const specialties = await specialtiesService.list();

  return (
    <div className="ui-mp-home">
      <Header />
      <Specialties specialties={specialties} />
      <AboutUs />
      <Enrollment />
    </div>
  );
};
*/

// Simple landing page with logo and contact email
const HomePage = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <Image
          src="/brand-logo-v2.svg"
          alt="Sobrecupos Logo"
          width={300}
          height={100}
          priority
        />
        <a
          style={{
            fontSize: "1.2rem",
            color: "#333",
          }}
          href="mailto:contactos@sobrecupos.com"
        >
          contactos@sobrecupos.com
        </a>
      </div>
    </div>
  );
};

export const metadata: Metadata = {
  title: "Sobrecupos",
  description:
    "¡No te quedes esperando! Consigue un sobrecupo médico en nuestra plataforma hoy mismo y sigue disfrutando de tu día sin interrupciones.",
};

export default HomePage;
