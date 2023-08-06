import { authService } from "@marketplace/data-access/auth/auth.service";

const NewSpecialtyPage = async () => {
  await authService.getAdminSessionOrRedirect();

  return <div>Test</div>;
};

export default NewSpecialtyPage;
