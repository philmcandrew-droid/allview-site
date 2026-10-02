import { useState } from "react";
import { awardYears, awards, type AwardStatus } from "../data/awards";

const statusClass: Record<AwardStatus, string> = {
  Winner: "bg-navy text-white",
  Shortlisted: "bg-sky text-navy",
  "Highly commended": "bg-paper text-navy ring-1 ring-line",
};

export function AwardsGallery() {
  const [year, setYear] = useState<(typeof awardYears)[number] | "all">("all");
  const visible = year === "all" ? awards : awards.filter((item) => item.year === year);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter awards by year">
        {(["all", ...awardYears] as const).map((option) => {
          const active = year === option;
          return (
            <button
              key={option}
              aria-pressed={active}
              className={`min-h-11 rounded-full border px-4 font-ui text-sm font-semibold transition-colors ${
                active ? "border-navy bg-navy text-white" : "border-line bg-paper text-navy hover:border-navy"
              }`}
              type="button"
              onClick={() => setYear(option)}
            >
              {option === "all" ? "All years" : option}
            </button>
          );
        })}
      </div>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((award) => (
          <li className="overflow-hidden rounded-[20px] border border-line bg-paper" key={`${award.year}-${award.detail}`}>
            <div className="flex h-52 items-center justify-center bg-sky p-4">
              <img alt={award.imageAlt} className="max-h-full max-w-full object-contain" loading="lazy" src={award.image} />
            </div>
            <div className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-mono text-xs uppercase tracking-wider text-cyan">{award.year}</p>
                <p className={`rounded-full px-2 py-0.5 font-ui text-xs font-semibold ${statusClass[award.status]}`}>
                  {award.status}
                </p>
              </div>
              <h3 className="mt-2 font-ui text-lg font-semibold text-navy">{award.title}</h3>
              <p className="mt-2 text-sm text-muted">{award.detail}</p>
              {award.partners ? (
                <ul className="mt-4 flex items-center gap-4">
                  {award.partners.map((partner) => (
                    <li key={partner.src}>
                      <img alt={partner.alt} className="h-8 w-auto" loading="lazy" src={partner.src} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
