import { logger } from "../server";
import { inject, injectable } from "tsyringe";
import { WebhookSubscriptionRepository } from "../repositories/webhook-subscription.repository";

@injectable()
export class WebhookService {
  constructor(
    @inject(WebhookSubscriptionRepository) private readonly webhookSubscriptionRepository: WebhookSubscriptionRepository) {
  }

  public async process(event: string, payload: unknown) {
    const webhooks = await this.webhookSubscriptionRepository.findByEvent(event)

    let errors = []
    for (const webhook of webhooks) {
      try {
        await webhook.publish(payload)
      } catch (error) {
        errors.push(error)
      }
    }

    if (errors.length) logger.error(`Failed to publish to all webhooks errors:`, ...errors)
    else logger.info('Sucessfuly published to all webhooks')
  }
}
