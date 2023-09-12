import { OrderEntity } from "../common/order-entity.type";

export type CreateOrderRequest = Omit<
  OrderEntity,
  "createdAt" | "updatedAt" | "total"
>;
