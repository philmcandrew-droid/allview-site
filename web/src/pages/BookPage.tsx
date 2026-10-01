import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";

type Path = "vhi" | "hse" | "private";

const copy: Record<Path, { title: string; hint: string; phone: string }> = {
  vhi: {
    title: "Book as a Vhi member",
    hint: "We’ll use the Vhi line and aim for about 10 days.",
    phone: "+35312248111",
  },
  hse: {
    title: "HSE or GP referral",
    hint: "Have your GP or hospital letter ready if you have one. We’ll call to place you.",
    phone: "+35312248100",
  },
  private: {
    title: "Book privately — €309",
    hint: "One price: nurse scan, consultant diagnosis, follow-up if needed.",
    phone: "+35312248100",
  },
};

function parsePath(raw: string | null): Path {
  if (raw === "vhi" || raw === "hse" || raw === "private") return raw;
  return "private";
}

export function BookPage() {
  const [params, setParams] = useSearchParams();
  const path = useMemo(() => parsePath(params.get("path")), [params]);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const info = copy[path];

  function setPath(next: Path) {
    setParams({ path: next });
    setSent(false);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    // No backend yet: resolve on the next tick so the disabled state is visible and double-submits are blocked.
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 400);
  }

  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-xl px-5 py-12 outline-none">
      <h1 className="font-display text-4xl text-navy">{info.title}</h1>
      <p className="mt-3 text-muted">{info.hint}</p>
      <p className="mt-2 text-sm">
        Prefer to talk?{" "}
        <a className="inline-flex min-h-11 items-center font-semibold text-navy underline" href={`tel:${info.phone}`}>
          Call us now
        </a>
      </p>

      <fieldset className="mt-8">
        <legend className="text-sm font-semibold text-navy">I am</legend>
        <div className="mt-2 grid gap-2">
          {(
            [
              ["vhi", "A Vhi member"],
              ["hse", "HSE / GP referred"],
              ["private", "Paying privately"],
            ] as const
          ).map(([id, label]) => (
            <label
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 ${path === id ? "border-navy bg-sky" : "border-line bg-paper"}`}
              key={id}
            >
              <input
                checked={path === id}
                name="path"
                type="radio"
                value={id}
                onChange={() => setPath(id)}
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      {sent ? (
        <p className="mt-8 rounded-2xl border border-line bg-paper p-6" role="status">
          Thank you. We’ll call you on a clinic day (Mon–Fri, 9–5) using the{" "}
          {path === "vhi" ? "Vhi" : "main"} number if we can’t reach you first.
        </p>
      ) : (
        <form className="mt-8 flex flex-col gap-4" onSubmit={onSubmit}>
          <label className="flex flex-col gap-1 text-sm">
            Full name *
            <input
              className="rounded-xl border border-line bg-paper px-4 py-3 text-base"
              name="name"
              autoComplete="name"
              required
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Phone *
            <input
              className="rounded-xl border border-line bg-paper px-4 py-3 text-base"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Email *
            <input
              className="rounded-xl border border-line bg-paper px-4 py-3 text-base"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </label>
          {path === "hse" ? (
            <label className="flex flex-col gap-1 text-sm">
              Referring GP or hospital (optional)
              <input className="rounded-xl border border-line bg-paper px-4 py-3 text-base" name="referrer" />
            </label>
          ) : null}
          <button
            aria-busy={submitting}
            className={`mt-2 min-h-12 rounded-full px-6 py-3 font-ui font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60 ${path === "vhi" ? "bg-vhi" : "bg-navy"}`}
            disabled={submitting}
            type="submit"
          >
            {submitting ? "Sending…" : "Request a call back"}
          </button>
        </form>
      )}
    </main>
  );
}
