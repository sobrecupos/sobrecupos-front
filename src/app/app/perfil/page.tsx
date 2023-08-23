import { authService } from "@marketplace/data-access/auth/auth.service";
import { practicesService } from "@marketplace/data-access/practices/practices.service";
import { practitionersService } from "@marketplace/data-access/practitioners/practitioners.service";
import { specialtiesService } from "@marketplace/data-access/specialties/specialties.service";
import { PractitionerProfileForm } from "@marketplace/features/practitioner-profile-form";
import { Card } from "@marketplace/ui/card";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import "./page.scss";

const classes = getComponentClassNames("practitioner-profile-page", {
  title: "title",
  formContainer: "form-container",
});

const ProfilePage = async () => {
  const session = await authService.getSessionOrRedirect();
  const [profile, practices, specialties] = await Promise.all([
    practitionersService.getProfile(session.user.email),
    practicesService.list(),
    specialtiesService.list(),
  ]);

  return (
    <div className={classes.namespace}>
      <h1 className={classes.title}>Mi perfil</h1>
      <Card className={classes.formContainer}>
        <PractitionerProfileForm
          userId={session.user.id}
          userEmail={session.user.email}
          {...profile}
          specialty={profile?.specialty.id}
          availablePractices={practices}
          availableSpecialties={specialties}
        />
      </Card>
    </div>
  );
};

export default ProfilePage;
