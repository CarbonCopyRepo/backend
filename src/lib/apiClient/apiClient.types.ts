import { ResponseType } from "axios";

export type StringObject = {
  [key: string]: string;
};

export type AxiosConfig = {
  baseURL: string;
  timeout: number;
  headers?: StringObject;
  responseType?: ResponseType;
};

export type GetDeleteConfig = {
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
  statusCode: number;
  data: ResponseData;
  error: string;
};
