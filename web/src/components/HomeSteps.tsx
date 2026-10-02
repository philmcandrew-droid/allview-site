import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { steps } from "../data/process";

const visit = [
  { title: "We call you", icon: "/media/Schedule-Appointment-Icon.svg", step: steps[0] },
  { title: "Nurse scan", icon: "/media/Telederm-Scan-Icon.svg", step: steps[1] },
  { title: "Consultant", icon: "/media/Prescription-Icon-1.svg", step: steps[2] },
  { title: "Your result", icon: "/media/Raport-Icon.svg", step: steps[3] },
] as const;

export function HomeSteps() {
  const [index, setIndex] = useState(0);
  const current = visit[index] ?? visit[0];
  const detail = current.step;

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, itemIndex: number) {
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const back = event.key === "ArrowLeft" || event.key === "ArrowUp";
    if (!forward && !back) return;
    event.preventDefault();
    const next = (itemIndex + (forward ? 1 : -1) + visit.length) % visit.length;
    setIndex(next);
    document.getElementById(`home-step-${next}`)?.focus();
  }

  return (
    <section className="bg-sky px-5 py-16" id="process">
      <div className="mx-auto max-w-6xl rounded-3xl border border-line bg-paper p-6 shadow-md sm:p-10">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">The visit</p>
        <h2 className="mt-2 font-display text-4xl text-navy">Four simple steps</h2>
        <p className="mt-3 max-w-2xl text-navy">
          The same four steps for Vhi, HSE and private. You do not meet the consultant on the day of the scan. Choose
          a step to see what you do, and what we do.
        </p>

        <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4" role="tablist" aria-label="The four steps">
          {visit.map((item, itemIndex) => {
            const selected = itemIndex === index;
            return (
              <button
                key={item.title}
                aria-controls="home-step-panel"
                aria-selected={selected}
                className={`inline-flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border px-4 text-left font-ui text-sm font-semibold transition-colors duration-200 ${
                  selected ? "border-navy bg-navy text-white" : "border-line bg-paper text-navy hover:bg-sky"
                }`}
                id={`home-step-${itemIndex}`}
                role="tab"
                tabIndex={selected ? 0 : -1}
                type="button"
                onClick={() => setIndex(itemIndex)}
                onKeyDown={(event) => onTabKey(event, itemIndex)}
              >
                <img alt="" className={`h-8 w-8 ${selected ? "brightness-0 invert" : ""}`} src={item.icon} />
                <span>
                  <span className="mr-2 font-mono text-xs">{itemIndex + 1}</span>
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {detail ? (
          <div
            aria-labelledby={`home-step-${index}`}
            className="mt-4 rounded-3xl bg-sky p-6 sm:p-8"
            id="home-step-panel"
            role="tabpanel"
          >
            <p className="font-mono text-xs text-navy">
              Step {index + 1} of {visit.length} · {detail.duration}
            </p>
            <h3 className="mt-3 font-ui text-2xl font-semibold text-navy">{detail.lead}</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <p className="rounded-2xl bg-paper p-4 text-sm text-navy">
                <span className="font-ui font-semibold">You</span>
                <span className="mt-1 block">{detail.youDo}</span>
              </p>
              <p className="rounded-2xl bg-paper p-4 text-sm text-navy">
                <span className="font-ui font-semibold">AllView</span>
                <span className="mt-1 block">{detail.weDo}</span>
              </p>
            </div>
            <p aria-live="polite" className="sr-only">
              {detail.lead} {detail.youDo} {detail.weDo}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border border-navy px-5 font-ui text-sm font-semibold text-navy hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                disabled={index === 0}
                type="button"
                onClick={() => setIndex((currentIndex) => Math.max(0, currentIndex - 1))}
              >
                <ArrowLeft aria-hidden size={18} /> Back
              </button>
              <button
                className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-navy px-5 font-ui text-sm font-semibold text-white hover:bg-navy-deep disabled:cursor-not-allowed disabled:opacity-40"
                disabled={index === visit.length - 1}
                type="button"
                onClick={() => setIndex((currentIndex) => Math.min(visit.length - 1, currentIndex + 1))}
              >
                Next <ArrowRight aria-hidden size={18} />
              </button>
            </div>
          </div>
        ) : null}

        <p className="mt-6 max-w-3xl text-sm text-navy">
          The result may be a prescription, a face-to-face visit, or a procedure. We arrange whichever one the
          consultant recommends.
        </p>
        <Link
          className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-6 font-ui font-semibold text-white transition-colors hover:bg-navy-deep"
          to="/process"
        >
          See how it works in detail <ArrowRight aria-hidden size={18} />
        </Link>
      </div>
    </section>
  );
}
