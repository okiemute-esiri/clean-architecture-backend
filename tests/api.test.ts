import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

describe("task API", () => {
  it("creates, lists and completes a task", async () => {
    const app = createApp();

    const created = await request(app)
      .post("/api/v1/tasks")
      .send({ title: "Ship clean architecture example" })
      .expect(201);

    const id = created.body.data.id as string;

    const listed = await request(app).get("/api/v1/tasks").expect(200);
    expect(listed.body.data).toHaveLength(1);

    const completed = await request(app)
      .patch(`/api/v1/tasks/${id}/complete`)
      .expect(200);

    expect(completed.body.data.completed).toBe(true);
  });

  it("returns validation errors for invalid input", async () => {
    const app = createApp();

    const response = await request(app)
      .post("/api/v1/tasks")
      .send({ title: "x" })
      .expect(422);

    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });
});
