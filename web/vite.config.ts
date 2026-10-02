import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const pagesBase = process.env.VITE_PAGES_BASE ?? "/";

/** Root-absolute public files stay `/media/...` in dev and gain the Pages prefix in the published build. */
function rewritePublicAssetPaths(base: string): Plugin {
  const prefix = base.endsWith("/") ? base : `${base}/`;
  const roots = ["/media/", "/brand/", "/clinics/"];
  return {
    name: "rewrite-public-asset-paths",
    transform(code, id) {
      if (prefix === "/" || !/\.(tsx?|css|json)$/.test(id)) return null;
      let next = code;
      for (const root of roots) {
        const target = `${prefix}${root.slice(1)}`;
        next = next.replaceAll(`"${root}`, `"${target}`);
        next = next.replaceAll(`'${root}`, `'${target}`);
        next = next.replaceAll(`\`${root}`, `\`${target}`);
      }
      return next === code ? null : next;
    },
  };
}

export default defineConfig({
  base: pagesBase,
  plugins: [react(), tailwindcss(), rewritePublicAssetPaths(pagesBase)],
  server: { port: 5173, host: "127.0.0.1" },
});
