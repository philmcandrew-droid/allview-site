import { Link } from "react-router-dom";

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