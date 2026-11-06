(() => {
'use strict';
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;
const debounce = (f, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => f(...a), ms); }; };
const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const hex3 = h => { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); const n = parseInt(h, 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; };
const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };

function makeNoise(seed) {
  let s = seed; const rand = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  const perm = new Uint8Array(512), vals = new Float32Array(256);
  for (let i = 0; i < 256; i++) { perm[i] = i; vals[i] = rand(); }
  for (let i = 255; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [perm[i], perm[j]] = [perm[j], perm[i]]; }
  for (let i = 0; i < 256; i++) perm[i + 256] = perm[i];
  const lat = (x, y) => vals[perm[(x & 255) + perm[y & 255]]], f = t => t * t * (3 - 2 * t);
  const n = (x, y) => { const xi = Math.floor(x), yi = Math.floor(y), u = f(x - xi), v = f(y - yi);
    const a = lat(xi, yi), b = lat(xi + 1, yi), c = lat(xi, yi + 1), d = lat(xi + 1, yi + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v; };
  return (x, y, o = 4) => { let t = 0, amp = .5, fr = 1; for (let k = 0; k < o; k++) { t += amp * n(x * fr, y * fr); amp *= .5; fr *= 2.03; } return t; };
}
const fbm = makeNoise(11), fbm2 = makeNoise(29);

/* =========================================================
   DESIGN LAB
   ========================================================= */
const FONT_SPEC = {
  'Bodoni Moda': 'Bodoni+Moda:ital,opsz,wght@0,6..96,400..600;1,6..96,400..600', 'Instrument Sans': 'Instrument+Sans:wght@400;500;600', 'IBM Plex Mono': 'IBM+Plex+Mono:wght@400;500',
  'IM Fell English': 'IM+Fell+English:ital@0;1', 'IM Fell English SC': 'IM+Fell+English+SC', 'EB Garamond': 'EB+Garamond:ital,wght@0,400..600;1,400..600',
  'Big Shoulders Display': 'Big+Shoulders+Display:wght@500..900', 'Archivo': 'Archivo:wdth,wght@62..125,400..700', 'JetBrains Mono': 'JetBrains+Mono:wght@400;500',
  'Instrument Serif': 'Instrument+Serif:ital@0;1', 'Geist': 'Geist:wght@400..600', 'Geist Mono': 'Geist+Mono:wght@400..500', 'Jost': 'Jost:ital,wght@0,300..700;1,300..700', 'DM Mono': 'DM+Mono:wght@400;500'
};
const loadedFonts = new Set();
function loadFont(fam) {
  if (!FONT_SPEC[fam] || loadedFonts.has(fam)) return; loadedFonts.add(fam);
  const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = `https://fonts.googleapis.com/css2?family=${FONT_SPEC[fam]}&display=swap`; document.head.appendChild(l);
}
const TYPES = [
  { id: 'fieldnotes', name: 'Field Notes', fonts: ['Newsreader', 'Hanken Grotesk', 'Martian Mono'], d: 'Soft italic serif. Journal warmth, quietly confident.', s: 'Gabriel Dalmoro', st: 'font-family:Newsreader;font-style:italic;font-weight:300' },
  { id: 'didone', name: 'Alpine Luxe', fonts: ['Bodoni Moda', 'Instrument Sans', 'IBM Plex Mono'], d: 'High-contrast Didone. Premium, editorial, Swiss-founder friendly.', s: 'Gabriel Dalmoro', st: 'font-family:"Bodoni Moda";font-style:italic' },
  { id: 'atlas', name: 'Old Atlas', fonts: ['IM Fell English', 'EB Garamond', 'IM Fell English SC'], d: 'Antique map lettering. Explorer era, ink and rag paper.', s: 'Gabriel Dalmoro', st: 'font-family:"IM Fell English";font-style:italic' },
  { id: 'trail', name: 'Trailhead', fonts: ['Big Shoulders Display', 'Archivo', 'JetBrains Mono'], d: 'Condensed trail-sign caps. Sporty, loud, outdoorsy.', s: 'GABRIEL DALMORO', st: 'font-family:"Big Shoulders Display";font-weight:900' },
  { id: 'modern', name: 'Modern Explorer', fonts: ['Instrument Serif', 'Geist', 'Geist Mono'], d: 'Crisp contemporary serif with a techy sans. Builder energy.', s: 'Gabriel Dalmoro', st: 'font-family:"Instrument Serif";font-style:italic' },
  { id: 'poster', name: 'Travel Poster', fonts: ['Jost', 'Jost', 'DM Mono'], d: 'Geometric, like a 1950s ski-resort poster. Timeless and clean.', s: 'GABRIEL DALMORO', st: 'font-family:Jost;font-weight:600;letter-spacing:.02em;font-size:21px' }
];
const PALETTES = [
  { id: 'topo', name: 'Topo sheet', sw: ['#eceee6', '#17222a', '#2d64a8', '#a88a68'] },
  { id: 'journal', name: 'Field journal', sw: ['#f2efe7', '#1c2334', '#2443a0', '#b23a2b'] },
  { id: 'alpine', name: 'Swiss alpine', sw: ['#f5f5f2', '#121417', '#d42a1f', '#1d4f91'] },
  { id: 'forest', name: 'Atlantic forest', sw: ['#e8ebe1', '#142a20', '#1f6b4a', '#d99a1e'] },
  { id: 'night', name: 'Night chart', sw: ['#0f1a22', '#ebe5d6', '#e2b35b', '#7fb0d8'] },
  { id: 'kraft', name: 'Kraft expedition', sw: ['#ddd2bd', '#241f19', '#1d6a66', '#b5502b'] }
];
const PAPERS = [{ id: 'contours', name: 'Contours' }, { id: 'ruled', name: 'Ruled' }, { id: 'grid', name: 'Grid' }, { id: 'plain', name: 'Plain' }];
const PRESETS = [
  ['Trailhead', 'trail', 'forest', 'contours'], ['Field Notes', 'fieldnotes', 'topo', 'contours'], ["Explorer's Journal", 'atlas', 'kraft', 'ruled'], ['Alpine Luxe', 'didone', 'alpine', 'plain'], ['Modern Explorer', 'modern', 'journal', 'grid'], ['Night Chart', 'fieldnotes', 'night', 'contours'], ['Resort Poster', 'poster', 'alpine', 'grid']
];
const design = { type: 'trail', palette: 'forest', paper: 'contours' };
try { const saved = JSON.parse(store.get('gd-design-v2') || 'null'); if (saved) Object.assign(design, saved); } catch (e) {}
const themeListeners = [];
function applyDesign(save = true) {
  const r = document.documentElement;
  r.dataset.type = design.type; r.dataset.palette = design.palette; r.dataset.paper = design.paper;
  const t = TYPES.find(x => x.id === design.type); t.fonts.forEach(loadFont);
  if (save) store.set('gd-design-v2', JSON.stringify(design));
  renderLab();
  const done = () => themeListeners.forEach(f => f());
  done(); if (document.fonts) document.fonts.ready.then(() => setTimeout(done, 60));
}
const labBtn = document.getElementById('labBtn'), lab = document.getElementById('lab');
function renderLab() {
  if (lab.hidden) return;
  const t = TYPES.find(x => x.id === design.type), p = PALETTES.find(x => x.id === design.palette), pa = PAPERS.find(x => x.id === design.paper);
  const combo = `Type: ${t.name} · Colour: ${p.name} · Paper: ${pa.name}`;
  lab.innerHTML = `
    <div class="top"><div><strong>Design lab</strong><p>Mix and match, then send me the combo you like.</p></div><button class="x" type="button" data-close aria-label="Close design lab">×</button></div>
    <div><h4>Presets</h4><div class="chipset" style="margin-top:8px">${PRESETS.map(([n, a, b, c]) => `<button class="chip" type="button" data-preset="${a}|${b}|${c}" aria-pressed="${design.type === a && design.palette === b && design.paper === c}">${n}</button>`).join('')}</div></div>
    <div class="opts"><h4>Typography</h4>${TYPES.map(x => `<button class="opt" type="button" data-type="${x.id}" aria-pressed="${x.id === design.type}"><span class="s" style='${x.st}'>${x.s}</span><span class="k">${x.name}</span><span class="d">${x.d} <br>${x.fonts.filter((f, i, a) => a.indexOf(f) === i).join(' · ')}</span></button>`).join('')}</div>
    <div class="opts"><h4>Colour</h4><div class="row2">${PALETTES.map(x => `<button class="opt" type="button" data-palette="${x.id}" aria-pressed="${x.id === design.palette}"><span class="sw">${x.sw.map(c => `<i style="background:${c}"></i>`).join('')}</span><span class="d" style="grid-column:1/-1;color:#16191d;font-size:13px">${x.name}</span></button>`).join('')}</div></div>
    <div><h4>Paper</h4><div class="chipset" style="margin-top:8px">${PAPERS.map(x => `<button class="chip" type="button" data-paper="${x.id}" aria-pressed="${x.id === design.paper}">${x.name}</button>`).join('')}</div></div>
    <div class="combo"><h4>Your combo</h4><code id="comboCode">${combo}</code><button class="chip" type="button" data-copy>Copy combo</button></div>`;
}
function openLab(open) {
  lab.hidden = !open; labBtn.setAttribute('aria-expanded', String(open));
  if (open) { TYPES.forEach(t => t.fonts.forEach(loadFont)); renderLab(); }
}
labBtn.addEventListener('click', () => openLab(lab.hidden));
lab.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.close !== undefined) return openLab(false);
  if (b.dataset.copy !== undefined) { const txt = document.getElementById('comboCode').textContent;
    const ok = () => { b.textContent = 'Copied'; setTimeout(() => (b.textContent = 'Copy combo'), 1400); };
    try { navigator.clipboard.writeText(txt).then(ok, () => { getSelection().selectAllChildren(document.getElementById('comboCode')); }); } catch (err) { getSelection().selectAllChildren(document.getElementById('comboCode')); } return; }
  if (b.dataset.preset) { const [a, p, c] = b.dataset.preset.split('|'); Object.assign(design, { type: a, palette: p, paper: c }); }
  if (b.dataset.type) design.type = b.dataset.type;
  if (b.dataset.palette) design.palette = b.dataset.palette;
  if (b.dataset.paper) design.paper = b.dataset.paper;
  applyDesign();
});
addEventListener('keydown', e => { if (e.key === 'Escape' && !lab.hidden) openLab(false); });

/* =========================================================
   PAPER GROUND
   ========================================================= */
const paperCv = document.getElementById('paperbg'), pctx = paperCv.getContext('2d');
function drawPaper() {
  const dpr = Math.min(devicePixelRatio || 1, 2), W = innerWidth, H = innerHeight;
  paperCv.width = Math.round(W * dpr); paperCv.height = Math.round(H * dpr); pctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  pctx.fillStyle = css('--paper'); pctx.fillRect(0, 0, W, H);
  const col = css('--contour'), mode = design.paper;
  const rgba = (a) => { const [r, g, b] = hex3(col); return `rgba(${r * 255 | 0},${g * 255 | 0},${b * 255 | 0},${a})`; };
  if (mode === 'ruled') {
    pctx.strokeStyle = rgba(.45); pctx.lineWidth = 1; pctx.beginPath();
    for (let y = 40; y < H; y += 32) { pctx.moveTo(0, y + .5); pctx.lineTo(W, y + .5); } pctx.stroke();
    const [r, g, b] = hex3(css('--accent-2')); pctx.strokeStyle = `rgba(${r * 255 | 0},${g * 255 | 0},${b * 255 | 0},.35)`;
    pctx.beginPath(); pctx.moveTo(Math.min(72, W * .06) + .5, 0); pctx.lineTo(Math.min(72, W * .06) + .5, H); pctx.stroke();
  } else if (mode === 'grid') {
    pctx.lineWidth = 1;
    for (const [step, a] of [[24, .2], [120, .42]]) { pctx.strokeStyle = rgba(a); pctx.beginPath();
      for (let x = 0; x < W; x += step) { pctx.moveTo(x + .5, 0); pctx.lineTo(x + .5, H); }
      for (let y = 0; y < H; y += step) { pctx.moveTo(0, y + .5); pctx.lineTo(W, y + .5); } pctx.stroke(); }
  } else if (mode === 'contours') {
    const st = 8, gw = Math.ceil(W / st) + 1, gh = Math.ceil(H / st) + 1, F = new Float32Array(gw * gh);
    for (let j = 0; j < gh; j++) for (let i = 0; i < gw; i++) F[j * gw + i] = fbm(i * st / 340 + 3, j * st / 340 + 7, 5);
    for (let L = 1; L < 22; L++) {
      const t = .2 + L / 22 * .6; pctx.beginPath();
      for (let j = 0; j < gh - 1; j++) for (let i = 0; i < gw - 1; i++) {
        const a = F[j * gw + i], b = F[j * gw + i + 1], c = F[(j + 1) * gw + i + 1], d = F[(j + 1) * gw + i];
        const id = (a > t ? 8 : 0) | (b > t ? 4 : 0) | (c > t ? 2 : 0) | (d > t ? 1 : 0); if (!id || id === 15) continue;
        const x = i * st, y = j * st, T = [x + st * (t - a) / (b - a), y], R = [x + st, y + st * (t - b) / (c - b)], B = [x + st * (t - d) / (c - d), y + st], Lf = [x, y + st * (t - a) / (d - a)];
        const s = (p, q) => { pctx.moveTo(p[0], p[1]); pctx.lineTo(q[0], q[1]); };
        switch (id) { case 1: case 14: s(Lf, B); break; case 2: case 13: s(B, R); break; case 3: case 12: s(Lf, R); break; case 4: case 11: s(T, R); break;
          case 5: s(Lf, T); s(B, R); break; case 6: case 9: s(T, B); break; case 7: case 8: s(Lf, T); break; case 10: s(T, R); s(Lf, B); break; }
      }
      pctx.strokeStyle = rgba(L % 5 === 0 ? .34 : .17); pctx.lineWidth = L % 5 === 0 ? 1 : .7; pctx.stroke();
    }
  }
}
themeListeners.push(drawPaper);
addEventListener('resize', debounce(drawPaper, 200));

