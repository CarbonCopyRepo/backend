import { EVEmissions, GasolineEmissions } from "./models";
import { NUMBERS } from "../../constants";
import { processGasolineData } from "./gasoline";
import { processEVData } from "./ev";

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

export const getUniqueMakes = (records: any[]) => {
  const items: Set<String> = new Set();

  const uniqueMakes: any[] = [];

  for (const record of records) {
    const currentMake: string = trimAndCapitalizeEachToken(record.make);

    if (!items.has(currentMake)) {
      items.add(currentMake);
      uniqueMakes.push({ car_make: currentMake });
    }
  }

  return uniqueMakes;
};

export const convertToGramsPerMile = (
  record: GasolineEmissions | EVEmissions,
) => {
  const emissionPerMile = record.emissions_per_km / NUMBERS.MILES_TO_KM;

  return Math.round(emissionPerMile);
};

export const getAllVehiclesData = async () => {
  const gasVehiclesData = await processGasolineData();
  const evVehiclesData = await processEVData();

  return [...gasVehiclesData, ...evVehiclesData];
};

export const processAllVehiclesMakeData = (
  records: (GasolineEmissions | EVEmissions)[],
) => {
  const uniqueMakes = getUniqueMakes(records);
  const onlyMakes = uniqueMakes.map((make) => make.car_make);

  return records
    .filter((vehicle) => onlyMakes.includes(vehicle.make))
    .map((vehicle) => {
      const item = { ...vehicle, car_make: vehicle.make };
      delete item.make;
      return item;
    });
};

const trimAndCapitalizeEachToken = (input: string) => {
  const tokens = input.trim().split(" ");
  const trimmedTokens = tokens.map((token) => token.trim());

  const capitalizedTokens = trimmedTokens.map((token) => {
    const firstChar = token.charAt(0);
    const remaining = token.substring(1);

    return firstChar.toUpperCase() + remaining;
  });

  return capitalizedTokens.join(" ");
};
