import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

const tasks = [
    { id: crypto.randomUUID(), description: "Create project (server)", completed: true },
    { id: crypto.randomUUID(), description: "Create React webapp (server)", completed: true },
    { id: crypto.randomUUID(), description: "Create Hono backend", completed: false },
];

app.get("/api/tasks", (c) => {
    return c.json(tasks);
});

app.post("/api/tasks", async (c) => {
    const task = await c.req.json();

    const newTask = {
        id: crypto.randomUUID(),
        description: task.description,
        completed: task.completed ?? false,
    };

    tasks.push(newTask);

    return c.newResponse(null, 201);
});

app.put("/api/tasks/:taskId", async (c) => {
    const { taskId } = c.req.param();
    const { completed } = await c.req.json();

    const task = tasks.find((t) => t.id === taskId);

    if (!task) {
        return c.newResponse("Not found", 404);
    }

    task.completed = completed;

    return c.newResponse(null, 204);
});

serve(app);
