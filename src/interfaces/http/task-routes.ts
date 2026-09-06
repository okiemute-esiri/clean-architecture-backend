import { Router } from "express";
import { z } from "zod";
import type { CompleteTask } from "../../application/use-cases/complete-task.js";
import type { CreateTask } from "../../application/use-cases/create-task.js";
import type { ListTasks } from "../../application/use-cases/list-tasks.js";

const createTaskSchema = z.object({
  title: z.string().trim().min(3).max(200),
});

export function createTaskRouter(deps: {
  createTask: CreateTask;
  listTasks: ListTasks;
  completeTask: CompleteTask;
}): Router {
  const router = Router();

  router.get("/", async (_req, res, next) => {
    try {
      const tasks = await deps.listTasks.execute();
      res.json({ data: tasks });
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const input = createTaskSchema.parse(req.body);
      const task = await deps.createTask.execute(input.title);
      res.status(201).json({ data: task });
    } catch (error) {
      next(error);
    }
  });

  router.patch("/:id/complete", async (req, res, next) => {
    try {
      const task = await deps.completeTask.execute(req.params.id);
      res.json({ data: task });
    } catch (error) {
      next(error);
    }
  });

  return router;
}
