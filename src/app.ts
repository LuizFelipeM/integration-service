import { config } from "dotenv";
config();

import { server } from "./server"
import { AppDataSource } from "./data-source";
import { WebhookService } from "./services/webhook.service";
import { WebhookSubscriptionEntity } from "./entities/webhook-subscription.entity";
import { RabbitMQClient } from "./clients/rabbit-mq/rabbit-mq.client";
import { RabbitMQConfig } from "./clients/rabbit-mq/rabbit-mq-config";

const start = async () => {
  try {
    await AppDataSource.initialize();
    server.log.info("Database connected")

    const rabbitConfig = new RabbitMQConfig(
      process.env.RABBITMQ_URL!,
      {
        name: process.env.RABBITMQ_QUEUE!,
        isDurable: Boolean(process.env.RABBITMQ_QUEUE_IS_DURABLE)
      }
    )

    const rabbitService = new RabbitMQClient(
      rabbitConfig,
      [
        new WebhookService(AppDataSource.getRepository(WebhookSubscriptionEntity))
      ])
    rabbitService.consume()

    await server.listen({ port: 3000 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()