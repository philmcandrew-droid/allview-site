import { Link } from "react-router-dom";
import { cmsItems, cmsSource } from "../data/cms";

export function SiteMapPage() {
  const pages = cmsItems.filter((item) => item.kind === "page");
  const posts = cmsItems.filter((item) => item.kind === "post");

  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-6xl px-5 py-16 outline-none">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">Imported from {cmsSource}</p>
      <h1 className="mt-3 font-ui text-4xl font-semibold text-navy">All AllView pages</h1>
      <p className="mt-3 max-w-2xl text-muted">
        {pages.length} public pages and {posts.length} news and information articles from allview.ie. Login and
        restricted admin screens are not included.
      </p>

      <h2 className="mt-12 font-ui text-2xl font-semibold text-navy">Pages</h2>
      <ul className="mt-4 columns-1 gap-x-8 sm:columns-2">
        {pages.map((item) => (
          <li key={item.path} className="break-inside-avoid py-1">
            <Link className="font-ui text-sm font-semibold text-navy underline decoration-cyan decoration-2 underline-offset-4" to={item.redirect ?? item.path}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 font-ui text-2xl font-semibold text-navy">News and articles</h2>
      <ul className="mt-4 columns-1 gap-x-8 sm:columns-2">
        {posts.map((item) => (
          <li key={item.path} className="break-inside-avoid py-1">
            <Link className="font-ui text-sm text-navy underline decoration-line underline-offset-4 hover:decoration-cyan" to={item.path}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
