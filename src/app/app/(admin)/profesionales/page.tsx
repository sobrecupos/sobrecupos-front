import { authService } from "@marketplace/data-access/auth/auth.service";

const PractitionersPage = async () => {
  await authService.getAdminSessionOrRedirect();

  return <div>Test</div>;
};

export default PractitionersPage;
