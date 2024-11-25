import { inject, injectable } from "tsyringe";
import { WebhookSubscriptionRepository } from "../repositories/webhook-subscription.repository";
import { SendWebhookCommand } from "../commands/send-webhook.command";

@injectable()
export class WebhookService {
  constructor(
    @inject(WebhookSubscriptionRepository) private readonly webhookSubscriptionRepository: WebhookSubscriptionRepository) {
  }

  public async execute(command: SendWebhookCommand) {
    const webhooks = await this.webhookSubscriptionRepository.findByCommandType(command.type)

    const errors: Array<{ url: string, error: Error }> = []
    for (const webhook of webhooks) {
      try {
        await webhook.send(command.payload)
      } catch (error) {
        if (error instanceof Error)
          errors.push({ url: webhook.url, error })
      }
    }

    if (errors.length) console.error(`Failed to publish command ${command.id} to all webhooks errors: ${errors.map(e => JSON.stringify(e)).join("\n")}`)
    else console.log(`Sucessfuly published command ${command.id} to all webhooks`)
  }
}
