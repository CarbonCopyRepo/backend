import { EVEmissions, GasolineEmissions } from "./models";
import { NUMBERS } from "../../constants";

export const getUniqueYearModelMakes = (records: any[]) => {
  const items: Set<String> = new Set();

  const uniqueRecords: any[] = [];

  for (const record of records) {
    const recordKey = `${record.year}-${record.make}-${record.model}`;

    if (!items.has(recordKey)) {
      items.add(recordKey);
      uniqueRecords.push(record);
    }
  }

  return uniqueRecords;
};

export const convertToGramsPerMile = (
  record: GasolineEmissions | EVEmissions,
) => {
  const emissionPerMile = record.emissions_per_km / NUMBERS.MILES_TO_KM;

  return Math.round(emissionPerMile);
};
