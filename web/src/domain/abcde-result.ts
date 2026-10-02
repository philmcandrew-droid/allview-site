import type { AbcdeAnswer, AbcdeLetter } from "../data/dermatology";

export type AbcdeTone = "see-someone" | "still-check-if-worried";

export type AbcdeSummary = {
  flagged: AbcdeLetter[];
  skipped: AbcdeLetter[];
  cleared: AbcdeLetter[];
  tone: AbcdeTone;
};

const letters: AbcdeLetter[] = ["A", "B", "C", "D", "E"];

function isFlag(answer: AbcdeAnswer | null): boolean {
  switch (answer) {
    case "match":
    case "unsure":
      return true;
    case "no":
    case null:
      return false;
    default: {
      const _never: never = answer;
      return _never;
    }
  }
}

export function summarizeAbcde(answers: Record<AbcdeLetter, AbcdeAnswer | null>): AbcdeSummary {
  const flagged = letters.filter((letter) => isFlag(answers[letter]));
  const skipped = letters.filter((letter) => answers[letter] === null);
  const cleared = letters.filter((letter) => answers[letter] === "no");
  return {
    flagged,
    skipped,
    cleared,
    tone: flagged.length > 0 ? "see-someone" : "still-check-if-worried",
  };
}
