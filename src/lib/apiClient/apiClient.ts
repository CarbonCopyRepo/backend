import axios, { AxiosInstance } from "axios";

import { AxiosConfig } from "./apiClient.types";

export const createAxiosInstance = ({
  baseURL,
  timeout,
  headers,
  responseType,
}: AxiosConfig): AxiosInstance => {
  return axios.create({
    baseURL: baseURL,
    timeout: timeout,
    headers: headers && Object.keys(headers).length > 0 ? headers : {},
    responseType: responseType ? responseType : "json",
  });
};
