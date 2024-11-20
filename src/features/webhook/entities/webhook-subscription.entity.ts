import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { CommandTypeEntity } from './command-type.entity';

@Entity({ name: "webhook_subscription" })
export class WebhookSubscriptionEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "url" })
  url: string;

  @OneToOne(() => CommandTypeEntity)
  @JoinColumn({ name: "command_type_id" })
  commandType: CommandTypeEntity;
}
