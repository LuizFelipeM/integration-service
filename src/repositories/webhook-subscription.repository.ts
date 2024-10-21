import { injectable } from "tsyringe";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { WebhookSubscriptionEntity } from "../entities/webhook-subscription.entity";

@injectable()
export class WebhookSubscriptionRepository {
  private readonly repository: Repository<WebhookSubscriptionEntity>

  constructor() {
    this.repository = AppDataSource.getRepository(WebhookSubscriptionEntity)
  }

  async findByEvent(event: string): Promise<WebhookSubscriptionEntity[]> {
    return await this.repository.find({ where: { event: { name: event } } });
  }
}