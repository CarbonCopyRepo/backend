import { StringObject } from "./apiClient.types";

export const buildUrlParams = (
  baseUrl: string | undefined,
  urlParams: StringObject,
): string | undefined => {
  if (!baseUrl || baseUrl.trim().length === 0)
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

export const buildQueryParams = (
  baseUrl: string | undefined,
  queryParams: StringObject,
): string => {
  if (!baseUrl || baseUrl.trim().length === 0)
    throw new Error(
      "API_Client:buildQueryParams:baseURL cannot be empty or null or undefined",
    );

  const keys = Object.keys(queryParams);
  let hasQuestionMark = false;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = queryParams[key];

    if (value.trim().length !== 0) {
      baseUrl = !hasQuestionMark ? baseUrl + "?" : baseUrl;
      baseUrl += i !== keys.length - 1 ? `${key}=${value}&` : `${key}=${value}`;
      hasQuestionMark = true;
    }
  }

  return baseUrl;
};
