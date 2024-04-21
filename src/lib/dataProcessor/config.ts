import { ParseConfig } from "papaparse";

// eslint-disable-next-line no-unused-vars
// Config options for the parser library - papaparse
export const papaParseConfig: ParseConfig = {
  delimiter: ",",
  header: true,
  dynamicTyping: true,
};

export const csvDirs = {
  EMISSIONS: "emissions",
  GASOLINE: "gasoline",
  EV: "ev",
};

export const parseCSV = () => {};
