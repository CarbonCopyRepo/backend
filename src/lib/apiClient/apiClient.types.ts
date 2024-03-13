import { AxiosInstance, ResponseType } from "axios";

export type StringObject = {
  [key: string]: string;
};

export type BodyObject = {
  [key: string]: string | number | boolean | BodyObject;
};

export type AxiosConfig = {
  baseURL: string;
  timeout: number;
  headers?: StringObject;
  responseType?: ResponseType;
};

export type GetDeleteConfig = {
  axiosInstance: AxiosInstance;
  urlParams?: StringObject;
  queryParams?: StringObject;
  headers?: StringObject;
};

export type PostPatchPutConfig = {
  axiosInstance: AxiosInstance;
  body?: BodyObject;
  urlParams?: StringObject;
  queryParams?: StringObject;
  headers?: StringObject;
};

type ResponseData =
  | {
      [key: string]: any;
    }
  | Array<{ [key: string]: any }>;

export type ApiResponse = {
  statusCode: number | unknown;
  data: ResponseData;
  error: string;
};
