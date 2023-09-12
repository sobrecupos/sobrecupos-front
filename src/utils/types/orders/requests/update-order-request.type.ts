import { OrderEntity } from "../common/order-entity.type";

export type UpdateOrderRequest = Partial<
  Omit<OrderEntity, "createdAt" | "updatedAt">
> & {
  id: string;
};
