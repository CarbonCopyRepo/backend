export const buildCarMakesForVehicleTypeQuery = (vehicleType: string) => {
  return `
    SELECT car_make FROM make WHERE vehicle_type = '${vehicleType}'
  `;
};
