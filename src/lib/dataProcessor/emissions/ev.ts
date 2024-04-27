import { EVEmissions, fieldMappings } from "./models";
import { NUMBERS } from "../../constants";
import { csvDirs, parseCSV } from "../config";

import { convertToGramsPerMile } from "./formatter";
import { getDirPath, getFileNamesUnderDir } from "./utils";

const calculateEmissionPerKm = (efficiency: number) => {
  const emissionInGramsPer100Km =
    efficiency * NUMBERS.AVG_CO2_EMISSIONS_IN_GRAMS_PER_KWH;

  const emissionInGramsPerKm = emissionInGramsPer100Km / 100;

  return Math.round(emissionInGramsPerKm);
};

const formatEVRecords = (records: EVEmissions[]): EVEmissions[] => {
  const dataRecords = [...records];

  return dataRecords.map((record: EVEmissions) => {
    const { year, make, model, vehicle_type, energy_per_100_km } = record;

    // The dataset has emissions all set to 0. We are calculating it as:
    // CO2 emissions / 100km = Efficiency (i.e. energy/100km) * CO2 emissions / kWh
    // CO2 emissions / km = CO2 emissions / 100
    // Assumption: CO2 emissions / kWH in US (National avg) -> 527.1 g CO2/kWh.
    const emissions_per_km = calculateEmissionPerKm(energy_per_100_km);

    return {
      year,
      make,
      model,
      energy_per_100_km,
      vehicle_type,
      emissions_per_km,
    };
  }) as EVEmissions[];
};

const processEvRecords = (records: EVEmissions[]) => {
  // Extract only the relevant fields
  const mappedRecords = formatEVRecords(records);

  // Convert emissions from grams/km to grams/mile
  return mappedRecords.map((record: EVEmissions) => {
    return {
      ...record,
      emissions_per_mile: convertToGramsPerMile(record),
    };
  }) as EVEmissions[];
};

export const processEVData = async () => {
  const evEmissionsData: EVEmissions[] = [];

  try {
    const dirPath = getDirPath(csvDirs.EMISSIONS, csvDirs.EV);

    const fileNames = getFileNamesUnderDir(dirPath);

    for (const fileName of fileNames) {
      console.log("------------------------------");
      console.log(`Processing file: ${fileName}`);

      const records = (await parseCSV(
        dirPath,
        fileName,
        fieldMappings,
      )) as EVEmissions[];

      const processedRecords = processEvRecords(records);

      evEmissionsData.push(...processedRecords);
    }
  } catch (error) {
    const baseMsg: string = `Exception while processing ev data: `;

    const errorMsg =
      error instanceof Error
        ? `${baseMsg}${error.message}`
        : `${baseMsg}${error}`;

    console.log(errorMsg);
  }

  return evEmissionsData;
};
