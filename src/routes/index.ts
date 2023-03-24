import { Router } from "express";
import test from "./test";
import todo from "./todo";

const router = Router();

router.use("/test", test);

router.use("/todo", todo);

export default router;
