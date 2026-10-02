"""Download public AllView pages and posts from the WordPress API."""

from __future__ import annotations

import html
import json
import re
import time
import urllib.error
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

API = "https://allview.ie/wp-json/wp/v2"
OUT = Path(__file__).resolve().parents[1] / "src" / "data" / "cms-content.json"
UA = "AllViewSiteImporter/1.0 (+https://allview.ie)"

SKIP_SLUGS = {
    "home",
    "login",
    "logout",
    "register",
    "account",
    "members",
    "user",
    "password-reset",
    "patient-admin-prompts",
    "call-query",
}
SKIP_PREFIXES = ("patient-admin-prompts",)
BOOK_SLUGS = {
    "surgical-nurse-phone-consultation",
    "nurse-phone-consultation-booking",
    "gp-phone-consultation-booking",
    "vhi-member-booking-platform",
    "booking-appointments",
    "app-request",
}


class Cleaner(HTMLParser):
    drop = {"script", "style", "noscript", "iframe", "form", "button", "input", "select", "textarea", "svg"}
    keep = {
        "p",
        "br",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "ul",
        "ol",
        "li",
        "strong",
        "b",
        "em",
        "i",
        "a",
        "img",
        "blockquote",
        "figure",
        "figcaption",
        "div",
        "span",
        "table",
        "thead",
        "tbody",
        "tr",
        "th",
        "td",
        "hr",
    }

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.out: list[str] = []
        self.skip = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag in self.drop:
            self.skip += 1
            return
        if self.skip or tag not in self.keep:
            return
        attr_map = {k: v or "" for k, v in attrs}
        if tag == "a":
            href = rewrite_href(attr_map.get("href", ""))
            self.out.append(f'<a href="{html.escape(href, quote=True)}">')
            return
        if tag == "img":
            src = attr_map.get("src", "")
            alt = attr_map.get("alt", "")
            if src:
                self.out.append(
                    f'<img src="{html.escape(src, quote=True)}" alt="{html.escape(alt, quote=True)}" loading="lazy" />'
                )
            return
        if tag == "br":
            self.out.append("<br />")
            return
        if tag == "hr":
            self.out.append("<hr />")
            return
        self.out.append(f"<{tag}>")

    def handle_endtag(self, tag: str) -> None:
        if tag in self.drop:
            self.skip = max(0, self.skip - 1)
            return
        if self.skip or tag not in self.keep or tag in {"br", "img", "hr"}:
            return
        self.out.append(f"</{tag}>")

    def handle_data(self, data: str) -> None:
        if self.skip:
            return
        text = data.strip("\n")
        if text:
            self.out.append(html.escape(text))


def rewrite_href(href: str) -> str:
    if not href:
        return "#"
    href = href.strip()
    if href.startswith("mailto:") or href.startswith("tel:"):
        return href
    href = re.sub(r"^https?://(www\.)?allview\.ie", "", href)
    if href.startswith("/"):
        return href.rstrip("/") or "/"
    return href


def strip_shortcodes(raw: str) -> str:
    text = raw or ""
    text = re.sub(r"\[[^\]]+\]", " ", text)
    return text


def clean_html(raw: str) -> str:
    parser = Cleaner()
    parser.feed(strip_shortcodes(raw))
    parser.close()
    text = "".join(parser.out)
    text = re.sub(r"(<div>|</div>|<span>|</span>)", "", text)
    text = re.sub(r"\s{2,}", " ", text)
    text = re.sub(r"(<p>\s*</p>)+", "", text)
    text = re.sub(r"(<h([1-6])>\s*</h\2>)", "", text)
    return text.strip()


def fetch_json(url: str) -> tuple[object, dict[str, str]]:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=60) as res:
        headers = {k.lower(): v for k, v in res.headers.items()}
        return json.loads(res.read().decode("utf-8")), headers


def fetch_collection(kind: str) -> list[dict]:
    items: list[dict] = []
    page = 1
    while True:
        url = (
            f"{API}/{kind}?per_page=100&page={page}"
            "&_fields=id,slug,link,title,date,parent,status,excerpt,content,type"
        )
        try:
            data, headers = fetch_json(url)
        except urllib.error.HTTPError as exc:
            if exc.code == 400:
                break
            raise
        if not isinstance(data, list) or not data:
            break
        items.extend(data)
        total = int(headers.get("x-wp-totalpages", "1"))
        if page >= total:
            break
        page += 1
        time.sleep(0.2)
    return items


def path_from_link(link: str) -> str:
    path = re.sub(r"^https?://(www\.)?allview\.ie", "", link or "")
    path = path.split("?")[0].rstrip("/")
    return path or "/"


def decode_title(item: dict) -> str:
    return html.unescape((item.get("title") or {}).get("rendered") or "").strip()


def should_skip(item: dict) -> bool:
    slug = item.get("slug") or ""
    title = decode_title(item)
    path = path_from_link(item.get("link") or "")
    if slug in SKIP_SLUGS or title.lower() == "restricted content":
        return True
    return any(part in SKIP_PREFIXES for part in path.split("/"))


def main() -> None:
    pages = fetch_collection("pages")
    posts = fetch_collection("posts")
    records: list[dict] = []

    for item in pages + posts:
        if should_skip(item):
            continue
        slug = item.get("slug") or ""
        path = path_from_link(item.get("link") or "")
        kind = "post" if item.get("type") == "post" else "page"
        if slug in BOOK_SLUGS:
            records.append(
                {
                    "id": item["id"],
                    "kind": kind,
                    "slug": slug,
                    "path": path,
                    "title": decode_title(item),
                    "date": item.get("date"),
                    "excerpt": "",
                    "html": "",
                    "redirect": "/book",
                }
            )
            continue
        content = (item.get("content") or {}).get("rendered") or ""
        excerpt = clean_html((item.get("excerpt") or {}).get("rendered") or "")
        records.append(
            {
                "id": item["id"],
                "kind": kind,
                "slug": slug,
                "path": path,
                "title": decode_title(item),
                "date": item.get("date"),
                "excerpt": excerpt,
                "html": clean_html(content),
                "redirect": None,
            }
        )

    records.sort(key=lambda row: (row["kind"], row["path"]))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({"source": "https://allview.ie/", "items": records}, indent=2), encoding="utf-8")
    print(f"Wrote {len(records)} items to {OUT}")


if __name__ == "__main__":
    main()
