import { injectable } from "tsyringe";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { EventEntity } from "../entities/event.entity";

@injectable()
export class EventRepository {
  private readonly repository: Repository<EventEntity>

  constructor() {
    this.repository = AppDataSource.getRepository(EventEntity)
  }

  public async getAll(): Promise<EventEntity[]> {
    return await this.repository.find()
  }
}