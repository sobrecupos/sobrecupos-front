import { appointmentsService } from "@marketplace/data-access/appointments/appointments.service";
import { practitionersService } from "@marketplace/data-access/practitioners/practitioners.service";
import { ProfileCard } from "@marketplace/features/public-practitioner-profile/profile-card";
import { ProfileDescription } from "@marketplace/features/public-practitioner-profile/profile-description";
import { Schedule } from "@marketplace/features/public-practitioner-profile/schedule";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import dayjs from "dayjs";
import "./page.scss";

export type PractitionerPageProps = {
  params: {
    practitionerCode: string;
  };
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const classes = getComponentClassNames("practitioner-page", {
  profile: "profile",
});

const PractitionerPage = async ({
  params: { practitionerCode },
}: PractitionerPageProps) => {
  const profile = await practitionersService.getPublicProfile(practitionerCode);
  const from = dayjs().startOf('day').toISOString();
  const to = new Date(new Date().setDate(new Date().getDate() + 6)).toISOString();
  if (!profile) {
    return <div>No encontramos lo que estabas buscando 😭</div>;
  }

  const schedule = (await appointmentsService.getAppointmentsByPracticeFromTo(
    profile.id,
    from,
    to
  )) as any;

  return (
    <div className={`${classes.namespace} w-max-[1440px]`}>
      <div className={classes.profile}>
        <ProfileCard
          name={profile.fullName}
          picture={profile.picture}
          specialty={profile.specialty.name}
          licenseId={profile.licenseId}
        />
        <ProfileDescription description={profile.description} />
      </div>
      <Schedule
        showSpinner={false}
        schedule={schedule}
        practitioner={profile.fullName}
        specialty={profile.specialty.code}
        practitionerId={profile.id}
        from={from}
        to={to}
      />
    </div>
  );
};

export const generateMetadata = async ({
  params: { practitionerCode },
}: PractitionerPageProps) => {
  const profile = await practitionersService.getPublicProfile(practitionerCode);

  if (!profile) {
    return {
      title: "No encontrado",
    };
  }

  return {
    title: `${profile.fullName} | ${profile.specialty.name}`,
    description: profile.description,
  };
};

export default PractitionerPage;
