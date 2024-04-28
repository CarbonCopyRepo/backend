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

export const getUniqueMakesAndVehicleTypes = (records: any[]) => {
  const items: Set<String> = new Set();

  const uniqueMakesAndVehicleTypes: any[] = [];

  for (const record of records) {
    const currentMake: string | undefined = record.make;
    const currentVehicleType: string | undefined = record.vehicle_type;

    const key = `${currentMake}_${currentVehicleType}`;

    if (currentMake && currentVehicleType && !items.has(key)) {
      items.add(key);

      uniqueMakesAndVehicleTypes.push({
        car_make: currentMake,
        vehicle_type: currentVehicleType,
      });
    }
  }

  return uniqueMakesAndVehicleTypes;
};

export const prepareMakeTableData = (
  records: (GasolineEmissions | EVEmissions)[],
) => {
  return getUniqueMakesAndVehicleTypes(records);
};

export const convertToGramsPerMile = (
  record: GasolineEmissions | EVEmissions,
) => {
  const emissionPerMile = record.emissions_per_km / NUMBERS.MILES_TO_KM;

  return Math.round(emissionPerMile);
};

export const processAllVehiclesModelData = (
  records: (GasolineEmissions | EVEmissions)[],
) => {
  const uniqueMakesAndVehicleTypes = getUniqueMakesAndVehicleTypes(records);

  const matchingModelInfoRecords = records.filter((record) => {
    return uniqueMakesAndVehicleTypes.some((item) => {
      return (
        item.car_make === record.make &&
        item.vehicle_type === record.vehicle_type
      );
    });
  });

  return matchingModelInfoRecords.map((vehicle) => {
    const item = { ...vehicle, car_make: vehicle.make };
    delete item.make;
    return item;
  });
};

export const formatVehiclesData = (records: any[]) => {
  return records.map((record) => {
    return {
      make: trimAndCapitalizeEachToken(record.make),
      ...record,
    };
  });
};

const trimAndCapitalizeEachToken = (input: string | undefined) => {
  if (input) {
    const tokens = input.trim().split(" ");
    const trimmedTokens = tokens.map((token) => token.trim());

    const capitalizedTokens = trimmedTokens.map((token) => {
      const firstChar = token.charAt(0);
      const remaining = token.substring(1);

      return firstChar.toUpperCase() + remaining;
    });

    return capitalizedTokens.join(" ");
  }

  return input;
};
