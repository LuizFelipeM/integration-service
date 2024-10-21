import { container, injectable, InjectionToken } from "tsyringe";
import { connect } from "amqplib";
import { RabbitMQConfig } from "./rabbit-mq-config";
import { Consumer } from "./consumer";
import { logger } from "../../server";

@injectable()
export class RabbitMQClient<TConfig extends RabbitMQConfig, TResponse> {
  constructor(private readonly consumersToken: InjectionToken<Consumer<TResponse>>, private readonly config: TConfig) {
  }

  async consume() {
    try {
      const connection = await connect(this.config.url);
      const channel = await connection.createChannel();

      await channel.assertQueue(this.config.queue.name, { durable: this.config.queue.isDurable });

      channel.consume(this.config.queue.name, async (message) => {
        if (message) {
          const payload = JSON.parse(message.content.toString());
          const consumers = container.resolveAll<Consumer<TResponse>>(this.consumersToken)

          const consumersPromises = []
          for (const consumer of consumers) {
            consumersPromises.push(consumer.receive(message.properties.headers!, payload))
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