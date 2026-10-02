import { ArrowLeft, ArrowRight, CheckCircle, Scissors, User } from "@phosphor-icons/react";
import { useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";

type PathId = "done" | "visit" | "procedure";

const paths = [
  {
    id: "done",
    title: "Nothing more to do",
    Icon: CheckCircle,
    beats: [
      {
        title: "The photos are reviewed",
        body: "A consultant dermatologist looks at the pictures the nurse took. You have already left the clinic.",
      },
      {
        title: "You get a result",
        body: "The mark is harmless, or you are given a prescription.",
      },
      {
        title: "You are finished",
        body: "You do not need a hospital visit. In 2022, about half of nearly 10,000 people finished at this step.",
      },
    ],
  },
  {
    id: "visit",
    title: "See the consultant",
    Icon: User,
    beats: [
      {
        title: "The photos are not enough",
        body: "The consultant wants to look at your skin in person.",
      },
      {
        title: "We book that visit",
        body: "The appointment is a face-to-face consultation at an AllView clinic.",
      },
      {
        title: "You meet them there",
        body: "You see the consultant at an AllView clinic.",
      },
    ],
  },
  {
    id: "procedure",
    title: "A small procedure",
    Icon: Scissors,
    beats: [
      {
        title: "Something needs to be done",
        body: "The consultant decides a mark should be removed or tested.",
      },
      {
        title: "The clinic books it",
        body: "The procedure happens in an AllView clinic.",
      },
      {
        title: "AllView does the work",
        body: "AllView’s own clinicians do the procedure. It is not passed to another dermatology clinic.",
      },
    ],
  },
] as const;

function isPathId(value: string): value is PathId {
  return value === "done" || value === "visit" || value === "procedure";
}

export function AfterScan() {
  const [pathId, setPathId] = useState<PathId>("done");
  const [beat, setBeat] = useState(0);
  const path = paths.find((item) => item.id === pathId) ?? paths[0];
  const step = path.beats[beat] ?? path.beats[0];
  const last = beat >= path.beats.length - 1;

  function choose(id: PathId) {
    setPathId(id);
    setBeat(0);
  }

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const back = event.key === "ArrowLeft" || event.key === "ArrowUp";
    if (!forward && !back) return;
    event.preventDefault();
    const next = paths[(index + (forward ? 1 : -1) + paths.length) % paths.length];
    if (!next || !isPathId(next.id)) return;
    choose(next.id);
    document.getElementById(`after-scan-tab-${next.id}`)?.focus();
  }

  return (
    <section aria-labelledby="after-scan-heading">
      <h2 id="after-scan-heading" className="font-display text-3xl text-navy">
        What happens after your scan
      </h2>
      <p className="mt-3 max-w-2xl text-navy">
        A nurse photographs the area you are worried about. Choose what the consultant decides, then step through
        that path.
      </p>

      <div className="mt-8 flex flex-col gap-2 sm:flex-row" role="tablist" aria-label="What the consultant can decide">
        {paths.map((item, index) => {
          const selected = item.id === pathId;
          return (
            <button
              key={item.id}
              aria-controls="after-scan-panel"
              aria-selected={selected}
              className={`inline-flex min-h-12 flex-1 cursor-pointer items-center gap-3 rounded-2xl border px-4 text-left font-ui text-sm font-semibold transition-colors duration-200 ${
                selected ? "border-navy bg-navy text-white" : "border-line bg-paper text-navy hover:bg-sky"
              }`}
              id={`after-scan-tab-${item.id}`}
              role="tab"
              tabIndex={selected ? 0 : -1}
              type="button"
              onClick={() => choose(item.id)}
              onKeyDown={(event) => onTabKey(event, index)}
            >
              <item.Icon aria-hidden size={22} weight={selected ? "fill" : "regular"} />
              <span>
                <span className="mr-2 font-mono text-xs">{index + 1}</span>
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      <div
        aria-labelledby={`after-scan-tab-${path.id}`}
        className="mt-4 rounded-3xl border border-line bg-sky p-6 sm:p-8"
        id="after-scan-panel"
        role="tabpanel"
      >
        <p className="font-mono text-xs text-navy">
          Step {beat + 1} of {path.beats.length}
        </p>
        <div aria-hidden className="mt-3 flex gap-2">
          {path.beats.map((item, index) => (
            <span
              key={item.title}
              className={`h-1.5 flex-1 rounded-full ${index <= beat ? "bg-navy" : "bg-white"}`}
            />
          ))}
        </div>
        <h3 className="mt-5 font-ui text-2xl font-semibold text-navy">{step.title}</h3>
        <p aria-live="polite" className="mt-3 max-w-xl text-navy">
          {step.body}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border border-navy px-5 font-ui text-sm font-semibold text-navy hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            disabled={beat === 0}
            type="button"
            onClick={() => setBeat((current) => Math.max(0, current - 1))}
          >
            <ArrowLeft aria-hidden size={18} /> Back
          </button>
          <button
            className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-navy px-5 font-ui text-sm font-semibold text-white hover:bg-navy-deep disabled:cursor-not-allowed disabled:opacity-40"
            disabled={last}
            type="button"
            onClick={() => setBeat((current) => Math.min(path.beats.length - 1, current + 1))}
          >
            Next <ArrowRight aria-hidden size={18} />
          </button>
        </div>
      </div>

      <p className="mt-8 max-w-2xl text-sm text-navy">
        Hospital skin lists are long. AllView published National Treatment Purchase Fund figures for September 2023:
        more than 52,000 people were waiting, about half for more than six months, and about one in five for more
        than 18 months.
      </p>
      <p className="mt-6">
        <Link
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-6 font-ui font-semibold text-white hover:bg-navy-deep"
          to="/process"
        >
          See how a visit works <ArrowRight aria-hidden size={18} />
        </Link>
      </p>
    </section>
  );
}
