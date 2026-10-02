import { Phone } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { AbcdeCheck } from "../../components/AbcdeCheck";
import { DermNextLinks } from "../../components/DermNextLinks";
import { SectionGallery } from "../../components/SectionGallery";
import { dermTopics, type DermSlug } from "../../data/dermatology";
import { topicMedia } from "../../data/section-media";

type TopicSlug = Exclude<DermSlug, "overview" | "stories">;

type DermTopicPageProps = {
  slug: TopicSlug;
};

export function DermTopicPage({ slug }: DermTopicPageProps) {
  const topic = dermTopics[slug];

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <section className="hero-mesh px-5 pb-14 pt-14 text-white sm:pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">{topic.kicker}</p>
          <h1 className="mt-4 max-w-3xl font-ui text-4xl leading-[1.05] font-semibold sm:text-5xl">{topic.title}</h1>
          <p className="mt-5 max-w-xl text-lg text-white/90">{topic.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {topic.bookPath ? (
              <Link
                className={`inline-flex min-h-12 items-center rounded-full px-6 font-ui font-semibold ${
                  topic.bookPath === "vhi" ? "bg-vhi text-white" : "bg-white text-navy hover:bg-sky"
                }`}
                to={`/book?path=${topic.bookPath}`}
              >
                Request a call back
              </Link>
            ) : null}
            {topic.phone ? (
              <a
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/40 px-6 font-ui font-semibold text-white hover:bg-white/10"
                href={topic.phone.href}
              >
                <Phone aria-hidden size={18} weight="fill" /> Call {topic.phone.label}
              </a>
            ) : null}
            {slug === "skin" ? (
              <a
                className="inline-flex min-h-12 items-center rounded-full border border-white/40 px-6 font-ui font-semibold text-white hover:bg-white/10"
                href="#abcde"
              >
                Check a mark — ABCDE
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-5 py-12">
        {topic.sections.map((section) => (
          <section key={section.heading} className="mb-10">
            <h2 className="font-ui text-2xl font-semibold text-navy">{section.heading}</h2>
            {section.body.map((para) => (
              <p key={para} className="mt-3 text-muted">
                {para}
              </p>
            ))}
            {section.list ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        {(topicMedia[slug] ?? []).map((block) => (
          <SectionGallery block={block} key={block.title} />
        ))}

        {slug === "skin" ? (
          <p className="mb-10">
            <a
              className="inline-flex min-h-11 items-center font-ui text-sm font-semibold text-navy underline decoration-cyan decoration-2 underline-offset-4"
              href="#abcde"
            >
              Check a mark with ABCDE
            </a>
          </p>
        ) : null}

        {slug === "gp" ? (
          <p className="rounded-2xl bg-sky p-5 text-sm text-navy">
            GPs: send referrals to{" "}
            <a className="font-semibold underline decoration-cyan decoration-2 underline-offset-4" href="mailto:allview@healthmail.ie">
              allview@healthmail.ie
            </a>
            . Patients: ask your GP to send us — then wait for our call.
          </p>
        ) : null}
      </div>

      {slug === "skin" ? <AbcdeCheck /> : null}

      <DermNextLinks heading="Where to go next" links={topic.next} />
    </main>
  );
}
