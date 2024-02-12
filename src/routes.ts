// INFO: This file is for the global / top level routes
import { Router, Request, Response } from "express";

const apiRouter = Router();

apiRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello from Carbon Copy Backend Server!" });
});

export default apiRouter;
