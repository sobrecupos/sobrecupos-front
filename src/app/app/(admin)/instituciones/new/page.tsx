import { authService } from "@marketplace/data-access/auth/auth.service";

const NewPracticePage = async () => {
  await authService.getAdminSessionOrRedirect();

  return <div>Test</div>;
};

export default NewPracticePage;
