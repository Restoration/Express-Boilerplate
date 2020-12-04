import { IMongoDriver } from '../driver/MongoDriver';
import { Task } from '../entity/task';

export interface ITaskRepository {
  findAll: () => Promise<Task[]>
}

export default class TaskRepository implements ITaskRepository {
  private readonly mongoDriver: IMongoDriver;

  constructor(mongoDriver: IMongoDriver) {
    this.mongoDriver = mongoDriver;
  }

  async findAll(): Promise<Task[]> {
    await this.mongoDriver.connect();
    return [] as Task[];
  }
}
