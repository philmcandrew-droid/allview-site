import { useEffect, useState } from "react";
import { patientsTreated } from "../data/home-facts";

const RING = 2 * Math.PI * 86;

export function PatientsTreated() {
  const [shown, setShown] = useState(patientsTreated);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const start = performance.now();
    const duration = 1400;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      const eased = 1 - (1 - t) ** 3;
      setShown(Math.round(patientsTreated * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    setShown(0);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-5 pt-16" aria-labelledby="patients-heading">
      <div className="overflow-hidden rounded-[28px] bg-navy text-white shadow-md">
        <div className="grid items-center gap-8 px-6 py-10 sm:px-10 md:grid-cols-[16rem_minmax(0,1fr)]">
          <div className="relative mx-auto grid h-56 w-56 place-items-center" aria-hidden="true">
            <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" fill="none" r="86" stroke="#60cbe8" strokeOpacity="0.25" strokeWidth="10" />
              <circle
                cx="100"
                cy="100"
                fill="none"
                r="86"
                stroke="#60cbe8"
                strokeDasharray={`${RING * 0.78} ${RING}`}
                strokeLinecap="round"
                strokeWidth="10"
              />
            </svg>
            <p className="text-center font-ui text-4xl font-semibold tracking-tight">
              {shown.toLocaleString("en-IE")}
              <span className="text-cyan">+</span>
            </p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">AllView Healthcare</p>
            <h2 className="mt-3 font-display text-4xl" id="patients-heading">
              Number of patients treated: 30,000+
            </h2>
            <p className="mt-4 max-w-xl text-white/90">
              More than 30,000 people have been seen for a nurse-led skin scan and a consultant dermatologist
              diagnosis.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              <li className="rounded-full bg-white/10 px-4 py-2 font-ui text-sm font-semibold">€309 private package</li>
              <li className="rounded-full bg-white/10 px-4 py-2 font-ui text-sm font-semibold">About 10 days for Vhi</li>
              <li className="rounded-full bg-white/10 px-4 py-2 font-ui text-sm font-semibold">Results within 30 days</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
