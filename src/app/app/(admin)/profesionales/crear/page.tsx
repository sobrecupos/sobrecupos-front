import { authService } from "@marketplace/data-access/auth/auth.service";
import { practicesService } from "@marketplace/data-access/practices/practices.service";
import { specialtiesService } from "@marketplace/data-access/specialties/specialties.service";
import { PractitionerProfileForm } from "@marketplace/features/practitioner-profile-form";
import { Card } from "@marketplace/ui/card";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import "./page.scss";

const classes = getComponentClassNames("create-practitioner-page", {
  title: "title",
  formContainer: "form-container",
});

const NewPractitionerPage = async () => {
  await authService.getAdminSessionOrRedirect();
  const [practices, specialties] = await Promise.all([
    practicesService.list(),
    specialtiesService.list(),
  ]);

  return (
    <div className={classes.namespace}>
      <h1 className={classes.title}>Crear profesional</h1>
      <Card className={classes.formContainer}>
        <PractitionerProfileForm
          availablePractices={practices}
          availableSpecialties={specialties}
        />
      </Card>
    </div>
  );
};

export default NewPractitionerPage;
