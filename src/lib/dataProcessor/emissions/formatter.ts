import { GasolineEmissions } from "./models";

export const formatGasolineEmissions = (
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
