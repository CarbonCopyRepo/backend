import { Request, Response, Router } from "express";
import { ApiResponse } from "../lib/apiClient/apiClient.types";
import { uploadHTTPResponseToStorage } from "./domain/uploadHTTPBodyToStorage";
import { AxiosError } from "axios";
import { createStorageAxiosInstance } from "./domain/createStorageAxiosInstance";
const storageRouter = Router();

// Setup Axios Instance
const axiosInstance = createStorageAxiosInstance();

storageRouter.post("/", async (req: Request, res: Response) => {
  let response: ApiResponse = { statusCode: undefined, data: [], error: "" };

  try {
    response = await uploadHTTPResponseToStorage(req.body, axiosInstance);
  } catch (error) {
    const errorResponse = error as AxiosError;

    response.error = errorResponse.message;
    response.statusCode = errorResponse.code;

    console.log(`${error}`);
  }

  res.json(response);
});

export default storageRouter;
