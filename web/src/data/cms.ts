import catalog from "./cms-content.json" with { type: "json" };

export type CmsKind = "page" | "post";

export type CmsItem = {
  id: number;
  kind: CmsKind;
  slug: string;
  path: string;
  title: string;
  date: string | null;
  excerpt: string;
  html: string;
  redirect: string | null;
};

type CmsCatalog = {
  source: string;
  items: CmsItem[];
};

const data = catalog as CmsCatalog;

export const cmsSource = data.source;
export const cmsItems: CmsItem[] = data.items;

const byPath = new Map(cmsItems.map((item) => [item.path, item]));

export function normalizePath(pathname: string): string {
  const clean = pathname.split("?")[0].replace(/\/+$/, "");
  return clean || "/";
}

export function findCmsItem(pathname: string): CmsItem | undefined {
  return byPath.get(normalizePath(pathname));
}

export function cmsChildren(path: string): CmsItem[] {
  const prefix = `${normalizePath(path)}/`;
  return cmsItems.filter(
    (item) => item.kind === "page" && item.path.startsWith(prefix) && !item.path.slice(prefix.length).includes("/"),
  );
}

export function cmsPosts(): CmsItem[] {
  return cmsItems
    .filter((item) => item.kind === "post")
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export function formatCmsDate(value: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-IE", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

export const cmsNav = {
  dermatology: [
    { to: "/dermatology/process-vhi", label: "Vhi members" },
    { to: "/dermatology/process", label: "Price & process" },
    { to: "/dermatology/gp-referral", label: "GP or HSE" },
    { to: "/dermatology/surgery", label: "If you need surgery" },
    { to: "/dermatology/skin", label: "Skin conditions" },
    { to: "/dermatology/teledermatology", label: "How photos work" },
    { to: "/dermatology/case-studies", label: "Patient stories" },
  ],
  about: [
    { to: "/about-us/our-team", label: "Our team" },
    { to: "/about-us/careers", label: "Careers" },
    { to: "/about-us/news", label: "News & media" },
    { to: "/about-us/technology", label: "Use our technology" },
    { to: "/about-us/awards", label: "Awards" },
    { to: "/about-us/impact", label: "Impact" },
    { to: "/the-economic-aspects-of-teledermatology", label: "Economic aspects" },
  ],
};
