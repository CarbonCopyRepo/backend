export const buildCarMakesForVehicleTypeQuery = (vehicleType: string) => {
  return `
    SELECT car_make FROM make WHERE vehicle_type = '${vehicleType}'
  `;
};

export const buildCarModelsForMakeAndVehicleTypeQuery = (
  make: string,
  vehicleType: string,
) => {
  return `
    SELECT DISTINCT model FROM model WHERE car_make = '${make}' AND vehicle_type = '${vehicleType}'
  `;
};
