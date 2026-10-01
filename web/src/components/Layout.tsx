import Lenis from "lenis";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function Layout() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({ autoRaf: true });
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-sky">
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  );
}
