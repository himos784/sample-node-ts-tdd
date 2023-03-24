import { FindOptions } from "sequelize";
import { Request, Response, Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "helpers/todo";

const router = Router();

router.get("/", async (request: Request, response: Response) => {
  const filterQuery: FindOptions = {};
  const records = await getTodos(filterQuery);

  response.json({ data: records });
});

router.get("/:id", async (request: Request, response: Response) => {
  const id = request.params.id;
  const record = await getTodo(id);

  response.json({ data: record });
});

router.post("/", async (request: Request, response: Response) => {
  const { title, completed } = request.body;
  const record = await createTodo({
    title,
    completed,
  });

  response.json({ data: record });
});

router.put("/:id", async (request: Request, response: Response) => {
  const id = request.params.id;
  const { title, completed } = request.body;
  await updateTodo(id, {
    title,
    completed,
  });

  const record = await getTodo(id);

  response.json({ data: record });
});

router.delete("/:id", async (request: Request, response: Response) => {
  const id = request.params.id;
  await deleteTodo(id);

  response.json({ message: "Successfully deleted!" });
});

export default router;
