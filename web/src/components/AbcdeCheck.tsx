import { ArrowLeft, ArrowRight, ArrowSquareOut, Phone } from "@phosphor-icons/react";
import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import {
  abcde,
  abcdeHowToCheck,
  abcdeOtherSigns,
  abcdeSources,
  type AbcdeAnswer,
  type AbcdeItem,
  type AbcdeLetter,
} from "../data/dermatology";
import { summarizeAbcde } from "../domain/abcde-result";

type Step = AbcdeLetter | "result";

const emptyAnswers: Record<AbcdeLetter, AbcdeAnswer | null> = {
  A: null,
  B: null,
  C: null,
  D: null,
  E: null,
};

function figureKind(letter: AbcdeLetter, variant: "typical" | "concerning"): string {
  switch (letter) {
    case "A":
      return variant === "typical" ? "Even halves" : "Uneven halves";
    case "B":
      return variant === "typical" ? "Smooth edge" : "Ragged edge";
    case "C":
      return variant === "typical" ? "One colour" : "Mixed colours";
    case "D":
      return variant === "typical" ? "Under 6mm" : "Over 6mm";
    case "E":
      return variant === "typical" ? "Unchanged" : "Changed";
    default: {
      const _never: never = letter;
      return _never;
    }
  }
}

function AbcdeFigure({ letter, variant }: { letter: AbcdeLetter; variant: "typical" | "concerning" }) {
  const label = figureKind(letter, variant);
  const file = variant === "typical" ? "b" : "m";
  return (
    <img alt={label} className="mt-3 h-40 w-full object-contain" src={`/media/${letter}-${file}.jpg`} />
  );
}

function answerLabel(answer: AbcdeAnswer): string {
  switch (answer) {
    case "match":
      return "Looks like this";
    case "no":
      return "Does not";
    case "unsure":
      return "Not sure";
    default: {
      const _never: never = answer;
      return _never;
    }
  }
}

