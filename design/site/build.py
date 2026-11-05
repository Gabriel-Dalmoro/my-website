"""Builds the round-4 prototype pages from src/ partials.

Each page in src/pages/*.html starts with a header comment:
<!-- title: ... | page: home | world: home | desc: ... -->
`index.html` is written without a document skeleton (the artifact host adds one);
every other page gets a full skeleton. `_local-index.html` is a skeleton copy of the home page
for local testing (index only).
"""
import re, pathlib

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / 'src'
FONTS = ('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..600;1,6..72,300..600'
         '&family=Hanken+Grotesk:wght@400;500;600&family=Martian+Mono:wdth,wght@75..100,400..500&display=swap')
LIBS = ('<script src="https://cdn.jsdelivr.net/npm/three@0.149.0/build/three.min.js"></script>\n'
        '<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>\n'
        '<script src="https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/dist/topojson-client.min.js"></script>\n')


def frag(name):
    return (SRC / name).read_text()


def expand(html):
    # {{frag:name}} includes
    html = re.sub(r'\{\{frag:([\w\-]+)\}\}', lambda m: frag(f'_frag_{m.group(1)}.html'), html)
    # handwriting shorthand: --src:url(X);--ar:A  ->  mask-image + aspect-ratio
    html = re.sub(r'--src:url\(([^)]+)\);--ar:([^;"]+)',
                  r'-webkit-mask-image:url(\1);mask-image:url(\1);aspect-ratio:\2', html)
    return html


def page(src):
    text = src.read_text()
    meta = dict(kv.strip().split(':', 1) for kv in re.match(r'<!--(.*?)-->', text, re.S).group(1).split('|'))
    meta = {k.strip(): v.strip() for k, v in meta.items()}
    body = text[text.index('-->') + 3:]
    world = meta.get('world', '')
    head = (f'<title>{meta["title"]}</title>\n'
            f'<meta name="description" content="{meta.get("desc", "")}">\n'
            '<meta name="claude:viewport-fit-sides" content="cover">\n'
            '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
            '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
            f'<link rel="stylesheet" href="{FONTS}">\n'
            '<link rel="stylesheet" href="css/site.css">\n')
    world_bits = ''
    if world:
        world_bits = ('<canvas id="paperbg" aria-hidden="true"></canvas>\n<canvas id="gl" aria-hidden="true"></canvas>\n'
                      '<div class="tapnote hand" id="tapnote" aria-hidden="true"><i class="hw acc" style="--src:url(assets/hand/g/tap-me.png);--ar:940/88;height:30px"></i>'
                      '<svg width="54" height="30" viewBox="0 0 54 30" fill="none"><path d="M2 8c14 12 30 14 46 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M40 9l9 7-11 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>\n'
                      '<div class="bubble" id="bubble" aria-live="polite"></div>\n')
    else:
        world_bits = '<canvas id="paperbg" aria-hidden="true"></canvas>\n'
    if meta['page'] == 'journey':
        world_bits += '<ol class="legs mono" id="legs" aria-label="Route stops"></ol>\n'
    content = (f'<meta name="gd-page" content="{meta["page"]}" data-world="{world}">\n' + world_bits +
               frag('_header.html') + '\n<main id="top">\n' + body + '\n</main>\n' + frag('_footer.html') +
               '\n<button class="lab-btn" id="labBtn" type="button" aria-expanded="false" aria-controls="lab"><b>A</b>Design lab</button>\n'
               '<div class="lab" id="lab" hidden role="dialog" aria-label="Design lab"></div>\n' +
               (LIBS if world else '') + '<script src="js/app.js"></script>\n')
    content = expand(content)
    full = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
            + head + '</head>\n<body>\n' + content + '</body>\n</html>\n')
    name = src.name
    (ROOT / name).write_text(head + content if name == 'index.html' else full)
    if name == 'index.html':
        (ROOT / '_local-index.html').write_text(full)  # skeleton copy for local testing only
    return name


if __name__ == '__main__':
    for p in sorted((SRC / 'pages').glob('*.html')):
        print('built', page(p))
