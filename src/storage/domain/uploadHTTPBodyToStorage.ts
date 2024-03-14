import { makePostRequest } from "../../lib/apiClient/apiClient";
import { AxiosInstance } from "axios";
import { PostPatchPutConfig } from "../../lib/apiClient/apiClient.types";
import { HTTPBody } from "./storage.types";

export const uploadHTTPResponseToStorage = async (
  HTTPBody: HTTPBody,
  axiosInstance: AxiosInstance,
) => {
  const postConfig: PostPatchPutConfig = {
    axiosInstance,
    body: HTTPBody,
  };

  return await makePostRequest(postConfig);
};
