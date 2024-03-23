import { Request, Response, Router } from "express";
import { createAxiosInstance } from "../lib/apiClient/apiClient";
import { AxiosConfig } from "../lib/apiClient/apiClient.types";
import { uploadHTTPResponseToStorageBucket } from "./domain/uploadResponseToStorageBucket";

const bucketStorageRouter = Router();

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

bucketStorageRouter.post("/", async (req: Request, res: Response) => {
  const response = await uploadHTTPResponseToStorageBucket(
    req.body,
    axiosInstance,
  );

  res.json(response);
});

export default bucketStorageRouter;
