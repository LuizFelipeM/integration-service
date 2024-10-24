import { config } from "dotenv";
config();

import { server } from "./server"
import { AppDataSource } from "./data-source";
import { container } from "tsyringe";
import * as rabbitMqSettings from "../rabbitmq.settings.json"
import { Consumer, QueueBinding } from "amqp-simple-client"
import { EventRepository } from "./repositories/event.repository";
import { WebhookService } from "./services/webhook.service";

const start = async () => {
  try {
    await AppDataSource.initialize();
    server.log.info("Database connected")

    const eventRepository = container.resolve(EventRepository)
    const bindings = (await eventRepository.getAll()).map<QueueBinding>(({ name }) => ({
      exchange: "events",
      routingKey: `${name}.events`
    }))

    const consumer = new Consumer<unknown>(process.env.RABBITMQ_URL!, {
      name: rabbitMqSettings.webhook.queue.name,
      options: {
        durable: Boolean(rabbitMqSettings.webhook.queue.durable)
      },
      bindings
    })

    const subscription = consumer.subscribe(({ headers, payload }) => {
      if (headers?.event) {
        const webhookService = container.resolve(WebhookService)
        webhookService.process(headers.event, payload)
      }
    })

    await server.listen({ port: 3000 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()