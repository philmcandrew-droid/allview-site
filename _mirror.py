import os, re, sys, time, posixpath, urllib.request, urllib.parse
from collections import deque

START = "https://allview.ie/"
HOSTS = {"allview.ie", "www.allview.ie"}
OUT = r"C:\claude\allview-site\site"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36"
SKIP = re.compile(r"/(wp-admin|wp-login|wp-json|xmlrpc|feed|comments/feed|trackback)(/|\.php|$)|[?&](replytocom|share|p=)", re.I)
ASSET_EXT = re.compile(r"\.(css|js|png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf|otf|eot|mp4|webm|pdf|json)$", re.I)
MAX_PAGES = 300

def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read(), r.headers.get("Content-Type", ""), r.geturl()

def norm(u, base):
    u = urllib.parse.urljoin(base, u.strip().replace("&amp;", "&").replace("\u200b", ""))
    p = urllib.parse.urlsplit(u)
    if p.scheme not in ("http", "https"): return None
    return urllib.parse.urlunsplit(("https", p.netloc.lower(), urllib.parse.quote(p.path or "/", safe="/%:@!$&'()*+,;=~-._"), urllib.parse.quote(p.query, safe="=&%:/?+,;~-._"), ""))

def local(u, is_page):
    p = urllib.parse.urlsplit(u)
    path = urllib.parse.unquote(p.path)
    if is_page:
        if not path.endswith("/") and not path.lower().endswith((".html", ".htm")): path += "/"
        if path.endswith("/"): path += "index.html"
    elif path.endswith("/"): path += "index"
    q = p.query
    if q and not re.fullmatch(r"(ver|v)=[\w.\-]+", q):
        root, ext = posixpath.splitext(path)
        path = f"{root}_{abs(hash(q)) % 10**8}{ext}"
    return path.lstrip("/")

def rel(from_local, to_local):
    return posixpath.relpath(to_local, posixpath.dirname(from_local) or ".")

def save(lp, data):
    fp = os.path.join(OUT, *lp.split("/"))
    os.makedirs(os.path.dirname(fp), exist_ok=True)
    with open(fp, "wb") as f: f.write(data)

assets_done = {}
def get_asset(u):
    if u in assets_done: return assets_done[u]
    lp = local(u, False); assets_done[u] = lp
    try:
        data, ct, _ = fetch(u)
    except Exception as e:
        print("  asset fail", u, e); assets_done[u] = None; return None
    if lp.lower().endswith(".css") or "text/css" in ct:
        data = rewrite_css(data.decode("utf-8", "replace"), u, lp).encode("utf-8")
    save(lp, data); return lp

def rewrite_css(css, base, lp):
    def sub(m):
        raw = m.group(2).strip("'\" ")
        if raw.startswith(("data:", "#")): return m.group(0)
        u = norm(raw, base)
        if not u or urllib.parse.urlsplit(u).netloc not in HOSTS: return m.group(0)
        t = get_asset(u)
        return f"{m.group(1)}\"{rel(lp, t)}\")" if t else m.group(0)
    return re.sub(r"(url\()\s*([^)]+)\)", sub, css)

ATTR = re.compile(r"""(\s(?:href|src|data-src|data-lazy-src|poster|action|content)=)(["'])(.*?)\2""", re.I | re.S)
SRCSET = re.compile(r"""(\s(?:srcset|data-srcset)=)(["'])(.*?)\2""", re.I | re.S)

pages_seen, queue = set(), deque([START])
count = 0
while queue and count < MAX_PAGES:
    url = queue.popleft()
    if url in pages_seen: continue
    pages_seen.add(url)
    try:
        data, ct, final = fetch(url)
    except Exception as e:
        print("page fail", url, e); continue
    if "text/html" not in ct:
        get_asset(url); continue
    count += 1
    lp = local(url, True)
    print(f"[{count}] {url}")
    html = data.decode("utf-8", "replace")

    def attr_sub(m):
        raw = m.group(3)
        if raw.startswith(("#", "mailto:", "tel:", "javascript:", "data:")): return m.group(0)
        u = norm(raw, url)
        if not u or urllib.parse.urlsplit(u).netloc not in HOSTS: return m.group(0)
        path = urllib.parse.urlsplit(u).path
        if ASSET_EXT.search(path) or "/wp-content/" in path or "/wp-includes/" in path:
            t = get_asset(u)
            return f"{m.group(1)}{m.group(2)}{rel(lp, t)}{m.group(2)}" if t else m.group(0)
        if SKIP.search(u): return m.group(0)
        if m.group(1).strip().lower().startswith("content"): return m.group(0)
        frag = raw.split("#", 1)[1] if "#" in raw else ""
        if u not in pages_seen: queue.append(u)
        target = rel(lp, local(u, True)) + (f"#{frag}" if frag else "")
        return f"{m.group(1)}{m.group(2)}{target}{m.group(2)}"

    def srcset_sub(m):
        parts = []
        for item in m.group(3).split(","):
            bits = item.strip().split()
            if not bits: continue
            u = norm(bits[0], url)
            if u and urllib.parse.urlsplit(u).netloc in HOSTS:
                t = get_asset(u)
                if t: bits[0] = rel(lp, t)
            parts.append(" ".join(bits))
        return f"{m.group(1)}{m.group(2)}{', '.join(parts)}{m.group(2)}"

    html = ATTR.sub(attr_sub, html)
    html = SRCSET.sub(srcset_sub, html)
    html = re.sub(r"(<style[^>]*>)(.*?)(</style>)", lambda m: m.group(1) + rewrite_css(m.group(2), url, lp) + m.group(3), html, flags=re.S | re.I)
    html = re.sub(r"(style=\")([^\"]*url\([^\"]*)(\")", lambda m: m.group(1) + rewrite_css(m.group(2), url, lp) + m.group(3), html, flags=re.I)
    save(lp, html.encode("utf-8"))
    time.sleep(0.2)

print(f"DONE pages={count} assets={sum(1 for v in assets_done.values() if v)}")

