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
        <PractitionerProfileForm
          addressOptions={[
            {
              value: "default",
              label: "Selecciona una opción",
              disabled: true,
            },
            {
              value: "abc",
              label: "Clinica Siempreviva, Av. Siempreviva 123, Providencia",
            },
            {
              value: "xyz",
              label: "Clinica Siempremuerta, Av. Siempremuerta 456, Las Condes",
            },
          ]}
          specialtyOptions={[
            {
              value: "default",
              label: "Selecciona una opción",
              disabled: true,
            },
            { value: "1", label: "Option 1" },
            { value: "2", label: "Option 2" },
          ]}
        />
      </Card>
    </div>
  );
};

export default ProfilePage;
