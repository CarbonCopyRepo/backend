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
