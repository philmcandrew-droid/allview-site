import { ArrowRight, Camera, FirstAid, MapPin, Phone, Stethoscope } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { DermNextLinks } from "../../components/DermNextLinks";
import { conditions, dermSuggested } from "../../data/dermatology";

const startHere = [
  {
    to: "/dermatology/process-vhi",
    book: "/book?path=vhi",
    title: "I have Vhi",
    body: "About 10 days. Dedicated line. No GP letter.",
    logo: "/brand/vhi.svg",
    logoAlt: "Vhi",
    cta: "Vhi members",
    accent: true,
  },
  {
    to: "/dermatology/gp-referral",
    book: "/book?path=hse",
    title: "My GP or hospital referred me",
    body: "Public pathway. Nothing to pay once we have the letter.",
    logo: "/brand/hse.svg",
    logoAlt: "HSE",
    cta: "GP or HSE",
    accent: false,
  },
  {
    to: "/dermatology/process",
    book: "/book?path=private",
    title: "I’m paying myself",
    body: "€309 all-in. Usually within 4 weeks. Self-referral is fine.",
    logo: null,
    logoAlt: "",
    cta: "Private price",
    accent: false,
  },
] as const;

const visit = [
  { icon: Phone, title: "We call you", body: "You tell us who you are. We book the nearest clinic." },
  { icon: Camera, title: "Nurse photos", body: "A registered nurse photographs the area in clinic." },
  { icon: Stethoscope, title: "Consultant", body: "An Irish consultant dermatologist makes the diagnosis." },
  { icon: FirstAid, title: "Your result", body: "A plan, a prescription, or a next step — and your GP if you want." },
];

export function DermHubPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <section className="hero-mesh px-5 pb-16 pt-14 text-white sm:pt-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">Dermatology</p>
          <h1 className="mt-4 max-w-3xl font-ui text-4xl leading-[1.05] font-semibold sm:text-6xl">
            See a skin consultant in days — not on a hospital list.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/90">
            You meet a nurse. A consultant dermatologist diagnoses the photos. Used by Vhi members and HSE
            hospitals. Most visits are for people aged 16 and over. Vhi members can be seen from 14.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 font-ui font-semibold text-navy hover:bg-sky"
              to="/book"
            >
              Book a visit <ArrowRight aria-hidden size={18} />
            </Link>
            <Link
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/40 px-6 font-ui font-semibold text-white hover:bg-white/10"
              to="/process"
            >
              See what happens
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14" aria-labelledby="start-heading">
        <h2 id="start-heading" className="font-ui text-3xl font-semibold text-navy">
          Start here — how are you covered?
        </h2>
        <p className="mt-2 max-w-2xl text-muted">
          Pick the path that matches you. Every page after this will point you to the right phone number and wait.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {startHere.map((item) => (
            <article
              key={item.to}
              className={`tile flex flex-col ${item.accent ? "border-2 border-vhi" : ""}`}
            >
              <div className="flex h-10 items-center">
                {item.logo ? (
                  <img alt={item.logoAlt} className="h-8 w-auto" src={item.logo} />
                ) : (
                  <span className="rounded-full bg-sky px-3 py-1 font-mono text-xs uppercase tracking-widest text-navy">
                    Private
                  </span>
                )}
              </div>
              <h3 className="mt-4 font-ui text-xl font-semibold text-navy">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{item.body}</p>
              <div className="mt-5 flex flex-col gap-2">
                <Link
                  className={`inline-flex min-h-12 items-center justify-center rounded-full font-ui text-sm font-semibold text-white ${
                    item.accent ? "bg-vhi" : "bg-navy hover:bg-navy-deep"
                  }`}
                  to={item.book}
                >
                  Book this path
                </Link>
                <Link
                  className="inline-flex min-h-11 items-center justify-center font-ui text-sm font-semibold text-navy underline decoration-cyan decoration-2 underline-offset-4"
                  to={item.to}
                >
                  {item.cta} <ArrowRight aria-hidden className="ml-1" size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-paper px-5 py-14" aria-labelledby="treat-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="treat-heading" className="font-ui text-3xl font-semibold text-navy">
            What we look at
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            Tell the nurse which areas worry you — up to three. This is not a full-body check unless the
            consultant asks for one.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {conditions.map((name) => (
              <li key={name}>
                <Link
                  className="inline-flex min-h-11 items-center rounded-full border border-line bg-sky px-4 font-ui text-sm font-semibold text-navy hover:border-navy"
                  to={name === "Moles and lesions" || name === "Possible skin cancer" ? "/dermatology/skin#abcde" : "/dermatology/skin"}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14" aria-labelledby="visit-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="visit-heading" className="font-ui text-3xl font-semibold text-navy">
              What happens at the visit
            </h2>
            <p className="mt-2 max-w-xl text-muted">You meet the nurse on the day. That is how it stays fast.</p>
          </div>
          <Link
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-5 font-ui font-semibold text-white hover:bg-navy-deep"
            to="/process"
          >
            Walk through the steps <ArrowRight aria-hidden size={18} />
          </Link>
        </div>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visit.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="tile">
                <p className="font-mono text-sm text-cyan">{String(index + 1).padStart(2, "0")}</p>
                <Icon aria-hidden className="mt-3 text-navy" size={28} />
                <h3 className="mt-3 font-ui text-lg font-semibold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.body}</p>
              </li>
            );
          })}
        </ol>
        <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted">
          <MapPin aria-hidden size={18} />
          Six clinics —{" "}
          <Link className="font-semibold text-navy underline decoration-cyan decoration-2 underline-offset-4" to="/locations">
            find the nearest
          </Link>
          .
        </p>
      </section>

      <DermNextLinks heading="Useful next links" links={dermSuggested} />
    </main>
  );
}
