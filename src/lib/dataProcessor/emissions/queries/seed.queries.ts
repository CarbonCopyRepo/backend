// TODO: Replace with ORM later to prevent potential SQL injection attack
export const buildSeedMakeTableQuery = (jsonStr: string) => {
  return `
    WITH data (jsonStr) AS (
        VALUES 
        ('${jsonStr}'::json)
    )
    INSERT INTO make (car_make)
    SELECT jsonb_object->>'car_make' FROM json_array_elements(
        (SELECT jsonStr FROM data))
    AS jsonb_object;
  `;
};
