import { expect, test } from "vitest";
import { validateCallbackRequest } from "./callback-request";

test("rejects a callback request with blank name, phone, or email", () => {
  const result = validateCallbackRequest({
    name: "   ",
    phone: "",
    email: "not-an-email",
    path: "private",
  });

  expect(result.ok).toBe(false);
  if (result.ok) return;
  expect(result.errors.name).toBe("Enter your full name");
  expect(result.errors.phone).toBe("Enter a phone number");
  expect(result.errors.email).toBe("Enter an email address");
});

test("accepts a complete Vhi callback request", () => {
  const result = validateCallbackRequest({
    name: "Carmel Byrne",
    phone: "01 224 8111",
    email: "carmel@example.ie",
    path: "vhi",
  });

  expect(result).toEqual({ ok: true });
});

test("rejects a phone number with too few digits", () => {
  const result = validateCallbackRequest({
    name: "Pat Conway",
    phone: "123",
    email: "pat@example.ie",
    path: "hse",
    referrer: "Beaumont",
  });

  expect(result.ok).toBe(false);
  if (result.ok) return;
  expect(result.errors.phone).toBe("Enter a phone number");
});
