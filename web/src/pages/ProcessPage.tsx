import { ArrowRight, CheckCircle, Circle, Phone } from "@phosphor-icons/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { VisitPlayer } from "../components/VisitPlayer";
import {
  checklist,
  faqs,
  parsePath,
  pathOrder,
  profiles,
  waitBars,
  type Path,
} from "../data/process";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CHECKLIST_KEY = "allview.process.checklist";

function loadChecklist(): Record<string, boolean> {
  try {
    const raw = window.localStorage.getItem(CHECKLIST_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ProcessPage() {
  const [params, setParams] = useSearchParams();
  const path = parsePath(params.get("path"));
  const profile = profiles[path];
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    setChecked(loadChecklist());
  }, []);

  function setPath(next: Path) {
    const nextParams = new URLSearchParams(params);
    nextParams.set("path", next);
    setParams(nextParams, { replace: true });
  }

  function toggleCheck(id: string) {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        window.localStorage.setItem(CHECKLIST_KEY, JSON.stringify(next));
      } catch {
        // private mode — in-memory state still works
      }
      return next;
    });
  }

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;

      root.querySelectorAll<HTMLElement>(".wait-bar").forEach((bar) => {
        const fill = bar.querySelector<HTMLElement>(".wait-fill");
        const count = bar.querySelector<HTMLElement>(".wait-count");
        const target = Number(bar.dataset.days ?? 0);
        const counter = { value: 0 };
        gsap
          .timeline({ scrollTrigger: { trigger: bar, start: "top 85%" } })
          .fromTo(fill, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 1, ease: "power3.out" })
          .to(
            counter,
            {
              value: target,
              duration: 1,
              ease: "power3.out",
              onUpdate: () => {
                if (count) count.textContent = String(Math.round(counter.value));
              },
            },
            "<",
          );
      });

      gsap.fromTo(
        root.querySelectorAll(".reveal"),
        { y: 12 },
        {
          y: 0,
          duration: 0.45,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: ".reveal-group", start: "top 85%" },
        },
      );
    },
    { scope },
  );

  const maxDays = Math.max(...waitBars.map((bar) => bar.days));
  const visibleChecklist = checklist.filter((item) => !item.paths || item.paths.includes(path));
  const doneCount = visibleChecklist.filter((item) => checked[item.id]).length;

  return (
    <main id="main" tabIndex={-1} className="outline-none" ref={scope}>
      <section className="hero-mesh px-5 pb-16 pt-14 text-white sm:pt-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">How it works</p>
          <h1 className="mt-4 max-w-3xl font-ui text-4xl leading-[1.05] font-semibold sm:text-6xl">
            Here’s what happens at your appointment.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/90">
            We’ll walk you through each step — from the first call to your result. Choose how you are
            covered and the wait, cost, and first step update.
          </p>

          <div
            className="mt-8 inline-flex max-w-full flex-wrap gap-1 rounded-full bg-white/10 p-1 backdrop-blur"
            role="group"
            aria-label="Choose your pathway"
          >
            {pathOrder.map((option) => {
              const active = option === path;
              return (
                <button
                  key={option}
                  aria-pressed={active}
                  className={`min-h-11 rounded-full px-4 font-ui text-sm font-semibold transition-colors ${
                    active
                      ? option === "vhi"
                        ? "bg-vhi text-white"
                        : "bg-white text-navy"
                      : "text-white hover:bg-white/10"
                  }`}
                  type="button"
                  onClick={() => setPath(option)}
                >
                  {profiles[option].label}
                </button>
              );
            })}
          </div>

          <dl className="mt-8 grid gap-3 sm:grid-cols-3" aria-live="polite">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <dt className="font-ui text-xs font-semibold uppercase tracking-wider text-cyan">Typical wait</dt>
              <dd className="mt-1 font-ui text-2xl font-semibold capitalize">{profile.wait}</dd>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <dt className="font-ui text-xs font-semibold uppercase tracking-wider text-cyan">Cost to you</dt>
              <dd className="mt-1 font-ui text-2xl font-semibold">{profile.cost}</dd>
              <dd className="mt-1 text-sm text-white/80">{profile.costNote}</dd>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <dt className="font-ui text-xs font-semibold uppercase tracking-wider text-cyan">Referral</dt>
              <dd className="mt-1 text-sm text-white/90">{profile.referral}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-5" aria-label="How a visit works">
        <VisitPlayer path={profile} />
        <p className="mt-4 text-center">
          <a className="inline-flex min-h-11 items-center font-ui text-sm font-semibold text-navy underline decoration-cyan decoration-2 underline-offset-4" href="#questions">
            Skip to questions
          </a>
        </p>
      </section>

      <section className="bg-paper px-5 py-16 mt-12" aria-labelledby="wait-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="wait-heading" className="font-display text-3xl text-navy sm:text-4xl">
            Why people choose this over a hospital list
          </h2>
          <p className="mt-3 max-w-xl text-muted">Days from referral to a consultant’s answer — your path is highlighted.</p>
          <ul className="mt-8 space-y-5">
            {waitBars.map((bar) => {
              const width = Math.max(6, (bar.days / maxDays) * 100);
              const mine = bar.path === path;
              const fillClass =
                bar.tone === "slow" ? "bg-muted/40" : bar.tone === "vhi" ? "bg-vhi" : "bg-navy";
              return (
                <li
                  key={bar.id}
                  className={`wait-bar rounded-2xl p-4 ${mine ? "bg-sky ring-2 ring-navy" : ""}`}
                  data-days={bar.days}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-ui font-semibold text-navy">
                      {bar.label}
                      {mine ? <span className="ml-2 font-mono text-xs uppercase tracking-wider text-cyan">Your path</span> : null}
                    </p>
                    <p className="font-mono text-sm text-navy">
                      <span className="wait-count text-xl font-semibold">{bar.days}</span>
                      {bar.days >= 365 ? "+" : ""} days
                    </p>
                  </div>
                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-sky">
                    <div className={`wait-fill h-full rounded-full ${fillClass}`} style={{ width: `${width}%` }} />
                  </div>
                  <p className="mt-1 text-sm text-muted">{bar.sub}</p>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-xs text-muted">
            Patient stories from allview.ie. Public waiting times vary by hospital and urgency.
          </p>
        </div>
      </section>

      <section
        className="reveal-group mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-2"
        id="questions"
        aria-label="Prepare and questions"
      >
        <div className="reveal">
          <h2 className="font-display text-3xl text-navy">Pack this, not a hospital bag</h2>
          <p className="mt-2 text-muted" aria-live="polite">
            {doneCount} of {visibleChecklist.length} done — remembered on this device.
          </p>
          <ul className="mt-6 space-y-2">
            {visibleChecklist.map((item) => {
              const isChecked = Boolean(checked[item.id]);
              return (
                <li key={item.id}>
                  <label
                    className={`flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${
                      isChecked ? "border-cyan bg-sky" : "border-line bg-paper hover:border-navy"
                    }`}
                  >
                    <input
                      checked={isChecked}
                      className="peer sr-only"
                      type="checkbox"
                      onChange={() => toggleCheck(item.id)}
                    />
                    <span
                      aria-hidden
                      className="mt-0.5 shrink-0 rounded-full text-navy peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cyan"
                    >
                      {isChecked ? <CheckCircle size={22} weight="fill" /> : <Circle size={22} />}
                    </span>
                    <span className={`text-sm ${isChecked ? "text-muted line-through" : "text-navy"}`}>{item.text}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="reveal">
          <h2 className="font-display text-3xl text-navy">The questions people actually ask</h2>
          <div className="mt-6 divide-y divide-line rounded-2xl border border-line bg-paper">
            {faqs.map((faq) => (
              <details key={faq.q} className="group px-5">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-ui font-semibold text-navy [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ArrowRight aria-hidden className="shrink-0 transition-transform group-open:rotate-90" size={18} />
                </summary>
                <p className="pb-4 text-sm text-muted">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 rounded-3xl bg-navy p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">That’s the process</p>
            <h2 className="mt-2 font-display text-3xl">Start as a {profile.short}.</h2>
            <p className="mt-2 text-white/80">Request a call back, or ring {profile.phoneLabel} — Mon–Fri, 9am–5pm.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              className={`inline-flex min-h-12 items-center gap-2 rounded-full px-6 font-ui font-semibold transition-colors ${
                path === "vhi" ? "bg-vhi text-white hover:bg-vhi/90" : "bg-white text-navy hover:bg-sky"
              }`}
              to={`/book?path=${path}`}
            >
              Request a call back <ArrowRight aria-hidden size={18} />
            </Link>
            <a
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/40 px-6 font-ui font-semibold text-white transition-colors hover:bg-white/10"
              href={`tel:${profile.phone}`}
            >
              <Phone aria-hidden size={18} weight="fill" /> Call {profile.phoneLabel}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
