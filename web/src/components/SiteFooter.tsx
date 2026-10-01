import { Link } from "react-router-dom";

const footerLinks = [
  { to: "/book", label: "Book" },
  { to: "/locations", label: "Clinics" },
  { to: "/process", label: "How it works" },
  { to: "/contact", label: "Contact" },
  { to: "/about", label: "About" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-4">
        <div>
          <img alt="" className="h-8 brightness-0 invert" src="/brand/allview.svg" />
          <p className="mt-3 max-w-xs text-sm text-cyan">
            Ireland’s fastest route to a consultant dermatologist diagnosis.
          </p>
        </div>
        <nav className="flex flex-col text-sm" aria-label="Footer">
          {footerLinks.map((item) => (
            <Link
              key={item.to}
              className="inline-flex min-h-11 items-center self-start text-white transition-colors hover:text-cyan"
              to={item.to}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col text-sm">
          <a className="inline-flex min-h-11 items-center self-start text-white hover:text-cyan" href="tel:+35312248111">
            Vhi · 01 224 8111
          </a>
          <a className="inline-flex min-h-11 items-center self-start text-white hover:text-cyan" href="tel:+35312248100">
            Main · 01 224 8100
          </a>
          <p className="mt-2 text-cyan">Mon–Fri, 9am–5pm</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="rounded-lg bg-white px-3 py-2">
            <img alt="Vhi" className="h-7 w-auto" loading="lazy" src="/brand/vhi.svg" />
          </div>
          <div className="rounded-lg bg-white px-3 py-2">
            <img alt="HSE" className="h-8 w-auto" loading="lazy" src="/brand/hse.svg" />
          </div>
        </div>
      </div>
    </footer>
  );
}
