import { StringObject } from "./apiClient.types";

export const buildUrlParams = (
  baseUrl: string,
  urlParams: StringObject,
): string => {
  if (baseUrl.trim().length === 0)
    throw new Error(
      "API_Client:buildURLParams:baseURL cannot be empty or null or undefined",
    );

  const keys = Object.keys(urlParams);

  for (let i = 0; i < keys.length; i++) {
    const value = urlParams[keys[i]];

    if (value.trim().length !== 0) {
      baseUrl += i !== keys.length - 1 ? `${value}/` : `${value}`;
    }
  }

  return baseUrl;
};
