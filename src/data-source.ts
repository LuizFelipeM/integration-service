import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { WebhookSubscriptionEntity } from './entities/webhook-subscription.entity';
import { EventEntity } from './entities/event.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_CONNECTION_STRING,
  // synchronize: true,
  ssl: true,
  logging: false,
  entities: [WebhookSubscriptionEntity, EventEntity],
  migrations: [],
  subscribers: [],
});
