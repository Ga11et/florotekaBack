import { Request, Response } from "express";

const Router = require("express").Router;

export const router = new Router();

router.get("/", (req: Request, res: Response) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.json("main");
});

export default router;
