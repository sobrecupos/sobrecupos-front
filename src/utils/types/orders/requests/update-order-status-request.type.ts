import { OrderEntity } from "../common/order-entity.type";

export type UpdateOrderStatusRequest = Pick<OrderEntity, "status"> & {
  id: string;
};
