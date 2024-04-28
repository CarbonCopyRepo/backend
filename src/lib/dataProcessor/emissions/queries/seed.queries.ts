// TODO: Replace with ORM later to prevent potential SQL injection attack
export const buildSeedMakeTableQuery = (jsonStr: string) => {
  return `
    WITH data (jsonStr) AS (
        VALUES 
        ('${jsonStr}'::json)
    )
    INSERT INTO make (car_make, vehicle_type)
    SELECT 
        jsonb_object->>'car_make',
        jsonb_object->>'vehicle_type'
    FROM json_array_elements(
        (SELECT jsonStr FROM data))
    AS jsonb_object;
  `;
};

export const buildSeedModelTableQuery = (jsonStr: string) => {
  return `
    WITH data (jsonStr) AS (
        VALUES 
        ('${jsonStr}'::json)
    )
    INSERT INTO model (year, car_make, model, vehicle_type, emissions_per_km, emissions_per_mile, energy_per_100_km, miles_per_gallon)
    SELECT 
        (jsonb_object->>'year')::integer, 
        jsonb_object->>'car_make', 
        jsonb_object->>'model', 
        jsonb_object->>'vehicle_type', 
        (jsonb_object->>'emissions_per_km')::integer, 
        (jsonb_object->>'emissions_per_mile')::integer, 
        (jsonb_object->>'energy_per_100_km')::integer, 
        (jsonb_object->>'miles_per_gallon')::integer 
    FROM json_array_elements(
        (SELECT jsonStr FROM data)
       ) 
    AS jsonb_object;
  `;
};
