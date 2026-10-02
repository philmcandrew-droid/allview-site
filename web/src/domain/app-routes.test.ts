import { expect, test } from "vitest";
import { smokeRoutes } from "./app-routes";

test("smoke list includes the public Dermatology pathways", () => {
  expect(smokeRoutes).toEqual(
    expect.arrayContaining([
      "/",
      "/book",
      "/book?path=vhi",
      "/dermatology",
      "/dermatology/process-vhi",
      "/dermatology/gp-referral",
      "/dermatology/skin",
      "/dermatology/case-studies",
    ]),
  );
});
