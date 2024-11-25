import { AmqpClient } from "amqp-simple-client";
import { container } from "tsyringe";
import { SendWebhookCommand } from "./commands/send-webhook.command";
import { WebhookService } from "./services/webhook.service";
import rabbitMqSettings from "./rabbitmq.settings.json";

export const webhookStart = () => {
  const client = container.resolve(AmqpClient)

  const consumer = client.createConsumer<SendWebhookCommand>({
    name: rabbitMqSettings.webhook.queue.name,
    options: {
      durable: Boolean(rabbitMqSettings.webhook.queue.durable)
    },
    bindings: rabbitMqSettings.webhook.queue.bindings
  })

  consumer.subscribe(async ({ payload }) => {
    const webhookService = container.resolve(WebhookService)
    await webhookService.execute(payload)
  })

  console.log("Webhook feature started")
}