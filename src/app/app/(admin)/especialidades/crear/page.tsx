import { authService } from "@marketplace/data-access/auth/auth.service";
import { SpecialtyForm } from "@marketplace/features/specialty-form";
import { Card } from "@marketplace/ui/card";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import "./page.scss";

const classes = getComponentClassNames("create-specialty-page", {
  title: "title",
  formContainer: "form-container",
});

const NewSpecialtyPage = async () => {
  await authService.getAdminSessionOrRedirect();

  return (
    <div className={classes.namespace}>
      <h1 className={classes.title}>Crear especialidad</h1>
      <Card className={classes.formContainer}>
        <SpecialtyForm />
      </Card>
    </div>
  );
};

export default NewSpecialtyPage;
