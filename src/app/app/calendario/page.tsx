import { authService } from "@marketplace/data-access/auth/auth.service";
import { practitionersService } from "@marketplace/data-access/practitioners/practitioners.service";
import { AppointmentsCalendar } from "@marketplace/features/appointments-calendar";
import { Metadata } from "next";
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
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px" }}>
      <AppointmentsCalendar
        practitionerId={practitioner.id}
        specialtyCode={practitioner.specialty.code}
        practices={practitioner.practices}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Mis sobrecupos | Sobrecupos",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default CalendarPage;
