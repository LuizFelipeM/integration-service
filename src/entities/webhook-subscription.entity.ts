import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { EventEntity } from './event.entity';

@Entity({ name: "webhook_subscription" })
export class WebhookSubscriptionEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "url" })
  url: string;

  @OneToOne(() => EventEntity)
  @JoinColumn({ name: "event_id" })
  event: EventEntity;
}
