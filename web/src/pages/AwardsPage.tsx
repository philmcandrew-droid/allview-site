import { AwardsGallery } from "../components/AwardsGallery";

export function AwardsPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <section className="hero-mesh px-5 pb-16 pt-14 text-white sm:pt-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">About AllView</p>
          <h1 className="mt-4 max-w-3xl font-ui text-4xl leading-[1.05] font-semibold sm:text-5xl">Awards</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/90">
            More clinics, a growing team, and recognition from other healthcare providers for work that saves and
            improves patients’ lives. This is why we exist.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-3xl text-navy">Awards and accolades to date</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Winner, shortlisted and highly commended marks are the ones published on the AllView awards page, shown with
          the original badges and photographs.
        </p>
        <div className="mt-8">
          <AwardsGallery />
        </div>
      </section>
    </main>
  );
}
