import { authService } from "@marketplace/data-access/auth/auth.service";
import { practitionersService } from "@marketplace/data-access/practitioners/practitioners.service";
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

  if (!session.user?.email) {
    throw new Error("Email not provided!");
  }

  const profile = await practitionersService.getProfile(session.user.email);

  return (
    <div className={classes.namespace}>
      <h1 className={classes.title}>Mi perfil</h1>
      <Card className={classes.formContainer}>
        <PractitionerProfileForm />
      </Card>
    </div>
  );
};

export default ProfilePage;
