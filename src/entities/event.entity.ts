import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: "event" })
export class EventEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "name", unique: true })
  name: string;
}
