import { Request, Response, Router } from "express";
import { createAxiosInstance } from "../lib/apiClient/apiClient";
import { ApiResponse, AxiosConfig } from "../lib/apiClient/apiClient.types";
import { uploadHTTPResponseToStorageBucket } from "./domain/uploadHTTPBodyToStorageBucket";
import { AxiosError } from "axios";

const storageBucketRouter = Router();

// Setup Axios Instance
const axiosConfig: AxiosConfig = {
  baseURL: `https://storage.googleapis.com/storage/v1/b/${process.env.BUCKET_NAME}/o`,
  timeout: 500,
  headers: {
    Authorization: `Bearer ${process.env.OAUTH2_TOKEN}`,
  },
  responseType: "json",
};

const axiosInstance = createAxiosInstance(axiosConfig);

let response: ApiResponse = { statusCode: undefined, data: [], error: "" };

storageBucketRouter.post("/", async (req: Request, res: Response) => {
  try {
    console.log(await req.body);
    response = await uploadHTTPResponseToStorageBucket(req.body, axiosInstance);
  } catch (error) {
    const errorResponse = error as AxiosError;

    response.error = errorResponse.message;
    response.statusCode = errorResponse.code;

    console.log(`${error}`);
  }

  res.json(response);
});

export default storageBucketRouter;
