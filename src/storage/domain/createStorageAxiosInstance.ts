import { createAxiosInstance } from "../../lib/apiClient/apiClient";
import { AxiosConfig } from "../../lib/apiClient/apiClient.types";

export const createStorageAxiosInstance = () => {
  const axiosConfig: AxiosConfig = {
    baseURL: `https://storage.googleapis.com/storage/v1/b/${process.env.BUCKET_NAME}/o`,
    timeout: 500,
    headers: {
      Authorization: `Bearer ${process.env.OAUTH2_TOKEN}`,
    },
    responseType: "json",
  };
  
  return createAxiosInstance(axiosConfig);
}
