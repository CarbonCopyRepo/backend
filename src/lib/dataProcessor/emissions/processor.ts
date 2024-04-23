// TODO: remove "eslint-disable-next-line no-unused-vars" from config.ts and model.ts after their usage
// TODO: Two functions => processGasolineData(), processEVData()
// TODO: Functions will pass transformHeader, complete and error callbacks

import { getDirPath, getFileNamesUnderDir } from "./utils";
import { csvDirs, parseCSV } from "../config";
import { fieldMappings, GasolineEmissions } from "./models";
import { processGasolineRecords } from "./gasoline";

const processGasolineData = async () => {
  const gasEmissionsData: GasolineEmissions[] = [];

  try {
    const dirPath = getDirPath(csvDirs.EMISSIONS, csvDirs.GASOLINE);
    const fileNames = getFileNamesUnderDir(dirPath);

    for (const fileName of fileNames) {
      console.log("------------------------------");
      console.log(`Processing file: ${fileName}`);

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

      const processedRecords = processGasolineRecords(dataRecords);

      gasEmissionsData.push(...processedRecords);
    }
  } catch (error) {
    const baseMsg: string = `Exception while processing gasoline data: `;

    const errorMsg =
      error instanceof Error
        ? `${baseMsg}${error.message}`
        : `${baseMsg}${error}`;

    console.log(errorMsg);
  }

  return gasEmissionsData;
};

// Example invocation
// TODO: To be called by sql file to insert into db
processGasolineData()
  // eslint-disable-next-line no-unused-vars
  .then((records) => {
    console.log("Do something with the records");
  })
  .catch((error) => {
    console.log(`Error occurred while processing gasoline data: ${error}`);
  });
