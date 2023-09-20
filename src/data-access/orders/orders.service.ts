import { getDb } from "@marketplace/libs/persistence";
import {
  CreateOrderRequest,
  OrderEntity,
  OrderResponse,
  UpdateOrderRequest,
} from "@marketplace/utils/types/orders";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ObjectId } from "mongodb";
import { appointmentsService } from "../appointments/appointments.service";
import { paymentsService } from "../payments/payments.service";
import { orderNotificationsService } from "./order-notifications.service";

dayjs.extend(utc);

export class OrdersService {
  async findByPaymentId(paymentId: string) {
    const orders = await this.getCollection();
    const result = await orders.findOne(
      { paymentId },
      {
        projection: {
          _id: 0,
          id: { $toString: "$_id" },
          itemId: 1,
          itemDetails: 1,
          status: 1,
          customerId: 1,
          customerDetails: 1,
          paymentId: 1,
          total: 1,
        },
      }
    );

    return result;
  }

  async authorize(token: string) {
    const { orderId, status } = await paymentsService.getPaymentStatus(token);
    const order = await this.update({ id: orderId, status });

    if (!order) {
      throw new Error(
        `Can't notify payment because order with paymentId ${token} was not found`
      );
    }

    if (status === "PAID") {
      await Promise.all([
        orderNotificationsService.notifyPaidOrderToCustomer(order),
        orderNotificationsService.notifyPaidOrderToPractitioner(order),
      ]);
    }

    if (status === "REJECTED" || status === "CANCELED") {
      await appointmentsService.updateStatus(order.itemId, "FREE");
    }
  }

  async create(order: CreateOrderRequest) {
    await appointmentsService.validateAvailability(order.itemId);

    const { id, total } = await this.createNewOrder(order);

    await appointmentsService.reserve(order.itemId);
    const response = await paymentsService.createPayment({
      itemId: id,
      description: "Venta de derecho a sobrecupo",
      amount: total,
      email: order.customerDetails.email,
    });
    await this.update({ id, paymentId: response.token });

    return { url: `${response.url}?token=${response.token}` };
  }

  async update({ id, ...order }: UpdateOrderRequest) {
    const orders = await this.getCollection();
    const payload = {
      ...order,
      updatedAt: dayjs.utc().toDate(),
    };
    const { value } = await orders.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: payload },
      {
        returnDocument: "after",
        projection: {
          _id: 0,
          id: { $toString: "$_id" },
          itemId: 1,
          itemDetails: 1,
          status: 1,
          customerId: 1,
          customerDetails: 1,
          paymentId: 1,
          total: 1,
          createdAt: {
            $dateToString: {
              date: "$createdAt",
              format: "%Y-%m-%dT%H:%M:%S.%LZ",
            },
          },
          updatedAt: {
            $dateToString: {
              date: "$updatedAt",
              format: "%Y-%m-%dT%H:%M:%S.%LZ",
            },
          },
        },
      }
    );

    return value as OrderResponse | null;
  }

  protected async createNewOrder(order: CreateOrderRequest) {
    const orders = await this.getCollection();

    const orderDate = dayjs.utc(String(order.itemDetails["start"]));
    if (orderDate.isBefore(dayjs.utc())) {
      throw new Error("Order date is before current date!");
    }

    const payload = {
      ...order,
      total: 2990,
      createdAt: dayjs.utc().toDate(),
      updatedAt: dayjs.utc().toDate(),
    };

    const { insertedId } = await orders.insertOne(payload);

    return { ...payload, id: insertedId.toHexString() };
  }

  protected async getCollection() {
    const db = await getDb();
    return db.collection<OrderEntity>("orders");
  }
}

export const ordersService = new OrdersService();
