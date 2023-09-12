import { appointmentsService } from "@marketplace/data-access/appointments/appointments.service";
import { practitionersService } from "@marketplace/data-access/practitioners/practitioners.service";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import { AppointmentsByPractice } from "@marketplace/utils/types/appointments";
import { PublicPractitionerProfileResponse } from "@marketplace/utils/types/practitioners";
import { AboutMe } from "@marketplace/views/practitioner/about-me";
import { ProfileCard } from "@marketplace/views/practitioner/profile-card";
import { Schedule } from "@marketplace/views/practitioner/schedule";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

type PractitionerProps = {
  profile: PublicPractitionerProfileResponse;
  schedule: AppointmentsByPractice;
};

const classes = getComponentClassNames("practitioner", {
  profile: "profile",
});

const Practitioner = ({ profile, schedule }: PractitionerProps) => (
  <>
    <Head>
      <title>{`${profile.fullName} | ${profile.specialty.name}`}</title>
      <meta
        name="description"
        content={profile.description}
        key="meta-description"
      />
    </Head>
    <div className={classes.namespace}>
      <div className={classes.profile}>
        <ProfileCard
          name={profile.fullName}
          picture={profile.picture}
          specialty={profile.specialty.name}
          licenseId={profile.licenseId}
        />
        <AboutMe description={profile.description} />
      </div>
      <Schedule
        showSpinner={false}
        schedule={schedule}
        practitioner={profile.fullName}
        practitionerId={profile.id}
      />
    </div>
  </>
);

export const getStaticProps = async (context: GetServerSidePropsContext) => {
  const practitionerCode = context.params?.["practitionerCode"];

  if (!practitionerCode || typeof practitionerCode !== "string") {
    return {
      notFound: true,
    };
  }

  const profile = await practitionersService.getPublicProfile(practitionerCode);

  if (!profile) {
    return {
      notFound: true,
    };
  }

  const schedule = await appointmentsService.getAppointmentsByPractice(
    profile.id
  );

  return {
    props: {
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
