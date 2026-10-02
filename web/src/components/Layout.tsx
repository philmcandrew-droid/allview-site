import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

function headerOffset(): number {
  const header = document.querySelector("header");
  return header instanceof HTMLElement ? header.offsetHeight : 0;
}

function jump(lenis: Lenis | null, y: number) {
  const top = Math.max(0, y);
  window.scrollTo(0, top);
  lenis?.scrollTo(top, { immediate: true });
}

function jumpToHash(lenis: Lenis | null, hash: string) {
  if (hash.length > 1) {
    const el = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (el) {
      const y = window.scrollY + el.getBoundingClientRect().top - headerOffset();
      jump(lenis, y);
      return;
    }
  }
  jump(lenis, 0);
}

export function Layout() {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({ autoRaf: true });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      jumpToHash(lenisRef.current, location.hash);
    });
    return () => cancelAnimationFrame(frame);
  }, [location.hash, location.key, location.pathname, location.search]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest("a") : null;
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const samePage = url.pathname === window.location.pathname && url.search === window.location.search;
      if (!samePage) return;
      const next = `${url.pathname}${url.search}${url.hash}`;
      const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (url.hash.length < 2) {
        event.preventDefault();
        if (next !== current) window.history.pushState(null, "", next);
        jump(lenisRef.current, 0);
        return;
      }
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;
      event.preventDefault();
      if (next !== current) window.history.pushState(null, "", next);
      jumpToHash(lenisRef.current, url.hash);
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <div className="min-h-screen bg-sky">
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  );
}
