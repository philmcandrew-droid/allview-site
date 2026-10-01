import { ArrowRight, Clock, Copy, EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MAIN_PHONE, VHI_PHONE } from "../data/clinics";
import { faqs, parsePath, type Path } from "../data/process";

const HQ = {
  name: "AllView Carrickmines",
  address: "Suite 11–13, The Hyde Buildings, The Park, Carrickmines, Dublin 18",
  eircode: "D18 YX22",
  lat: 53.2504414,
  lng: -6.1832133,
};

type Reason = Path | "other";

const reasons: { id: Reason; label: string }[] = [
  { id: "vhi", label: "I have Vhi" },
  { id: "hse", label: "HSE / GP referred" },
  { id: "private", label: "Paying privately" },
  { id: "other", label: "A question" },
];

function isIrelandOpen(now: Date): boolean {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Dublin",
    weekday: "short",
    hour: "numeric",
    hour12: false,
  }).formatToParts(now);
  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const weekend = weekday === "Sat" || weekday === "Sun";
  return !weekend && hour >= 9 && hour < 17;
}

function parseReason(raw: string | null): Reason {
  if (raw === "other") return "other";
  return parsePath(raw);
}

export function ContactPage() {
  const [params, setParams] = useSearchParams();
  const reason = parseReason(params.get("path") ?? params.get("reason"));
  const phone = reason === "vhi" ? VHI_PHONE : MAIN_PHONE;
  const phoneLabel = reason === "vhi" ? "01 224 8111" : "01 224 8100";
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [note, setNote] = useState("");
  const [picked, setPicked] = useState<string | null>(null);
  const [open] = useState(() => isIrelandOpen(new Date()));
  const formRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (reason !== "other") return;
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [reason]);

  const hint = useMemo(() => {
    switch (reason) {
      case "vhi":
        return "We’ll use the Vhi line and aim for about 10 days.";
      case "hse":
        return "Have your referral to hand if you have a copy. We’ll place you after your GP or hospital sends us.";
      case "private":
        return "€309 all-in. Self-referral is fine — no GP letter needed.";
      case "other":
        return "Ask us anything. If it is about a visit, we will point you to the right person.";
      default: {
        const _exhaustive: never = reason;
        return _exhaustive;
      }
    }
  }, [reason]);

  function setReason(next: Reason) {
    const nextParams = new URLSearchParams(params);
    if (next === "other") {
      nextParams.set("reason", "other");
      nextParams.delete("path");
    } else {
      nextParams.set("path", next);
      nextParams.delete("reason");
    }
    setParams(nextParams, { replace: true });
    setSent(false);
    setPicked(null);
    if (next === "other") {
      setNote("");
      window.requestAnimationFrame(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        noteRef.current?.focus();
      });
    }
  }

  function pickQuestion(question: string) {
    setPicked(question);
    setNote(`I’d like to ask: ${question}`);
    window.requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      noteRef.current?.focus();
    });
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

  async function copyEircode() {
    try {
      await navigator.clipboard.writeText(HQ.eircode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <section className="hero-mesh px-5 pb-16 pt-14 text-white sm:pt-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">Contact</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] font-black sm:text-6xl">
            Tell us who you are. We’ll pick up.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/90">
            One tap to call, or a 30-second call-back form. Mon–Fri, 9am–5pm. Calls may be recorded for
            training.
          </p>
          <p className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-white/10 px-4 font-ui text-sm font-semibold">
            <Clock aria-hidden size={16} />
            {open ? "Lines are open now" : "Lines open weekdays 9am–5pm"}
            <span className="font-normal text-white/80">· Ireland time</span>
          </p>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-5" aria-label="Choose how to reach us">
        <div className="overflow-hidden rounded-3xl border border-line bg-paper shadow-md">
          <div className="p-5 sm:p-8">
            <p className="font-ui text-sm font-semibold text-navy">I am</p>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Who is calling">
              {reasons.map((item) => {
                const active = item.id === reason;
                return (
                  <button
                    key={item.id}
                    aria-pressed={active}
                    className={`min-h-11 rounded-full border px-4 font-ui text-sm font-semibold transition-colors ${
                      active
                        ? item.id === "vhi"
                          ? "border-vhi bg-vhi text-white"
                          : "border-navy bg-navy text-white"
                        : "border-line bg-paper text-navy hover:border-navy"
                    }`}
                    type="button"
                    onClick={() => setReason(item.id)}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-muted" aria-live="polite">
              {hint}
            </p>
          </div>

          <div className="grid border-t border-line lg:grid-cols-2">
            <div className="flex flex-col justify-between p-5 sm:p-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">By phone</p>
                <h2 className="mt-2 font-display text-3xl text-navy">Call {phoneLabel}</h2>
                <p className="mt-2 text-sm text-muted">
                  {reason === "vhi" ? "Dedicated Vhi members’ line." : "Main line for HSE, GP and private."}
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <a
                  className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-ui font-semibold text-white transition-colors ${
                    reason === "vhi" ? "bg-vhi hover:bg-vhi/90" : "bg-navy hover:bg-navy-deep"
                  }`}
                  href={`tel:${phone}`}
                >
                  <Phone aria-hidden size={18} weight="fill" /> Call now
                </a>
                {reason !== "other" ? (
                  <Link
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-navy px-6 font-ui font-semibold text-navy hover:bg-sky"
                    to={`/book?path=${reason}`}
                  >
                    Book a visit instead <ArrowRight aria-hidden size={18} />
                  </Link>
                ) : null}
              </div>
            </div>

            <div
              ref={formRef}
              className="scroll-mt-32 border-t border-line bg-sky p-5 sm:p-8 lg:border-l lg:border-t-0"
              id="question-form"
            >
              <h2 className="font-ui text-xl font-semibold text-navy">
                {reason === "other" ? "Ask your question" : "Prefer we call you?"}
              </h2>
              <p className="mt-1 text-sm text-muted">
                {reason === "other"
                  ? "Pick a common question below, or type your own. We reply on a weekday."
                  : "Three fields. We ring back on a weekday."}
              </p>
              {reason === "other" ? (
                <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Common questions">
                  {faqs.map((faq) => {
                    const active = picked === faq.q;
                    return (
                      <button
                        key={faq.q}
                        aria-pressed={active}
                        className={`min-h-11 rounded-full border px-3 text-left font-ui text-xs font-semibold transition-colors ${
                          active ? "border-navy bg-navy text-white" : "border-line bg-paper text-navy hover:border-navy"
                        }`}
                        type="button"
                        onClick={() => pickQuestion(faq.q)}
                      >
                        {faq.q}
                      </button>
                    );
                  })}
                </div>
              ) : null}
              {reason === "other" && picked ? (
                <p className="mt-3 text-sm text-muted" aria-live="polite">
                  {faqs.find((faq) => faq.q === picked)?.a}
                </p>
              ) : null}
              {sent ? (
                <p className="mt-6 rounded-2xl bg-paper p-5 font-ui text-navy" role="status">
                  Thank you. We will call you back on the number you gave, during 9am–5pm.
                </p>
              ) : (
                <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
                  <label className="grid gap-1 text-sm font-semibold text-navy">
                    Full name *
                    <input
                      required
                      autoComplete="name"
                      className="min-h-12 rounded-xl border border-line bg-paper px-4 font-normal"
                      name="name"
                      type="text"
                    />
                  </label>
                  <label className="grid gap-1 text-sm font-semibold text-navy">
                    Phone *
                    <input
                      required
                      autoComplete="tel"
                      className="min-h-12 rounded-xl border border-line bg-paper px-4 font-normal"
                      name="phone"
                      type="tel"
                    />
                  </label>
                  <label className="grid gap-1 text-sm font-semibold text-navy">
                    {reason === "other" ? "Your question *" : "What should we know?"}
                    <textarea
                      ref={noteRef}
                      required={reason === "other"}
                      className="min-h-24 rounded-xl border border-line bg-paper px-4 py-3 font-normal"
                      name="note"
                      rows={3}
                      value={note}
                      onChange={(event) => setNote(event.target.value)}
                    />
                  </label>
                  <button
                    aria-busy={submitting}
                    className={`min-h-12 rounded-full font-ui font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60 ${
                      reason === "vhi" ? "bg-vhi" : "bg-navy"
                    }`}
                    disabled={submitting}
                    type="submit"
                  >
                    {submitting ? "Sending…" : "Request a call back"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16" aria-label="Head office">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div>
            <h2 className="font-display text-3xl text-navy">Head office</h2>
            <p className="mt-3 text-muted">{HQ.address}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-sky px-2 py-1 font-mono text-sm text-navy">{HQ.eircode}</span>
              <button
                className="inline-flex min-h-11 items-center gap-1 rounded-md px-2 font-ui text-sm font-semibold text-navy hover:bg-sky"
                type="button"
                onClick={copyEircode}
              >
                <Copy aria-hidden size={16} />
                {copied ? "Copied" : "Copy Eircode"}
              </button>
            </div>
            <p className="mt-6 flex items-start gap-2 text-sm text-muted">
              <MapPin aria-hidden className="mt-0.5 shrink-0 text-navy" size={18} />
              Appointments are at six clinics across Ireland — not only here.
            </p>
            <Link
              className="mt-4 inline-flex min-h-11 items-center font-ui text-sm font-semibold text-navy underline decoration-cyan decoration-2 underline-offset-4"
              to="/locations"
            >
              Find a clinic
            </Link>
            <p className="mt-8 flex items-center gap-2 text-sm text-muted">
              <EnvelopeSimple aria-hidden className="text-navy" size={18} />
              Prefer email? Call first — we confirm details on the phone.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-md">
            <iframe
              allowFullScreen
              className="aspect-[4/3] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${HQ.lat},${HQ.lng}&z=16&output=embed`}
              title="Map showing AllView Carrickmines head office"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
