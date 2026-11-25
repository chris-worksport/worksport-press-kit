#!/usr/bin/env python3
"""Rebuild js/manifest.json (file sizes shown on the page). Run from the press-kit folder after adding assets."""
import os, json
root = 'assets'
def label(b): return f"{b/1024/1024:.1f} MB" if b > 1024*1024 else f"{b/1024:.0f} KB"
out = {}
for dp, _, files in os.walk(root):
    for f in sorted(files):
        if f.startswith('.'): continue
        p = os.path.join(dp, f); rel = os.path.relpath(p, root).replace(os.sep, '/')
        b = os.path.getsize(p); out[rel] = {'bytes': b, 'size': label(b)}
json.dump(out, open('js/manifest.json', 'w'), indent=1)
print(f"{len(out)} files")
