import { ParseConfig, parse } from "papaparse";

import { promisify } from "util";
import * as fs from "fs";

import { StringObject } from "../apiClient/apiClient.types";

const readFile = promisify(fs.readFile);

// Config options for the parser library - papaparse
export const papaParseConfig: ParseConfig = {
  delimiter: ",",
  header: true,
  dynamicTyping: true,
};

export const csvDirs: StringObject = {
  EMISSIONS: "emissions",
  GASOLINE: "gasoline",
  EV: "ev",
};

export const parseCSV = async (
  dirPath: string,
  fileName: string,
  mappings?: StringObject,
) => {
  const fullPath = `${dirPath}/${fileName}`;
  const csvString = await readFile(fullPath, "utf-8");

  return new Promise((resolve, reject) => {
    parse(csvString, {
      ...papaParseConfig,
      transformHeader: (header: string) =>
        mappings ? mappings[header] || header : header,
      complete: (results) => {
        if (results.errors.length) reject(results.errors);
        resolve(results.data);
      },
    });
  });
};
