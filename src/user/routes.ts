import { Router, Request, Response } from "express";

const userRouter = Router();

// Example User route
userRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to the users endpoint !" });
});

export default userRouter;
