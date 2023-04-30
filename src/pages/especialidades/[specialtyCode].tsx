import { getComponentClassNames } from "@marketplace/ui/namespace";
import { Practitioners } from "@marketplace/views/specialty/practitioners";
import type { Practitioner } from "@marketplace/views/specialty/practitioners/types";
import { SpecialtyHeader } from "@marketplace/views/specialty/specialty-header";
import Head from "next/head";

type SpecialtyProps = {
  seo: {
    title: string;
    description: string;
  };
  title: string;
  practitioners: Practitioner[];
};

const { namespace } = getComponentClassNames("specialty", {});

const Specialty = ({ seo, title, practitioners }: SpecialtyProps) => (
  <div className={namespace}>
    <Head>
      <title>{seo.title}</title>
    </Head>
    <SpecialtyHeader specialtyName={title} />
    <Practitioners practitioners={practitioners} />
  </div>
);

export const getStaticProps = async () => {
  const specialtiesByCode = {
    oftalmologia: {
      id: "Oftalmología",
      seo: {
        title: "Oftalmología - Sobrecupos",
        description: "",
      },
      title: "Oftalmología",
      practitioners: [
        {
          picture: "https://sobrecupos.com/wp-content/uploads/2023/03/doc-jose-pena.jpg",
          name: "José Andrés Peña M.",
          code: "jose-pena-0",
          addressTags: ["Las Condes", "Providencia"],
          specialty: "Oftalmología",
        },
        {
          picture: "https://sobrecupos.com/wp-content/uploads/2023/03/doc-jose-pena.jpg",
          name: "José Andrés Peña M.",
          code: "jose-pena-1",
          addressTags: ["Providencia"],
          specialty: "Oftalmología",
        },
        {
          picture: "https://sobrecupos.com/wp-content/uploads/2023/03/doc-jose-pena.jpg",
          name: "José Andrés Peña M.",
          code: "jose-pena-2",
          addressTags: ["Las Condes", "Providencia"],
          specialty: "Oftalmología",
        },
        {
          picture: "https://sobrecupos.com/wp-content/uploads/2023/03/doc-jose-pena.jpg",
          name: "José Andrés Peña M.",
          code: "jose-pena-3",
          addressTags: ["Las Condes", "Providencia"],
          specialty: "Oftalmología",
        },
      ],
    },
  };

  return {
    props: specialtiesByCode.oftalmologia
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: 'blocking',
});

export default Specialty;
