import { QueueConfig } from "./queue-config";

export abstract class RabbitMQConfig {
  constructor(
    public url: string,
    public queue: QueueConfig) { }
}