import { authService } from "@marketplace/data-access/auth/auth.service";
import { practicesService } from "@marketplace/data-access/practices/practices.service";
import { PracticeForm } from "@marketplace/features/practice-form";
import { Card } from "@marketplace/ui/card";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import "./page.scss";

const classes = getComponentClassNames("practice-page", {
  title: "title",
  formContainer: "form-container",
});

const PracticePage = async ({ params }: { params: { id: string } }) => {
  await authService.getAdminSessionOrRedirect();
  const practice = await practicesService.findOne(params.id);

  return (
    <div className={classes.namespace}>
      <h1 className={classes.title}>Editar institución</h1>
      <Card className={classes.formContainer}>
        <PracticeForm {...practice} />
      </Card>
    </div>
  );
};

export default PracticePage;
