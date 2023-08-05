import { authService } from "@marketplace/data-access/auth/auth.service";

const AppPage = async () => {
  await authService.getSessionOrRedirect();

  return <div>Test</div>;
};

export default AppPage;
