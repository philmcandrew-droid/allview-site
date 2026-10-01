// Smoke test for the built site: serves dist/ with `vite preview`, then checks
// every route returns 200, serves the SPA shell, and that brand assets exist.
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const PORT = 4173;
const BASE = `http://127.0.0.1:${PORT}`;
const ROUTES = ["/", "/book", "/book?path=vhi", "/locations", "/locations?city=cork&clinic=cork", "/about", "/contact", "/process", "/does-not-exist"];
const ASSETS = ["/brand/allview.svg", "/brand/vhi.svg", "/brand/hse.svg"];

if (!existsSync(path.join(root, "dist", "index.html"))) {
  console.error("dist/index.html missing — run `npm run build` first.");
  process.exit(2);
}

const preview = spawn(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["vite", "preview", "--port", String(PORT), "--host", "127.0.0.1", "--strictPort"],
  { cwd: root, stdio: "ignore", shell: process.platform === "win32" },
);

async function waitForServer(attempts = 40) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const r = await fetch(BASE + "/");
      if (r.ok) return;
    } catch {
      // not up yet
    }
    await new Promise((res) => setTimeout(res, 250));
  }
  throw new Error("vite preview did not start");
}

const results = [];
async function check(url, expectHtml) {
  try {
    const r = await fetch(BASE + url);
    const body = await r.text();
    const ok = r.ok && (!expectHtml || body.includes('<div id="root">'));
    results.push({ url, status: r.status, ok, bytes: body.length });
  } catch (err) {
    results.push({ url, status: 0, ok: false, error: String(err) });
  }
}

try {
  await waitForServer();
  for (const route of ROUTES) await check(route, true);
  for (const asset of ASSETS) await check(asset, false);
} finally {
  preview.kill();
}

const failed = results.filter((r) => !r.ok);
const outDir = path.resolve(root, "..", "first run tests");
mkdirSync(outDir, { recursive: true });
writeFileSync(
  path.join(outDir, "web-smoke.json"),
  JSON.stringify({ ran_at: new Date().toISOString(), base: BASE, results }, null, 2),
);

for (const r of results) {
  console.log(`${r.ok ? "PASS" : "FAIL"} ${r.status} ${r.url}${r.error ? " " + r.error : ""}`);
}
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
