import { authService } from "@marketplace/data-access/auth/auth.service";

const OrdersPage = async () => {
  await authService.getAdminSessionOrRedirect();

  return <div>Test</div>;
};

export default OrdersPage;
