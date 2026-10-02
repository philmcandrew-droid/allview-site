import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import type { DermLink } from "../data/dermatology";

type DermNextLinksProps = {
  heading: string;
  links: DermLink[];
};

export function DermNextLinks({ heading, links }: DermNextLinksProps) {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16" aria-labelledby="derm-next">
      <h2 id="derm-next" className="font-ui text-2xl font-semibold text-navy">
        {heading}
      </h2>
      <ul className="mt-5 grid gap-3 md:grid-cols-3">
        {links.map((link) => (
          <li key={link.to}>
            <Link className="tile flex h-full min-h-12 flex-col justify-between hover:border-navy" to={link.to}>
              <span>
                <span className="font-ui text-lg font-semibold text-navy">{link.label}</span>
                <span className="mt-1 block text-sm text-muted">{link.hint}</span>
              </span>
              <span className="mt-4 inline-flex items-center gap-1 font-ui text-sm font-semibold text-navy">
                Continue <ArrowRight aria-hidden size={16} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
