import { VEHICLE_TYPES } from "../lib/constants";

export const isValidVehicleType = (vehicleType: string) => {
  return (
    vehicleType && Object.values(VEHICLE_TYPES).includes(vehicleType as string)
  );
};
