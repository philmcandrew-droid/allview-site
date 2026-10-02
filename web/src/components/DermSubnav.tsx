import { NavLink, useLocation } from "react-router-dom";
import { dermNav } from "../data/dermatology";

export function DermSubnav() {
  const location = useLocation();

  return (
    <nav
      aria-label="Dermatology section"
      className="border-b border-line bg-paper"
    >
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-3 scrollbar-hide">
        {dermNav.map((item) => {
          const current =
            item.to === "/dermatology"
              ? location.pathname === "/dermatology"
              : location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
          return (
            <NavLink
              key={item.to}
              end={item.to === "/dermatology"}
              aria-current={current ? "page" : undefined}
              className={`inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 font-ui text-sm font-semibold transition-colors ${
                current ? "border-navy bg-navy text-white" : "border-line bg-sky text-navy hover:border-navy"
              }`}
              to={item.to}
            >
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
