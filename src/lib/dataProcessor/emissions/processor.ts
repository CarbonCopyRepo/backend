// TODO: remove "eslint-disable-next-line no-unused-vars" from config.ts and model.ts after their usage
// TODO: Two functions => processGasolineData(), processEVData()
// TODO: Functions will pass transformHeader, complete and error callbacks

import { getDirPath, getFileNamesUnderDir } from "./utils";
import { csvDirs } from "../config";

const processGasolineData = () => {
  try {
    const dirPath = getDirPath(csvDirs.EMISSIONS, csvDirs.GASOLINE);
    // eslint-disable-next-line no-unused-vars
    const fileNames = getFileNamesUnderDir(dirPath);
  } catch (error) {
    const baseMsg: string = `Exception while processing gasoline data: `;

    const errorMsg =
      error instanceof Error
        ? `${baseMsg}${error.message}`
        : `${baseMsg}${error}`;

    console.log(errorMsg);
  }
};

processGasolineData();
