import { getFullName } from "../../user/user";

test("first name of John and last name of Doe equals John Doe", () => {
  expect(getFullName("John", "Doe")).toEqual("John Doe");
});
