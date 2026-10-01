"""Static-site smoke checks for the AllView mirror. Outputs issues next to this script."""
from __future__ import annotations

import json
import os
import re
import urllib.error
import urllib.request
from collections import Counter
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SITE = Path(r"C:\claude\allview-site\site")
BASE = "http://127.0.0.1:8765"
SKIP_SCHEMES = ("http://", "https://", "mailto:", "tel:", "javascript:", "data:", "#")
ATTR_URL = re.compile(
    r"""(?:href|src|srcset|action|data-src|data-bg)\s*=\s*["']([^"']+)["']""",
    re.I,
)
SRCSET_PART = re.compile(r"(\S+)(?:\s+\S+)?")
TITLE_RE = re.compile(r"<title>(.*?)</title>", re.I | re.S)

KEY_ROUTES = [
    "/",
    "/about-us/",
    "/contact/",
    "/dermatology/",
    "/appointment-request/",
    "/locations/",
    "/our-team/",
    "/privacy-policy/",
]


class LinkParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.urls: list[tuple[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        ad = {k.lower(): (v or "") for k, v in attrs}
        for key in ("href", "src", "action", "data-src"):
            if ad.get(key):
                self.urls.append((tag, ad[key]))
        if ad.get("srcset"):
            for part in ad["srcset"].split(","):
                u = part.strip().split()[0] if part.strip() else ""
                if u:
                    self.urls.append((tag, u))


def is_external(url: str) -> bool:
    u = url.strip()
    if u.startswith(SKIP_SCHEMES) or u.startswith("//"):
        return True
    return False


def resolve_local(from_file: Path, url: str) -> Path | None:
    u = url.strip().split("#", 1)[0].split("?", 1)[0]
    if not u or is_external(url):
        return None
    u = u.replace("\\", "/")
    if u.startswith("/"):
        target = SITE / u.lstrip("/")
    else:
        target = (from_file.parent / u).resolve()
        try:
            target.relative_to(SITE.resolve())
        except ValueError:
            return target
    if target.is_dir() or (not target.suffix and not target.exists()):
        index = target / "index.html"
        if index.exists():
            return index
        html = target.with_suffix(".html")
        if html.exists():
            return html
    return target


def http_get(path: str) -> dict:
    url = BASE + path
    try:
        req = urllib.request.Request(url, method="GET")
        with urllib.request.urlopen(req, timeout=15) as r:
            body = r.read()
            return {
                "path": path,
                "status": r.status,
                "ok": 200 <= r.status < 400,
                "bytes": len(body),
                "content_type": r.headers.get("Content-Type", ""),
                "title": (TITLE_RE.search(body.decode("utf-8", "replace")) or [None, ""])[1].strip(),
                "error": None,
            }
    except urllib.error.HTTPError as e:
        return {"path": path, "status": e.code, "ok": False, "bytes": 0, "content_type": "", "title": "", "error": str(e)}
    except Exception as e:
        return {"path": path, "status": 0, "ok": False, "bytes": 0, "content_type": "", "title": "", "error": str(e)}


def main() -> None:
    ROOT.mkdir(parents=True, exist_ok=True)
    issues: list[dict] = []
    http_results = [http_get(p) for p in KEY_ROUTES]
    for row in http_results:
        if not row["ok"]:
            issues.append(
                {
                    "severity": "high",
                    "type": "http_failure",
                    "page": row["path"],
                    "detail": f"status={row['status']} error={row['error']}",
                }
            )
        elif "Directory listing" in (row["title"] or ""):
            issues.append(
                {
                    "severity": "high",
                    "type": "directory_listing",
                    "page": row["path"],
                    "detail": row["title"],
                }
            )
        elif row["path"] == "/" and "AllView" not in row["title"]:
            issues.append(
                {
                    "severity": "high",
                    "type": "homepage_title",
                    "page": "/",
                    "detail": f"unexpected title: {row['title']!r}",
                }
            )
        elif row["path"] == "/appointment-request/" and "Appointment" not in row["title"]:
            issues.append(
                {
                    "severity": "high",
                    "type": "appointment_title",
                    "page": "/appointment-request/",
                    "detail": f"unexpected title: {row['title']!r}",
                }
            )

    html_files = list(SITE.rglob("*.html"))
    missing: list[dict] = []
    empty_title = []
    for html in html_files:
        rel = html.relative_to(SITE).as_posix()
        try:
            text = html.read_text(encoding="utf-8", errors="replace")
        except OSError as e:
            issues.append({"severity": "high", "type": "unreadable_html", "page": rel, "detail": str(e)})
            continue
        m = TITLE_RE.search(text)
        if not m or not m.group(1).strip():
            empty_title.append(rel)
            issues.append({"severity": "medium", "type": "missing_title", "page": rel, "detail": "no <title>"})
        parser = LinkParser()
        try:
            parser.feed(text)
        except Exception:
            issues.append({"severity": "low", "type": "html_parse", "page": rel, "detail": "HTMLParser failed"})
            continue
        seen: set[str] = set()
        for tag, url in parser.urls:
            if url in seen:
                continue
            seen.add(url)
            if is_external(url) or url.startswith("#"):
                continue
            target = resolve_local(html, url)
            if target is None:
                continue
            if not target.exists():
                missing.append({"from": rel, "tag": tag, "url": url, "resolved": str(target)})
                issues.append(
                    {
                        "severity": "medium",
                        "type": "broken_local_link",
                        "page": rel,
                        "detail": f"{tag} -> {url}",
                    }
                )

    home = SITE / "index.html"
    home_text = home.read_text(encoding="utf-8", errors="replace") if home.exists() else ""
    for needle, label in [
        ("Main menu", "main_nav"),
        ("Book Now", "book_now"),
        ("AllView Healthcare", "brand"),
    ]:
        if needle not in home_text:
            issues.append({"severity": "high", "type": "homepage_content", "page": "index.html", "detail": f"missing {label}: {needle}"})

    counts = Counter(i["type"] for i in issues)
    summary = {
        "ran_at": datetime.now(timezone.utc).isoformat(),
        "suite": "allview static mirror smoke (no npm smoketest exists)",
        "html_files": len(html_files),
        "http_checks": http_results,
        "issue_count": len(issues),
        "by_type": dict(counts),
        "missing_local_unique": sorted({m["url"] for m in missing}),
        "note": "This repo is a WordPress static snapshot, not a Node Playwright app. npm run smoketest is not present.",
    }

    (ROOT / "issues.json").write_text(json.dumps(issues, indent=2), encoding="utf-8")
    (ROOT / "summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    (ROOT / "broken-local-links.json").write_text(json.dumps(missing, indent=2), encoding="utf-8")

    lines = [
        "# First-run smoke tests",
        "",
        f"Ran: {summary['ran_at']}",
        "",
        "## Result",
        "",
        f"- HTML pages scanned: **{len(html_files)}**",
        f"- HTTP key routes: **{sum(1 for r in http_results if r['ok'])}/{len(http_results)} passed**",
        f"- Issues logged: **{len(issues)}**",
        "",
        "There is no `npm run smoketest` / Playwright suite in this repo. These checks cover HTTP smoke on the local server and local link/asset integrity.",
        "",
        "## HTTP routes",
        "",
    ]
    for r in http_results:
        mark = "PASS" if r["ok"] else "FAIL"
        lines.append(f"- `{r['path']}` — {mark} ({r['status']}) {r['title']}")
    lines += ["", "## Issues by type", ""]
    if counts:
        for k, v in counts.most_common():
            lines.append(f"- `{k}`: {v}")
    else:
        lines.append("- none")
    lines += ["", "## Unique missing local URLs", ""]
    uniq = summary["missing_local_unique"]
    if not uniq:
        lines.append("- none")
    else:
        for u in uniq[:80]:
            lines.append(f"- `{u}`")
        if len(uniq) > 80:
            lines.append(f"- … and {len(uniq) - 80} more (see broken-local-links.json)")
    lines += [
        "",
        "## Files",
        "",
        "- `issues.json` — every issue",
        "- `broken-local-links.json` — missing files with source page",
        "- `summary.json` — machine-readable summary",
        "",
        "## Root cause (first run)",
        "",
        "This workspace is a static crawl of allview.ie. Live WordPress endpoints, feeds, and some theme/plugin assets were not fully mirrored, so local `href`/`src` targets 404 on disk. That is snapshot incompleteness, not an app compile failure.",
        "",
        "## Flake risk",
        "",
        "Low for filesystem checks. HTTP checks depend on `python -m http.server` remaining on 127.0.0.1:8765.",
        "",
    ]
    (ROOT / "SMOKE_SUMMARY.md").write_text("\n".join(lines), encoding="utf-8")
    print(json.dumps({"issue_count": len(issues), "http_ok": sum(1 for r in http_results if r["ok"]), "out": str(ROOT)}, indent=2))


if __name__ == "__main__":
    main()
