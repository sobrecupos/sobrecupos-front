import { RestClient } from "@marketplace/libs/rest-client";
import { CreateOrderRequest } from "@marketplace/utils/types/orders";

export class OrdersClient extends RestClient {
  create(body: CreateOrderRequest) {
    return this.post("/api/orders", { body });
  }
}

export const ordersClient = new OrdersClient();
