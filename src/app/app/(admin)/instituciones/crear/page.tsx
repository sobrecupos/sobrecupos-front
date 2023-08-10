import { authService } from "@marketplace/data-access/auth/auth.service";
import { PracticeForm } from "@marketplace/features/practice-form";
import { Card } from "@marketplace/ui/card";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import "./page.scss";

const classes = getComponentClassNames("create-practice-page", {
  title: "title",
  formContainer: "form-container",
});

const NewPracticePage = async () => {
  await authService.getAdminSessionOrRedirect();

  return (
    <div className={classes.namespace}>
      <h1 className={classes.title}>Crear institución</h1>
      <Card className={classes.formContainer}>
        <PracticeForm />
      </Card>
    </div>
  );
};

export default NewPracticePage;
