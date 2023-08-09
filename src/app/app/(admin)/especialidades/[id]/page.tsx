import { authService } from "@marketplace/data-access/auth/auth.service";
import { specialtiesService } from "@marketplace/data-access/specialties/specialties.service";
import { SpecialtyForm } from "@marketplace/features/specialty-form";
import { Card } from "@marketplace/ui/card";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import "./page.scss";

const classes = getComponentClassNames("specialty-page", {
  title: "title",
  formContainer: "form-container",
});

const SpecialtyPage = async ({ params }: { params: { id: string } }) => {
  await authService.getAdminSessionOrRedirect();
  const specialty = await specialtiesService.findOne(params.id);

  return (
    <div className={classes.namespace}>
      <h1 className={classes.title}>Editar especialidad</h1>
      <Card className={classes.formContainer}>
        <SpecialtyForm {...specialty} />
      </Card>
    </div>
  );
};

export default SpecialtyPage;
