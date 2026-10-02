import { ArrowRight, FirstAid, Handshake, ShieldCheck, Timer } from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { chapters, type ChapterId } from "../data/about";
import { AfterScan } from "../components/AfterScan";
import { AwardsGallery } from "../components/AwardsGallery";

const chapterIcons = {
  wait: Timer,
  method: FirstAid,
  partners: Handshake,
  proof: ShieldCheck,
} as const satisfies Record<ChapterId, typeof Timer>;

export function AboutPage() {
  const [chapterId, setChapterId] = useState<ChapterId>("wait");
  const chapter = chapters.find((item) => item.id === chapterId) ?? chapters[0];
  const ChapterIcon = chapterIcons[chapter.id];

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <section className="hero-mesh px-5 pb-16 pt-14 text-white sm:pt-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">About AllView</p>
          <h1 className="mt-4 max-w-3xl font-ui text-4xl leading-[1.05] font-semibold sm:text-6xl">
            Ireland’s fastest route to a consultant dermatologist.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/90">
            We take people off hospital waiting lists. A nurse images your skin; an Irish consultant diagnoses
            it. Used by Vhi members and HSE hospitals. Formerly DermView.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 font-ui font-semibold text-navy hover:bg-sky"
              to="/process"
            >
              See how it works <ArrowRight aria-hidden size={18} />
            </Link>
            <Link
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/40 px-6 font-ui font-semibold text-white hover:bg-white/10"
              to="/book"
            >
              Book a visit
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-5" aria-labelledby="story-heading">
        <div className="overflow-hidden rounded-3xl border border-line bg-paper shadow-md">
          <div className="scrollbar-hide flex gap-1 overflow-x-auto border-b border-line p-2" role="tablist" aria-label="About AllView">
            {chapters.map((item) => {
              const Icon = chapterIcons[item.id];
              const active = item.id === chapterId;
              return (
                <button
                  key={item.id}
                  aria-controls={`chapter-${item.id}`}
                  aria-selected={active}
                  className={`inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full px-4 font-ui text-sm font-semibold transition-colors ${
                    active ? "bg-navy text-white" : "text-navy hover:bg-sky"
                  }`}
                  id={`tab-${item.id}`}
                  role="tab"
                  type="button"
                  onClick={() => setChapterId(item.id)}
                >
                  <Icon aria-hidden size={18} weight={active ? "fill" : "regular"} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div
            aria-labelledby={`tab-${chapter.id}`}
            className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
            id={`chapter-${chapter.id}`}
            role="tabpanel"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{chapter.kicker}</p>
              <h2 id="story-heading" className="mt-2 font-display text-3xl text-navy sm:text-4xl">
                {chapter.title}
              </h2>
              <p className="mt-4 text-muted">{chapter.body}</p>
            </div>
            <ul className="space-y-3">
              {chapter.points.map((point) => (
                <li key={point} className="flex gap-3 rounded-2xl bg-sky p-4">
                  <ChapterIcon aria-hidden className="mt-0.5 shrink-0 text-navy" size={22} weight="fill" />
                  <span className="font-ui text-sm font-semibold text-navy">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-16">
        <AfterScan />
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16" aria-label="Key clients">
        <p className="font-ui text-sm font-semibold text-muted">Key clients</p>
        <h2 className="mt-2 font-display text-3xl text-navy">Who we work for</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Link className="tile block border-2 border-vhi shadow-md transition-shadow hover:shadow-lg" to="/book?path=vhi">
            <img alt="Vhi" className="h-8 w-auto" src="/brand/vhi.svg" />
            <h3 className="mt-4 font-ui text-xl font-semibold text-navy">Vhi members</h3>
            <p className="mt-2 text-sm text-muted">
              A dedicated line and a typical wait of about 10 days. Claim under your Consultant benefit.
            </p>
            <p className="mt-4 inline-flex items-center gap-1 font-ui text-sm font-semibold text-vhi">
              Book as a Vhi member <ArrowRight aria-hidden />
            </p>
          </Link>
          <Link className="tile block shadow-md transition-shadow hover:shadow-lg" to="/book?path=hse">
            <img alt="HSE" className="h-10 w-auto" src="/brand/hse.svg" />
            <h3 className="mt-3 font-ui text-xl font-semibold text-navy">HSE hospitals</h3>
            <p className="mt-2 text-sm text-muted">
              Approved on the HSE Framework and NTPF panel. Hospitals send patients to us so they leave the
              public list.
            </p>
            <p className="mt-4 inline-flex items-center gap-1 font-ui text-sm font-semibold text-navy">
              Continue with a referral <ArrowRight aria-hidden />
            </p>
          </Link>
        </div>
      </section>

      <section className="bg-paper px-5 py-16" aria-labelledby="awards-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="awards-heading" className="font-display text-3xl text-navy">
            Awards and accolades
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Recognised with the hospitals we work with — Beaumont, St James’s and others. These are the awards
            published on AllView’s awards page.
          </p>
          <div className="mt-8">
            <AwardsGallery />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16" aria-label="Standards">
        <div className="grid gap-4 md:grid-cols-3">
          <article className="tile">
            <div className="flex items-center gap-3">
              <img alt="ISO 9001" className="h-16 w-16 object-contain" src="/media/iso-9001.jpg" />
              <img alt="ISO 27001" className="h-16 w-16 object-contain" src="/media/iso-27001.jpg" />
            </div>
            <h2 className="mt-3 font-ui text-lg font-semibold text-navy">ISO 9001 &amp; 27001</h2>
            <p className="mt-2 text-sm text-muted">Quality management and information security, independently certified.</p>
          </article>
          <article className="tile">
            <img alt="CHKS accreditation" className="h-16 w-auto object-contain" src="/media/chks.webp" />
            <h2 className="mt-3 font-ui text-lg font-semibold text-navy">Clinical governance</h2>
            <p className="mt-2 text-sm text-muted">
              MDT meetings, audits and risk reviews report to the Clinician Governance and Safety Committee.
            </p>
          </article>
          <article className="tile">
            <img alt="DermView" className="h-10 w-auto" src="/media/DermView-Logo.svg" />
            <h2 className="mt-3 font-ui text-lg font-semibold text-navy">DermView Limited</h2>
            <p className="mt-2 text-sm text-muted">Trading as AllView Healthcare. Head office in Carrickmines, Dublin 18.</p>
          </article>
        </div>
      </section>

      <section className="px-5 pb-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 rounded-3xl bg-navy p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">Next</p>
            <h2 className="mt-2 font-display text-3xl">Meet us as a patient, not a brochure.</h2>
            <p className="mt-2 text-white/80">See the five steps, or request a call back now.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 font-ui font-semibold text-navy hover:bg-sky"
              to="/process"
            >
              How it works <ArrowRight aria-hidden size={18} />
            </Link>
            <Link
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/40 px-6 font-ui font-semibold text-white hover:bg-white/10"
              to="/contact"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
