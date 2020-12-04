import { IMongoDriver } from '../driver/MongoDriver';
import TaskRepository from '../repository/TaskRepository';
import TaskUseCase, { ITaskUseCase } from '../usecase/TaskUseCase';
import { Task } from '../entity/task';

export interface ITaskController {
  fetchAll: () => Promise<Task[]>
}

export default class TaskController implements ITaskController {
  private readonly useCase: ITaskUseCase;

  constructor(driver: IMongoDriver) {
    this.useCase = new TaskUseCase((new TaskRepository(driver)));
  }

  async fetchAll(): Promise<Task[]> {
    return await this.useCase.fetchTasks();
  };
};
