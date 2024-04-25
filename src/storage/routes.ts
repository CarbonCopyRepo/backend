import { Request, Response, Router } from "express";
import { uploadHTTPBodyToStorage } from "./domain/uploadHTTPBodyToStorage";
const storageRouter = Router();

storageRouter.post("/", async (req: Request, res: Response) => {
  const response = uploadHTTPBodyToStorage(req.body);

  res.json(response);
});

export default storageRouter;
