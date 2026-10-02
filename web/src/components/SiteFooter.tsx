import { Link } from "react-router-dom";

const groups = [
  {
    title: "Services",
    links: [
      { to: "/book", label: "Book" },
      { to: "/dermatology", label: "Dermatology" },
      { to: "/dermatology/process-vhi", label: "Vhi members" },
      { to: "/dermatology/process", label: "Private price" },
      { to: "/dermatology/gp-referral", label: "GP or HSE" },
    ],
  },
  {
    title: "Explore",
    links: [
      { to: "/dermatology/skin", label: "Skin conditions" },
      { to: "/dermatology/case-studies", label: "Patient stories" },
      { to: "/dermatology/teledermatology", label: "How photos work" },
      { to: "/about-us/news", label: "News & media" },
      { to: "/patient-information", label: "Patient information" },
      { to: "/patient-information-leaflets", label: "Leaflets" },
      { to: "/site-map", label: "All pages" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/contact", label: "Contact" },
      { to: "/locations", label: "Clinics" },
      { to: "/about-us/our-team", label: "Our team" },
      { to: "/about-us/careers", label: "Careers" },
      { to: "/about-us/awards", label: "Awards" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy-policy", label: "Privacy policy" },
      { to: "/terms-conditions", label: "Terms & conditions" },
      { to: "/cookie-policy", label: "Cookie policy" },
      { to: "/governance", label: "Governance" },
      { to: "/feedback-and-complaints", label: "Feedback" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-navy font-ui text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-6">
        <div className="md:col-span-2">
          <img alt="" className="h-8 brightness-0 invert" src="/brand/allview.svg" />
          <p className="mt-3 max-w-xs text-sm text-cyan">
            Ireland’s fastest route to a consultant dermatologist diagnosis.
          </p>
          <div className="mt-4 flex flex-col text-sm">
            <a className="inline-flex min-h-11 items-center self-start text-white hover:text-cyan" href="tel:+35312248111">
              Vhi · 01 224 8111
            </a>
            <a className="inline-flex min-h-11 items-center self-start text-white hover:text-cyan" href="tel:+35312248100">
              Main · 01 224 8100
            </a>
            <p className="mt-2 text-cyan">Mon–Fri, 9am–5pm</p>
          </div>
        </div>
        {groups.map((group) => (
          <nav key={group.title} className="flex flex-col text-sm" aria-label={group.title}>
            <p className="font-semibold text-cyan">{group.title}</p>
            {group.links.map((item) => (
              <Link
                key={item.to}
                className="inline-flex min-h-11 items-center self-start text-white transition-colors hover:text-cyan"
                to={item.to}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ))}
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-white/10 px-5 py-6">
        <p className="text-xs text-white/70">© DermView Limited t/a AllView Healthcare</p>
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
