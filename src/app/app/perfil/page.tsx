import { authService } from "@marketplace/data-access/auth/auth.service";
import { practicesService } from "@marketplace/data-access/practices/practices.service";
import { practitionersService } from "@marketplace/data-access/practitioners/practitioners.service";
import { specialtiesService } from "@marketplace/data-access/specialties/specialties.service";
import { PractitionerProfileForm } from "@marketplace/features/practitioner-profile-form";
import { Card } from "@marketplace/ui/card";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import { Metadata } from "next";
import "./page.scss";

const classes = getComponentClassNames("practitioner-profile-page", {
  title: "title",
  formContainer: "form-container",
});

const ProfilePage = async () => {
  const session = await authService.getSessionOrRedirect("/app/perfil");
  const [profile, practices, specialties] = await Promise.all([
    practitionersService.getPrivateProfile({ email: session.user.email }),
    practicesService.list(),
    specialtiesService.list(),
  ]);

  return (
    <div className={classes.namespace}>
      <h1 className={classes.title}>Mi perfil</h1>
      <Card className={classes.formContainer}>
        <PractitionerProfileForm
          userId={session.user.id}
          userEmail={session.user.email}
          {...profile}
          availablePractices={practices}
          availableSpecialties={specialties}
        />
      </Card>
    </div>
  );
};

export const metadata: Metadata = {
  title: "Mi perfil | Sobrecupos",
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

export default ProfilePage;
