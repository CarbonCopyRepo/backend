import { Request, Response, Router } from "express";

const emissionsRouter = Router();

emissionsRouter.get("/", async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Hello from the emissions router!" });
});

export default emissionsRouter;