/* ---------- small page behaviours ---------- */
const bar = document.getElementById('bar');
(function rotateQuote() {
  const q = document.querySelectorAll('#bless .rot span'), tags = document.querySelectorAll('#bless .rot-langs b');
  if (!q.length || reduce) return; let i = 0;
  setInterval(() => { q[i].classList.remove('on'); tags[i].classList.remove('on'); i = (i + 1) % q.length; q[i].classList.add('on'); tags[i].classList.add('on'); }, 4200);
})();
const menuBtn = document.getElementById('menuBtn'), mnav = document.getElementById('mnav');
if (menuBtn && mnav) menuBtn.addEventListener('click', () => { const open = mnav.hidden; mnav.hidden = !open; menuBtn.setAttribute('aria-expanded', String(open)); menuBtn.textContent = open ? 'Close' : 'Menu'; });
addEventListener('scroll', () => bar.classList.toggle('scrolled', scrollY > 10), { passive: true });
const helloForm = document.getElementById('helloForm');
if (helloForm) {
  helloForm.addEventListener('submit', e => { e.preventDefault(); document.getElementById('sent').classList.add('on'); });
  const pick = { studio: 'why-work', work: 'why-work', collab: 'why-collab', hire: 'why-hire', brand: 'why-brand', hi: 'why-hi' };
  const fromHash = () => { const id = pick[location.hash.slice(1)]; if (id && document.getElementById(id)) document.getElementById(id).checked = true; };
  fromHash(); addEventListener('hashchange', fromHash);
}
if (!reduce && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.remove('pre'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px' });
  document.querySelectorAll('.squig').forEach(el => { if (el.getBoundingClientRect().top > innerHeight) { el.classList.add('pre'); io.observe(el); } });
}

/* ---------- language stamps ---------- */
(function stamps() {
  const F = {
    br: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#229e45"/><path d="M${x + w / 2} ${y + h * .1}L${x + w * .92} ${y + h / 2}L${x + w / 2} ${y + h * .9}L${x + w * .08} ${y + h / 2}Z" fill="#f8d90f"/><circle cx="${x + w / 2}" cy="${y + h / 2}" r="${h * .24}" fill="#26419a"/><path d="M${x + w / 2 - h * .24} ${y + h / 2 - 2}q${h * .24} -${h * .1} ${h * .48} 4" stroke="#fff" stroke-width="2.4" fill="none"/>`,
    ca: (x, y, w, h) => { const s = h / 100, cx = x + w / 2 - 50 * s, cy = y; return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff"/><rect x="${x}" y="${y}" width="${w / 4}" height="${h}" fill="#d52b1e"/><rect x="${x + w * .75}" y="${y}" width="${w / 4}" height="${h}" fill="#d52b1e"/><path transform="translate(${cx} ${cy + 4 * s}) scale(${s * .92})" d="M50 8L57 22L66 18L62 40L76 30L80 38L92 36L86 50L94 54L72 70L76 78L54 75L54 92L46 92L46 75L24 78L28 70L6 54L14 50L8 36L20 38L24 30L38 40L34 18L43 22Z" fill="#d52b1e"/>`; },
    fr: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w / 3}" height="${h}" fill="#0055a4"/><rect x="${x + w / 3}" y="${y}" width="${w / 3}" height="${h}" fill="#fff"/><rect x="${x + 2 * w / 3}" y="${y}" width="${w / 3}" height="${h}" fill="#ef4135"/>`,
    it: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w / 3}" height="${h}" fill="#009246"/><rect x="${x + w / 3}" y="${y}" width="${w / 3}" height="${h}" fill="#fff"/><rect x="${x + 2 * w / 3}" y="${y}" width="${w / 3}" height="${h}" fill="#ce2b37"/>`,
    de: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h / 3}" fill="#111"/><rect x="${x}" y="${y + h / 3}" width="${w}" height="${h / 3}" fill="#dd0000"/><rect x="${x}" y="${y + 2 * h / 3}" width="${w}" height="${h / 3}" fill="#ffce00"/>`,
    ch: (x, y, w, h) => { const c = Math.min(w, h), cx = x + w / 2, cy = y + h / 2, a = c * .12, b = c * .38; return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#d52b1e"/><rect x="${cx - a}" y="${cy - b}" width="${2 * a}" height="${2 * b}" fill="#fff"/><rect x="${cx - b}" y="${cy - a}" width="${2 * b}" height="${2 * a}" fill="#fff"/>`; },
    co: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h / 2}" fill="#fcd116"/><rect x="${x}" y="${y + h / 2}" width="${w}" height="${h / 4}" fill="#003893"/><rect x="${x}" y="${y + 3 * h / 4}" width="${w}" height="${h / 4}" fill="#ce1126"/>`,
    pe: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff"/><rect x="${x}" y="${y}" width="${w / 3}" height="${h}" fill="#d91023"/><rect x="${x + 2 * w / 3}" y="${y}" width="${w / 3}" height="${h}" fill="#d91023"/>`,
    bo: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h / 3}" fill="#d52b1e"/><rect x="${x}" y="${y + h / 3}" width="${w}" height="${h / 3}" fill="#f9e300"/><rect x="${x}" y="${y + 2 * h / 3}" width="${w}" height="${h / 3}" fill="#007934"/>`,
    cl: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h / 2}" fill="#fff"/><rect x="${x}" y="${y + h / 2}" width="${w}" height="${h / 2}" fill="#d52b1e"/><rect x="${x}" y="${y}" width="${w / 3}" height="${h / 2}" fill="#0039a6"/><circle cx="${x + w / 6}" cy="${y + h / 4}" r="${h * .08}" fill="#fff"/>`,
    ar: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#74acdf"/><rect x="${x}" y="${y + h / 3}" width="${w}" height="${h / 3}" fill="#fff"/><circle cx="${x + w / 2}" cy="${y + h / 2}" r="${h * .1}" fill="#f6b40e"/>`,
    ec: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h / 2}" fill="#ffdd00"/><rect x="${x}" y="${y + h / 2}" width="${w}" height="${h / 4}" fill="#034ea2"/><rect x="${x}" y="${y + 3 * h / 4}" width="${w}" height="${h / 4}" fill="#ed1c24"/><circle cx="${x + w / 2}" cy="${y + h / 2}" r="${h * .1}" fill="#6b4f2a"/>`
  };
  const L = [
    { g: 'Olá', lang: 'Português', lvl: 'Native', code: 'PT', flags: ['br'], pm: 'NATIVO · BRASIL · ', mid: 'BR' },
    { g: 'Hello', lang: 'English', lvl: 'Native', code: 'EN', flags: ['ca'], pm: 'NATIVE · CANADA · ', mid: 'CA' },
    { g: 'Hola', lang: 'Español', lvl: 'Professional', code: 'ES', flags: ['co', 'ec', 'pe', 'bo', 'cl', 'ar'], pm: 'APRENDIDO EN EL CAMINO · ', mid: '260' },
    { g: 'Bonjour', lang: 'Français', lvl: 'Professional', code: 'FR', flags: ['fr'], pm: 'PROFESSIONNEL · FRANCE · ', mid: 'FR' },
    { g: 'Hallo', lang: 'Deutsch', lvl: 'Learning now', code: 'DE', flags: ['de', 'ch'], pm: 'LERNE GERADE · ANFÄNGER · ', mid: 'DE', cls: 'learning' },
    { g: 'Ciao', lang: 'Italiano', lvl: 'Up next', code: 'IT', flags: ['it'], cls: 'soon' }
  ];
  const rot = [-3, 2.5, -1.5, 3, -2.5, 1.5], inkRot = [-14, 10, -6, 16, -10, 0];
  const host = document.getElementById('stamps'); if (!host) return;
  host.innerHTML = L.map((s, i) => {
    const n = s.flags.length; let flag = '';
    if (n === 1) flag = F[s.flags[0]](14, 14, 104, 90);
    else if (n === 2) flag = F[s.flags[0]](14, 14, 52, 90) + F[s.flags[1]](66, 14, 52, 90);
    else s.flags.forEach((f, j) => { flag += F[f](14 + (j % 2) * 52, 14 + Math.floor(j / 2) * 30, 52, 30); });
    const id = 'c' + i;
    const pm = s.pm ? `<svg class="pm" viewBox="0 0 100 100" aria-hidden="true" style="transform:rotate(${inkRot[i]}deg)"><defs><path id="${id}" d="M50 50m-34 0a34 34 0 1 1 68 0a34 34 0 1 1 -68 0"/></defs>
      <g fill="none" stroke="var(--ink)" stroke-width="2" opacity=".72"><circle cx="50" cy="50" r="44"/><circle cx="50" cy="50" r="26"/>
      <path d="M-40 34q8 -6 16 0t16 0M-40 46q8 -6 16 0t16 0M-40 58q8 -6 16 0t16 0" stroke-width="2.4"/></g>
      <text font-family="var(--f-mono)" font-size="8.5" letter-spacing="1.4" fill="var(--ink)" opacity=".8"><textPath href="#${id}">${s.pm.repeat(3).slice(0, 52)}</textPath></text>
      <text x="50" y="56" text-anchor="middle" font-family="var(--f-display)" font-size="17" font-style="italic" fill="var(--ink)" opacity=".85">${s.mid}</text></svg>` : '';
    return `<div class="st ${s.cls || ''}">
      <div class="art" style="transform:rotate(${rot[i]}deg)">
        <svg viewBox="0 0 132 160" aria-hidden="true"><rect x="4" y="4" width="124" height="152" fill="#fbfaf6" stroke="rgba(0,0,0,.08)"/>
          <rect x="4" y="4" width="124" height="152" fill="none" stroke="var(--paper)" stroke-width="7" stroke-dasharray=".01 9" stroke-linecap="round"/>
          <g ${s.cls === 'soon' ? 'filter="grayscale(1)" opacity=".5"' : ''}>${flag}</g>
          <rect x="14" y="14" width="104" height="90" fill="none" stroke="rgba(0,0,0,.15)"/>
          <text x="66" y="124" text-anchor="middle" font-family="var(--f-mono)" font-size="10" letter-spacing="1.6" fill="#222">${s.lang.toUpperCase()}</text>
          <text x="66" y="142" text-anchor="middle" font-family="var(--f-display)" font-size="13" font-style="italic" fill="#555">${s.code} · ${s.cls === 'soon' ? 'soon' : 'stamped'}</text>
          ${s.cls === 'soon' ? '<rect x="9" y="9" width="114" height="142" fill="none" stroke="#777" stroke-width="1.4" stroke-dasharray="5 5"/>' : ''}</svg>
        ${pm}
      </div>
      <span class="g">${s.g}</span>
      <span class="n mono"><b>${s.lang}</b> · ${s.lvl}</span>
    </div>`;
  }).join('');
})();

/* =========================================================
   3D ATLAS
   ========================================================= */
const canvas = document.getElementById('gl'), tapnote = document.getElementById('tapnote'), bubble = document.getElementById('bubble');
const hero = document.getElementById('hero'), chapterEls = [...document.querySelectorAll('.ch')], legsEl = document.getElementById('legs');
const LEGS = [['Brasil', 2], ['Canada', 3], ['Chicama', 6], ['Huayhuash', 7], ['Machu Picchu', 8], ['France', 9]];
if (legsEl) legsEl.innerHTML = LEGS.map(([n, k]) => `<li data-k="${k}">${n}</li>`).join('');
if (legsEl) legsEl.addEventListener('click', e => { const li = e.target.closest('li'); if (!li) return; const el = chapterEls.find(c => +c.dataset.step === +li.dataset.k); if (el) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); });

