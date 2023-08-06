import { authService } from "@marketplace/data-access/auth/auth.service";

const PracticesPage = async () => {
  await authService.getAdminSessionOrRedirect();

  return <div>Test</div>;
};

export default PracticesPage;
