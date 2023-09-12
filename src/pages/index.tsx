import { specialtiesService } from "@marketplace/data-access/specialties/specialties.service";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import { SpecialtyResponse } from "@marketplace/utils/types/specialties";
import { AboutUs } from "@marketplace/views/main/about-us";
import { Enrollment } from "@marketplace/views/main/enrollment";
import { Header } from "@marketplace/views/main/header";
import { Specialties } from "@marketplace/views/main/specialties";
import Head from "next/head";

type HomeProps = {
  specialties: SpecialtyResponse[];
};

const { namespace } = getComponentClassNames("home", {});

const Home = ({ specialties }: HomeProps) => (
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

export const getStaticProps = async () => {
  const specialties = await specialtiesService.list();

  return {
    props: {
      specialties,
    },
  };
};

export default Home;