export function AbcdeCheck() {
  const liveId = useId();
  const [step, setStep] = useState<Step>("A");
  const [answers, setAnswers] = useState(emptyAnswers);

  useEffect(() => {
    if (window.location.hash !== "#abcde") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("abcde")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, []);

  const current = abcde.find((item) => item.letter === step) ?? null;
  const summary = summarizeAbcde(answers);
  const flagged = abcde.filter((item) => summary.flagged.includes(item.letter));
  const stepIndex = current ? abcde.findIndex((item) => item.letter === current.letter) : abcde.length;

  function goTo(next: Step) {
    setStep(next);
  }

  function choose(item: AbcdeItem, answer: AbcdeAnswer) {
    setAnswers((prev) => ({ ...prev, [item.letter]: answer }));
    const index = abcde.findIndex((entry) => entry.letter === item.letter);
    const following = abcde[index + 1];
    goTo(following ? following.letter : "result");
  }

  function restart() {
    setAnswers(emptyAnswers);
    goTo("A");
  }

  return (
    <section className="scroll-mt-36 bg-paper px-5 py-12" aria-labelledby="abcde-heading" id="abcde">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">Public skin check</p>
        <h2 id="abcde-heading" className="mt-2 font-ui text-3xl font-semibold text-navy">
          A simple mole check — ABCDE
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Work through one letter at a time. This is public education from HSE, Irish Cancer Society and
          dermatology guidance. It does not diagnose you, and it does not replace a GP or consultant.
        </p>

        <ol className="mt-6 flex flex-wrap gap-2" aria-label="ABCDE steps">
          {abcde.map((item, index) => {
            const currentStep = step === item.letter;
            const answered = answers[item.letter] !== null;
            return (
              <li key={item.letter}>
                <button
                  aria-current={currentStep ? "step" : undefined}
                  className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border px-4 font-ui text-sm font-semibold ${
                    currentStep
                      ? "border-navy bg-navy text-white"
                      : answered
                        ? "border-cyan bg-sky text-navy"
                        : "border-line bg-white text-navy hover:border-navy"
                  }`}
                  type="button"
                  onClick={() => goTo(item.letter)}
                >
                  <span aria-hidden>{item.letter}</span>
                  <span className="sr-only">{`${item.word}${answered ? `, ${answerLabel(answers[item.letter]!)}` : ""}${currentStep ? ", current step" : ""}`}</span>
                  <span aria-hidden className="ml-2 hidden sm:inline">
                    {item.word}
                  </span>
                </button>
                {index < abcde.length - 1 ? <span className="sr-only">then</span> : null}
              </li>
            );
          })}
          <li>
            <button
              aria-current={step === "result" ? "step" : undefined}
              className={`inline-flex min-h-11 items-center rounded-full border px-4 font-ui text-sm font-semibold ${
                step === "result" ? "border-navy bg-navy text-white" : "border-line bg-white text-navy hover:border-navy"
              }`}
              type="button"
              onClick={() => goTo("result")}
            >
              Result
            </button>
          </li>
        </ol>

        <p className="sr-only" aria-live="polite" id={liveId}>
          {current
            ? `Step ${stepIndex + 1} of 5. ${current.word}. ${current.question}`
            : flagged.length > 0
              ? `${flagged.length} sign${flagged.length === 1 ? "" : "s"} to get checked.`
              : "No ABCDE signs flagged. Get seen if you are still worried."}
        </p>

        {current ? (
          <article className="mt-8 rounded-3xl border border-line bg-white p-6 sm:p-8">
            <p className="font-mono text-sm text-cyan">
              {String(stepIndex + 1).padStart(2, "0")} of 05 — {current.letter} is for {current.word}
            </p>
            <h3 className="mt-2 font-ui text-2xl font-semibold text-navy">{current.question}</h3>
            <p className="mt-3 text-muted">{current.extra}</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <figure className="tile">
                <figcaption className="font-ui text-sm font-semibold text-navy">Often typical</figcaption>
                <AbcdeFigure letter={current.letter} variant="typical" />
                <p className="mt-2 text-sm text-muted">{current.typical}</p>
              </figure>
              <figure className="tile border-navy">
                <figcaption className="font-ui text-sm font-semibold text-navy">Get this seen</figcaption>
                <AbcdeFigure letter={current.letter} variant="concerning" />
                <p className="mt-2 text-sm text-muted">{current.concerning}</p>
              </figure>
            </div>

            <h4 className="mt-6 font-ui text-base font-semibold text-navy">Look for</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
              {current.lookFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <fieldset className="mt-6">
              <legend className="font-ui text-sm font-semibold text-navy">Does the “get this seen” side sound like your mark?</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {(
                  [
                    ["match", "Yes — it looks like that"],
                    ["no", "No — mine looks even"],
                    ["unsure", "I’m not sure"],
                  ] as const
                ).map(([value, label]) => {
                  const selected = answers[current.letter] === value;
                  return (
                    <button
                      key={value}
                      aria-pressed={selected}
                      className={`inline-flex min-h-12 items-center justify-center rounded-full border px-4 font-ui text-sm font-semibold ${
                        selected ? "border-navy bg-navy text-white" : "border-line bg-sky text-navy hover:border-navy"
                      }`}
                      type="button"
                      onClick={() => choose(current, value)}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-6 flex flex-wrap gap-3">
              {stepIndex > 0 ? (
                <button
                  className="inline-flex min-h-11 items-center gap-2 font-ui text-sm font-semibold text-navy underline decoration-cyan decoration-2 underline-offset-4"
                  type="button"
                  onClick={() => goTo(abcde[stepIndex - 1].letter)}
                >
                  <ArrowLeft aria-hidden size={16} /> Previous letter
                </button>
              ) : null}
              {stepIndex < abcde.length - 1 ? (
                <button
                  className="inline-flex min-h-11 items-center gap-2 font-ui text-sm font-semibold text-navy underline decoration-cyan decoration-2 underline-offset-4"
                  type="button"
                  onClick={() => goTo(abcde[stepIndex + 1].letter)}
                >
                  Skip for now <ArrowRight aria-hidden size={16} />
                </button>
              ) : (
                <button
                  className="inline-flex min-h-11 items-center gap-2 font-ui text-sm font-semibold text-navy underline decoration-cyan decoration-2 underline-offset-4"
                  type="button"
                  onClick={() => goTo("result")}
                >
                  See what this means <ArrowRight aria-hidden size={16} />
                </button>
              )}
            </div>
          </article>
        ) : (
          <article className="mt-8 rounded-3xl border border-line bg-white p-6 sm:p-8">
            <h3 className="font-ui text-2xl font-semibold text-navy">What this check can tell you</h3>
            {flagged.length > 0 ? (
              <p className="mt-3 text-muted">
                You marked {flagged.length === abcde.length ? "every letter" : flagged.map((item) => `${item.letter} — ${item.word}`).join(", ")}{" "}
                as a match or as “not sure”. That is a reason to get the mark seen. We cannot say what it is from a
                website check.
              </p>
            ) : (
              <p className="mt-3 text-muted">
                You did not flag the usual ABCDE signs. If the mark still worries you — or it itches, bleeds or looks
                different from your others — get it seen anyway. Ireland has no national melanoma screening programme.
              </p>
            )}

            <ul className="mt-5 grid gap-2 sm:grid-cols-5">
              {abcde.map((item) => (
                <li key={item.letter} className="tile py-3 text-center">
                  <p className="font-ui font-semibold text-navy">
                    {item.letter} · {answers[item.letter] ? answerLabel(answers[item.letter]!) : "Skipped"}
                  </p>
                  <p className="mt-1 text-xs text-muted">{item.word}</p>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-6 font-ui font-semibold text-white hover:bg-navy-deep"
                to="/book"
              >
                Get a mark checked <ArrowRight aria-hidden size={18} />
              </Link>
              <a
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line px-6 font-ui font-semibold text-navy hover:border-navy"
                href="tel:+35312248100"
              >
                <Phone aria-hidden size={18} weight="fill" /> Call 01 224 8100
              </a>
              <button
                className="inline-flex min-h-12 items-center rounded-full px-4 font-ui text-sm font-semibold text-navy underline decoration-cyan decoration-2 underline-offset-4"
                type="button"
                onClick={restart}
              >
                Start the check again
              </button>
            </div>
          </article>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <section aria-labelledby="abcde-how">
            <h3 id="abcde-how" className="font-ui text-xl font-semibold text-navy">
              How to check your skin
            </h3>
            <p className="mt-2 text-sm text-muted">
              The Irish Cancer Society recommends a monthly check so you learn what is normal for you.
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted">
              {abcdeHowToCheck.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
          <section aria-labelledby="abcde-other">
            <h3 id="abcde-other" className="font-ui text-xl font-semibold text-navy">
              Other reasons to get a mark seen
            </h3>
            <p className="mt-2 text-sm text-muted">The HSE says contact your GP as soon as you can if a mole:</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
              {abcdeOtherSigns.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-10" aria-labelledby="abcde-sources">
          <h3 id="abcde-sources" className="font-ui text-xl font-semibold text-navy">
            Official reading
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            These pages sit outside AllView. They open in a new tab. If anything here worries you, book with us or
            talk to your GP — do not wait on a website.
          </p>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {abcdeSources.map((source) => (
              <li key={source.href}>
                <a
                  className="tile flex min-h-12 items-start justify-between gap-3 hover:border-navy"
                  href={source.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>
                    <span className="font-ui font-semibold text-navy">{source.label}</span>
                    <span className="mt-1 block text-sm text-muted">{source.hint}</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                  <ArrowSquareOut aria-hidden className="mt-1 shrink-0 text-navy" size={20} />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
