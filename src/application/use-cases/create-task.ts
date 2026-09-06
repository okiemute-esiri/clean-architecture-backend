import { Task } from "../../domain/task.js";
import type { TaskRepository } from "../ports/task-repository.js";

export class CreateTask {
  constructor(private readonly repository: TaskRepository) {}

  async execute(title: string): Promise<Task> {
    const task = Task.create(title);
    await this.repository.save(task);
    return task;
  }
}
