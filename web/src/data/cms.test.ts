import { expect, test } from "vitest";
import { findCmsItem, normalizePath } from "./cms";

test("strips trailing slashes from CMS paths", () => {
  expect(normalizePath("/dermatology/skin/")).toBe("/dermatology/skin");
  expect(normalizePath("/")).toBe("/");
});

test("finds imported AllView pages by path", () => {
  const item = findCmsItem("/carmel-60-dublin-referral-for-growth-on-her-arm");
  expect(item?.title).toMatch(/Carmel/i);
});
