import os
from pathlib import Path

SITE = Path(r"C:\claude\allview-site\site")
MARKER = "av-modern.css"

def rel_to(html: Path) -> str:
    return Path(os.path.relpath(SITE, html.parent)).as_posix()

n = 0
for html in SITE.rglob("*.html"):
    text = html.read_text(encoding="utf-8", errors="replace")
    if MARKER in text:
        continue
    if "</head>" not in text.lower() and "</head>" not in text:
        # some html might use different case
        idx = text.lower().rfind("</head>")
        if idx < 0:
            continue
    prefix = rel_to(html)
    if prefix == ".":
        css, js = "av-modern.css", "av-modern.js"
    else:
        css, js = f"{prefix}/av-modern.css", f"{prefix}/av-modern.js"
    snippet = (
        f'<link rel="stylesheet" href="{css}" />\n'
        f'<script src="{js}" defer></script>\n'
    )
    lower = text.lower()
    pos = lower.rfind("</head>")
    text = text[:pos] + snippet + text[pos:]
    html.write_text(text, encoding="utf-8")
    n += 1
print("updated", n)
