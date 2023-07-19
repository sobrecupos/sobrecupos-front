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

const Practitioner = ({ profile, seo, schedule }: any) => (
  <>
    <Head>
      <title>{seo.title}</title>
      <meta
        name="description"
        content={seo.description}
        key="meta-description"
      />
      {seo.noIndex ? (
        <meta name="robots" content="noindex" data-testid="seo-robots" />
      ) : null}
    </Head>
    <div className={classes.namespace}>
      <div className={classes.profile}>
        <ProfileCard {...profile} />
        <AboutMe description={profile.description} />
      </div>
      <Schedule
        showSpinner={false}
        schedule={schedule}
        practitioner={profile.name}
      />
    </div>
  </>
);

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
  const scheduleResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/practitioners/${practitionerCode}/schedule`
  );

  const { profile, seo } = await response.json();
  const schedule = await scheduleResponse.json();

  return {
    props: {
      seo,
      profile,
      practitionerCode,
      schedule,
    },
    revalidate: 60 * 5,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default Practitioner;
