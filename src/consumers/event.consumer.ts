import { injectable } from "tsyringe";
import { Consumer, MessageHeaders } from "../clients/rabbit-mq/consumer";
import { WebhookService } from "../services/webhook.service";

@injectable()
export class EventConsumer extends Consumer<unknown> {
  constructor(private readonly webhookService: WebhookService) {
    super();
  }

  public async receive(headers: MessageHeaders, payload: unknown): Promise<void> {
    await this.webhookService.process(headers.event, payload)
  }
}