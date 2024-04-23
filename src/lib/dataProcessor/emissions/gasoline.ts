import { getUniqueYearModelMakes } from "./formatter";
import { GasolineEmissions } from "./models";
import { NUMBERS } from "../../constants";

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

export const processGasolineRecords = (records: GasolineEmissions[]) => {
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
