import { QueueConfig } from "./queue-config";

export class RabbitMQConfig {
  constructor(
    public url: string,
    public queue: QueueConfig) { }
}