import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

import {
  ApiResponse,
  AxiosConfig,
  GetDeleteConfig,
  PostPatchPutConfig,
} from "./apiClient.types";
import { buildQueryParams, buildUrlParams } from "./apiClient.utils";

// TODO: Make this return only a single instance for a particular base url
export const createAxiosInstance = ({
  baseURL,
  timeout,
  headers,
  responseType,
}: AxiosConfig): AxiosInstance => {
  if (!baseURL || baseURL.trim().length === 0)
    throw new Error("API_Client: baseURL cannot be empty or null or undefined");

  if (timeout === 0)
    throw new Error("API_Client: Timeout value cannot be zero");

  return axios.create({
    baseURL: baseURL,
    timeout: timeout,
    headers: headers && Object.keys(headers).length > 0 ? headers : {},
    responseType: responseType ? responseType : "json",
  });
};

// TODO: Add request per get request in future if needed
export const makeGetRequest = async (
  {
    axiosInstance,
    urlParams,
    queryParams,
  }: GetDeleteConfig = {} as GetDeleteConfig,
): Promise<ApiResponse> => {
  let baseURL = axiosInstance.defaults.baseURL;

  // Add url params if present
  baseURL =
    urlParams && Object.keys(urlParams).length > 0
      ? buildUrlParams(baseURL, urlParams)
      : baseURL;

  // Add query params if present
  baseURL =
    queryParams && Object.keys(queryParams).length > 0
      ? buildQueryParams(baseURL, queryParams)
      : baseURL;

  const clientResponse: ApiResponse = { statusCode: null, data: [], error: "" };
  let response: AxiosResponse<any, any> | null = null;

  // Send request adding any request specific headers if present
  try {
    if (baseURL != null) {
      response = (await axiosInstance.get(baseURL)) as AxiosResponse;
      clientResponse.statusCode = response.status;
      clientResponse.data = response.data;
    }
  } catch (error) {
    // TODO: Have common error handling methods (interceptor ??)
    // TODO: Handle different types of errors (400, 401, 403, 404, 408, 500)

    const errorResponse = error as AxiosError;
    clientResponse.statusCode = errorResponse.status;
    clientResponse.data = [];
    clientResponse.error = errorResponse.message;
  }

  return Promise.resolve(clientResponse);
};

export const makePostRequest = async ({
  axiosInstance,
  body,
  urlParams,
  queryParams,
}: PostPatchPutConfig): Promise<ApiResponse> => {
  let baseURL = axiosInstance.defaults.baseURL;

  // Add url params if present
  baseURL =
    urlParams && Object.keys(urlParams).length > 0
      ? buildUrlParams(baseURL, urlParams)
      : baseURL;

  // Add query params if present
  baseURL =
    queryParams && Object.keys(queryParams).length > 0
      ? buildQueryParams(baseURL, queryParams)
      : baseURL;

  const clientResponse: ApiResponse = { statusCode: null, data: [], error: "" };
  let response: AxiosResponse<any, any> | null = null;

  try {
    if (!body) throw new Error("No POST body received")
    if (!baseURL) throw new Error("No URL received")
  
    response = (await axiosInstance.post(
      baseURL,
      body,
    )) as AxiosResponse;

    clientResponse.statusCode = response.status;
    clientResponse.data = response.data;
  
  } catch (error) {
    // TODO: Have common error handling methods (interceptor ??)
    // TODO: Handle different types of errors (400, 401, 403, 404, 408, 500)

    const errorResponse = error as AxiosError;
    clientResponse.statusCode = errorResponse.status;
    clientResponse.data = [];
    clientResponse.error = errorResponse.message;
  }

  return Promise.resolve(clientResponse);
};
