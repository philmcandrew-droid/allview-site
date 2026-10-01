import { Link } from "react-router-dom";

export function AboutPage() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-4xl text-navy">AllView Healthcare</h1>
      <p className="mt-6 text-lg text-muted">
        Ireland’s rapid teledermatology service: nurse-led imaging, consultant diagnosis, and surgery when
        needed. Formerly DermView.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-8">
        <img alt="Vhi" className="h-10" src="/brand/vhi.svg" />
        <img alt="HSE" className="h-12" src="/brand/hse.svg" />
      </div>
      <p className="mt-6 text-muted">
        Vhi is a key private client — members get a 10-day pathway. The HSE is a key public client — hospitals
        use AllView to take people off dermatology waiting lists. ISO 9001 and ISO 27001 certified.
      </p>
    </main>
  );
}

export function ContactPage() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-4xl text-navy">Contact</h1>
      <p className="mt-4 text-muted">Monday–Friday, 9am–5pm. Calls may be recorded for training.</p>
      <ul className="mt-8 space-y-4 font-ui text-lg">
        <li>
          Vhi members ·{" "}
          <a className="inline-flex min-h-11 items-center font-semibold text-navy underline" href="tel:+35312248111">
            01 224 8111
          </a>
        </li>
        <li>
          HSE, GP and private ·{" "}
          <a className="inline-flex min-h-11 items-center font-semibold text-navy underline" href="tel:+35312248100">
            01 224 8100
          </a>
        </li>
        <li className="text-base text-muted">
          Suite 11–13, The Hyde Buildings, The Park, Carrickmines, Dublin 18, D18 YX22
        </li>
      </ul>
    </main>
  );
}

export function NotFoundPage() {
  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-3xl px-5 py-16 outline-none">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">404</p>
      <h1 className="mt-3 font-display text-4xl text-navy">We can’t find that page</h1>
      <p className="mt-4 text-muted">The link may be old. Choose where you want to go instead.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link className="rounded-full bg-navy px-6 py-3 font-ui font-semibold text-white hover:bg-navy-deep" to="/book">
          Book an appointment
        </Link>
        <Link className="rounded-full border border-line bg-paper px-6 py-3 font-ui font-semibold text-navy hover:border-navy" to="/">
          Go to the home page
        </Link>
      </div>
    </main>
  );
}

export function ProcessPage() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-4xl text-navy">How it works</h1>
      <ol className="mt-8 list-decimal space-y-4 pl-5 text-muted">
        <li>We call you and book the closest clinic.</li>
        <li>A nurse takes clinical photographs — not a phone selfie.</li>
        <li>A consultant dermatologist diagnoses.</li>
        <li>You get the result, and your GP if you want.</li>
      </ol>
      <p className="mt-8 text-navy">Private price €309. Vhi members follow the Vhi process. HSE referrals come via your hospital or GP.</p>
    </main>
  );
}
