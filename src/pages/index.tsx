import { getComponentClassNames } from "@marketplace/ui/namespace";
import { AboutUs } from "@marketplace/views/main/about-us";
import { Enrollment } from "@marketplace/views/main/enrollment";
import { Header } from "@marketplace/views/main/header";
import { Specialties } from "@marketplace/views/main/specialties";
import Head from "next/head";

const specialties = [
  { code: "pediatria", label: "Pediatría" },
  { code: "otorrino", label: "Otorrino" },
  { code: "oftalmologia", label: "Oftalmología" },
  { code: "traumatologia", label: "Traumatología" },
  { code: "cirugia", label: "Cirugía" },
  { code: "dermatologia", label: "Dermatología" },
];

const { namespace } = getComponentClassNames("home", {});

export default function Home() {
  return (
    <div className={namespace}>
      <Head>
        <title>Sobrecupos</title>
        <meta
          name="description"
          content="¡No te quedes esperando! Consigue un sobrecupo médico en nuestra plataforma hoy mismo y sigue disfrutando de tu día sin interrupciones."
          key="meta-description"
        />
      </Head>
      <Header />
      <Specialties specialties={specialties} />
      <AboutUs />
      <Enrollment />
    </div>
  );
}
