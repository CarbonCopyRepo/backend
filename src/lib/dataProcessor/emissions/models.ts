export interface GasolineEmissions {
  year: number;
  make: string;
  model: string;
  "Vehicle class": string;
  "Engine size (L)": number;
  Cylinders: number;
  Transmission: string;
  vehicle_type: string;
  "City (L/100 km)": number;
  "Highway (L/100 km)": number;
  "Combined (L/100 km)": number;
  miles_per_gallon: number;
  emissions_per_km: number;
  "CO2 rating": number;
  "Smog rating": number;
}

// eslint-disable-next-line no-unused-vars
interface EVEmissionsInput {
  "Model year": number;
  Make: string;
  Model: string;
  "Vehicle class": string;
  "Motor (kW)": number;
  Transmission: string;
  "Fuel type": string;
  "City (kWh/100 km)": number;
  "Highway (kWh/100 km)": number;
  "Combined (kWh/100 km)": number;
  "City (Le/100 km)": number;
  "Highway (Le/100 km)": number;
  "Combined (Le/100 km)": number;
  "Range (km)": number;
  "CO2 emissions (g/km)": number;
  "CO2 rating": number;
  "Smog rating": number;
  "Recharge time (h)": number;
}

// Can be updated as needed
export const fieldMappings = {
  "Model year": "year",
  Make: "make",
  Model: "model",
  "Fuel type": "vehicle_type",
  "Combined (mpg)": "miles_per_gallon",
  "Combined (kWh/100 km)": "energy_per_100_km",
  "CO2 emissions (g/km)": "emissions_per_km",
};
