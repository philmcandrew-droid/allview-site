import { ArrowRight, CheckCircle, Phone, ShieldCheck, Stethoscope, Timer } from "@phosphor-icons/react";
import { useMemo, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { parsePath, pathOrder, profiles, type Path } from "../data/process";

const pathVisual: Record<Path, { wait: string; include: string[] }> = {
  vhi: {
    wait: "About 10 days",
    include: ["Dedicated Vhi line 01 224 8111", "Claim under Consultant benefit", "No GP letter needed"],
  },
  hse: {
    wait: "After your referral arrives",
    include: ["No charge on the public pathway", "Your GP or hospital sends us", "We book the nearest clinic"],
  },
  private: {
    wait: "Usually within 4 weeks",
    include: ["€309 all-in — same for medical cards", "Nurse scan + consultant + results call", "Receipt for insurer and Revenue"],
  },
};

export function BookPage() {
  const [params, setParams] = useSearchParams();
  const path = useMemo(() => parsePath(params.get("path")), [params]);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const profile = profiles[path];
  const visual = pathVisual[path];

  function setPath(next: Path) {
    setParams({ path: next }, { replace: true });
    setSent(false);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 400);
  }

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <section className="hero-mesh px-5 pb-16 pt-14 text-white sm:pt-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">Book a visit</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] font-black sm:text-6xl">
            We’ll call you back and book the nearest clinic.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/90">
            Choose how you are covered. Then leave your number — or ring us now. Mon–Fri, 9am–5pm.
          </p>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-5" aria-label="Choose your pathway">
        <div className="grid gap-4 md:grid-cols-3">
          {pathOrder.map((id) => {
            const item = profiles[id];
            const active = id === path;
            return (
              <button
                key={id}
                aria-pressed={active}
                className={`tile text-left transition-shadow ${
                  active
                    ? id === "vhi"
                      ? "border-2 border-vhi shadow-lg"
                      : "ring-2 ring-navy shadow-lg"
                    : "hover:shadow-md"
                }`}
                type="button"
                onClick={() => setPath(id)}
              >
                <div className="flex h-10 items-center">
                  {id === "vhi" ? (
                    <img alt="" className="h-8 w-auto" src="/brand/vhi.svg" />
                  ) : id === "hse" ? (
                    <img alt="" className="h-10 w-auto" src="/brand/hse.svg" />
                  ) : (
                    <span className="rounded-full bg-sky px-3 py-1 font-mono text-xs uppercase tracking-widest text-navy">
                      Private
                    </span>
                  )}
                </div>
                <h2 className="mt-3 font-ui text-xl font-semibold text-navy">{item.label}</h2>
                <p className="mt-2 text-sm text-muted">
                  {item.cost} · {item.wait}
                </p>
                {active ? (
                  <p className={`mt-3 font-ui text-sm font-semibold ${id === "vhi" ? "text-vhi" : "text-navy"}`}>
                    Selected
                  </p>
                ) : (
                  <p className="mt-3 inline-flex items-center gap-1 font-ui text-sm font-semibold text-navy">
                    Choose this path <ArrowRight aria-hidden size={16} />
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12" aria-label="Request a call back">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="rounded-3xl border border-line bg-paper p-6 shadow-md sm:p-8">
            {sent ? (
              <div role="status">
                <CheckCircle aria-hidden className="text-navy" size={36} weight="fill" />
                <h2 className="mt-4 font-display text-3xl text-navy">We have your request.</h2>
                <p className="mt-3 text-muted">
                  We’ll call you on a clinic day (Mon–Fri, 9–5). If we miss you, we try again from the{" "}
                  {path === "vhi" ? "Vhi" : "main"} line.
                </p>
                <Link
                  className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-6 font-ui font-semibold text-white hover:bg-navy-deep"
                  to="/process"
                >
                  See what happens next <ArrowRight aria-hidden size={18} />
                </Link>
              </div>
            ) : (
              <>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Step 2 of 2</p>
                <h2 className="mt-2 font-display text-3xl text-navy">Your details</h2>
                <p className="mt-2 text-muted">{profile.bookStep}</p>
                <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
                  <label className="grid gap-1 text-sm font-semibold text-navy">
                    Full name *
                    <input
                      required
                      autoComplete="name"
                      className="min-h-12 rounded-xl border border-line bg-sky px-4 font-normal"
                      name="name"
                      type="text"
                    />
                  </label>
                  <label className="grid gap-1 text-sm font-semibold text-navy">
                    Phone *
                    <input
                      required
                      autoComplete="tel"
                      className="min-h-12 rounded-xl border border-line bg-sky px-4 font-normal"
                      name="phone"
                      type="tel"
                    />
                  </label>
                  <label className="grid gap-1 text-sm font-semibold text-navy">
                    Email *
                    <input
                      required
                      autoComplete="email"
                      className="min-h-12 rounded-xl border border-line bg-sky px-4 font-normal"
                      name="email"
                      type="email"
                    />
                  </label>
                  {path === "hse" ? (
                    <label className="grid gap-1 text-sm font-semibold text-navy">
                      Referring GP or hospital (optional)
                      <input
                        className="min-h-12 rounded-xl border border-line bg-sky px-4 font-normal"
                        name="referrer"
                      />
                    </label>
                  ) : null}
                  <button
                    aria-busy={submitting}
                    className={`mt-2 min-h-12 rounded-full font-ui font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60 ${
                      path === "vhi" ? "bg-vhi" : "bg-navy"
                    }`}
                    disabled={submitting}
                    type="submit"
                  >
                    {submitting ? "Sending…" : "Request a call back"}
                  </button>
                </form>
              </>
            )}
          </div>

          <aside className="flex flex-col gap-4">
            <div className="tile shadow-md">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">This path</p>
              <p className="mt-2 font-ui text-2xl font-semibold text-navy">{profile.short}</p>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Timer aria-hidden className="mt-0.5 text-navy" size={20} />
                  <div>
                    <dt className="font-semibold text-navy">Typical wait</dt>
                    <dd className="text-muted">{visual.wait}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Stethoscope aria-hidden className="mt-0.5 text-navy" size={20} />
                  <div>
                    <dt className="font-semibold text-navy">Cost</dt>
                    <dd className="text-muted">{profile.costNote}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck aria-hidden className="mt-0.5 text-navy" size={20} />
                  <div>
                    <dt className="font-semibold text-navy">Referral</dt>
                    <dd className="text-muted">{profile.referral}</dd>
                  </div>
                </div>
              </dl>
              <ul className="mt-5 space-y-2">
                {visual.include.map((line) => (
                  <li key={line} className="flex gap-2 text-sm text-navy">
                    <CheckCircle aria-hidden className="mt-0.5 shrink-0" size={18} weight="fill" />
                    {line}
                  </li>
                ))}
              </ul>
              <a
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-navy font-ui font-semibold text-navy hover:bg-sky"
                href={`tel:${profile.phone}`}
              >
                <Phone aria-hidden size={18} weight="fill" /> Call {profile.phoneLabel}
              </a>
            </div>
            <p className="px-1 text-sm text-muted">
              Prefer to see the visit first?{" "}
              <Link className="font-semibold text-navy underline decoration-cyan decoration-2 underline-offset-4" to={`/process?path=${path}`}>
                Play how it works
              </Link>
              .
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
