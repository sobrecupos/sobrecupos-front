import { RestClient } from "@marketplace/libs/rest-client";
import { CreatePaymentRequest } from "@marketplace/utils/types/payments";
import { createHmac } from "crypto";

export class PaymentsService {
  private readonly paymentCodeStatusMapping = new Map([
    [1, "PENDING"],
    [2, "PAID"],
    [3, "REJECTED"],
    [4, "CANCELED"],
  ]);

  private readonly client: RestClient;

  constructor() {
    this.client = new RestClient({
      baseUrl: process.env.PAYMENT_PROVIDER_BASE_URL,
    });
  }

  createPayment({ itemId, description, amount, email }: CreatePaymentRequest) {
    const body = new URLSearchParams({
      apiKey: String(process.env.PAYMENT_PROVIDER_API_KEY),
      commerceOrder: itemId,
      subject: description,
      amount: String(amount),
      email,
      urlConfirmation: String(process.env.PAYMENT_PROVIDER_CONFIRMATION_URL),
      urlReturn: String(process.env.PAYMENT_PROVIDER_RETURN_URL),
      timeout: String(5 * 60),
    });

    this.addSignature(body);

    return this.client
      .doRequest(String(process.env.PAYMENT_PROVIDER_CREATE_PAYMENT_URL), {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      })
      .then((response) => JSON.parse(response));
  }

  async getPaymentStatus(token: string) {
    const params = new URLSearchParams({
      apiKey: String(process.env.PAYMENT_PROVIDER_API_KEY),
      token,
    });

    this.addSignature(params);

    const response = await this.client.get(
      `${process.env.PAYMENT_PROVIDER_STATUS_URL}?${params.toString()}`
    );
    const plainResponse = await JSON.parse(response);

    return {
      orderId: plainResponse.commerceOrder,
      status: this.paymentCodeStatusMapping.get(plainResponse.status),
    };
  }

  getPaymentStatusByOrderId(orderId: string) {
    const params = new URLSearchParams({
      apiKey: String(process.env.PAYMENT_PROVIDER_API_KEY),
      commerceId: orderId,
    });

    this.addSignature(params);

    return this.client
      .get(
        `${
          process.env.PAYMENT_PROVIDER_STATUS_BY_ITEM_ID_URL
        }?${params.toString()}`
      )
      .then((response) => JSON.parse(response));
  }

  addSignature(params: URLSearchParams) {
    const keys = Object.keys(Object.fromEntries(params)).sort();
    let signatureContent = "";

    keys.forEach((key) => {
      signatureContent = `${signatureContent}${key}${params.get(key)}`;
    });

    const signature = createHmac(
      "sha256",
      String(process.env.PAYMENT_PROVIDER_SECRET)
    )
      .update(signatureContent)
      .digest("hex");

    params.append("s", signature);
  }
}

export const paymentsService = new PaymentsService();
