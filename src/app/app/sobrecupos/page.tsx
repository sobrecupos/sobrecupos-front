import { appointmentsService } from "@marketplace/data-access/appointments/appointments.service";
import { authService } from "@marketplace/data-access/auth/auth.service";
import { practitionersService } from "@marketplace/data-access/practitioners/practitioners.service";
import { AppointmentsForm } from "@marketplace/features/appointments-form";
import { Card } from "@marketplace/ui/card";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import "./page.scss";

const classes = getComponentClassNames("appointments-page", {
  title: "title",
  formContainer: "form-container",
});

const AppointmentsPage = async () => {
  const session = await authService.getSessionOrRedirect();
  const practitioner = await practitionersService.getProfile(
    session.user.email
  );

  if (!practitioner) {
    throw new Error("practitioner is not defined");
  }

  const schedule = await appointmentsService.getSchedule(practitioner.id);

  return (
    <div className={classes.namespace}>
      <h1 className={classes.title}>Mis Sobrecupos</h1>
      <Card className={classes.formContainer}>
        <AppointmentsForm
          schedule={schedule}
          practices={practitioner.practices}
        />
      </Card>
    </div>
  );
};

export default AppointmentsPage;
