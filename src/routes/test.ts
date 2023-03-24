import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (request: Request, response: Response) => {
  response.json({ data: [] });
});

router.get("/:id", (request: Request, response: Response) => {
  response.json({ id: Number(request.params.id) });
});

router.post("/", (request: Request, response: Response) => {
  const { sample } = request.body;
  response.json({ data: { sample } });
});

router.put("/:id", (request: Request, response: Response) => {
  response.json({ id: Number(request.params.id) });
});

router.delete("/:id", (request: Request, response: Response) => {
  response.json({ id: Number(request.params.id) });
});

export default router;
