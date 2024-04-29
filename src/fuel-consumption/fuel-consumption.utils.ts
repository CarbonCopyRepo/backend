import { NUMBERS, VEHICLE_TYPES } from "../lib/constants";

export const convertToBTUs = (
  records: any[],
  miles: number,
  vehicleType: string,
) => {
  const mileRecords = getConsumptionForXMiles(records, miles);

  const normalizerValue =
    vehicleType === VEHICLE_TYPES.EV
      ? NUMBERS.EV_BTU_PER_KWH
      : NUMBERS.GASOLINE_BTU_PER_GALLON;

  return mileRecords.map((record) => {
    return {
      year: record.year,
      energy: record.energy,
      consumption: Math.round(normalizerValue * record.energy),
    };
  });
};

const getConsumptionForXMiles = (records: any[], miles: number) => {
  return records.map((record) => {
    return {
      year: record.year,
      energy: miles / record.avg_consumption,
    };
  });
};
