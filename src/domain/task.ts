import { randomUUID } from "node:crypto";

export class Task {
  private constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly completed: boolean,
    public readonly createdAt: Date,
  ) {}

  static create(title: string): Task {
    const normalized = title.trim();
    if (normalized.length < 3) {
      throw new Error("Task title must contain at least 3 characters");
    }

    return new Task(randomUUID(), normalized, false, new Date());
  }

  markCompleted(): Task {
    if (this.completed) {
      return this;
    }

    return new Task(this.id, this.title, true, this.createdAt);
  }
}