let world = null;
const GD = document.querySelector('meta[name="gd-page"]'); const WORLD_MODE = (GD && GD.dataset.world) || '';
try { if (window.THREE && canvas && WORLD_MODE) world = initWorld(); } catch (e) { console.warn('3D disabled', e); }

function initWorld() {
  const THREE = window.THREE;
  THREE.ColorManagement.legacyMode = false;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  const small = Math.min(innerWidth, innerHeight) < 700;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, small ? 1.75 : 2));
  renderer.setClearColor(0x000000, 0); renderer.outputEncoding = THREE.sRGBEncoding;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, .1, 900);
  const hemi = new THREE.HemisphereLight(0xffffff, 0xb8ab90, .5);
  const sun = new THREE.DirectionalLight(0xffffff, .58); sun.position.set(-8, 14, 10);
  scene.add(hemi, sun);

  /* ---------- projection & world mapping ---------- */
  const MPW = 4096, MPH = 2600, PX = 25.6;
  const EXT = { type: 'MultiPoint', coordinates: [[-128, 62], [20, 62], [-128, -46], [20, -46]] };
  const proj = window.d3 ? d3.geoNaturalEarth1().rotate([55, 0]).fitExtent([[60, 60], [MPW - 60, MPH - 60]], EXT) : (ll => [(ll[0] + 128) / 148 * MPW, (62 - ll[1]) / 108 * MPH]);
  const W3 = ll => { const p = proj(ll); return new THREE.Vector3((p[0] - MPW / 2) / PX, 0, (p[1] - MPH / 2) / PX); };

  const P = {
    br: [-49.4, -28.2], calgary: [-114.07, 51.05], ca: [-115.3, 51.2], bogota: [-74.07, 4.71], sangil: [-73.13, 6.56], montanita: [-80.75, -1.83],
    mancora: [-81.05, -4.1], chicama: [-79.44, -7.7], huanchaco: [-79.12, -8.08], huaraz: [-77.53, -9.53], huayhuash: [-76.9, -10.27],
    lima: [-77.04, -12.05], cusco: [-71.97, -13.53], machu: [-72.54, -13.16], copacabana: [-69.09, -16.17], lapaz: [-68.15, -16.5],
    uyuni: [-66.83, -20.13], atacama: [-68.2, -22.91], vina: [-71.55, -33.02], santiago: [-70.65, -33.45], baires: [-58.38, -34.6],
    ubatuba: [-45.07, -23.43], rio: [-43.17, -22.9], floripa: [-48.55, -27.6], portoalegre: [-51.2, -30.03], france: [5.2, 45.4]
  };
  /* route: legs in order, flights marked */
  const LEGDEF = [
    [['br', 'ca'], 1],
    [['ca', 'bogota'], 1],
    [['bogota', 'sangil', 'bogota', 'montanita', 'mancora', 'chicama'], 0],
    [['chicama', 'huanchaco', 'huaraz', 'huayhuash'], 0],
    [['huayhuash', 'lima', 'cusco', 'machu'], 0],
    [['machu', 'copacabana', 'lapaz', 'uyuni', 'atacama', 'vina', 'santiago', 'baires', 'ubatuba', 'rio', 'floripa', 'portoalegre'], 0],
    [['portoalegre', 'calgary'], 1],
    [['calgary', 'france'], 1]
  ];
  const RP = []; // {v, d, fl}
  const FLIGHTS = []; // [d0, d1]
  let dist = 0;
  const pushPt = (v, fl) => { if (RP.length) dist += v.distanceTo(RP[RP.length - 1].v); RP.push({ v, d: dist, fl }); };
  LEGDEF.forEach(([keys, fl]) => {
    if (fl) {
      const a = P[keys[0]], b = P[keys[1]], it = window.d3 ? d3.geoInterpolate(a, b) : (t => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)]);
      const d0 = dist + (RP.length ? W3(a).distanceTo(RP[RP.length - 1].v) : 0);
      for (let i = 0; i <= 64; i++) pushPt(W3(it(i / 64)), 1);
      FLIGHTS.push([d0, dist]);
    } else keys.forEach((k, i) => { if (i === 0 && RP.length && RP[RP.length - 1].v.distanceTo(W3(P[k])) < .01) return; pushPt(W3(P[k]), 0); });
  });
  const total = dist;
  const nearestD = ll => { const v = W3(ll); let best = 0, bd = 1e9; RP.forEach(p => { const d = p.v.distanceTo(v); if (d < bd) { bd = d; best = p.d; } }); return best; };
  const D = { br: 0, ca: nearestD(P.ca), chicama: nearestD(P.chicama), huayhuash: nearestD(P.huayhuash), machu: nearestD(P.machu), france: total };
  function routeAt(d) {
    d = clamp(d, 0, total); let lo = 0, hi = RP.length - 1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (RP[m].d <= d) lo = m; else hi = m; }
    const a = RP[lo], b = RP[hi], t = b.d > a.d ? (d - a.d) / (b.d - a.d) : 0;
    const v = a.v.clone().lerp(b.v, t), dir = b.v.clone().sub(a.v);
    let fl = null; for (const f of FLIGHTS) if (d >= f[0] - .01 && d <= f[1] + .01) fl = { t: clamp((d - f[0]) / (f[1] - f[0])), len: f[1] - f[0] };
    return { v, dir, fl };
  }

  /* ---------- vector map: real geometry + DOM labels, crisp at any zoom ---------- */
  const mapGroup = new THREE.Group(); mapGroup.renderOrder = -2; scene.add(mapGroup);
  const RB = new THREE.Box3(); RP.forEach(p => RB.expandByPoint(p.v));
  const MC = RB.getCenter(new THREE.Vector3());
  const fadeU = { uOp: { value: 0 }, uC: { value: new THREE.Vector2(MC.x, MC.z + 4) }, uR0: { value: 40 }, uR1: { value: 96 } };
  const fadeMat = (col, a, dashed) => new THREE.ShaderMaterial({ transparent: true, depthWrite: false,
    uniforms: Object.assign({ uCol: { value: new THREE.Vector3(...col) }, uA: { value: a } }, fadeU),
    vertexShader: `attribute float aD; varying vec2 vP; varying float vD; void main(){ vec4 w = modelMatrix * vec4(position, 1.); vP = w.xz; vD = aD; gl_Position = projectionMatrix * viewMatrix * w; }`,
    fragmentShader: `uniform vec3 uCol; uniform float uA, uOp, uR0, uR1; uniform vec2 uC; varying vec2 vP; varying float vD;
      void main(){ ${dashed ? 'if (fract(vD * ' + dashed + ') > .45) discard;' : ''} float f = 1. - smoothstep(uR0, uR1, length(vP - uC)); gl_FragColor = vec4(uCol, uA * uOp * f); }` });
  const MAT = { sea: fadeMat([1, 1, 1], .55), land: fadeMat([.86, .88, .82], 1), coast: fadeMat([.09, .13, .17], .62), border: fadeMat([.09, .13, .17], .22), grat: fadeMat([.66, .54, .41], .45, 1.2), ghost: fadeMat([.09, .13, .17], .4, 1.6), lead: fadeMat([.09, .13, .17], .4) };
  const sea = new THREE.Mesh(new THREE.CircleGeometry(100, 96), MAT.sea); sea.rotation.x = -Math.PI / 2; sea.position.set(MC.x, -.02, MC.z + 4); mapGroup.add(sea);
  const toW = (x, y) => [(x - MPW / 2) / PX, (y - MPH / 2) / PX];
  const proj2 = proj.clipExtent ? proj.clipExtent([[-400, -400], [MPW + 400, MPH + 400]]) : proj;
  // record d3 path output as polylines in world space
  function record(geo) { const lines = []; let cur = null;
    const ctx = { moveTo(x, y) { cur = [toW(x, y)]; lines.push(cur); }, lineTo(x, y) { cur.push(toW(x, y)); }, closePath() { if (cur && cur.length) cur.push(cur[0].slice()); }, arc() {} };
    d3.geoPath(proj2, ctx)(geo); return lines; }
  function lineMesh(lines, mat, y, withDist) { const pos = [], ad = [];
    lines.forEach(l => { let d = 0; for (let i = 0; i < l.length - 1; i++) { const [x0, z0] = l[i], [x1, z1] = l[i + 1]; const seg = Math.hypot(x1 - x0, z1 - z0); pos.push(x0, y, z0, x1, y, z1); ad.push(d, d + seg); d += seg; } });
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('aD', new THREE.Float32BufferAttribute(ad, 1));
    const m = new THREE.LineSegments(g, mat); mapGroup.add(m); return m; }
  const ringArea = r => { let a = 0; for (let i = 0; i < r.length - 1; i++) a += r[i][0] * r[i + 1][1] - r[i + 1][0] * r[i][1]; return a / 2; };
  const pip = (pt, r) => { let ins = false; for (let i = 0, j = r.length - 1; i < r.length; j = i++) { const [xi, yi] = r[i], [xj, yj] = r[j]; if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi + 1e-12) + xi) ins = !ins; } return ins; };
  function landMesh(rings) {
    rings = rings.filter(r => r.length > 3 && Math.abs(ringArea(r)) > .002);
    if (!rings.length) return;
    const big = rings.reduce((m, r) => Math.abs(ringArea(r)) > Math.abs(ringArea(m)) ? r : m, rings[0]), outSign = Math.sign(ringArea(big));
    const outer = rings.filter(r => Math.sign(ringArea(r)) === outSign), holes = rings.filter(r => Math.sign(ringArea(r)) !== outSign);
    const shapes = outer.map(r => new THREE.Shape(r.map(([x, z]) => new THREE.Vector2(x, -z))));
    holes.forEach(h => { const i = outer.findIndex(o => pip(h[0], o)); if (i >= 0) shapes[i].holes.push(new THREE.Path(h.map(([x, z]) => new THREE.Vector2(x, -z)))); });
    const g = new THREE.ShapeGeometry(shapes); g.rotateX(-Math.PI / 2); g.setAttribute('aD', new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count), 1));
    const m = new THREE.Mesh(g, MAT.land); m.position.y = .005; mapGroup.add(m);
  }
  // DOM labels: handwriting (CSS mask) and set type, sized from the camera every frame
  const labelHost = document.createElement('div'); labelHost.className = 'maplabels'; labelHost.setAttribute('aria-hidden', 'true'); document.body.appendChild(labelHost);
  const LABELS = [];
  const HAND_AR = { calgary: 523 / 157, montanita: 463 / 110, chicama: 385 / 103, huayhuash: 811 / 196, 'machu-picchu': 543 / 145, 'la-paz': 442 / 105, uyuni: 361 / 163, atacama: 553 / 108, 'buenos-aires': 493 / 169, rio: 580 / 102, florianopolis: 478 / 124, '260-dias': 269 / 62 };
  const HAND_NATIVE = { calgary: 157, montanita: 110, chicama: 103, huayhuash: 196, 'machu-picchu': 145, 'la-paz': 105, uyuni: 163, atacama: 108, 'buenos-aires': 169, rio: 102, florianopolis: 124, '260-dias': 62 };
  const HAND_LABELS = { calgary: ['calgary', 30, -70, 70, 'start'], montanita: ['montanita', -36, -30, 50, 'end'], chicama: ['chicama', -36, 6, 50, 'end'],
    huayhuash: ['huayhuash', -40, 40, 70, 'end'], machu: ['machu-picchu', 40, -60, 64, 'start'], lapaz: ['la-paz', 40, -6, 50, 'start'],
    uyuni: ['uyuni', 40, 30, 66, 'start'], atacama: ['atacama', -38, 34, 50, 'end'], baires: ['buenos-aires', -40, 56, 64, 'end'], rio: ['rio', 40, -46, 50, 'start'], floripa: ['florianopolis', 46, 8, 54, 'start'] };
  function addLabel(el, x, z, hWorld, align, maxPx, kind) { el.style.position = 'absolute'; el.style.left = '0'; el.style.top = '0'; labelHost.appendChild(el); LABELS.push({ el, v: new THREE.Vector3(x, .05, z), h: hWorld, align, maxPx, kind }); }
  const leaderLines = [];
  for (const k in HAND_LABELS) {
    const [f, dx, dy, h, al] = HAND_LABELS[k], [px, py] = proj(P[k]);
    const ax = px + dx, ay = py + dy; leaderLines.push([toW(px, py), toW(ax, ay)]);
    const el = document.createElement('i'); el.className = 'hw ml'; el.style.webkitMaskImage = el.style.maskImage = `url(assets/hand/${f}.png)`; el.style.aspectRatio = HAND_AR[f];
    const [wx, wz] = toW(ax, ay); addLabel(el, wx, wz, h / PX, al, Math.min(52, HAND_NATIVE[f]), 'hand');
  }
  { const [px, py] = proj([-30, -2]), [wx, wz] = toW(px, py), el = document.createElement('div'); el.className = 'ml d260';
    el.innerHTML = `<i class="hw" style="-webkit-mask-image:url(assets/hand/260-dias.png);mask-image:url(assets/hand/260-dias.png);aspect-ratio:269/62"></i><span class="mono">(260 days!!)</span>`; addLabel(el, wx, wz, 4.2, 'center', 90, 'hand'); }
  [['Pacific Ocean', [-112, 6], 'ocean'], ['Atlantic Ocean', [-36, 26], 'ocean'], ['CANADA', [-104, 57], 'country'], ['BRASIL', [-53, -10], 'country'], ['COLOMBIA', [-72.5, 3], 'country'], ['PERÚ', [-74.5, -8.5], 'country'],
    ['BOLIVIA', [-64, -15.5], 'country'], ['CHILE', [-75.8, -27], 'country'], ['ARGENTINA', [-64.5, -37], 'country'], ['ECUADOR', [-77.5, -1.4], 'country'], ['FRANCE', [1, 47.5], 'country']].forEach(([t, ll, kind]) => {
    const [px, py] = proj(ll), [wx, wz] = toW(px, py), el = document.createElement('span'); el.className = 'ml ' + kind; el.textContent = t; addLabel(el, wx, wz, kind === 'ocean' ? 2.6 : 1.3, 'center', kind === 'ocean' ? 44 : 22, kind); });
  const STOPS = ['bogota', 'sangil', 'montanita', 'mancora', 'chicama', 'huanchaco', 'huaraz', 'huayhuash', 'lima', 'cusco', 'machu', 'copacabana', 'lapaz', 'uyuni', 'atacama', 'vina', 'santiago', 'baires', 'ubatuba', 'rio', 'floripa', 'portoalegre', 'calgary'];
  const dotGeo = new THREE.CircleGeometry(.24, 24); dotGeo.rotateX(-Math.PI / 2); const ringGeo = new THREE.RingGeometry(.24, .34, 24); ringGeo.rotateX(-Math.PI / 2);
  const dotMat = new THREE.MeshBasicMaterial({ color: 0xf7f8f3, transparent: true }), ringMat = new THREE.MeshBasicMaterial({ color: 0x17222a, transparent: true });
  STOPS.forEach(k => { const v = W3(P[k]); const d = new THREE.Mesh(dotGeo, dotMat); d.position.set(v.x, .09, v.z); const r = new THREE.Mesh(ringGeo, ringMat); r.position.set(v.x, .1, v.z); mapGroup.add(d, r); });
  function buildMap(topoLand, topoCountries) {
    const landF = topojson.feature(topoLand, topoLand.objects.land);
    landF.features ? landF.features.forEach(f => landMesh(record(f))) : landMesh(record(landF));
    lineMesh(record(topojson.mesh(topoLand, topoLand.objects.land)), MAT.coast, .02);
    lineMesh(record(topojson.mesh(topoCountries, topoCountries.objects.countries, (a, b) => a !== b)), MAT.border, .015);
    lineMesh(record(d3.geoGraticule().step([10, 10])()), MAT.grat, .01);
    lineMesh([RP.map(p => [p.v.x, p.v.z])], MAT.ghost, .03);
    lineMesh(leaderLines, MAT.lead, .03);
  }
  if (window.d3 && window.topojson) Promise.all(['assets/data/land-50m.json', 'assets/data/countries-50m.json'].map(u => fetch(u).then(r => r.json())))
    .then(([l, c]) => buildMap(l, c)).catch(e => console.warn('map data', e));
  const _v = new THREE.Vector3(), _r = new THREE.Vector3();
  function updateLabels(op, focus) {
    labelHost.style.opacity = op; labelHost.style.visibility = op > .01 ? 'visible' : 'hidden'; if (op <= .01) return;
    _r.setFromMatrixColumn(camera.matrixWorld, 0);
    const rect = canvas.getBoundingClientRect(), dist = camera.position.distanceTo(camT);
    for (const L of LABELS) {
      _v.copy(L.v).project(camera);
      if (_v.z > 1 || Math.abs(_v.x) > 1.3 || Math.abs(_v.y) > 1.3) { L.el.style.display = 'none'; continue; }
      const sx = (_v.x + 1) / 2 * rect.width, sy = (1 - _v.y) / 2 * rect.height;
      const b = L.v.clone().addScaledVector(_r, L.h).project(camera); const ppw = Math.hypot((b.x - _v.x) / 2 * rect.width, (b.y - _v.y) / 2 * rect.height);
      let hpx = Math.min(L.maxPx, ppw);
      if (hpx < (L.kind === 'hand' ? 10 : 7)) { L.el.style.display = 'none'; continue; }
      let a = 1; if (focus && dist < 45) { const dd = Math.hypot(L.v.x - focus.x, L.v.z - focus.z); a = smooth(6, 11, dd); }
      if (a < .02) { L.el.style.display = 'none'; continue; }
      L.el.style.display = '';
      L.el.style.opacity = a;
      if (L.kind === 'hand') L.el.style.height = hpx + 'px'; else L.el.style.fontSize = hpx + 'px';
      const tx = L.align === 'end' ? '-100%' : L.align === 'center' ? '-50%' : '0';
      L.el.style.transform = `translate(${sx}px, ${sy}px) translate(${tx}, -50%)`;
    }
  }
  function mapTheme() {
    const ink = hex3(css('--ink')), p3 = hex3(css('--paper-3')), sea = hex3(css('--sea')), con = hex3(css('--contour'));
    MAT.land.uniforms.uCol.value.set(...p3); MAT.sea.uniforms.uCol.value.set(...sea);
    [MAT.coast, MAT.border, MAT.ghost, MAT.lead].forEach(m => m.uniforms.uCol.value.set(...ink)); MAT.grat.uniforms.uCol.value.set(...con);
    ringMat.color.setRGB(...ink.map(v => Math.pow(v, 2.2))); dotMat.color.setRGB(...hex3(css('--sheet')).map(v => Math.pow(v, 2.2)));
  }

  /* ---------- route ribbon ---------- */
  const ribbon = (() => {
    const n = RP.length, pos = new Float32Array(n * 6), nrm = new Float32Array(n * 4), side = new Float32Array(n * 2), dd = new Float32Array(n * 2), fl = new Float32Array(n * 2), idx = [];
    for (let i = 0; i < n; i++) {
      const a = RP[Math.max(0, i - 1)].v, b = RP[Math.min(n - 1, i + 1)].v; let tx = b.x - a.x, tz = b.z - a.z; const l = Math.hypot(tx, tz) || 1; tx /= l; tz /= l;
      for (let s = 0; s < 2; s++) { const k = i * 2 + s; pos.set([RP[i].v.x, .06, RP[i].v.z], k * 3); nrm.set([-tz, tx], k * 2); side[k] = s ? 1 : -1; dd[k] = RP[i].d; fl[k] = (RP[i].fl && (i + 1 < n ? RP[i + 1].fl : 1)) ? 1 : 0; }
      if (i < n - 1) { const k = i * 2; idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); }
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('aNrm', new THREE.BufferAttribute(nrm, 2));
    g.setAttribute('aSide', new THREE.BufferAttribute(side, 1)); g.setAttribute('aDist', new THREE.BufferAttribute(dd, 1)); g.setAttribute('aFl', new THREE.BufferAttribute(fl, 1)); g.setIndex(idx);
    const m = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, side: THREE.DoubleSide,
      uniforms: { uProg: { value: 0 }, uW: { value: .3 }, uCol: { value: new THREE.Vector3(.18, .39, .66) }, uOp: { value: 0 } },
      vertexShader: `attribute vec2 aNrm; attribute float aSide, aDist, aFl; uniform float uW; varying float vD, vF;
        void main(){ vec3 p = position + vec3(aNrm.x, 0., aNrm.y) * aSide * uW; vD = aDist; vF = aFl; gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.); }`,
      fragmentShader: `uniform float uProg, uOp; uniform vec3 uCol; varying float vD, vF;
        void main(){ if (vD > uProg) discard; if (vF > .5 && fract(vD / 1.6) > .55) discard; gl_FragColor = vec4(uCol, uOp); }` });
    const mesh = new THREE.Mesh(g, m); mesh.renderOrder = -1; scene.add(mesh); return m;
  })();

  /* ---------- toon + outline helpers ---------- */
  const grad = new THREE.DataTexture(new Uint8Array([125, 125, 125, 255, 200, 200, 200, 255, 255, 255, 255, 255]), 3, 1, THREE.RGBAFormat);
  grad.magFilter = grad.minFilter = THREE.NearestFilter; grad.needsUpdate = true;
  const mats = {}; const M = c => mats[c] || (mats[c] = new THREE.MeshToonMaterial({ color: c, gradientMap: grad }));
  const outline = t => { const m = new THREE.MeshBasicMaterial({ color: 0x17222a, side: THREE.BackSide });
    m.onBeforeCompile = s => { s.vertexShader = s.vertexShader.replace('#include <begin_vertex>', `vec3 transformed = position + normal * ${t.toFixed(3)};`); }; return m; };
  const OL = outline(.03), OLs = outline(.02);
  const pickables = [];
  function mk(geo, mat, x = 0, y = 0, z = 0, parent, ol = OL, pick) {
    const m = new THREE.Mesh(geo, typeof mat === 'string' ? M(mat) : mat); m.position.set(x, y, z);
    if (ol) m.add(new THREE.Mesh(geo, ol)); parent.add(m); if (pick) pickables.push(m); return m;
  }
  const cap = (r, l) => new THREE.CapsuleGeometry(r, l, 5, 12);
  const lineMat = new THREE.LineBasicMaterial({ color: 0x17222a, transparent: true, opacity: .5 });

  /* ---------- dioramas: smooth laser-cut contour layers ---------- */
  const R = 4, LEVELS = 16, STEP = .17, BASE_T = .3, BASE_H = 1.5 / LEVELS;
  const fall = (x, z) => 1 - smooth(.8, .97, Math.hypot(x, z) / R);
  const g2 = (x, z, cx, cz, s) => Math.exp(-((x - cx) ** 2 + (z - cz) ** 2) / s);
  const flat = (x, z, seed) => { const nz = seed ? fbm2 : fbm;
    let h = .075 + .34 * Math.max(0, nz(x * .32 + 1, z * .32 + 2) - .42) + .36 * g2(x, z, -1.8, -1.5, 2.2) + .2 * g2(x, z, 2.1, -1.3, 1.3);
    h -= .065 * g2(x, z, 1.7, 1.4, .55); const k = smooth(.9, 1.7, Math.hypot(x, z - .3)); return .08 * (1 - k) + h * k; };
  const surfZ = x => -.45 + .55 * Math.sin(x * .45);
  const SC = [
    { key: 'desk', h: (x, z) => { const r = Math.hypot(x, z), a = Math.atan2(z, x), ring = smooth(1.9, 3.0, r) * smooth(.35, -1.2, z / R);
        return .08 + ring * (.42 + .55 * fbm(Math.cos(a) * 2.2 + 5, Math.sin(a) * 2.2 + 5)) * (.9 + .2 * fbm(x * 2, z * 2)) - .07 * g2(x, z, 2.2, 1.6, .45); },
      water: '#a9c6d8', stops: [[0, '#d9dfcc'], [.3, '#bfcaa9'], [.48, '#a3a898'], [.6, '#dde0da'], [1, '#ffffff']], fig: [0, .7], yaw: .45, pose: 'type', outfit: 'desk', cam: [.42, .5, 26] },
    { key: 'brazil', rim: .03, h: (x, z) => { const inl = smooth(-1.3, 1.5, -(x * .55 + z * .83));
        return .03 + inl * (.075 + .55 * g2(x, z, -1.6, -1.9, 2.6) + .32 * g2(x, z, .7, -2.5, 1.1) + .12 * fbm(x * .8, z * .8)); },
      water: '#3f9ba7', stops: [[0, '#ead9a6'], [.08, '#b9cf8f'], [.4, '#79a566'], [1, '#3c6844']], fig: [-.1, -.25], yaw: .95, pose: 'strum', outfit: 'brazil', cam: [.8, .45, 27] },
    { key: 'summit', h: (x, z) => Math.min(.93, .07 + .9 * g2(x, z, .7, -.5, 3.4) + .2 * g2(x, z, -.9, -1.2, 1.6) * (.6 + fbm(x, z)) + .09 * fbm(x * .9 + 4, z * .9)),
      water: '#b9d0de', stops: [[0, '#dfe5d2'], [.28, '#bccaa5'], [.52, '#a6a99a'], [.7, '#d2d5cf'], [.76, '#f7f8f5'], [1, '#ffffff']], fig: [.7, -.5], yaw: .25, pose: 'sweep', outfit: 'summit', cam: [.25, .42, 28] },
    { key: 'snow', h: (x, z) => .1 + .62 * smooth(-3.4, 3.2, -z) + .06 * fbm(x * .8, z * .8 + 3) + .12 * g2(x, z, -1.6, -1.6, 2.5),
      water: '#dfe7ee', stops: [[0, '#eef2f4'], [1, '#ffffff']], fig: [.4, .55], yaw: -Math.PI / 2, pose: 'ride', outfit: 'snow', cam: [-.8, .4, 28] },
    { key: 'train', h: (x, z) => flat(x, z, 1),
      water: '#c4d6e3', stops: [[0, '#e3e3d6'], [.5, '#d2d0bc'], [1, '#c4bfa6']], fig: [0, .55], yaw: .85, pose: 'swing', outfit: 'train', cam: [.85, .45, 27] },
    { key: 'surf', rim: .03, h: (x, z) => { const d = z - surfZ(x), prof = d > 0 ? Math.exp(-d * d / .08) : Math.exp(-d * d / .55);
        return .03 + .72 * prof * smooth(-4.3, 1.9, x) * (1 + .1 * fbm(x * 1.4, z)) + .03 * fbm(x * 1.6, z * 1.6 + 5); },
      water: '#2f8e9b', stops: [[0, '#4aa8b0'], [.25, '#66bdbe'], [.5, '#a6ddd6'], [.66, '#e7f6f2'], [1, '#ffffff']], fig: [.55, surfZ(.55) + .36], yaw: 0, pose: 'surf', outfit: 'surf', cam: [.12, .34, 27] },
    { key: 'andes', h: (x, z) => { let h = .08 + .05 * fbm(x, z);
        [[-1.3, -1.4, .92, 1.1], [.7, -1.9, .8, .9], [1.9, -.5, .66, .8], [-2.2, .3, .55, .7]].forEach(([cx, cz, a, s]) => { h = Math.max(h, a * g2(x, z, cx, cz, s) * (.85 + .3 * fbm(x * 2, z * 2))); });
        return h * smooth(.6, 1.5, Math.hypot(x - .6, z - .9)) + .015; },
      water: '#71c1bb', stops: [[0, '#dcd5ba'], [.28, '#c6b48f'], [.5, '#a39a8c'], [.68, '#cdcdc8'], [.74, '#f6f7f4'], [1, '#ffffff']], fig: [-.4, .5], yaw: -.55, pose: 'summit', outfit: 'andes', cam: [-.55, .44, 28] },
    { key: 'terraces', h: (x, z) => .04 + .58 * g2(x, z, .3, .3, 5.2) + .92 * g2(x, z, -1.4, -1.6, .55) + .04 * fbm(x, z),
      water: '#b4cdd6', stops: [[0, '#d2dbb2'], [.4, '#a9c387'], [.72, '#7ea46a'], [1, '#5f7f52']], fig: [1.25, 1.05], yaw: .8, pose: 'hips', outfit: 'andes2', cam: [.8, .44, 28] }
  ];
  const FH = (si, x, z) => { const rim = SC[si].rim ?? BASE_H; return rim + (clamp(SC[si].h(x, z)) - rim) * fall(x, z); };
  const levelOf = (si, x, z) => Math.floor(FH(si, x, z) * LEVELS + .001);
  const topY = (si, x, z) => BASE_T + levelOf(si, x, z) * STEP;
  const levelColor = (sc, L) => {
    if (L === 0) return sc.water;
    const t = (L - 1) / (LEVELS - 2); let k = 0; while (k < sc.stops.length - 2 && t > sc.stops[k + 1][0]) k++;
    const [t0, c0] = sc.stops[k], [t1, c1] = sc.stops[k + 1], u = clamp((t - t0) / (t1 - t0)), A = hex3(c0), B = hex3(c1);
    const alt = L % 2 ? .97 : 1; const c = A.map((v, i) => (v + (B[i] - v) * u) * alt);
    return '#' + c.map(v => Math.round(clamp(v) * 255).toString(16).padStart(2, '0')).join('');
  };
  const chaikin = ring => { const out = []; for (let i = 0; i < ring.length - 1; i++) { const a = ring[i], b = ring[i + 1]; out.push([a[0] * .75 + b[0] * .25, a[1] * .75 + b[1] * .25], [a[0] * .25 + b[0] * .75, a[1] * .25 + b[1] * .75]); } out.push(out[0]); return out; };
  // strata side
  const strataMat = new THREE.ShaderMaterial({ uniforms: { uA: { value: new THREE.Vector3(.93, .94, .9) }, uB: { value: new THREE.Vector3(.86, .88, .83) }, uInk: { value: new THREE.Vector3(.09, .13, .17) } },
    vertexShader: `varying float vY; varying vec3 vN; void main(){ vY = position.y; vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `uniform vec3 uA, uB, uInk; varying float vY; varying vec3 vN;
      void main(){ float s = (${(BASE_T / 2).toFixed(3)} - vY) / .05; vec3 c = mod(floor(s), 2.0) < 1.0 ? uA : uB;
        c = mix(c, uInk, smoothstep(${(BASE_T / 2 - .012).toFixed(3)}, ${(BASE_T / 2).toFixed(3)}, vY) * .85);
        c *= .84 + .16 * clamp(vN.x * .5 + .5, 0., 1.); gl_FragColor = vec4(c, 1.); }` });
  const shTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d'); const g = x.createRadialGradient(64, 64, 18, 64, 64, 64); g.addColorStop(0, 'rgba(10,20,26,.34)'); g.addColorStop(1, 'rgba(10,20,26,0)'); x.fillStyle = g; x.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c); })();

  function buildDiorama(si) {
    const sc = SC[si], root = new THREE.Group(), n = 120, E = R + .35, cell = 2 * E / (n - 1);
    const vals = new Float64Array(n * n);
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) { const x = -E + i * cell, z = -E + j * cell, r = Math.hypot(x, z);
      vals[j * n + i] = r <= R ? FH(si, x, z) : FH(si, x * R / r, z * R / r) - (r - R) * 3; }
    const thr = []; for (let L = 1; L < LEVELS; L++) thr.push(L / LEVELS);
    const cont = d3.contours().size([n, n]).thresholds(thr)(Array.from(vals));
    const toW = p => [-E + (p[0] - .5) * cell, -E + (p[1] - .5) * cell];
    const layers = [];
    cont.forEach((mp, li) => {
      const L = li + 1, shapes = [];
      mp.coordinates.forEach(poly => {
        const rings = poly.map(ring => chaikin(ring.map(toW))).filter(r => r.length > 5);
        if (!rings.length) return;
        const sh = new THREE.Shape(rings[0].map(([x, z]) => new THREE.Vector2(x, -z)));
        rings.slice(1).forEach(h => sh.holes.push(new THREE.Path(h.map(([x, z]) => new THREE.Vector2(x, -z)))));
        shapes.push(sh);
      });
      if (!shapes.length) return;
      let geo; try { geo = new THREE.ExtrudeGeometry(shapes, { depth: STEP * .999, bevelEnabled: false, curveSegments: 1 }); } catch (e) { return; }
      geo.rotateX(-Math.PI / 2);
      const mesh = new THREE.Mesh(geo, M(levelColor(sc, L)));
      mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 35), lineMat));
      root.add(mesh); layers.push({ mesh, L });
    });
    const base = new THREE.Group(); root.add(base);
    const bt = new THREE.Mesh(new THREE.CylinderGeometry(R + .03, R + .03, .02, 128), M(sc.water)); bt.position.y = BASE_T - .01; base.add(bt);
    const bs = new THREE.Mesh(new THREE.CylinderGeometry(R + .03, R + .03, BASE_T, 128, 1, true), strataMat); bs.position.y = BASE_T / 2; base.add(bs);
    const rim = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.CylinderGeometry(R + .03, R + .03, BASE_T, 128), 30), lineMat); rim.position.y = BASE_T / 2; base.add(rim);
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(R * 3.1, R * 3.1), new THREE.MeshBasicMaterial({ map: shTex, transparent: true, depthWrite: false })); shadow.rotation.x = -Math.PI / 2; shadow.position.y = .02; root.add(shadow);
    const props = new THREE.Group(); root.add(props);
    buildProps(si, props);
    root.visible = false; scene.add(root);
    return { root, layers, base, props, shadow, si };
  }
  const yAt = (si, x, z) => topY(si, x, z);
  function place(si, g, parent, x, z, yaw = 0) { g.position.set(x, yAt(si, x, z), z); g.rotation.y = yaw; parent.add(g); return g; }
  function deskSet() {
    const g = new THREE.Group();
    mk(new THREE.BoxGeometry(.42, .05, .4), '#b98552', 0, .33, -.05, g, OLs);
    mk(new THREE.BoxGeometry(.42, .38, .05), '#b98552', 0, .54, -.26, g, OLs);
    [[-.18, -.22], [.18, -.22], [-.18, .12], [.18, .12]].forEach(([x, z]) => mk(new THREE.BoxGeometry(.04, .32, .04), '#8a5f3a', x, .16, z, g, null));
    mk(new THREE.BoxGeometry(1.15, .05, .55), '#c99a66', 0, .52, .52, g, OLs);
    [[-.52, .3], [.52, .3], [-.52, .74], [.52, .74]].forEach(([x, z]) => mk(new THREE.BoxGeometry(.05, .5, .05), '#8a5f3a', x, .25, z, g, null));
    mk(new THREE.BoxGeometry(.38, .02, .26), '#9aa3ad', .08, .555, .5, g, OLs);
    const lid = mk(new THREE.BoxGeometry(.38, .26, .02), '#9aa3ad', .08, .69, .62, g, OLs); lid.rotation.x = .28;
    const fl = new THREE.Mesh(new THREE.PlaneGeometry(.09, .06), M('#2f9a4d')); fl.position.set(.02, .01, .012); lid.add(fl);
    const di = new THREE.Mesh(new THREE.PlaneGeometry(.045, .045), M('#f2cf3a')); di.rotation.z = Math.PI / 4; di.position.set(.02, .01, .013); lid.add(di);
    const pad = mk(new THREE.BoxGeometry(.24, .17, .015), '#1f262d', -.33, .64, .6, g, OLs); pad.rotation.x = .35;
    const gd = new THREE.Group(); gd.position.set(.44, .55, .4); g.add(gd);
    mk(new THREE.CylinderGeometry(.055, .04, .11, 12), '#8a5a33', 0, .055, 0, gd, OLs); mk(new THREE.CylinderGeometry(.05, .05, .01, 12), '#6f9a3c', 0, .11, 0, gd, null);
    const st = mk(new THREE.CylinderGeometry(.008, .008, .16, 6), '#c9ccd0', .015, .16, 0, gd, null); st.rotation.z = -.25;
    return g;
  }
  const tree = (s, c1 = '#3e6150', c2 = '#4a705c') => { const g = new THREE.Group(); mk(new THREE.CylinderGeometry(.05 * s, .07 * s, .25 * s, 6), '#6b4b33', 0, .12 * s, 0, g, null);
    mk(new THREE.ConeGeometry(.32 * s, .55 * s, 8), c1, 0, .45 * s, 0, g, OLs); mk(new THREE.ConeGeometry(.22 * s, .4 * s, 8), c2, 0, .72 * s, 0, g, OLs); return g; };
  const palm = (s, lean) => { const g = new THREE.Group(); let x = 0, y = 0;
    for (let i = 0; i < 5; i++) { const seg = mk(new THREE.CylinderGeometry(.045 * s, .06 * s, .26 * s, 7), '#8a6a45', x, y + .13 * s, 0, g, OLs); seg.rotation.z = -lean * (i + 1) * .12; x += Math.sin(lean * (i + 1) * .12) * .26 * s; y += .25 * s; }
    for (let k = 0; k < 6; k++) { const lf = mk(new THREE.ConeGeometry(.08 * s, .62 * s, 4), '#4f8f4a', x, y, 0, g, OLs); lf.scale.z = .25; lf.rotation.set(0, k * Math.PI / 3, Math.PI / 2 + .45); lf.position.set(x + Math.cos(k * Math.PI / 3) * .26 * s, y - .06 * s, -Math.sin(k * Math.PI / 3) * .26 * s); lf.lookAt(x + Math.cos(k * Math.PI / 3) * 2, y - .9, -Math.sin(k * Math.PI / 3) * 2); lf.rotateX(Math.PI / 2); }
    return g; };
  const boards = {};
  function buildProps(si, P0) {
    const sc = SC[si], [fx, fz] = sc.fig;
    if (sc.key === 'desk') place(si, deskSet(), P0, fx, fz, sc.yaw);
    if (sc.key === 'brazil') {
      { const g = new THREE.Group(); mk(new THREE.CylinderGeometry(.17, .19, .34, 12), '#7a5638', 0, .17, -.02, g, OLs); place(si, g, P0, fx, fz, sc.yaw); }
      [[-1.1, -.7, 1.1, .9], [.5, -1.3, .9, -.7], [-1.9, .2, 1, .5], [-.4, -1.9, .8, .3]].forEach(([x, z, s, l]) => place(si, palm(s, l), P0, x, z, x * 2));
      { const g = new THREE.Group(); const b = mk(new THREE.SphereGeometry(1, 16, 8), '#f7e7c4', 0, .4, 0, g, OLs); b.scale.set(.13, .42, .03); place(si, g, P0, .45, -.75, .4); }
    }
    if (sc.key === 'summit') { const g = new THREE.Group(); [.15, .12, .09, .06].reduce((y, r) => { mk(new THREE.DodecahedronGeometry(r), '#9a9c95', 0, y + r, 0, g, OLs); return y + r * 1.6; }, 0); place(si, g, P0, 1.15, -.35); }
    if (sc.key === 'snow') {
      const b = new THREE.Group(); mk(new THREE.BoxGeometry(.95, .03, .22), '#e9e4d6', 0, .02, 0, b, OLs); mk(new THREE.BoxGeometry(.6, .032, .1), '#d4532f', 0, .021, 0, b, null); place(si, b, P0, fx, fz, sc.yaw); boards.snow = b;
      [[-1.8, -.6, 1], [-1.2, 1.4, .8], [1.8, -.2, 1.1], [2.2, 1.2, .8], [-.6, -1.9, .9], [1.1, -1.6, .8], [-2.4, .9, .7]].forEach(([x, z, s]) => place(si, tree(s), P0, x, z));
    }
    if (sc.key === 'train') {
      { const g = new THREE.Group(); mk(new THREE.BoxGeometry(.7, .025, 1.2), '#3b4652', 0, .012, 0, g, OLs); place(si, g, P0, fx, fz, sc.yaw); }
      const city = new THREE.Group(); [[-.9, .5, .9], [-.6, .35, 1.3], [-.3, .4, .8], [0, .3, 1.6], [.3, .45, 1.1], [.6, .3, .7], [.95, .35, 1.0]].forEach(([x, w, h]) => mk(new THREE.BoxGeometry(w, h, .4), '#c9cfd4', x, h / 2, 0, city, OLs));
      mk(new THREE.CylinderGeometry(.05, .08, 1.9, 10), '#d9dde0', 1.35, .95, 0, city, OLs); mk(new THREE.CylinderGeometry(.16, .12, .14, 14), '#c0392b', 1.35, 1.95, 0, city, OLs);
      place(si, city, P0, 0, -2.1);
      [[-2.2, 1.2, .8], [2.3, .9, .7]].forEach(([x, z, s]) => place(si, tree(s), P0, x, z));
    }
    if (sc.key === 'surf') { const b = new THREE.Group(); const m = mk(new THREE.SphereGeometry(1, 20, 10), '#fbfaf5', 0, 0, 0, b, OLs); m.scale.set(.6, .03, .16); mk(new THREE.BoxGeometry(1.0, .012, .03), '#d4532f', 0, .03, 0, b, null); place(si, b, P0, fx, fz, 0); b.position.y += .05; boards.surf = b; }
    if (sc.key === 'andes') { [[.6, .3, .4, '#e0703a'], [.15, .05, -.3, '#3d7fb8']].forEach(([x, z, yaw, c]) => { const g = new THREE.Group(); const t = mk(new THREE.ConeGeometry(.42, .46, 4), c, 0, .23, 0, g, OLs); t.rotation.y = Math.PI / 4; t.scale.set(1, 1, 1.4); place(si, g, P0, x, z, yaw); }); }
    if (sc.key === 'terraces') {
      [[.1, -.3], [.75, -.55], [-.25, .45], [.95, .25], [-.6, -.5]].forEach(([x, z], i) => { const g = new THREE.Group(); mk(new THREE.BoxGeometry(.32, .2, .26), '#a19d91', 0, .1, 0, g, OLs);
        const r = mk(new THREE.ConeGeometry(.27, .2, 4), '#b8995c', 0, .3, 0, g, OLs); r.rotation.y = Math.PI / 4; place(si, g, P0, x, z, i * .5); });
      const g = new THREE.Group(), w = '#f0ebdf'; const b = mk(cap(.09, .22), w, 0, .3, 0, g, OLs); b.rotation.z = Math.PI / 2;
      mk(cap(.05, .2), w, .17, .47, 0, g, OLs); mk(new THREE.SphereGeometry(.065, 10, 8), w, .2, .62, 0, g, OLs);
      [[-.12, .05], [-.12, -.05], [.12, .05], [.12, -.05]].forEach(([x, z]) => mk(new THREE.CylinderGeometry(.025, .025, .25, 6), w, x, .12, z, g, null));
      place(si, g, P0, 1.95, .7, -2.2);
    }
  }

  /* ---------- little Gabriel ---------- */
  const SKIN = '#e8b996', HAIR = '#5b3e2b';
  const pm = c => new THREE.MeshToonMaterial({ color: c, gradientMap: grad });
  const MT = { torso: pm('#e6dcc6'), uarm: pm('#e6dcc6'), larm: pm(SKIN), thigh: pm('#2a3540'), shin: pm('#2a3540') };
  const fig = new THREE.Group(); fig.rotation.order = 'YXZ'; scene.add(fig);
  const body = new THREE.Group(); body.scale.setScalar(.75); fig.add(body);
  const hips = new THREE.Group(); body.add(hips);
  const torso = new THREE.Group(); hips.add(torso);
  mk(cap(.2, .34), MT.torso, 0, .34, 0, torso, OL, 1);
  const headG = new THREE.Group(); headG.position.y = .76; torso.add(headG);
  mk(new THREE.SphereGeometry(.18, 20, 14), SKIN, 0, .1, 0, headG, OL, 1);
  const hair = mk(new THREE.SphereGeometry(.19, 20, 10, 0, Math.PI * 2, 0, Math.PI * .5), HAIR, 0, .13, -.015, headG, null, 1); hair.rotation.x = -.3;
  const quiff = mk(new THREE.SphereGeometry(.095, 10, 8), HAIR, .02, .28, .07, headG, null); quiff.scale.set(1.55, .7, 1);
  mk(new THREE.SphereGeometry(.178, 16, 8, 0, Math.PI * 2, Math.PI * .56, Math.PI * .32), HAIR, 0, .1, .006, headG, null);
  const eyes = new THREE.Group(); headG.add(eyes); [-.062, .062].forEach(x => mk(new THREE.SphereGeometry(.022, 8, 6), '#17222a', x, .13, .16, eyes, null));
  const glasses = new THREE.Group(); headG.add(glasses);
  [-.066, .066].forEach(x => { const r = new THREE.Mesh(new THREE.TorusGeometry(.05, .012, 6, 18), M('#4a2c25')); r.position.set(x, .13, .175); glasses.add(r); });
  { const b = new THREE.Mesh(new THREE.BoxGeometry(.04, .012, .012), M('#4a2c25')); b.position.set(0, .14, .18); glasses.add(b); }
  const shades = new THREE.Group(); headG.add(shades);
  [-.066, .066].forEach(x => { const r = new THREE.Mesh(new THREE.BoxGeometry(.1, .065, .02), M('#1d2a44')); r.position.set(x, .13, .175); shades.add(r); });
  const capHat = new THREE.Group(); headG.add(capHat); mk(new THREE.SphereGeometry(.2, 16, 10, 0, Math.PI * 2, 0, Math.PI * .5), '#3f5a3a', 0, .14, -.01, capHat, OLs);
  { const brim = mk(new THREE.CylinderGeometry(.16, .16, .02, 16, 1, false, 0, Math.PI), '#3f5a3a', 0, .16, .08, capHat, null); brim.rotation.y = -Math.PI / 2; brim.scale.z = .9; }
  const helmet = new THREE.Group(); headG.add(helmet);
  mk(new THREE.SphereGeometry(.205, 16, 10, 0, Math.PI * 2, 0, Math.PI * .56), '#cfd84a', 0, .11, -.01, helmet, OLs); mk(new THREE.BoxGeometry(.31, .08, .06), '#4b63d6', 0, .13, .16, helmet, OLs);
  const beanie = new THREE.Group(); headG.add(beanie); mk(new THREE.SphereGeometry(.2, 16, 10, 0, Math.PI * 2, 0, Math.PI * .52), '#c4532f', 0, .13, -.01, beanie, OLs); mk(new THREE.SphereGeometry(.05, 8, 6), '#e9e1cf', 0, .33, -.01, beanie, null);
  const phones = new THREE.Group(); headG.add(phones); { const band = mk(new THREE.TorusGeometry(.2, .018, 6, 16, Math.PI), '#f2f2ee', 0, .13, 0, phones, null); band.rotation.z = 0;
    [-.2, .2].forEach(x => mk(new THREE.CylinderGeometry(.06, .06, .05, 12), '#f2f2ee', x, .1, 0, phones, OLs).rotation.z = Math.PI / 2); }
  function limb(parent, x, y, up, lo, r1, r2) {
    const j = new THREE.Group(); j.position.set(x, y, 0); parent.add(j);
    mk(cap(r1, .2), up, 0, -.16, 0, j, OL, 1);
    const k = new THREE.Group(); k.position.y = -.33; j.add(k); mk(cap(r2, .2), lo, 0, -.15, 0, k, OL, 1);
    const end = new THREE.Group(); end.position.y = -.31; k.add(end); mk(new THREE.SphereGeometry(.066, 10, 8), SKIN, 0, 0, 0, end, OLs);
    return [j, k, end];
  }
  const [lS, lE, lHand] = limb(torso, .27, .58, MT.uarm, MT.larm, .07, .058);
  const [rS, rE, rHand] = limb(torso, -.27, .58, MT.uarm, MT.larm, .07, .058);
  function leg(x) { const j = new THREE.Group(); j.position.set(x, 0, 0); hips.add(j); mk(cap(.09, .26), MT.thigh, 0, -.21, 0, j, OL, 1);
    const k = new THREE.Group(); k.position.y = -.45; j.add(k); mk(cap(.075, .28), MT.shin, 0, -.2, 0, k, OL, 1); mk(new THREE.BoxGeometry(.13, .08, .26), '#f2f2ee', 0, -.44, .05, k, OLs); return [j, k]; }
  const [lH, lK] = leg(.11), [rH, rK] = leg(-.11);
  const phoneHand = new THREE.Group(); lHand.add(phoneHand); mk(new THREE.BoxGeometry(.08, .15, .02), '#17222a', 0, -.04, .05, phoneHand, null);
  const kettle = new THREE.Group(); rHand.add(kettle); kettle.position.set(.13, -.12, .02);
  mk(new THREE.SphereGeometry(.15, 12, 10), '#2b3036', 0, -.1, 0, kettle, OLs); mk(new THREE.TorusGeometry(.085, .025, 6, 14), '#2b3036', 0, .06, 0, kettle, null);
  const pack = new THREE.Group(); torso.add(pack); mk(new THREE.BoxGeometry(.32, .38, .17), '#c4693c', 0, .38, -.25, pack, OLs); mk(new THREE.BoxGeometry(.24, .14, .06), '#a8572f', 0, .28, -.35, pack, null);
  const guitar = new THREE.Group(); torso.add(guitar); guitar.position.set(.03, .2, .28); guitar.rotation.set(0, 0, .5);
  [[.2, -.1], [.16, .14]].forEach(([r, y]) => { const c = mk(new THREE.CylinderGeometry(r, r, .1, 20), '#d6a15c', -.04, y, 0, guitar, OLs); c.rotation.x = Math.PI / 2; });
  { const h = mk(new THREE.CylinderGeometry(.055, .055, .105, 14), '#2a1a12', -.04, .03, .003, guitar, null); h.rotation.x = Math.PI / 2; }
  mk(new THREE.BoxGeometry(.06, .64, .04), '#7a4a2a', -.04, .57, 0, guitar, OLs); mk(new THREE.BoxGeometry(.09, .14, .03), '#7a4a2a', -.06, .94, 0, guitar, OLs);
  // paper plane
  const plane = new THREE.Group(); scene.add(plane);
  { const g = new THREE.BufferGeometry(); const v = new Float32Array([1.2, 0, 0, -.9, .12, .9, -.9, 0, 0, 1.2, 0, 0, -.9, 0, 0, -.9, .12, -.9, 1.2, 0, 0, -.9, 0, 0, -.9, -.35, 0]);
    g.setAttribute('position', new THREE.BufferAttribute(v, 3)); g.computeVertexNormals();
    const m = new THREE.MeshToonMaterial({ color: '#fbfaf5', gradientMap: grad, side: THREE.DoubleSide }); const pl = new THREE.Mesh(g, m); plane.add(pl);
    pl.add(new THREE.LineSegments(new THREE.EdgesGeometry(g, 1), new THREE.LineBasicMaterial({ color: 0x17222a }))); plane.scale.setScalar(1.1); }
  plane.visible = false;
  const OUTFITS = {
    desk: ['#e6dcc6', '#e6dcc6', '#e6dcc6', '#2a3540', '#2a3540', 'glasses'],
    brazil: ['#2f8c8c', '#2f8c8c', SKIN, '#d9cfb8', SKIN, 'glasses'],
    summit: ['#6f7a4c', '#6f7a4c', SKIN, '#3a3f36', '#3a3f36', 'shades cap'],
    snow: ['#c6402f', '#1e2329', '#1e2329', '#1e2329', '#1e2329', 'helmet'],
    train: ['#23324a', SKIN, SKIN, '#23324a', '#23324a', 'glasses phones'],
    surf: ['#1b2026', '#1b2026', '#1b2026', '#1b2026', SKIN, ''],
    andes: ['#6b7b4a', '#6b7b4a', '#6b7b4a', '#3a3f36', '#3a3f36', 'glasses beanie pack'],
    andes2: ['#6b7b4a', '#3d7fb8', '#3d7fb8', '#3a3f36', '#3a3f36', 'glasses pack'],
    travel: ['#2d64a8', '#2d64a8', SKIN, '#2a3540', '#2a3540', 'glasses pack']
  };
  let curOutfit = '';
  function wear(o) {
    if (o === curOutfit) return; curOutfit = o; const f = OUTFITS[o];
    MT.torso.color.set(f[0]); MT.uarm.color.set(f[1]); MT.larm.color.set(f[2]); MT.thigh.color.set(f[3]); MT.shin.color.set(f[4]);
    const has = k => f[5].split(' ').includes(k);
    glasses.visible = has('glasses'); shades.visible = has('shades'); capHat.visible = has('cap'); helmet.visible = has('helmet'); beanie.visible = has('beanie'); phones.visible = has('phones'); pack.visible = has('pack');
    quiff.visible = !(has('cap') || has('helmet') || has('beanie')); hair.visible = !has('helmet');
  }
  wear('desk');

  /* ---------- poses ---------- */
  const BASE = { lift: 0, pitch: 0, roll: 0, torsoX: 0, torsoY: 0, headX: 0, headY: 0, lSx: 0, lSz: .1, lEx: 0, rSx: 0, rSz: -.1, rEx: 0, lHx: 0, lHz: 0, lKx: 0, rHx: 0, rHz: 0, rKx: 0 };
  const sit = () => ({ lift: -.42, lHx: -1.5, rHx: -1.5, lKx: 1.5, rKx: 1.5, torsoX: .06 });
  const POSES = {
    type: t => Object.assign(sit(), { headX: .16 + Math.sin(t * 1.1) * .03, lSx: -.5, rSx: -.5, lSz: .06, rSz: -.06, lEx: -1.0 + Math.sin(t * 17) * .08, rEx: -1.0 + Math.cos(t * 15) * .08, torsoX: .1 + Math.sin(t * .7) * .02 }),
    sitwave: t => Object.assign(sit(), { headX: -.05, lSx: -.45, lEx: -1.0, rSz: -2.6 + Math.sin(t * 6) * .25, rEx: -.35 }),
    strum: t => Object.assign(sit(), { torsoX: .12, headX: .28 + Math.sin(t * 2.2) * .05, headY: -.2, torsoY: Math.sin(t * 2.2) * .05, rSx: -.55, rSz: -.15, rEx: -1.2 + Math.sin(t * 9) * .2, lSx: -1.0, lSz: .55, lEx: -.9, lKx: 1.5 + Math.max(0, Math.sin(t * 4.4)) * .15 }),
    summit: t => ({ rSx: -2.9, rSz: -.15 + Math.sin(t * 2) * .06, rEx: -.1, lSz: .3, lEx: -.2, torsoX: -.06, headX: -.18, lHz: .08, rHz: -.08, lift: Math.abs(Math.sin(t * 4)) * .02 }),
    sweep: t => ({ rSx: -.2, rSz: -1.45 + Math.sin(t * 1.2) * .08, rEx: -.12, lSx: -1.35, lSz: .22, lEx: -1.3, headX: -.04, headY: .15, torsoY: Math.sin(t * 1.2) * .08 }),
    ride: t => ({ lift: -.14, lHx: -.25, rHx: -.25, lHz: .32, rHz: -.32, lKx: .6, rKx: .6, torsoX: .14, lSz: .95 + Math.sin(t * 1.4) * .1, rSz: -.95 + Math.sin(t * 1.4) * .1, headY: .95, roll: Math.sin(t * 1.4) * .08, torsoY: Math.sin(t * 1.4) * .12 }),
    swing: t => { const k = (Math.sin(t * 3.2) + 1) / 2, d = 1 - k;
      return { lSx: -.15 - 1.45 * k, rSx: -.15 - 1.45 * k, lSz: -.3, rSz: .3, torsoX: .5 * d, lHx: -.25 - .45 * d, rHx: -.25 - .45 * d, lKx: .35 + .1 * d, rKx: .35 + .1 * d, lHz: .15, rHz: -.15, lift: -.06 - .06 * d }; },
    surf: t => ({ lift: -.16 + Math.sin(t * 1.3) * .04, lHx: -.3, rHx: -.3, lHz: .3, rHz: -.3, lKx: .65 + Math.sin(t * 1.3) * .1, rKx: .65 + Math.sin(t * 1.3) * .1, torsoX: .22, roll: Math.sin(t * 1.3) * .1, lSz: 1.25 + Math.sin(t * 1.3) * .15, rSz: -1.25 + Math.sin(t * 1.3) * .15, lSx: -.15, rSx: .1, headY: -.5, torsoY: Math.sin(t * .65) * .2 }),
    hips: t => ({ lSz: .62, rSz: -.62, lSx: .35, rSx: .35, lEx: -1.25, rEx: -1.25, headY: .25 + Math.sin(t * .6) * .35, headX: -.08 }),
    wave: t => ({ rSz: -2.6 + Math.sin(t * 6) * .25, rEx: -.35, lSz: .12, headX: -.05 }),
    fly: t => ({ lSx: -.3, rSx: -.3, lSz: 2.4 + Math.sin(t * 8) * .1, rSz: -2.4 - Math.sin(t * 8) * .1, lHx: -.5, rHx: -.1, lKx: .7, rKx: .3, torsoX: -.1 }),
    ride_plane: t => Object.assign(sit(), { lSz: 1.1 + Math.sin(t * 3) * .1, rSz: -1.1 - Math.sin(t * 3) * .1, lEx: -.2, rEx: -.2, headX: -.1, headY: Math.sin(t * .8) * .4, lKx: 1.2, rKx: 1.2 }),
    walk: (t, ph) => { const s = Math.sin(ph), c = Math.cos(ph);
      return { lHx: s * .6, rHx: -s * .6, lKx: Math.max(0, -s) * .9 + .1, rKx: Math.max(0, s) * .9 + .1, lSx: -s * .55, rSx: s * .55, lEx: -.35, rEx: -.35, lSz: .12, rSz: -.12, lift: -Math.abs(c) * .05, torsoX: .08, torsoY: s * .08 }; }
  };
  const pose = (k, t, ph) => Object.assign({}, BASE, POSES[k](t, ph));
  const mixP = (a, b, w) => { const o = {}; for (const k in BASE) o[k] = a[k] + (b[k] - a[k]) * w; return o; };
  function applyPose(p, extraHeadY, blink) {
    hips.position.y = .95 + p.lift; torso.rotation.set(p.torsoX, p.torsoY, 0); headG.rotation.set(p.headX, p.headY + extraHeadY, 0);
    lS.rotation.set(p.lSx, 0, p.lSz); rS.rotation.set(p.rSx, 0, p.rSz); lE.rotation.x = p.lEx; rE.rotation.x = p.rEx;
    lH.rotation.set(p.lHx, 0, p.lHz); rH.rotation.set(p.rHx, 0, p.rHz); lK.rotation.x = p.lKx; rK.rotation.x = p.rKx;
    fig.rotation.x = p.pitch; fig.rotation.z = p.roll; eyes.scale.y = blink ? .12 : 1;
  }

  /* ---------- chapters ---------- */
  const A = { fr: W3(P.france), br: W3(P.br), ca: W3(P.ca), chicama: W3(P.chicama), huayhuash: W3(P.huayhuash), machu: W3(P.machu) };
  const CH = {
    0: { si: 0, a: 'fr', d: D.france, pose: 'type' }, 2: { si: 1, a: 'br', d: 0 }, 3: { si: 2, a: 'ca', d: D.ca }, 4: { si: 3, a: 'ca', d: D.ca }, 5: { si: 4, a: 'ca', d: D.ca },
    6: { si: 5, a: 'chicama', d: D.chicama }, 7: { si: 6, a: 'huayhuash', d: D.huayhuash }, 8: { si: 7, a: 'machu', d: D.machu }, 9: { si: 0, a: 'fr', d: D.france, pose: 'sitwave', cam: [.3, .46, 27] }
  };
  const DIOS = {}; const dio = si => DIOS[si] || (DIOS[si] = buildDiorama(si));
  dio(0);
  if (WORLD_MODE === 'atlas') setTimeout(() => { [1, 2, 3, 4, 5, 6, 7].forEach((s, i) => setTimeout(() => dio(s), i * 60)); }, 300);
  const holdPos = k => { const c = CH[k], sc = SC[c.si], [fx, fz] = sc.fig, a = A[c.a]; return new THREE.Vector3(a.x + fx, topY(c.si, fx, fz), a.z + fz); };
  const camFor = k => { const c = CH[k], sc = SC[c.si], cm = c.cam || sc.cam, a = A[c.a], [fx, fz] = sc.fig; return { t: new THREE.Vector3(a.x + fx * .35, .9, a.z + fz * .35), az: cm[0], el: cm[1], d: cm[2] }; };
  const camOverview = () => { const b = new THREE.Box3(); RP.forEach(p => b.expandByPoint(p.v)); const c = b.getCenter(new THREE.Vector3()); c.z += 4; return { t: c, az: 0, el: 1.12, d: 0 }; };

  /* ---------- sizing ---------- */
  let W = 0, Hh = 0, phoneLayout = false;
  function resize() {
    W = innerWidth; Hh = innerHeight; phoneLayout = W < 760;
    renderer.setSize(W, Hh, false); camera.aspect = W / Hh; camera.fov = phoneLayout ? 36 : 30;
    if (phoneLayout) camera.setViewOffset(W, Hh, 0, Hh * .24, W, Hh); else camera.setViewOffset(W, Hh, -W * (W > 1100 ? .17 : .14), 0, W, Hh);
    camera.updateProjectionMatrix();
  }
  resize(); addEventListener('resize', resize);
  const overviewDist = () => { const hf = 2 * Math.atan(Math.tan(camera.fov * Math.PI / 360) * camera.aspect); return (phoneLayout ? 62 : 82) / Math.tan(hf / 2); };

  /* ---------- theme hookup ---------- */
  function theme3D() {
    const ink = hex3(css('--ink')), sheet = hex3(css('--sheet')), p2 = hex3(css('--paper-2')), acc = hex3(css('--accent'));
    const dark = css('--paper') && hex3(css('--paper')).reduce((a, b) => a + b) < 1.2;
    const lineInk = dark ? hex3('#0d151b') : ink;
    lineMat.color.setRGB(...lineInk.map(v => Math.pow(v, 2.2))); lineMat.opacity = .5;
    strataMat.uniforms.uA.value.set(...(dark ? hex3('#e6e0d0') : sheet)); strataMat.uniforms.uB.value.set(...(dark ? hex3('#d3ccb9') : p2)); strataMat.uniforms.uInk.value.set(...lineInk);
    ribbon.uniforms.uCol.value.set(...acc);
    hemi.intensity = dark ? .5 : .5;
    mapTheme();
  }
  themeListeners.push(theme3D);

  /* ---------- interaction ---------- */
  const GREET = [['Olá!', 'PT'], ['Hello!', 'EN'], ['¡Hola!', 'ES'], ['Bonjour !', 'FR'], ['Hallo!', 'DE · learning'], ['Ciao!', 'IT · soon']];
  let gi = 0, waveUntil = 0, bubbleUntil = 0, hovering = false, tapped = false, mx = 0, my = 0, pmx = 0, pmy = 0;
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  const hitFig = (cx, cy) => { const r = canvas.getBoundingClientRect(); ndc.set((cx - r.left) / r.width * 2 - 1, -((cy - r.top) / r.height) * 2 + 1); ray.setFromCamera(ndc, camera); return ray.intersectObjects(pickables, false).length > 0; };
  const blocked = el => el.closest('a,button,input,textarea,label,.page,.def,.facts,form,.lab,.legs,.footnote');
  document.addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5;
    if (!state.on) return; const h = !blocked(e.target) && hitFig(e.clientX, e.clientY); if (h !== hovering) { hovering = h; document.body.style.cursor = h ? 'pointer' : ''; } }, { passive: true });
  document.addEventListener('click', e => { if (!state.on || blocked(e.target) || !hitFig(e.clientX, e.clientY)) return;
    const [g, l] = GREET[gi++ % GREET.length]; bubble.innerHTML = `${g}<small>${l}</small>`; waveUntil = clock.elapsedTime + 1.8; bubbleUntil = clock.elapsedTime + 1.8; tapped = true; });

  /* ---------- frame ---------- */
  const clock = new THREE.Clock(); const state = { on: false, mode: 'hero', p: 0, snap: true, inHero: true };
  let intro = reduce ? 1 : 0, pCur = 0, mapOp = 0, walkPh = 0, lastPos = new THREE.Vector3(), blinkAt = 2;
  const camPos = new THREE.Vector3(), camT = new THREE.Vector3(), desT = new THREE.Vector3(), desP = new THREE.Vector3(), tmp = new THREE.Vector3(), headW = new THREE.Vector3();
  const lerpAng = (a, b, w) => a + (((b - a + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI) * w;
  const camFrom = (c, out) => out.set(c.t.x + c.d * Math.sin(c.az) * Math.cos(c.el), c.t.y + c.d * Math.sin(c.el), c.t.z + c.d * Math.cos(c.az) * Math.cos(c.el));
  const blendCam = (a, b, w) => ({ t: a.t.clone().lerp(b.t, w), az: lerpAng(a.az, b.az, w), el: lerp(a.el, b.el, w), d: lerp(a.d, b.d, w) });
  function setBuild(D0, b) {
    if (!D0) return; D0.root.visible = b > .001; if (!D0.root.visible) return;
    const bb = smooth(0, .28, b); D0.base.scale.set(Math.max(.001, bb), Math.max(.001, bb), Math.max(.001, bb)); D0.shadow.material.opacity = bb;
    D0.layers.forEach(({ mesh, L }) => { const e = smooth(.18 + (L - 1) / 15 * .62, .3 + (L - 1) / 15 * .62, b); mesh.visible = e > .001; mesh.position.y = BASE_T + (L - 1) * STEP * e; mesh.scale.set(Math.max(.001, bb), 1, Math.max(.001, bb)); });
    const pe = smooth(.86, 1, b); D0.props.children.forEach(c => c.scale.setScalar(Math.max(.001, pe))); D0.props.visible = pe > .001;
  }
  function frame() {
    requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), .05), t = clock.elapsedTime;
    if (!state.on || !state.inHero) tapnote.classList.remove('on');
    if (!state.on && intro >= 1) return;
    if (intro < 1) intro = reduce ? 1 : Math.min(1, t / 2.2);
    pCur = state.snap || reduce ? state.p : pCur + (state.p - pCur) * Math.min(1, dt * 5);
    const route = state.mode === 'route';
    mapOp += ((route ? 1 : 0) - mapOp) * Math.min(1, dt * 3); if (state.snap) mapOp = route ? 1 : 0;
    fadeU.uOp.value = mapOp; ribbon.uniforms.uOp.value = mapOp; mapGroup.visible = mapOp > .01; dotMat.opacity = ringMat.opacity = mapOp;
    Object.values(DIOS).forEach(D0 => D0.root.visible = false);

    let figPos = new THREE.Vector3(), figYaw = 0, P0, outfit = 'desk', figScale = 1, onPlane = false, prog = 0, camC;
    if (!route) {
      const c = CH[0], D0 = dio(0); D0.root.position.copy(A[c.a]); setBuild(D0, intro);
      figPos.copy(holdPos(0)); figYaw = SC[0].yaw; P0 = pose('type', t); outfit = 'desk';
      camC = camFor(0); camC.d *= phoneLayout ? 1.05 : 1;
    } else {
      const k = clamp(Math.floor(pCur), 1, 9), f = pCur - k;
      // builds
      for (let kk = 2; kk <= 9; kk++) {
        const rise = smooth(kk - 1 + .8, kk - .02, pCur), sink = kk < 9 ? smooth(kk + .58, kk + .7, pCur) : 0, b = rise * (1 - sink);
        if (b > .001) { const D0 = dio(CH[kk].si); D0.root.position.copy(A[CH[kk].a]); setBuild(D0, b); }
      }
      if (k === 1) {
        const w = smooth(.55, 1, f), ov = camOverview(); ov.d = overviewDist();
        camC = blendCam(ov, camFor(2), w);
        const hp = holdPos(2), drop = smooth(.78, 1, f); figPos.copy(hp); figPos.y = lerp(hp.y + 14, hp.y, drop * drop); figScale = drop > 0 ? 1 : 0;
        figYaw = SC[1].yaw; P0 = drop < 1 ? pose('fly', t) : pose('strum', t); outfit = 'brazil'; prog = 0;
      } else if (k === 9 || f < .58) {
        const c = CH[k], sc = SC[c.si]; figPos.copy(holdPos(k)); figYaw = sc.yaw; P0 = pose(c.pose || sc.pose, t); outfit = sc.outfit; prog = c.d; camC = camFor(k);
        if (sc.key === 'surf') figPos.y += .08 + Math.sin(t * 1.3) * .03;
        if (sc.key === 'snow') figPos.y += .05;
      } else {
        const c0 = CH[k], c1 = CH[k + 1], tt = clamp((f - .58) / .42), same = c0.a === c1.a;
        const h0 = holdPos(k), h1 = holdPos(k + 1), cm0 = camFor(k), cm1 = camFor(k + 1);
        if (same) {
          const w = smooth(.3, .95, tt); figPos.copy(h0).lerp(h1, w); figPos.y += Math.sin(Math.PI * w) * 3.2 + (tt < .3 ? Math.sin(Math.PI * tt / .3) * .6 : 0);
          figYaw = lerpAng(SC[c0.si].yaw, SC[c1.si].yaw, w); P0 = mixP(pose(SC[c0.si].pose, t), pose('fly', t), Math.min(1, Math.sin(Math.PI * w) * 2)); outfit = w < .5 ? SC[c0.si].outfit : SC[c1.si].outfit;
          prog = c0.d; camC = blendCam(cm0, cm1, smooth(.2, .9, tt));
        } else {
          const d = lerp(c0.d, c1.d, smooth(.1, .9, tt)), ra = routeAt(d); prog = d;
          const onRoute = ra.v.clone();
          let arc = 0; if (ra.fl) { arc = Math.sin(Math.PI * ra.fl.t) * Math.min(10, ra.fl.len * .12) + .5; onPlane = true; }
          onRoute.y += arc;
          const a0 = smooth(0, .1, tt), a1 = smooth(.9, 1, tt);
          figPos.copy(h0).lerp(onRoute, a0); figPos.lerp(h1, a1); figPos.y += Math.sin(Math.PI * a0) * (1 - a0) * 1.2 + Math.sin(Math.PI * a1) * a1 * 1.2;
          const trav = a0 * (1 - a1);
          figScale = 1 + 1.3 * trav;
          const dir = ra.dir; const yawMove = Math.atan2(dir.x, dir.z);
          figYaw = trav > .5 ? yawMove : (a1 > .5 ? SC[c1.si].yaw : SC[c0.si].yaw);
          walkPh += figPos.distanceTo(lastPos) * 4;
          P0 = onPlane ? pose('ride_plane', t) : pose('walk', t, walkPh);
          if (trav < 1) P0 = mixP(a1 > .5 ? pose(SC[c1.si].pose, t) : pose(SC[c0.si].pose, t), P0, trav);
          outfit = trav > .5 ? 'travel' : (a1 > .5 ? SC[c1.si].outfit : SC[c0.si].outfit);
          const legLen = Math.abs(c1.d - c0.d), bell = Math.sin(Math.PI * smooth(.05, .95, tt));
          const mid = { t: figPos.clone().setY(.5), az: lerpAng(cm0.az, cm1.az, tt), el: lerp(.95, 1.0, bell), d: clamp(legLen * .62, 34, 140) * (phoneLayout ? 1.2 : 1) };
          camC = tt < .5 ? blendCam(cm0, mid, smooth(0, .5, tt)) : blendCam(mid, cm1, smooth(.5, 1, tt));
        }
      }
      ribbon.uniforms.uProg.value = prog;
    }
    // figure
    if (onPlane) { plane.visible = true; plane.position.copy(figPos); plane.rotation.set(0, figYaw - Math.PI / 2, Math.sin(t * 2) * .1); plane.scale.setScalar(1.1 * figScale); figPos.y += .12 * figScale; } else plane.visible = false;
    fig.position.copy(figPos); fig.rotation.y = figYaw; fig.scale.setScalar(Math.max(.001, figScale * (route ? 1 : smooth(.75, 1, intro))));
    fig.visible = figScale > .01 && (route || intro > .75);
    lastPos.copy(figPos);
    wear(outfit);
    guitar.visible = outfit === 'brazil'; kettle.visible = outfit === 'train'; phoneHand.visible = false;
    if (t < waveUntil) { const wv = clamp((waveUntil - t) * 2) * clamp(1 - (waveUntil - t - 1.3) * 2); const sitting = ['type', 'strum', 'sitwave', 'ride_plane'].includes(P0.__k);
      P0 = mixP(P0, (P0.lift < -.3 ? pose('sitwave', t) : pose('wave', t)), wv); }
    if (t > blinkAt + .13) blinkAt = t + 2 + Math.random() * 3;
    pmx += (mx - pmx) * .05; pmy += (my - pmy) * .05;
    applyPose(P0, pmx * .6, t > blinkAt && t < blinkAt + .13);
    if (boards.surf) { boards.surf.rotation.z = Math.sin(t * 1.3) * .08; }
    // camera
    const hold = Object.assign({}, camC); hold.az += pmx * .18; hold.el += pmy * .05;
    if (!route) hold.d *= phoneLayout ? 1.08 : 1; else if (camC.d < 40) hold.d *= phoneLayout ? 1.12 : 1;
    camFrom(hold, desP); desT.copy(hold.t);
    const k2 = state.snap ? 1 : 1 - Math.exp(-dt * 5); camPos.lerp(desP, k2); camT.lerp(desT, k2);
    camera.position.copy(camPos); camera.lookAt(camT);
    ribbon.uniforms.uW.value = clamp(camPos.distanceTo(camT) * .0055, .1, .55);
    state.snap = false;
    renderer.render(scene, camera);
    let focus = null; if (route) { const kk = clamp(Math.round(pCur), 2, 9); focus = A[CH[kk].a]; }
    updateLabels(mapOp, focus);
    // bubble + tap note
    headW.set(0, 0, 0); headG.localToWorld(headW); headW.y += .35 * figScale; headW.project(camera);
    const r = canvas.getBoundingClientRect(), bx = r.left + (headW.x + 1) / 2 * r.width, by = r.top + (1 - headW.y) / 2 * r.height;
    bubble.style.left = bx + 'px'; bubble.style.top = by + 'px'; bubble.classList.toggle('on', t < bubbleUntil && state.on);
    const showTap = state.on && state.inHero && !tapped && intro > .99;
    tapnote.classList.toggle('on', showTap);
    if (showTap) { tapnote.style.left = Math.min(innerWidth - tapnote.offsetWidth - 12, Math.max(12, bx - (phoneLayout ? 20 : 70) - tapnote.offsetWidth)) + 'px'; tapnote.style.top = (by + (phoneLayout ? 30 : 70)) + 'px'; }
  }
  requestAnimationFrame(frame);
  theme3D();
  return { state };
}

/* ---------- scroll → world ---------- */
function onScroll() {
  const vh = innerHeight;
  const inHero = !!hero && hero.getBoundingClientRect().bottom > vh * .3;
  let inRoute = false, p = 1, active = 1;
  if (chapterEls.length) {
    const c0 = chapterEls[0].getBoundingClientRect(), cN = chapterEls[chapterEls.length - 1].getBoundingClientRect();
    inRoute = !inHero && c0.top < vh * .9 && cN.bottom > vh * .4;
    const anchor = vh * .5;
    for (const el of chapterEls) { const r = el.getBoundingClientRect(), s = +el.dataset.step; if (anchor >= r.top) { p = s + clamp((anchor - r.top) / r.height); active = s; } }
    p = clamp(p, 1, 9.0);
  }
  if (legsEl) { legsEl.classList.toggle('on', inRoute);
    [...legsEl.children].forEach((li, i) => { const k = +li.dataset.k, next = LEGS[i + 1] ? LEGS[i + 1][1] : 99; li.classList.toggle('on', active >= k && active < next); li.classList.toggle('done', active >= next); }); }
  if (!inHero && tapnote) tapnote.classList.remove('on');
  if (world) {
    const st = world.state, was = st.on, wasMode = st.mode;
    st.on = inHero || inRoute; st.inHero = inHero; st.mode = inHero ? 'hero' : 'route'; st.p = inHero ? 0 : p;
    if ((!was && st.on) || wasMode !== st.mode) st.snap = true;
    canvas.classList.toggle('on', st.on);
    canvas.style.transform = inHero ? `translateY(${-Math.min(scrollY, vh)}px)` : 'none';
  }
}
addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll);
applyDesign(false);
const here = GD ? GD.content : ''; document.querySelectorAll('[data-nav]').forEach(a => { if (a.dataset.nav === here) a.setAttribute('aria-current', 'page'); });
onScroll();
})();
