import { makePostRequest } from "../../lib/apiClient/apiClient";
import { AxiosInstance } from "axios";
import { PostPatchPutConfig } from "../../lib/apiClient/apiClient.types";
import { HTTPBody } from "./storageBucket.types";

export const uploadHTTPResponseToStorageBucket = async (
  HTTPbody: HTTPBody,
  axiosInstance: AxiosInstance,
) => {
  const postConfig: PostPatchPutConfig = {
    axiosInstance,
    body: HTTPbody,
  };

  return await makePostRequest(postConfig);
};
