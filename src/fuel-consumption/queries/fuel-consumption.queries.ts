import { VEHICLE_TYPES } from "../../lib/constants";

export const buildAvgYearlyConsumptionQuery = (vehicleType: string) => {
  const columnName =
    vehicleType === VEHICLE_TYPES.EV ? "energy_per_100_km" : "miles_per_gallon";

  console.log(columnName);

  return `
    SELECT year, ROUND(AVG(${columnName})) AS avg_consumption
    FROM model
    WHERE year BETWEEN 2012 and 2024
    AND vehicle_type = '${vehicleType}'
    GROUP BY year
    ORDER BY year
  `;
};
