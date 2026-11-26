#!/usr/bin/env python3
"""Pull new press releases from investors.worksport.com into the press kit.

What it does
  1. Reads the listing at https://investors.worksport.com/press (newest first).
  2. Compares the release URLs with the NEWS array in js/press.js (and TVE_NEWS in js/terravis.js).
  3. For each release not yet listed, opens it, reads the dateline ("West Seneca, New York, November 24, 2026")
     and inserts ['Month D, YYYY', 'Title', 'URL'] at the top of NEWS. Releases that mention Terravis,
     AetherLux, ZeroFrost or heat pumps are also added to TVE_NEWS.
  4. Prints what it added. The timeline (TIMELINE in js/press.js) is curated by hand: add a line there
     when a release is a milestone (record quarter, new product, acquisition, Terravis news, capital raised).

Usage
  python3 tools/update-news.py            # update the files
  python3 tools/update-news.py --dry-run  # only show what would change

Then: python3 tools/build-manifest.py is NOT needed (no new files), just review, commit and push.
No third-party packages required.
"""
import html
import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LISTING = 'https://investors.worksport.com/press'
BASE = 'https://investors.worksport.com'
UA = {'User-Agent': 'Mozilla/5.0 (press-kit news updater)'}
MONTHS = 'January|February|March|April|May|June|July|August|September|October|November|December'
TVE_WORDS = re.compile(r'terravis|aetherlux|zerofrost|heat pump', re.I)


def fetch(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
        return r.read().decode('utf-8', 'replace')


def strip_tags(s):
    s = re.sub(r'<script.*?</script>|<style.*?</style>', '', s, flags=re.S)
    s = re.sub(r'<[^>]+>', ' ', s)
    return re.sub(r'\s+', ' ', html.unescape(s)).strip()


def listing():
    """Return [(url, title)] newest first, deduplicated, in listing order."""
    page = fetch(LISTING)
    seen, out = set(), []
    for m in re.finditer(r'<a[^>]+href="(/post/[^"]+)"[^>]*>(.*?)</a>', page, flags=re.S):
        url = BASE + m.group(1)
        if url in seen:
            continue
        seen.add(url)
        inner = m.group(2)
        # the card repeats the title; take the first heading-like chunk
        h = re.search(r'<(?:h\d|div)[^>]*>(.*?)</(?:h\d|div)>', inner, flags=re.S)
        title = strip_tags(h.group(1) if h else inner)
        out.append((url, clean_title(title)))
    return out


def clean_title(t):
    t = t.replace('(NASDAQ: WKSP)', '').replace('(Nasdaq: WKSP)', '')
    t = re.sub(r'\s+', ' ', t).strip(' -–—')
    t = t.replace("'", '’')
    return t


def dateline(url):
    txt = strip_tags(fetch(url))
    m = re.search(r'(%s) (\d{1,2}), (20\d\d)' % MONTHS, txt)
    if not m:
        return None
    return '%s %d, %s' % (m.group(1), int(m.group(2)), m.group(3))


def insert(js_path, array_name, entries):
    """Insert entries (list of (date, title, url)) at the top of `const NAME = [` in a JS file."""
    src = js_path.read_text(encoding='utf-8')
    head = 'const %s = [\n' % array_name
    i = src.find(head)
    if i < 0:
        raise SystemExit('could not find %s in %s' % (array_name, js_path))
    lines = ''.join("  ['%s', '%s', '%s'],\n" % (d, t, u) for d, t, u in entries)
    src = src[:i + len(head)] + lines + src[i + len(head):]
    js_path.write_text(src, encoding='utf-8')


def main():
    dry = '--dry-run' in sys.argv
    press_js = ROOT / 'js' / 'press.js'
    tve_js = ROOT / 'js' / 'terravis.js'
    known = set(re.findall(r"https://investors\.worksport\.com/post/[^'\"]+", press_js.read_text(encoding='utf-8')))
    known_tve = set(re.findall(r"https://investors\.worksport\.com/post/[^'\"]+", tve_js.read_text(encoding='utf-8')))

    new_main, new_tve = [], []
    for url, title in listing():
        if url in known and (url in known_tve or not TVE_WORDS.search(title)):
            break  # listing is newest first; once we hit a known release the rest are known too
        if url in known and url in known_tve:
            continue
        d = dateline(url) or 'Undated'
        if url not in known:
            new_main.append((d, title, url))
        if TVE_WORDS.search(title) and url not in known_tve:
            new_tve.append((d, title, url))

    if not new_main and not new_tve:
        print('No new releases. NEWS is up to date.')
        return
    for d, t, u in new_main:
        print('NEWS     +', d, '|', t)
    for d, t, u in new_tve:
        print('TVE_NEWS +', d, '|', t)
    if dry:
        print('(dry run, nothing written)')
        return
    if new_main:
        insert(press_js, 'NEWS', new_main)
    if new_tve:
        insert(tve_js, 'TVE_NEWS', new_tve)
    print('Written. Now: check the titles read well, add any milestone to TIMELINE in js/press.js, commit and push.')


if __name__ == '__main__':
    main()
