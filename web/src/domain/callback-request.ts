import type { Path } from "../data/process";

export type CallbackRequest = {
  name: string;
  phone: string;
  email: string;
  path: Path;
  referrer?: string;
};

export type CallbackResult = { ok: true } | { ok: false; errors: Record<string, string> };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCallbackRequest(input: CallbackRequest): CallbackResult {
  const errors: Record<string, string> = {};
  if (!input.name.trim()) errors.name = "Enter your full name";
  const digits = input.phone.replace(/\D/g, "");
  if (digits.length < 8) errors.phone = "Enter a phone number";
  if (!emailPattern.test(input.email.trim())) errors.email = "Enter an email address";
  return Object.keys(errors).length > 0 ? { ok: false, errors } : { ok: true };
}
