import { injectable } from "tsyringe";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { WebhookSubscriptionModel } from "../domain/webhook-subscription.model";
import { WebhookSubscriptionEntity } from "../entities/webhook-subscription.entity";

@injectable()
export class WebhookSubscriptionRepository {
  private readonly repository: Repository<WebhookSubscriptionEntity>

  constructor() {
    this.repository = AppDataSource.getRepository(WebhookSubscriptionEntity)
  }

  async findByCommandType(type: string): Promise<WebhookSubscriptionModel[]> {
    const entities = await this.repository.find({ where: { commandType: { name: type } } });
    return entities.map(w => new WebhookSubscriptionModel(w.url))
  }
}