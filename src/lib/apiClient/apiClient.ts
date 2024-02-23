import axios, { AxiosInstance } from "axios";

import { AxiosConfig } from "./apiClient.types";

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
