import { authService } from "@marketplace/data-access/auth/auth.service";
import { practitionersService } from "@marketplace/data-access/practitioners/practitioners.service";
import { PractitionerProfileForm } from "@marketplace/features/practitioner-profile-form";

const ProfilePage = async () => {
  const session = await authService.getSessionOrRedirect();

  if (!session.user?.email) {
    throw new Error("Email not provided!");
  }

  const profile = await practitionersService.getProfile(session.user.email);

  console.log("session user");
  console.log(session.user);

  return <PractitionerProfileForm />;
};

export default ProfilePage;
