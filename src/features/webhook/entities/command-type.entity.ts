import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: "command_type" })
export class CommandTypeEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "name" })
  name: string;
}
