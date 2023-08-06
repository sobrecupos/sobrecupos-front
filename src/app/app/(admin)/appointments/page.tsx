import { authService } from "@marketplace/data-access/auth/auth.service";

const AppointmentsPage = async () => {
  await authService.getAdminSessionOrRedirect();

  return <div>Test</div>;
};

export default AppointmentsPage;
