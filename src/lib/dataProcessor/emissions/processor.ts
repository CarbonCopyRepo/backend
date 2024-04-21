// TODO: remove "eslint-disable-next-line no-unused-vars" from config.ts and model.ts after their usage
// TODO: Two functions => processGasolineData(), processEVData()
// TODO: Functions will pass transformHeader, complete and error callbacks

import { getDirPath, getFileNamesUnderDir } from "./utils";
import { csvDirs, parseCSV } from "../config";
import { fieldMappings, GasolineEmissions } from "./models";
import { formatGasolineEmissions, getUniqueYearModelMakes } from "./formatter";

const processGasolineData = async () => {
  try {
    const dirPath = getDirPath(csvDirs.EMISSIONS, csvDirs.GASOLINE);
    let fileNames = getFileNamesUnderDir(dirPath);

    // TODO: Remove this once it is working for one file
    fileNames = fileNames.filter((name) => name === "05_14.csv");

    for (const fileName of fileNames) {
      const records = (await parseCSV(
        dirPath,
        fileName,
        fieldMappings,
      )) as GasolineEmissions[];

      let filteredRecords: GasolineEmissions[] = [];

      if (fileName === "05_14.csv") {
        filteredRecords = records.filter((record) => record.year >= 2012);
      }

      const dataRecords =
        filteredRecords.length > 0 ? filteredRecords : records;

      const mappedRecords = formatGasolineEmissions(dataRecords);

      // eslint-disable-next-line no-unused-vars
      const uniqueRecords = getUniqueYearModelMakes(
        mappedRecords,
      ) as unknown as GasolineEmissions[];

    }
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
