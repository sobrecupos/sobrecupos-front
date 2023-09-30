import { RestClient } from "@marketplace/libs/rest-client";
import { CreateOrderRequest } from "@marketplace/utils/types/orders";

export class OrdersClient extends RestClient {
  create(body: CreateOrderRequest) {
    return this.post("/api/orders", { body });
  }

  findByItemId(itemId: string) {
    return this.get("/api/orders/find", { params: { itemId } });
  }
}

export const ordersClient = new OrdersClient();
