import { appointmentsService } from "@marketplace/data-access/appointments/appointments.service";
import { practitionersService } from "@marketplace/data-access/practitioners/practitioners.service";
import { ProfileCard } from "@marketplace/features/public-practitioner-profile/profile-card";
import { ProfileDescription } from "@marketplace/features/public-practitioner-profile/profile-description";
import { Schedule } from "@marketplace/features/public-practitioner-profile/schedule";
import { getComponentClassNames } from "@marketplace/ui/namespace";
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

  if (!profile) {
    return <div>No encontramos lo que estabas buscando 😭</div>;
  }

  const schedule = (await appointmentsService.getAppointmentsByPractice(
    profile.id,
    //first day of the week
    new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 1)).toString(),
  )) as any;

  return (
    <div className={classes.namespace}>
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
        practitionerId={profile.id}
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
