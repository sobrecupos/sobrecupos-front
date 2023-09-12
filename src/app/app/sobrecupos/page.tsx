import { appointmentsService } from "@marketplace/data-access/appointments/appointments.service";
import { authService } from "@marketplace/data-access/auth/auth.service";
import { practitionersService } from "@marketplace/data-access/practitioners/practitioners.service";
import { AppointmentsForm } from "@marketplace/features/appointments-form";
import { Card } from "@marketplace/ui/card";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import "./page.scss";

const classes = getComponentClassNames("appointments-page", {
  title: "title",
  formContainer: "form-container",
});

const AppointmentsPage = async () => {
  const session = await authService.getSessionOrRedirect("/app/sobrecupos");
  const practitioner = await practitionersService.getPrivateProfile({
    email: session.user.email,
  });

  if (!practitioner) {
    redirect("/app/perfil");
  }

  const schedule = await appointmentsService.getSchedule(practitioner.id);

  return (
    <div className={classes.namespace}>
      <h1 className={classes.title}>Mis Sobrecupos</h1>
      <Card className={classes.formContainer}>
        <AppointmentsForm
          specialtyCode={practitioner.specialty.code}
          practitionerId={practitioner.id}
          schedule={schedule}
          practices={practitioner.practices}
        />
      </Card>
    </div>
  );
};

export const metadata: Metadata = {
  title: "Mis sobrecupos | Sobrecupos",
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default AppointmentsPage;
