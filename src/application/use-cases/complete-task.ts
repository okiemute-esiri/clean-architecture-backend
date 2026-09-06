import type { Task } from "../../domain/task.js";
import type { TaskRepository } from "../ports/task-repository.js";

export class CompleteTask {
  constructor(private readonly repository: TaskRepository) {}

  async execute(id: string): Promise<Task> {
    const task = await this.repository.findById(id);
    if (!task) {
      throw new Error("Task not found");
    }

    const completed = task.markCompleted();
    await this.repository.save(completed);
    return completed;
  }
}
