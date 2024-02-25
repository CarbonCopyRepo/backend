import { buildUrlParams } from "../apiClient.utils";
import { StringObject } from "../apiClient.types";

describe("apiClientUtils:buildURLParams test cases", () => {
  const baseUrl: string = "https://jsonplaceholder.typicode.com/";

  const emptyUrlParams: StringObject = { param1: "", param2: "" };

  const emptyUrlParamWithWhiteSpace: StringObject = {
    param1: "                       ",
    param2: "     ",
  };

  const singleUrlParam: StringObject = { param1: "user" };
  const twoUrlParams: StringObject = { param1: "user", param2: "1" };

  const multipleUrlParams: StringObject = {
    param1: "user1",
    param2: "co",
    param3: "boulder",
    param4: "1",
  };

  const baseUrlEmpty: string = "";
  const baseUrlEmptyWithSpaces: string = "                    ";

  test("buildUrlParams returns the updated baseURL when a single URL param is passed", () => {
    const expectedUrl = `${baseUrl}${singleUrlParam["param1"]}`;
    expect(expectedUrl).toEqual(buildUrlParams(baseUrl, singleUrlParam));
  });

  test("buildUrlParams returns the updated baseURL when two URL params are passed", () => {
    const expectedUrl = `${baseUrl}${twoUrlParams["param1"]}/${twoUrlParams["param2"]}`;
    expect(expectedUrl).toEqual(buildUrlParams(baseUrl, twoUrlParams));
  });

  test("buildUrlParams returns the updated baseURL when multiple URL params are passed", () => {
    const keys = Object.keys(multipleUrlParams);
    let modifiedUrl: string = baseUrl;

    for (let i = 0; i < keys.length; i++) {
      const paramValue = multipleUrlParams[keys[i]];
      modifiedUrl += i !== keys.length - 1 ? `${paramValue}/` : `${paramValue}`;
    }

    expect(buildUrlParams(baseUrl, multipleUrlParams)).toEqual(modifiedUrl);
  });

  test("buildUrlParams throws an exception when the baseURL is an empty string", () => {
    expect(() => buildUrlParams(baseUrlEmpty, singleUrlParam)).toThrow(Error);
  });

  test("buildUrlParams throws an exception when the baseURL is an empty string with multiple whitespaces", () => {
    expect(() =>
      buildUrlParams(baseUrlEmptyWithSpaces, singleUrlParam),
    ).toThrow(Error);
  });

  test("buildUrlParams returns the same baseURL when the values of URL params object are empty strings", () => {
    expect(buildUrlParams(baseUrl, emptyUrlParams)).toEqual(baseUrl);
  });

  test("buildUrlParams returns the same baseURL when the values of URL params object are empty strings with unlimited whitespaces", () => {
    expect(buildUrlParams(baseUrl, emptyUrlParamWithWhiteSpace)).toEqual(
      baseUrl,
    );
  });
});
