import { OrderEntity } from "../common/order-entity.type";

export type OrderResponse = Omit<
  OrderEntity<{
    id: string;
    start: string;
    durationInMinutes: number;
    address: string;
    insuranceProviders: {
      id: string;
      name: string;
      isActive: boolean;
    }[];
    practitionerId: string;
    practitionerName: string;
  }>,
  "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
  id: string;
};
