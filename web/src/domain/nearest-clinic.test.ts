import { expect, test } from "vitest";
import { nearestClinic } from "./nearest-clinic";

test("picks the Docklands clinic for a point in Dublin city centre", () => {
  const clinic = nearestClinic(53.347, -6.259);
  expect(clinic.id).toBe("docklands");
});

test("picks Cork when ranking from Cork city", () => {
  const clinic = nearestClinic(51.898, -8.475);
  expect(clinic.id).toBe("cork");
});

test("throws when there are no clinics to rank", () => {
  expect(() => nearestClinic(53.347, -6.259, [])).toThrow("No clinics to rank");
});
