import { authService } from "@marketplace/data-access/auth/auth.service";

const SpecialtyPage = async () => {
  await authService.getAdminSessionOrRedirect();

  return <div>Test</div>;
};

export default SpecialtyPage;
