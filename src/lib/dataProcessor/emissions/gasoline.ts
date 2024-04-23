import { fieldMappings, GasolineEmissions } from "./models";
import { NUMBERS } from "../../constants";
import { csvDirs, parseCSV } from "../config";

import { getUniqueYearModelMakes } from "./formatter";
import { getDirPath, getFileNamesUnderDir } from "./utils";

const formatGasolineEmissions = (
  records: GasolineEmissions[],
): GasolineEmissions[] => {
  const dataRecords = [...records];

  return dataRecords.map((record) => {
    const {
      year,
      make,
      model,
      vehicle_type,
      miles_per_gallon,
      emissions_per_km,
    } = record;

    return {
      year,
      make,
      model,
      vehicle_type,
      miles_per_gallon,
      emissions_per_km,
    };
  }) as GasolineEmissions[];
};

const processGasolineRecords = (records: GasolineEmissions[]) => {
  // Extract only the required fields
  const mappedRecords = formatGasolineEmissions(records);

  // Ensure for a given (year, make, model) only a single car is present
  const uniqueRecords = getUniqueYearModelMakes(
    mappedRecords,
  ) as unknown as GasolineEmissions[];

  console.log(`Unique Records present in CSV ${uniqueRecords.length}`);
  console.log("------------------------------");

  // Convert emissions from grams/km to grams/mile
  return uniqueRecords.map((record: GasolineEmissions) => {
    const emissionPerMile = record.emissions_per_km / NUMBERS.MILES_TO_KM;

    return {
      ...record,
      emissions_per_mile: Math.round(emissionPerMile),
    };
  }) as GasolineEmissions[];
};

export const processGasolineData = async () => {
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
