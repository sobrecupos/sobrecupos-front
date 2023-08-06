import { authService } from "@marketplace/data-access/auth/auth.service";

const AppointmentPage = async () => {
  await authService.getAdminSessionOrRedirect();

  return <div>Test</div>;
};

export default AppointmentPage;
