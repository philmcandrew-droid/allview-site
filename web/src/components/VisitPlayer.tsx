import { CaretLeft, CaretRight, CheckCircle, FirstAid, Pause, Pill, Play } from "@phosphor-icons/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { outcomes, steps, type PathProfile, type Step, type StepId } from "../data/process";
import { SceneBook, SceneNext, SceneResults, SceneReview, SceneScan } from "./VisitScenes";

const STEP_MS = 5000;

function sceneFor(id: StepId, title: string) {
  switch (id) {
    case "book":
      return <SceneBook title={title} />;
    case "scan":
      return <SceneScan title={title} />;
    case "review":
      return <SceneReview title={title} />;
    case "results":
      return <SceneResults title={title} />;
    case "next":
      return <SceneNext title={title} />;
    default: {
      const _exhaustive: never = id;
      return _exhaustive;
    }
  }
}

function reducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type VisitPlayerProps = {
  path: PathProfile;
};

const outcomeIcons = [CheckCircle, Pill, FirstAid];

export function VisitPlayer({ path }: VisitPlayerProps) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [outcome, setOutcome] = useState(outcomes[0].id);
  const stageRef = useRef<HTMLDivElement>(null);
  const liveId = useId();
  const step: Step = steps[index] ?? steps[0];
  const lead = index === 0 ? path.bookStep : step.lead;
  const last = index === steps.length - 1;
  const selectedOutcome = outcomes.find((item) => item.id === outcome) ?? outcomes[0];

  function goTo(next: number) {
    const clamped = Math.max(0, Math.min(steps.length - 1, next));
    setIndex(clamped);
    if (clamped === steps.length - 1) setPlaying(false);
  }

  useEffect(() => {
    setIndex(0);
    setPlaying(false);
  }, [path.short]);

  useEffect(() => {
    if (!playing || reducedMotion()) return;
    const timer = window.setTimeout(() => {
      if (last) {
        setPlaying(false);
        return;
      }
      goTo(index + 1);
    }, STEP_MS);
    return () => window.clearTimeout(timer);
  }, [playing, index, last]);

  useEffect(() => {
    function onHide() {
      if (document.hidden) setPlaying(false);
    }
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, []);

  useGSAP(
    () => {
      if (!stageRef.current || reducedMotion()) return;
      gsap.fromTo(stageRef.current, { y: 8 }, { y: 0, duration: 0.4, ease: "power2.out" });
    },
    { dependencies: [index] },
  );

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        goTo(index + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        goTo(index - 1);
        break;
      case " ":
        event.preventDefault();
        setPlaying((v) => !v);
        break;
      default:
        break;
    }
  }

  return (
    <div
      aria-labelledby={liveId}
      className="overflow-hidden rounded-3xl border border-line bg-paper shadow-md"
      role="region"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div className="relative bg-sky p-4 sm:p-6">
          <div ref={stageRef} className="overflow-hidden rounded-2xl">
            {sceneFor(step.id, `${step.title}: ${lead}`)}
          </div>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Step {step.number} of {String(steps.length).padStart(2, "0")}
          </p>
        </div>

        <div className="flex flex-col justify-between p-5 sm:p-8">
          <div>
            <p className="font-ui text-xs font-semibold uppercase tracking-wider text-cyan">
              {path.short} · {step.duration}
            </p>
            <h2 id={liveId} aria-live="polite" className="mt-2 font-display text-3xl text-navy sm:text-4xl">
              {step.title}
            </h2>
            <p className="mt-3 text-navy">{lead}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-sky p-4">
                <p className="font-ui text-xs font-semibold uppercase tracking-wider text-muted">You</p>
                <p className="mt-1 text-sm text-navy">{step.youDo}</p>
              </div>
              <div className="rounded-xl bg-sky p-4">
                <p className="font-ui text-xs font-semibold uppercase tracking-wider text-muted">AllView</p>
                <p className="mt-1 text-sm text-navy">{step.weDo}</p>
              </div>
            </div>
            {step.id === "next" ? (
              <div className="mt-5">
                <div className="flex flex-wrap gap-2" role="tablist" aria-label="Possible outcomes">
                  {outcomes.map((item, i) => {
                    const Icon = outcomeIcons[i] ?? CheckCircle;
                    const active = item.id === outcome;
                    return (
                      <button
                        key={item.id}
                        aria-controls={`outcome-${item.id}`}
                        aria-selected={active}
                        className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-3 font-ui text-sm font-semibold transition-colors ${
                          active ? "border-navy bg-navy text-white" : "border-line bg-paper text-navy hover:border-navy"
                        }`}
                        id={`tab-${item.id}`}
                        role="tab"
                        type="button"
                        onClick={() => setOutcome(item.id)}
                      >
                        <Icon aria-hidden size={16} weight={active ? "fill" : "regular"} />
                        {item.title}
                      </button>
                    );
                  })}
                </div>
                <p
                  aria-labelledby={`tab-${selectedOutcome.id}`}
                  className="mt-3 text-sm text-muted"
                  id={`outcome-${selectedOutcome.id}`}
                  role="tabpanel"
                >
                  {selectedOutcome.detail}
                </p>
              </div>
            ) : null}
          </div>

          <div className="mt-8">
            <div className="flex items-center gap-2" role="tablist" aria-label="Visit steps">
              {steps.map((item, i) => {
                const active = i === index;
                return (
                  <button
                    key={item.id}
                    aria-current={active ? "step" : undefined}
                    aria-label={`${item.number} ${item.title}`}
                    className="flex h-11 flex-1 items-center"
                    type="button"
                    onClick={() => goTo(i)}
                  >
                    <span
                      className={`h-2.5 w-full rounded-full transition-colors ${active ? "bg-navy" : i < index ? "bg-cyan" : "bg-line"}`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                aria-label="Previous step"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-navy transition-colors hover:border-navy disabled:opacity-40"
                disabled={index === 0}
                type="button"
                onClick={() => goTo(index - 1)}
              >
                <CaretLeft aria-hidden size={22} weight="bold" />
              </button>
              <button
                aria-pressed={playing}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-5 font-ui font-semibold text-white transition-colors hover:bg-navy-deep"
                type="button"
                onClick={() => {
                  if (last && !playing) {
                    setIndex(0);
                    setPlaying(true);
                    return;
                  }
                  setPlaying((v) => !v);
                }}
              >
                {playing ? <Pause aria-hidden size={18} weight="fill" /> : <Play aria-hidden size={18} weight="fill" />}
                {playing ? "Pause" : last ? "Start again" : "Walk through the steps"}
              </button>
              <button
                aria-label="Next step"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-navy transition-colors hover:border-navy disabled:opacity-40"
                disabled={last}
                type="button"
                onClick={() => goTo(index + 1)}
              >
                <CaretRight aria-hidden size={22} weight="bold" />
              </button>
            </div>
            <p className="mt-3 hidden text-xs text-muted lg:block">Arrow keys move between steps. Space starts or pauses.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
