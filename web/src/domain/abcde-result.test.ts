import { expect, test } from "vitest";
import { summarizeAbcde } from "./abcde-result";

test("flags a mark as see-someone when any letter matches", () => {
  const result = summarizeAbcde({
    A: "match",
    B: "no",
    C: null,
    D: null,
    E: null,
  });

  expect(result.tone).toBe("see-someone");
  expect(result.flagged).toEqual(["A"]);
});

test("treats not-sure the same as a match", () => {
  const result = summarizeAbcde({
    A: "no",
    B: "unsure",
    C: "no",
    D: "no",
    E: "no",
  });

  expect(result.tone).toBe("see-someone");
  expect(result.flagged).toEqual(["B"]);
});

test("asks people to still get seen if nothing is flagged", () => {
  const result = summarizeAbcde({
    A: "no",
    B: "no",
    C: "no",
    D: "no",
    E: "no",
  });

  expect(result.tone).toBe("still-check-if-worried");
  expect(result.flagged).toEqual([]);
  expect(result.cleared).toEqual(["A", "B", "C", "D", "E"]);
});

test("lists skipped letters separately from cleared ones", () => {
  const result = summarizeAbcde({
    A: "match",
    B: null,
    C: "no",
    D: null,
    E: "unsure",
  });

  expect(result.skipped).toEqual(["B", "D"]);
  expect(result.cleared).toEqual(["C"]);
  expect(result.flagged).toEqual(["A", "E"]);
});
