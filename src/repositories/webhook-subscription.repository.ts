import { injectable } from "tsyringe";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { WebhookSubscriptionEntity } from "../entities/webhook-subscription.entity";
import { WebhookSubscriptionModel } from "../domain/webhook-subscription.model";

@injectable()
export class WebhookSubscriptionRepository {
  private readonly repository: Repository<WebhookSubscriptionEntity>

  constructor() {
    this.repository = AppDataSource.getRepository(WebhookSubscriptionEntity)
  }

  async findByEvent(event: string): Promise<WebhookSubscriptionModel[]> {
    const webhookSubscriptionEntity = await this.repository.find({ where: { event: { name: event } } });
    return webhookSubscriptionEntity.map(w => new WebhookSubscriptionModel(w.url))
  }
}