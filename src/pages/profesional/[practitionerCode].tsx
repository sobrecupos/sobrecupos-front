import { getComponentClassNames } from "@marketplace/ui/namespace";
import { AboutMe } from "@marketplace/views/practitioner/about-me";
import { ProfileCard } from "@marketplace/views/practitioner/profile-card";
import { Schedule } from "@marketplace/views/practitioner/schedule";
import { GetServerSidePropsContext } from "next";

const classes = getComponentClassNames("practitioner", {
  profile: "profile",
});

const Practitioner = ({ profile, schedule }: any) => (
  <div className={classes.namespace}>
    <div className={classes.profile}>
      <ProfileCard {...profile} />
      <AboutMe description={profile.description} />
    </div>
    <Schedule schedule={schedule} practitioner={profile.name} />
  </div>
);

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const practitionerCode = context.params?.["practitionerCode"];

  if (!practitionerCode) {
    return {
      notFound: true,
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/practitioners/${practitionerCode}`
  );
  const practitioner = await response.json();

  return {
    props: practitioner,
  };
};

export default Practitioner;
