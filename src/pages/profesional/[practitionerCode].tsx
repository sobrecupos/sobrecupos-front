import { getComponentClassNames } from "@marketplace/ui/namespace";
import { AboutMe } from "@marketplace/views/practitioner/about-me";
import { ProfileCard } from "@marketplace/views/practitioner/profile-card";
import { Schedule } from "@marketplace/views/practitioner/schedule";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

const classes = getComponentClassNames("practitioner", {
  profile: "profile",
});

const Practitioner = ({ profile, seo, practitionerCode }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const abortController = useRef<AbortController | null>(null);
  const [schedule, setSchedule] = useState({
    date: new Date().toString(),
    results: [],
  });

  useEffect(() => {
    abortController.current = new AbortController();

    fetch(`/api/practitioners/${practitionerCode}/schedule`, {
      signal: abortController.current.signal,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error("Cannot load time slots");
      })
      .catch((error) => {
        console.error(error);
      })
      .then((data) => {
        setSchedule(data);
        setIsLoading(false);
      });
  }, [practitionerCode]);

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta
          name="description"
          content={seo.description}
          key="meta-description"
        />
      </Head>
      <div className={classes.namespace}>
        <div className={classes.profile}>
          <ProfileCard {...profile} />
          <AboutMe description={profile.description} />
        </div>
        <Schedule
          showSpinner={isLoading}
          schedule={schedule}
          practitioner={profile.name}
        />
      </div>
    </>
  );
};

export const getStaticProps = async (context: GetServerSidePropsContext) => {
  const practitionerCode = context.params?.["practitionerCode"];

  if (!practitionerCode) {
    return {
      notFound: true,
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/practitioners/${practitionerCode}`
  );
  const { profile, seo } = await response.json();

  return {
    props: {
      seo,
      profile,
      practitionerCode,
    },
    revalidate: 300,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default Practitioner;
