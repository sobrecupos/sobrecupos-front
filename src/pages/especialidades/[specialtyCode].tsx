import { getComponentClassNames } from "@marketplace/ui/namespace";
import { Practitioners } from "@marketplace/views/specialty/practitioners";
import type { Practitioner } from "@marketplace/views/specialty/practitioners/types";
import { SpecialtyHeader } from "@marketplace/views/specialty/specialty-header";
import { GetStaticPropsContext } from "next";
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
      <meta
        name="description"
        content={seo.description}
        key="meta-description"
      />
    </Head>
    <SpecialtyHeader specialtyName={title} />
    <Practitioners practitioners={practitioners} />
  </div>
);

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const specialtyCode = context.params?.["specialtyCode"];

  if (!specialtyCode) {
    return {
      notFound: true,
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/specialties/${specialtyCode}`
  );
  const specialtiesByCode = await response.json();

  return {
    props: specialtiesByCode,
    revalidate: 60,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default Specialty;
