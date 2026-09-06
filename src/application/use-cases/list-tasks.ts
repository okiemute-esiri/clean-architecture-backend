import type { Task } from "../../domain/task.js";
import type { TaskRepository } from "../ports/task-repository.js";

export class ListTasks {
  constructor(private readonly repository: TaskRepository) {}

  execute(): Promise<Task[]> {
    return this.repository.findAll();
  }
}
