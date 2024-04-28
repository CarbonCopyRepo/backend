export const buildAverageEmissionsYearlyQuery = (vehicleType: string) => {
  return `
    SELECT year, ROUND(AVG(emissions_per_mile)) AS avg_emission_in_grams 
    FROM model
    WHERE year BETWEEN 2012 and 2024 
    AND vehicle_type='${vehicleType}'
    GROUP BY year
    ORDER BY year
  `;
};

export const buildAverageEmissionsForMakeAndModelYearlyQuery = (
  make: string,
  model: string,
  vehicleType: string,
) => {
  return `
    SELECT year, ROUND(AVG(emissions_per_mile)) AS avg_emission_in_grams
    FROM model
    WHERE year BETWEEN 2012 and 2024
    AND car_make='${make}'
    AND model = '${model}'
    AND vehicle_type='${vehicleType}'
    GROUP BY year
    ORDER BY year
  `;
};
