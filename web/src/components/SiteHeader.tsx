import { List, Phone } from "@phosphor-icons/react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/process", label: "How it works" },
  { to: "/locations", label: "Clinics" },
  { to: "/contact", label: "Contact" },
  { to: "/about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-paper/95 shadow-sm backdrop-blur">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        href="#main"
      >
        Skip to main content
      </a>
      <div className="flex flex-wrap items-center justify-center gap-x-6 bg-navy px-5 text-sm text-white">
        <a className="inline-flex min-h-11 items-center gap-2 text-white hover:text-cyan" href="tel:+35312248111">
          <Phone size={14} />
          <span>
            Vhi<span className="hidden sm:inline"> members</span> · 01 224 8111
          </span>
        </a>
        <a className="inline-flex min-h-11 items-center gap-2 text-white hover:text-cyan" href="tel:+35312248100">
          <Phone size={14} />
          <span>
            <span className="sm:hidden">Main</span>
            <span className="hidden sm:inline">Everyone else</span> · 01 224 8100
          </span>
        </a>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:gap-4">
        <Link aria-label="AllView Healthcare — home" className="flex min-w-0 items-center" to="/">
          <img alt="" className="h-7 w-auto max-w-full sm:h-10" src="/brand/allview.svg" />
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {links.map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }) =>
                `inline-flex min-h-11 items-center font-ui text-sm font-medium transition-colors ${isActive ? "text-navy underline decoration-cyan decoration-2 underline-offset-8" : "text-muted hover:text-navy"}`
              }
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            className="whitespace-nowrap rounded-full bg-navy px-4 py-2.5 font-ui text-sm font-semibold text-white transition-colors hover:bg-navy-deep sm:px-5"
            to="/book"
          >
            Book now
          </Link>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-navy md:hidden"
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <List size={22} />
          </button>
        </div>
      </div>
      {open ? (
        <div className="flex flex-col gap-3 border-t border-line px-5 py-4 md:hidden">
          {links.map((item) => (
            <NavLink
              key={item.to}
              className="flex min-h-11 items-center font-ui text-base text-navy"
              to={item.to}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      ) : null}
    </header>
  );
}
