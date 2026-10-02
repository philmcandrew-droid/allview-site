import { ArrowRight } from "@phosphor-icons/react";
import { useMemo, type MouseEvent } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AfterScan } from "../components/AfterScan";
import { SectionGallery } from "../components/SectionGallery";
import { cmsChildren, cmsPosts, findCmsItem, formatCmsDate } from "../data/cms";
import { sectionMedia } from "../data/section-media";
import { NotFoundPage } from "./InfoPages";

function isArchive(path: string, html: string): boolean {
  return path === "/about-us/news" || (path === "/dermatology/case-studies" && html.length < 80);
}

export function CmsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = findCmsItem(location.pathname);
  const children = useMemo(() => (item ? cmsChildren(item.path) : []), [item]);
  const posts = useMemo(() => cmsPosts(), []);

  if (!item) return <NotFoundPage />;
  if (item.redirect) return <Navigate replace to={item.redirect} />;

  const archive = isArchive(item.path, item.html);
  const showPosts = archive || item.path === "/about-us/news";
  const visiblePosts =
    item.path === "/dermatology/case-studies"
      ? posts.filter((post) => /referral|dublin|celbridge|kilkenny|carmel|deirdre|pat |neil|grace|patient/i.test(post.title))
      : posts;

  function onContentClick(event: MouseEvent<HTMLDivElement>) {
    const link = (event.target as HTMLElement).closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) {
      return;
    }
    event.preventDefault();
    navigate(href);
  }

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <section className="hero-mesh px-5 pb-12 pt-14 text-white sm:pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">
            {item.kind === "post" ? "News" : "AllView"}
          </p>
          <h1 className="mt-4 max-w-4xl font-ui text-4xl leading-[1.05] font-semibold sm:text-5xl">{item.title}</h1>
          {item.kind === "post" && item.date ? (
            <p className="mt-4 text-white/80">{formatCmsDate(item.date)}</p>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-12">
        {item.path === "/about-us/impact" ? (
          <div className="mb-12">
            <AfterScan />
          </div>
        ) : null}

        {item.html && item.path === "/about-us/impact" ? (
          <details className="mt-4 rounded-2xl border border-line bg-paper p-5">
            <summary className="flex min-h-12 cursor-pointer items-center font-ui text-sm font-semibold text-navy">
              Read the hospital figures in full
            </summary>
            <div className="cms-prose mt-4" onClick={onContentClick} dangerouslySetInnerHTML={{ __html: item.html }} />
          </details>
        ) : item.html ? (
          <div className="cms-prose" onClick={onContentClick} dangerouslySetInnerHTML={{ __html: item.html }} />
        ) : null}

        {(sectionMedia[item.path] ?? []).map((block) => (
          <SectionGallery block={block} key={block.title} />
        ))}

        {children.length > 0 ? (
          <nav className="mt-10 grid gap-3" aria-label="Related pages">
            {children.map((child) => (
              <Link
                key={child.path}
                className="tile flex min-h-12 items-center justify-between gap-3 font-ui font-semibold text-navy hover:border-navy"
                to={child.path}
              >
                {child.title}
                <ArrowRight aria-hidden size={18} />
              </Link>
            ))}
          </nav>
        ) : null}

        {showPosts ? (
          <ul className="mt-10 space-y-4">
            {visiblePosts.map((post) => (
              <li key={post.id}>
                <Link className="tile block hover:border-navy" to={post.path}>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted">{formatCmsDate(post.date)}</p>
                  <h2 className="mt-2 font-ui text-xl font-semibold text-navy">{post.title}</h2>
                  {post.excerpt ? (
                    <div className="cms-prose mt-2 text-sm text-muted" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        <p className="mt-12">
          <Link
            className="inline-flex min-h-11 items-center font-ui text-sm font-semibold text-navy underline decoration-cyan decoration-2 underline-offset-4"
            to="/site-map"
          >
            See all pages from allview.ie
          </Link>
        </p>
      </section>
    </main>
  );
}
