import { existsSync, readdirSync } from "fs";
import { join } from "path";

import * as appRoot from "app-root-path";

export const getDirPath = (parentDir: string, dirName: string) => {
  const dirPath = join(appRoot.path, `data/${parentDir}/${dirName}`);

  if (!existsSync(dirPath)) {
    const errorMsg = `${dirPath}: does not exist`;
    console.log(errorMsg);
    throw new Error(errorMsg);
  }

  return dirPath;
};

export const getFileNamesUnderDir = (dirPath: string) => {
  try {
    return readdirSync(dirPath);
  } catch (error) {
    const errorMsg = `${dirPath}: does not exist`;
    console.log(errorMsg);
    throw new Error(errorMsg);
  }
};
