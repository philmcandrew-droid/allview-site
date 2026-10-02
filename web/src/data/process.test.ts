import { expect, test } from "vitest";
import { parsePath } from "./process";

test("keeps an explicit Vhi or HSE pathway", () => {
  expect(parsePath("vhi")).toBe("vhi");
  expect(parsePath("hse")).toBe("hse");
});

test("defaults missing or unknown cover to private", () => {
  expect(parsePath(null)).toBe("private");
  expect(parsePath("nuffield")).toBe("private");
});
