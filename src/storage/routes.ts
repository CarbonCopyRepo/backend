import { Request, Response, Router } from "express";
import { uploadHTTPResponseToStorage } from "./domain/uploadHTTPBodyToStorage";
const storageRouter = Router();

storageRouter.post("/", async (req: Request, res: Response) => {
  console.log("Request Body inside storage route ", req.body);
  const response = uploadHTTPResponseToStorage(req.body);

  res.json(response);
});

export default storageRouter;
