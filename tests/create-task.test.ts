import { describe, expect, it } from "vitest";
import { CreateTask } from "../src/application/use-cases/create-task.js";
import { InMemoryTaskRepository } from "../src/infrastructure/persistence/in-memory-task-repository.js";

describe("CreateTask", () => {
  it("creates and persists a valid task", async () => {
    const repository = new InMemoryTaskRepository();
    const useCase = new CreateTask(repository);

    const task = await useCase.execute("Review architecture boundaries");

    expect(task.title).toBe("Review architecture boundaries");
    expect(task.completed).toBe(false);
    expect(await repository.findById(task.id)).toEqual(task);
  });

  it("rejects titles shorter than three characters", async () => {
    const repository = new InMemoryTaskRepository();
    const useCase = new CreateTask(repository);

    await expect(useCase.execute("x")).rejects.toThrow(
      "Task title must contain at least 3 characters",
    );
  });
});
