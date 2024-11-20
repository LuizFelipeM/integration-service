import { config } from "dotenv";
config();

import { server } from "./server"
import { AppDataSource } from "./data-source";
import { AmqpClient } from "amqp-simple-client"
import { container } from "tsyringe";
import { webhookStart } from "./features/webhook/webhook.start";

const start = async () => {
  try {
    await AppDataSource.initialize();
    server.log.info("Database connected")

    container.register<AmqpClient>(AmqpClient, { useValue: new AmqpClient(process.env.RABBITMQ_URL!) })

    webhookStart()

    await server.listen({ port: 3000 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()