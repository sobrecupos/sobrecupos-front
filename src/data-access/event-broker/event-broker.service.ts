import { Client } from "@upstash/qstash";

export class EventBrokerService {
  private readonly client: Client;

  constructor() {
    this.client = new Client({
      token: String(process.env.QSTASH_TOKEN),
    });
  }

  publish({
    url,
    topic,
    body,
    delayInSeconds: delay,
  }: {
    url?: string;
    topic?: string;
    body: Record<string, unknown>;
    delayInSeconds?: number;
  }) {
    if (process.env.NODE_ENV !== "production") return Promise.resolve(null);

    return this.client.publishJSON({
      url,
      topic,
      body,
      delay,
    });
  }
}

export const eventBrokerService = new EventBrokerService();
