import { Repository } from "typeorm";
import { WebhookSubscriptionEntity } from "../entities/webhook-subscription.entity";
import axios from "axios";
import { logger } from "../server";
import { Consumer } from "../clients/rabbit-mq/consumer";

export class WebhookService extends Consumer<unknown> {
  constructor(private readonly webhookRepository: Repository<WebhookSubscriptionEntity>) {
    super();
  }

  async getSubscribedWebhooks(event: string): Promise<WebhookSubscriptionEntity[]> {
    return this.webhookRepository.find({ where: { event: { name: event } } });
  }

  public async consume(headers: { [key: string]: any; }, payload: unknown): Promise<void> {
    this.process(headers.event, payload)
  }

  private async process(event: string, payload: unknown) {
    const webhooks = await this.getSubscribedWebhooks(event)
    for (const webhook of webhooks) {
      try {
        await axios.post(webhook.url, payload);
        logger.info(`Event sent to webhook: ${webhook.url}`);
      } catch (error) {
        logger.error(`Failed to send event to ${webhook.url}:`, error);
      }
    }
  }
}
