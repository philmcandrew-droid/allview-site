import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { DermNextLinks } from "../../components/DermNextLinks";
import { dermStories } from "../../data/dermatology";

export function DermStoriesPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <section className="hero-mesh px-5 pb-14 pt-14 text-white sm:pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">Patient stories</p>
          <h1 className="mt-4 max-w-3xl font-ui text-4xl leading-[1.05] font-semibold sm:text-5xl">
            People who did not stay on a waiting list.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/90">
            These are real AllView patients. We follow up after treatment and ask if they want to share what
            happened.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12" aria-labelledby="stories-heading">
        <h2 id="stories-heading" className="sr-only">
          Stories
        </h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {dermStories.map((story) => (
            <li key={story.to}>
              <Link className="tile flex h-full flex-col justify-between hover:border-navy" to={story.to}>
                <span>
                  <h3 className="font-ui text-xl font-semibold text-navy">{story.name}</h3>
                  <p className="mt-2 text-muted">{story.about}</p>
                </span>
                <span className="mt-5 inline-flex items-center gap-1 font-ui text-sm font-semibold text-navy">
                  Read their story <ArrowRight aria-hidden size={16} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <DermNextLinks
        heading="If a story sounds like you"
        links={[
          { to: "/book", label: "Book a visit", hint: "Vhi, HSE or private." },
          { to: "/process", label: "See the visit", hint: "What the day looks like." },
          { to: "/dermatology/skin", label: "Check a mark", hint: "New, changing or unusual." },
        ]}
      />
    </main>
  );
}
