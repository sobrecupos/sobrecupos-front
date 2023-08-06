import { authService } from "@marketplace/data-access/auth/auth.service";

const SpecialtiesPage = async () => {
  await authService.getAdminSessionOrRedirect();

  return <div>Test</div>;
};

export default SpecialtiesPage;
