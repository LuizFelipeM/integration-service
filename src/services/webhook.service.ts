import axios from "axios";
import { logger } from "../server";
import { inject, injectable, registry } from "tsyringe";
import { WebhookSubscriptionRepository } from "../repositories/webhook-subscription.repository";

@injectable()
export class WebhookService {
  constructor(
    @inject(WebhookSubscriptionRepository) private readonly webhookSubscriptionRepository: WebhookSubscriptionRepository) {
  }

  public async process(event: string, payload: unknown) {
    const webhooks = await this.webhookSubscriptionRepository.findByEvent(event)
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
