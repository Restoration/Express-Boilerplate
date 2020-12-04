import { Task } from '../entity/Task';
import TaskRepository from '../repository/TaskRepository';

export interface ITaskUseCase {
  fetchTasks: () => Promise<Task[]>
}

export default class TaskUseCase implements ITaskUseCase {
  readonly taskRepository: TaskRepository;

  constructor(repository: TaskRepository) {
    this.taskRepository = repository;
  }

  async fetchTasks(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }
}
