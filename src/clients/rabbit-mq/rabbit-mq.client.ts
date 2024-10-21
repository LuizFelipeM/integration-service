import { connect } from "amqplib";
import { RabbitMQConfig } from "./rabbit-mq-config";
import { Consumer } from "./consumer";
import { logger } from "../../server";

export class RabbitMQClient<T> {
  constructor(private readonly config: RabbitMQConfig, private readonly consumers: Consumer<T>[]) {
  }

  async consume() {
    try {
      const connection = await connect(this.config.url);
      const channel = await connection.createChannel();
      const queue = this.config.queue.name;

      await channel.assertQueue(queue, { durable: this.config.queue.isDurable });

      channel.consume(queue, async (message) => {
        if (message) {
          const payload = JSON.parse(message.content.toString());

          const consumersPromises = []
          for (const consumer of this.consumers) {
            consumersPromises.push(consumer.consume(message.properties.headers!, payload))
          }
          await Promise.all(consumersPromises)

          channel.ack(message);
        }
      });
    } catch (error) {
      logger.error('Error consuming RabbitMQ events:', error);
    }
  }
}