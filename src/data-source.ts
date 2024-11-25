import { DataSource } from 'typeorm';
import { WebhookSubscriptionEntity } from './features/webhook/entities/webhook-subscription.entity';
import { CommandTypeEntity } from './features/webhook/entities/command-type.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_CONNECTION_STRING,
  synchronize: true,
  // ssl: true,
  logging: false,
  entities: [WebhookSubscriptionEntity, CommandTypeEntity],
  migrations: [],
  subscribers: [],
});
