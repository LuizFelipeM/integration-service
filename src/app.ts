import { config } from "dotenv";
config();

import { server } from "./server"
import { AppDataSource } from "./data-source";
import { RabbitMQClient } from "./clients/rabbit-mq/rabbit-mq.client";
import { EventConsumerConfig } from "./configs/event-consumer.config";
import { EventConsumerSymbol } from "./symbols/event-consumer.symbol";
import { ConsumersRegistry } from "./consumers/consumers.registry"
import { container } from "tsyringe";
import { RabbitMQClientSymbol } from "./symbols/rabbitmq-client.symbol";
import { QueueConfig } from "./clients/rabbit-mq/queue-config";
import * as rabbitMqSettings from "../rabbitmq.settings.json"

const start = async () => {
  try {
    await AppDataSource.initialize();
    server.log.info("Database connected")

    container.register(ConsumersRegistry, { useClass: ConsumersRegistry })
    container.register<RabbitMQClient<EventConsumerConfig, unknown>>(RabbitMQClientSymbol, {
      useValue: new RabbitMQClient<EventConsumerConfig, unknown>(
        EventConsumerSymbol,
        new EventConsumerConfig(
          process.env.RABBITMQ_URL!,
          new QueueConfig(rabbitMqSettings.webhook.queue.name, Boolean(rabbitMqSettings.webhook.queue.isDurable))
        ))
    })

    const rabbitService = container.resolve<RabbitMQClient<EventConsumerConfig, unknown>>(RabbitMQClientSymbol)
    rabbitService.consume()

    await server.listen({ port: 3000 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()