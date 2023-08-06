import { authService } from "@marketplace/data-access/auth/auth.service";

const PractitionerPage = async () => {
  await authService.getAdminSessionOrRedirect();

  return <div>Test</div>;
};

export default PractitionerPage;
