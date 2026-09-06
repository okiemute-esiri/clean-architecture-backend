import express, { type NextFunction, type Request, type Response } from "express";
import { ZodError } from "zod";
import { CompleteTask } from "./application/use-cases/complete-task.js";
import { CreateTask } from "./application/use-cases/create-task.js";
import { ListTasks } from "./application/use-cases/list-tasks.js";
import { InMemoryTaskRepository } from "./infrastructure/persistence/in-memory-task-repository.js";
import { createTaskRouter } from "./interfaces/http/task-routes.js";

export function createApp() {
  const repository = new InMemoryTaskRepository();
  const createTask = new CreateTask(repository);
  const listTasks = new ListTasks(repository);
  const completeTask = new CompleteTask(repository);

  const app = express();
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use(
    "/api/v1/tasks",
    createTaskRouter({ createTask, listTasks, completeTask }),
  );

  app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof ZodError) {
      return res.status(422).json({
        error: {
          code: "VALIDATION_ERROR",
          message: "Request validation failed",
          details: error.issues,
        },
      });
    }

    if (error instanceof Error && error.message === "Task not found") {
      return res.status(404).json({
        error: { code: "NOT_FOUND", message: error.message },
      });
    }

    return res.status(500).json({
      error: { code: "INTERNAL_ERROR", message: "Unexpected server error" },
    });
  });

  return app;
}
