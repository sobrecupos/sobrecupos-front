import { authService } from "@marketplace/data-access/auth/auth.service";
import { practitionersService } from "@marketplace/data-access/practitioners/practitioners.service";
import { Calendar } from "@marketplace/ui/calendar";
import { redirect } from "next/navigation";

const CalendarPage = async () => {
  const session = await authService.getSessionOrRedirect("/app/sobrecupos");
  const practitioner = await practitionersService.getPrivateProfile({
    email: session.user.email,
  });

  if (!practitioner) {
    redirect("/app/perfil");
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "16px" }}>
      <Calendar practitionerId={practitioner.id} />
    </div>
  );
};

export default CalendarPage;
