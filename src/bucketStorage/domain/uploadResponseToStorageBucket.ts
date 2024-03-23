import { makePostRequest } from "../../lib/apiClient/apiClient";
import { AxiosInstance } from "axios";
import {
  PostPatchPutConfig,
  BodyObject,
} from "../../lib/apiClient/apiClient.types";

// TODO add typing for what we get from API calls object
export const uploadHTTPResponseToStorageBucket = async (
  HTTPbody: BodyObject,
  axiosInstance: AxiosInstance,
) => {
  const postConfig: PostPatchPutConfig = {
    axiosInstance,
    body: HTTPbody,
  };

  return await makePostRequest(postConfig);
};
