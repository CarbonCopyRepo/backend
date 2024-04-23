import { EVEmissions } from "./models";
import { NUMBERS } from "../../constants";

import { convertToGramsPerMile, getUniqueYearModelMakes } from "./formatter";

const calculateEmissionPerKm = (efficiency: number) => {
  const emissionInGramsPer100Km =
    efficiency * NUMBERS.AVG_CO2_EMISSIONS_IN_GRAMS_PER_KWH;

  const emissionInGramsPerKm = emissionInGramsPer100Km / 100;

  return Math.round(emissionInGramsPerKm);
};

const formatEVRecords = (records: EVEmissions[]): EVEmissions[] => {
  const dataRecords = [...records];

  return dataRecords.map((record: EVEmissions) => {
    const {
      year,
      make,
      model,
      vehicle_type,
      kwh_per_100_km,
      emissions_per_km,
    } = record;

    record.emissions_per_km = calculateEmissionPerKm(kwh_per_100_km);

    return {
      year,
      make,
      model,
      vehicle_type,
      kwh_per_100_km,
      emissions_per_km,
    };
  }) as EVEmissions[];
};

// eslint-disable-next-line no-unused-vars
const processEvRecords = (records: EVEmissions[]) => {
  // Extract only the relevant fields
  const mappedRecords = formatEVRecords(records);

  // TODO: Check if this step is needed
  const uniqueRecords = getUniqueYearModelMakes(
    mappedRecords,
  ) as unknown as EVEmissions[];

  console.log(`Unique Records present in CSV ${uniqueRecords.length}`);
  console.log("------------------------------");

  // Convert emissions from grams/km to grams/mile
  return uniqueRecords.map((record: EVEmissions) => {
    return {
      ...record,
      emissions_per_mile: convertToGramsPerMile(record),
    };
  }) as EVEmissions[];
};
