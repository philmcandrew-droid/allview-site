import { ArrowRight, Check, Quotes } from "@phosphor-icons/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { PatientsTreated } from "../components/PatientsTreated";
import { dermStories } from "../data/dermatology";
import { feeIncludes, memberships, packageIncludes, testimonials } from "../data/home-facts";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = [
  { n: "1", title: "We call you", body: "Tell us your details. We book the nearest clinic.", icon: "/media/Schedule-Appointment-Icon.svg" },
  { n: "2", title: "Nurse scan", body: "A registered nurse photographs the area in clinic.", icon: "/media/Telederm-Scan-Icon.svg" },
  { n: "3", title: "Consultant", body: "An Irish consultant dermatologist makes the diagnosis.", icon: "/media/Prescription-Icon-1.svg" },
  { n: "4", title: "Your result", body: "You and your GP get the plan, prescription, or next step.", icon: "/media/Raport-Icon.svg" },
];

export function HomePage() {
  const pinRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !pinRef.current) return;
      gsap.from(pinRef.current.querySelectorAll(".step-card"), {
        opacity: 0,
        y: 20,
        duration: 0.45,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: pinRef.current, start: "top 80%" },
      });
    },
    { scope: pinRef },
  );

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <section className="hero-mesh px-5 pb-28 pt-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">AllView Healthcare</p>
          <h1 className="mt-4 max-w-4xl font-ui text-4xl leading-[1.05] font-semibold sm:text-6xl">
            See a consultant in days — not months.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/90">
            Nurse-led skin imaging, then a consultant dermatologist diagnosis. Used by Vhi members and HSE
            hospitals across Ireland.
          </p>
          <p className="mt-10 font-ui text-sm font-semibold text-cyan">Start here — who is this visit for?</p>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-14 max-w-6xl px-5" aria-label="Choose how you are covered">
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            className="tile block border-2 border-vhi shadow-md transition-shadow hover:shadow-lg"
            to="/book?path=vhi"
          >
            <div className="flex h-10 items-center">
              <img alt="Vhi" className="h-8 w-auto" src="/brand/vhi.svg" />
            </div>
            <h2 className="mt-3 font-ui text-xl font-semibold text-navy">I have Vhi</h2>
            <p className="mt-2 text-sm text-muted">Appointments in about 10 days. Dedicated line 01 224 8111.</p>
            <p className="mt-4 inline-flex items-center gap-1 font-ui text-sm font-semibold text-vhi">
              Book as a Vhi member <ArrowRight />
            </p>
          </Link>
          <Link className="tile block shadow-md transition-shadow hover:shadow-lg" to="/book?path=hse">
            <div className="flex h-10 items-center">
              <img alt="HSE" className="h-10 w-auto" src="/brand/hse.svg" />
            </div>
            <h2 className="mt-3 font-ui text-xl font-semibold text-navy">HSE / GP referred</h2>
            <p className="mt-2 text-sm text-muted">
              Public and hospital pathways. Your GP or HSE hospital sends you — we cut the wait.
            </p>
            <p className="mt-4 inline-flex items-center gap-1 font-ui text-sm font-semibold text-navy">
              Continue with a referral <ArrowRight />
            </p>
          </Link>
          <Link className="tile block shadow-md transition-shadow hover:shadow-lg" to="/book?path=private">
            <div className="flex h-10 items-center">
              <span className="rounded-full bg-sky px-3 py-1 font-mono text-xs uppercase tracking-widest text-navy">
                Private
              </span>
            </div>
            <h2 className="mt-3 font-ui text-xl font-semibold text-navy">I’m paying myself</h2>
            <p className="mt-2 text-sm text-muted">€309 all-in. Usually within 4 weeks. Receipt for insurance or Revenue.</p>
            <p className="mt-4 inline-flex items-center gap-1 font-ui text-sm font-semibold text-navy">
              Book privately <ArrowRight />
            </p>
          </Link>
        </div>
      </section>

      <PatientsTreated />

      <section className="mx-auto max-w-6xl px-5 py-16" aria-label="Trusted by">
        <p className="font-ui text-sm font-semibold text-muted">Key clients</p>
        <div className="mt-4 flex flex-wrap items-center gap-10 rounded-2xl bg-paper px-8 py-6">
          <img alt="Vhi — key client" className="h-10 w-auto" loading="lazy" src="/brand/vhi.svg" />
          <img alt="HSE — key client" className="h-12 w-auto" loading="lazy" src="/brand/hse.svg" />
          <p className="max-w-md text-sm text-muted">
            Vhi members use AllView as a covered dermatology route. HSE hospitals use us to take patients off
            public waiting lists.
          </p>
        </div>
      </section>

      <section className="bg-paper px-5 py-16" aria-labelledby="price-heading">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">Be smart. Diagnose.</p>
          <h2 className="mt-2 font-display text-4xl text-navy" id="price-heading">
            Our price: €309
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            A medical service for a rapid, accurate diagnosis from a consultant dermatologist in Ireland.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <article className="tile">
              <h3 className="font-ui text-lg font-semibold text-navy">The €309 fee includes</h3>
              <ul className="mt-4 space-y-3">
                {feeIncludes.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-navy">
                    <Check aria-hidden className="mt-0.5 shrink-0 text-cyan" size={18} weight="bold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                className="mt-6 inline-flex min-h-11 items-center font-ui text-sm font-semibold text-navy underline decoration-cyan decoration-2 underline-offset-4"
                to="/book?path=private"
              >
                Book privately
              </Link>
            </article>
            <article className="tile">
              <h3 className="font-ui text-lg font-semibold text-navy">The dermatology package includes</h3>
              <ul className="mt-4 space-y-3">
                {packageIncludes.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-navy">
                    <Check aria-hidden className="mt-0.5 shrink-0 text-cyan" size={18} weight="bold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                className="mt-6 inline-flex min-h-11 items-center font-ui text-sm font-semibold text-vhi underline decoration-cyan decoration-2 underline-offset-4"
                to="/dermatology/process-vhi"
              >
                Vhi members: see the process
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-sky px-5 py-16" id="process" ref={pinRef}>
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl text-navy">Four simple steps</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {steps.map((step) => (
              <article className="step-card tile" key={step.n}>
                <img alt="" className="h-12 w-12" src={step.icon} />
                <p className="mt-3 font-mono text-cyan">{step.n}</p>
                <h3 className="mt-3 font-ui text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm text-muted">
            Results may include a prescription and a further plan, such as a face-to-face appointment with the
            consultant, or surgery.
          </p>
          <Link
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-6 font-ui font-semibold text-white transition-colors hover:bg-navy-deep"
            to="/process"
          >
            See how it works in detail <ArrowRight aria-hidden size={18} />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16" aria-labelledby="membership-heading">
        <h2 className="font-display text-4xl text-navy" id="membership-heading">
          Our consultants and doctors are members of
        </h2>
        <ul className="mt-8 grid grid-cols-2 items-center gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {memberships.map((body) => (
            <li key={body.name} className="flex h-28 items-center justify-center rounded-2xl bg-paper px-4">
              <img alt={body.name} className="max-h-16 w-auto max-w-full" loading="lazy" src={body.src} />
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-paper px-5 py-16" aria-labelledby="stories-heading">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl text-navy" id="stories-heading">
            Patients’ stories
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {dermStories.slice(0, 3).map((story) => (
              <li key={story.to}>
                <Link className="tile block h-full transition-shadow hover:shadow-md" to={story.to}>
                  <h3 className="font-ui text-lg font-semibold text-navy">{story.name}</h3>
                  <p className="mt-2 text-sm text-muted">{story.about}</p>
                  <p className="mt-4 inline-flex items-center gap-1 font-ui text-sm font-semibold text-navy">
                    Read more <ArrowRight aria-hidden size={16} />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            className="mt-6 inline-flex min-h-11 items-center font-ui text-sm font-semibold text-navy underline decoration-cyan decoration-2 underline-offset-4"
            to="/dermatology/case-studies"
          >
            See more stories
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16" aria-labelledby="quotes-heading">
        <h2 className="font-display text-4xl text-navy" id="quotes-heading">
          Patients’ testimonials
        </h2>
        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          {testimonials.map((item) => (
            <li key={item.name} className="tile">
              <Quotes aria-hidden className="text-cyan" size={28} weight="fill" />
              <blockquote className="mt-3 text-sm text-navy">{item.quote}</blockquote>
              <p className="mt-4 font-ui text-sm font-semibold text-navy">{item.name}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
