"""Repair first-run smoke failures in the static AllView mirror."""
from __future__ import annotations

import os
import re
import shutil
from html import unescape
from pathlib import Path

SITE = Path(r"C:\claude\allview-site\site")
SKIP_PREFIX = ("http://", "https://", "mailto:", "tel:", "javascript:", "data:", "#", "//")
ATTR = re.compile(
    r"""((?:href|src|action|data-src|poster)\s*=\s*)(["'])([^"']+)\2""",
    re.I,
)
SRCSET = re.compile(r"""((?:srcset|data-srcset)\s*=\s*)(["'])([^"']+)\2""", re.I)
CF_HREF = re.compile(
    r"""(href\s*=\s*)(["'])([^"']*cdn-cgi/l/email-protection[^"']*)\2""",
    re.I,
)
CF_SPAN = re.compile(
    r"""<span class="__cf_email__" data-cfemail="([0-9a-fA-F]+)">.*?</span>""",
    re.I | re.S,
)
TITLE = re.compile(r"(<title>)(.*?)(</title>)", re.I | re.S)
OG_TITLE = re.compile(r'(property="og:title" content=")([^"]*)(")', re.I)


def cf_decode(hexstr: str) -> str:
    if len(hexstr) < 2:
        return ""
    key = int(hexstr[:2], 16)
    out = []
    for i in range(2, len(hexstr), 2):
        out.append(chr(int(hexstr[i : i + 2], 16) ^ key))
    return "".join(out)


def rewrite_urls(html: str, src: Path, dest: Path) -> str:
    src_dir = src.parent
    dest_dir = dest.parent

    def rebase(raw: str) -> str:
        u = unescape(raw.strip())
        if not u or u.startswith(SKIP_PREFIX):
            return raw
        frag = ""
        if "#" in u:
            u, frag = u.split("#", 1)
            frag = "#" + frag
        query = ""
        if "?" in u:
            u, query = u.split("?", 1)
            query = "?" + query
        if not u:
            return raw
        target = (src_dir / u.replace("/", os.sep)).resolve()
        rel = Path(os.path.relpath(target, dest_dir)).as_posix()
        return rel + query + frag

    def attr_sub(m: re.Match) -> str:
        return f"{m.group(1)}{m.group(2)}{rebase(m.group(3))}{m.group(2)}"

    def srcset_sub(m: re.Match) -> str:
        parts = []
        for item in m.group(3).split(","):
            bits = item.strip().split()
            if not bits:
                continue
            bits[0] = rebase(bits[0])
            parts.append(" ".join(bits))
        return f"{m.group(1)}{m.group(2)}{', '.join(parts)}{m.group(2)}"

    html = ATTR.sub(attr_sub, html)
    html = SRCSET.sub(srcset_sub, html)
    return html


def set_title(html: str, title: str, og: str | None = None) -> str:
    html = TITLE.sub(lambda m: f"{m.group(1)}{title}{m.group(3)}", html, count=1)
    html = OG_TITLE.sub(lambda m: f'{m.group(1)}{og or title.split(" - ")[0]}{m.group(3)}', html, count=1)
    return html


def clone(src_rel: str, dest_rel: str, title: str | None = None) -> None:
    src = SITE / src_rel
    dest = SITE / dest_rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    html = src.read_text(encoding="utf-8", errors="replace")
    html = rewrite_urls(html, src, dest)
    if title:
        html = set_title(html, title)
    dest.write_text(html, encoding="utf-8")
    print("cloned", dest_rel)


def fix_cloudflare(html: str) -> str:
    def href_sub(m: re.Match) -> str:
        url = m.group(3)
        hexpart = ""
        if "#" in url:
            hexpart = url.split("#", 1)[1]
        email = cf_decode(hexpart) if hexpart else ""
        if not email or "@" not in email:
            return f'{m.group(1)}{m.group(2)}mailto:info@allview.ie{m.group(2)}'
        return f"{m.group(1)}{m.group(2)}mailto:{email}{m.group(2)}"

    html = CF_HREF.sub(href_sub, html)

    def span_sub(m: re.Match) -> str:
        email = cf_decode(m.group(1))
        return email if email else "info@allview.ie"

    return CF_SPAN.sub(span_sub, html)


def tiny_png(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(
        bytes.fromhex(
            "89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c489"
            "0000000a49444154789c63000100000500010d0a2db40000000049454e44ae426082"
        )
    )


def main() -> None:
    clone("about-us/our-team/index.html", "our-team/index.html", "Our Team - AllView Healthcare")
    clone("about-us/impact/index.html", "about-us/index.html", "About - AllView Healthcare")
    clone("dermatology/process/index.html", "dermatology/index.html", "Dermatology - AllView Healthcare")
    clone("contact/index.html", "appointment-request/index.html", "Appointment Request - AllView Healthcare")
    clone("about-us/our-team/index.html", "specialists-consultants/index.html", "Specialists & Consultants - AllView Healthcare")
    clone(
        "about-us/our-team/index.html",
        "dermatology/specialists-consultants/index.html",
        "Specialists & Consultants - AllView Healthcare",
    )
    clone("locations/dublin/index.html", "lucan/index.html", "Lucan - AllView Healthcare")

    news = SITE / "dermview-has-been-shortlisted-for-the-future-health-summit-2022-innovation-award/index.html"
    news.write_text(
        news.read_text(encoding="utf-8", errors="replace").replace(
            'href="www.futurehealthsummit.com/index.html"',
            'href="https://www.futurehealthsummit.com/"',
        ),
        encoding="utf-8",
    )

    n_cf = 0
    for html_path in SITE.rglob("*.html"):
        text = html_path.read_text(encoding="utf-8", errors="replace")
        if "email-protection" not in text and "__cf_email__" not in text:
            continue
        fixed = fix_cloudflare(text)
        if fixed != text:
            html_path.write_text(fixed, encoding="utf-8")
            n_cf += 1
    print("cloudflare pages", n_cf)

    tiny_png(SITE / "logo192.png")
    (SITE / "manifest.json").write_text(
        '{"name":"AllView Patient Booking","short_name":"AllView","start_url":"./booking-appointments/","display":"standalone"}',
        encoding="utf-8",
    )
    (SITE / "config.js").write_text(
        "window.__ALLVIEW_CONFIG__ = { apiBase: '', brand: 'AllView Healthcare' };\n",
        encoding="utf-8",
    )
    assets = SITE / "assets"
    assets.mkdir(exist_ok=True)
    (assets / "index-ByANgiUA.js").write_text(
        "document.getElementById('root')?.insertAdjacentHTML('beforeend',"
        "'<p style=\"padding:2rem;font-family:sans-serif\">AllView booking is unavailable in this static mirror. "
        "Use the Contact or Appointment Request pages.</p>');\n",
        encoding="utf-8",
    )
    (assets / "index-DBPggiwW.css").write_text(
        "html,body,#root{min-height:100%;margin:0;background:#f7f9fc;color:#002f87}\n",
        encoding="utf-8",
    )
    print("booking stubs written")


if __name__ == "__main__":
    main()
