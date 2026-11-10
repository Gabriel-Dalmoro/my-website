/* Story page: little Gabriel floats among the pieces of his life; each chapter pulls its
   pieces out of the orbit and onto the pedestal. Scroll only picks the chapter; every
   move is a short timed ease, so nothing jitters with the scrollbar. */
(() => {
'use strict';
const secs = [...document.querySelectorAll('.sc')];
if (!secs.length) return;
const root = document.documentElement; root.classList.add('story');
const canvas = document.getElementById('gl'), bubble = document.getElementById('bubble'), kit = document.getElementById('kit');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (kit) document.body.appendChild(kit); // out of <main>'s stacking context so it sits above the stage
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;

/* ---------- stage (backdrop) ---------- */
const stage = document.createElement('div'); stage.className = 'stage'; stage.setAttribute('aria-hidden', 'true');
stage.innerHTML = '<div class="glow"></div><svg class="ridge" viewBox="0 0 600 200" preserveAspectRatio="none"><path d="M0 200L0 150L70 108L120 134L190 58L240 100L300 28L360 96L420 68L480 122L540 88L600 140L600 200Z"/></svg>';
document.body.insertBefore(stage, canvas || document.body.firstChild);
const TINT = ['#dfe6d2', '#cfe3b0', '#c7dbea', '#ecd9ab', '#e3edf5', '#cde3d2', '#cde3d2'];
const RIDGE = [0, 0, 1, 0, 1, 0, 0];

let W = 0, H = 0, phone = false, R = { cx: 0, cy: 0, sw: 0, sh: 0 };
function layout() {
  W = innerWidth; H = innerHeight; phone = W <= 900;
  if (phone) { const band = Math.round(H * .46); R = { cx: W / 2, cy: 64 + (band - 64 - 40) / 2, sw: W, sh: band - 64 - 44 }; root.style.setProperty('--band', band + 'px'); }
  else R = { cx: W * .68, cy: H * .5, sw: W * .56, sh: H * .72 };
  root.style.setProperty('--cx', R.cx + 'px'); root.style.setProperty('--cy', R.cy + 'px'); root.style.setProperty('--sw', R.sw + 'px'); root.style.setProperty('--sh', R.sh + 'px');
}
layout();

/* ---------- which chapter ---------- */
let ch = 0, on = true;
function pick() {
  const anchor = phone ? H * .72 : H * .5; let best = 0, bd = 1e9;
  secs.forEach(s => { const r = s.getBoundingClientRect(); const el = s.firstElementChild.getBoundingClientRect(); const c = phone ? el.top + Math.min(el.height, 200) * .5 : r.top + r.height / 2;
    const d = Math.abs(c - anchor); if (d < bd) { bd = d; best = +s.dataset.ch; } });
  if (phone && scrollY < 40) best = 0;
  const last = secs[secs.length - 1].getBoundingClientRect(); on = last.bottom > H * (phone ? .62 : .45);
  root.classList.toggle('story-on', on); if (canvas) canvas.classList.toggle('on', on && !!world);
  if (best !== ch || !pick.done) { ch = best; pick.done = true;
    secs.forEach(s => s.classList.toggle('is-on', +s.dataset.ch === ch));
    stage.style.setProperty('--tint', TINT[ch]); stage.classList.toggle('ridge-on', !!RIDGE[ch]);
    if (kit) kit.querySelectorAll('li').forEach(li => li.classList.toggle('has', ch >= +li.dataset.at));
    if (world) world.enter(ch);
  }
}
let world = null;
addEventListener('scroll', pick, { passive: true });
addEventListener('resize', () => { layout(); if (world) world.resize(); pick(); });

try { if (window.THREE && canvas) world = build(window.THREE); } catch (e) { console.warn('story 3D disabled', e); }
pick();

/* =========================================================
   3D
   ========================================================= */
function build(THREE) {
  THREE.ColorManagement.legacyMode = false;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2)); renderer.setClearColor(0, 0); renderer.outputEncoding = THREE.sRGBEncoding;
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(30, 1, .1, 200);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xb8ab90, .55)); const sun = new THREE.DirectionalLight(0xffffff, .6); sun.position.set(-6, 12, 9); scene.add(sun);

  const grad = new THREE.DataTexture(new Uint8Array([130, 130, 130, 255, 205, 205, 205, 255, 255, 255, 255, 255]), 3, 1, THREE.RGBAFormat);
  grad.magFilter = grad.minFilter = THREE.NearestFilter; grad.needsUpdate = true;
  const mats = {}; const M = c => mats[c] || (mats[c] = new THREE.MeshToonMaterial({ color: c, gradientMap: grad }));
  const outline = t => { const m = new THREE.MeshBasicMaterial({ color: 0x14241c, side: THREE.BackSide });
    m.onBeforeCompile = s => { s.vertexShader = s.vertexShader.replace('#include <begin_vertex>', `vec3 transformed = position + normal * ${t.toFixed(3)};`); }; return m; };
  const OL = outline(.018);
  function mk(geo, mat, x, y, z, parent, ol = true) { const m = new THREE.Mesh(geo, typeof mat === 'string' ? M(mat) : mat); m.position.set(x, y, z); if (ol) m.add(new THREE.Mesh(geo, OL)); parent.add(m); return m; }
  const G = () => new THREE.Group();
  const cyl = (a, b, h, n = 20) => new THREE.CylinderGeometry(a, b, h, n), box = (x, y, z) => new THREE.BoxGeometry(x, y, z), sph = (r, a = 18, b = 12) => new THREE.SphereGeometry(r, a, b);

  /* ---------- pedestal ---------- */
  const PR = 1.7, PH = .46;
  const ped = G(); scene.add(ped);
  const pedMat = new THREE.MeshToonMaterial({ color: '#e9e4d6', gradientMap: grad });
  mk(cyl(PR, PR, PH, 96), pedMat, 0, -PH / 2, 0, ped);
  mk(cyl(PR + .1, PR + .14, .1, 96), pedMat, 0, -PH - .05, 0, ped);
  const PEDC = ['#e9e4d6', '#e8d9ad', '#cfd6d9', '#e4d0a0', '#f3f5f6', '#dfe6d4', '#dfe6d4'].map(c => new THREE.Color(c));
  const shTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d'); const g = x.createRadialGradient(64, 64, 14, 64, 64, 64); g.addColorStop(0, 'rgba(10,20,26,.34)'); g.addColorStop(1, 'rgba(10,20,26,0)'); x.fillStyle = g; x.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c); })();
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: shTex, transparent: true, depthWrite: false })); shadow.rotation.x = -Math.PI / 2; scene.add(shadow);

  /* ---------- props ---------- */
  function boardShape(len, wid, nose) { const s = new THREE.Shape(), hl = len / 2, hw = wid / 2;
    if (nose) { s.moveTo(-hl + hw, -hw); s.lineTo(hl * .5, -hw); s.quadraticCurveTo(hl, -hw * .6, hl, 0); s.quadraticCurveTo(hl, hw * .6, hl * .5, hw); s.lineTo(-hl + hw, hw); s.absarc(-hl + hw, 0, hw, Math.PI / 2, Math.PI * 1.5, false); }
    else { s.moveTo(-hl + hw, -hw); s.lineTo(hl - hw, -hw); s.absarc(hl - hw, 0, hw, -Math.PI / 2, Math.PI / 2, false); s.lineTo(-hl + hw, hw); s.absarc(-hl + hw, 0, hw, Math.PI / 2, Math.PI * 1.5, false); }
    const g = new THREE.ExtrudeGeometry(s, { depth: .04, bevelEnabled: true, bevelThickness: .01, bevelSize: .01, bevelSegments: 2, curveSegments: 16 }); g.rotateX(-Math.PI / 2); g.translate(0, .02, 0); return g; }
  const make = {
    guitar() { const g = G(), w = '#c98a4b', d = '#5a3a22';
      [[.25, -.16], [.19, .14]].forEach(([r, y]) => { mk(cyl(r, r, .12, 28), w, 0, y, 0, g).rotation.x = Math.PI / 2; });
      mk(cyl(.065, .065, .125, 16), '#1b120c', 0, 0, .003, g, false).rotation.x = Math.PI / 2;
      mk(box(.07, .66, .05), d, 0, .62, 0, g); mk(box(.1, .16, .04), d, 0, 1.0, 0, g); mk(box(.11, .025, .03), '#1b120c', 0, -.27, .07, g, false); return g; },
    chimarrao() { const g = G(); const b = mk(sph(.15), '#7a4a2a', 0, .15, 0, g); b.scale.y = 1.1; mk(cyl(.1, .11, .05), '#c9ccd0', 0, .3, 0, g); mk(cyl(.085, .085, .012), '#6f9a3c', 0, .33, 0, g, false);
      const s = mk(cyl(.012, .012, .3, 6), '#c9ccd0', .04, .44, 0, g, false); s.rotation.z = -.3; return g; },
    diploma() { const g = G(); mk(cyl(.07, .07, .56, 16), '#f6f1e2', 0, .07, 0, g).rotation.z = Math.PI / 2; mk(cyl(.078, .078, .07, 16), '#c0392b', 0, .07, 0, g, false).rotation.z = Math.PI / 2; return g; },
    laptop() { const g = G(); mk(box(.52, .03, .36), '#a7aeb6', 0, .015, 0, g); const lid = G(); lid.position.set(0, .03, -.18); lid.rotation.x = -.3; g.add(lid);
      mk(box(.52, .36, .022), '#a7aeb6', 0, .18, 0, lid); mk(box(.46, .3, .006), '#16241d', 0, .18, .014, lid, false);
      [[-.1, .26, .22], [-.04, .2, .34], [-.12, .14, .18]].forEach(([x, y, w]) => mk(box(w, .022, .004), '#7fd0a1', x, y, .019, lid, false)); return g; },
    kettlebell() { const g = G(); mk(sph(.2), '#2b3036', 0, .19, 0, g); mk(new THREE.TorusGeometry(.11, .035, 8, 18), '#2b3036', 0, .42, 0, g); return g; },
    backpack() { const g = G(); mk(box(.42, .56, .24), '#c4693c', 0, .28, 0, g); mk(box(.3, .2, .08), '#a8572f', 0, .18, .15, g); mk(box(.44, .1, .26), '#a8572f', 0, .54, 0, g, false);
      [-.13, .13].forEach(x => mk(box(.06, .46, .04), '#3a3f36', x, .3, -.14, g, false)); return g; },
    surfboard() { const g = G(); mk(boardShape(2.0, .5, true), '#fbfaf5', 0, 0, 0, g); mk(box(1.6, .012, .03), '#d4532f', -.08, .056, 0, g, false); return g; },
    snowboard() { const g = G(); mk(boardShape(1.55, .34, false), '#1f3a5f', 0, 0, 0, g); const t = mk(boardShape(1.3, .22, false), '#f2c230', 0, .045, 0, g, false); t.scale.y = .2;
      [-.32, .32].forEach(x => mk(box(.15, .06, .26), '#16181b', x, .09, 0, g)); return g; },
    lamp() { const g = G(); mk(cyl(.1, .12, .03), '#2b3036', 0, .015, 0, g); const a = mk(cyl(.014, .014, .42, 6), '#2b3036', .06, .22, 0, g, false); a.rotation.z = -.3;
      const h = mk(new THREE.ConeGeometry(.13, .18, 16, 1, true), new THREE.MeshToonMaterial({ color: '#d99a1e', gradientMap: grad, side: THREE.DoubleSide }), .16, .44, 0, g); h.rotation.z = .9; return g; },
    notebook() { const g = G(); mk(box(.3, .05, .4), '#1f6b4a', 0, .025, 0, g); mk(box(.28, .04, .38), '#f6f1e2', .012, .026, 0, g, false); mk(box(.3, .052, .03), '#d99a1e', 0, .025, .1, g, false); return g; }
  };
  /* language pins */
  const FLAG = {
    PT(x) { x.fillStyle = '#229e45'; x.fillRect(0, 0, 128, 128); x.fillStyle = '#f8d90f'; x.beginPath(); x.moveTo(64, 22); x.lineTo(114, 64); x.lineTo(64, 106); x.lineTo(14, 64); x.fill(); x.fillStyle = '#26419a'; x.beginPath(); x.arc(64, 64, 22, 0, 7); x.fill(); },
    EN(x) { x.fillStyle = '#fff'; x.fillRect(0, 0, 128, 128); x.fillStyle = '#d52b1e'; x.fillRect(0, 0, 34, 128); x.fillRect(94, 0, 34, 128);
      const p = [50, 8, 57, 22, 66, 18, 62, 40, 76, 30, 80, 38, 92, 36, 86, 50, 94, 54, 72, 70, 76, 78, 54, 75, 54, 92, 46, 92, 46, 75, 24, 78, 28, 70, 6, 54, 14, 50, 8, 36, 20, 38, 24, 30, 38, 40, 34, 18, 43, 22];
      x.beginPath(); for (let i = 0; i < p.length; i += 2) x.lineTo(39 + p[i] * .5, 39 + p[i + 1] * .5); x.fill(); },
    ES(x) { x.fillStyle = '#c60b1e'; x.fillRect(0, 0, 128, 128); x.fillStyle = '#ffc400'; x.fillRect(0, 34, 128, 60); },
    FR(x) { x.fillStyle = '#0055a4'; x.fillRect(0, 0, 43, 128); x.fillStyle = '#fff'; x.fillRect(43, 0, 42, 128); x.fillStyle = '#ef4135'; x.fillRect(85, 0, 43, 128); },
    DE(x) { x.fillStyle = '#111'; x.fillRect(0, 0, 128, 43); x.fillStyle = '#dd0000'; x.fillRect(0, 43, 128, 42); x.fillStyle = '#ffce00'; x.fillRect(0, 85, 128, 43); },
    IT(x) { x.fillStyle = '#009246'; x.fillRect(0, 0, 43, 128); x.fillStyle = '#fff'; x.fillRect(43, 0, 42, 128); x.fillStyle = '#ce2b37'; x.fillRect(85, 0, 43, 128); }
  };
  function pin(code, ghost) { const g = G(); const c = document.createElement('canvas'); c.width = c.height = 128; FLAG[code](c.getContext('2d'));
    const tx = new THREE.CanvasTexture(c); tx.encoding = THREE.sRGBEncoding;
    const rim = mk(cyl(.2, .2, .05, 28), '#c9a23a', 0, 0, 0, g); rim.rotation.x = Math.PI / 2;
    const f = new THREE.Mesh(new THREE.CircleGeometry(.17, 28), new THREE.MeshBasicMaterial({ map: tx, transparent: !!ghost, opacity: ghost ? .4 : 1 })); f.position.z = .027; g.add(f); return g; }

  /* desk set (rises in "Now") */
  const DS = 1.34, DYAW = .45;
  const desk = G(); desk.rotation.y = DYAW; desk.scale.setScalar(.001); scene.add(desk);
  { mk(box(.42, .05, .4), '#b98552', 0, .33, -.05, desk); mk(box(.42, .38, .05), '#b98552', 0, .54, -.26, desk);
    [[-.18, -.22], [.18, -.22], [-.18, .12], [.18, .12]].forEach(([x, z]) => mk(box(.04, .32, .04), '#8a5f3a', x, .16, z, desk, false));
    mk(box(1.25, .05, .58), '#c99a66', 0, .52, .54, desk); [[-.57, .3], [.57, .3], [-.57, .78], [.57, .78]].forEach(([x, z]) => mk(box(.05, .5, .05), '#8a5f3a', x, .25, z, desk, false)); }
  const onDesk = (x, z) => new THREE.Vector3(x, .548, z).multiplyScalar(DS).applyAxisAngle(new THREE.Vector3(0, 1, 0), DYAW);

  // prop table: ch = chapter where it lands; home = resting place on the pedestal; home5 = place in the final scene
  const E = (x, y, z) => new THREE.Quaternion().setFromEuler(new THREE.Euler(x, y, z, 'YXZ'));
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const PROPS = [
    { k: 'guitar', ch: 1, hold: 1, home: [V(-1.15, .44, -.45), E(-.12, .5, .16), 1] },
    { k: 'chimarrao', ch: 1, home: [V(-.85, 0, .95), E(0, 0, 0), 1], home5: [onDesk(.46, .42), E(0, 0, 0), .8] },
    { k: 'diploma', ch: 2, home: [V(-.15, 0, 1.38), E(0, .5, 0), 1], home5: [onDesk(-.38, .7).add(V(0, 0, 0)), E(0, DYAW + .5, 0), .8] },
    { k: 'laptop', ch: 2, home: [V(.95, 0, .9), E(0, -.6, 0), 1.1], home5: [onDesk(.05, .52), E(0, DYAW + Math.PI, 0), .95] },
    { k: 'kettlebell', ch: 2, home: [V(1.35, 0, -.05), E(0, .4, 0), 1] },
    { k: 'backpack', ch: 3, hold: 1, home: [V(.95, 0, -.95), E(0, .5, 0), 1] },
    { k: 'surfboard', ch: 3, home: [V(-.45, 1.02, -1.38), E(0, .25, Math.PI / 2 - .06), 1] },
    { k: 'snowboard', ch: 4, hold: 1, home: [V(.38, .8, -1.45), E(0, -.2, Math.PI / 2 + .07), 1] },
    { k: 'lamp', ch: 5, home: [onDesk(-.46, .66), E(0, DYAW + 2.4, 0), .95] },
    { k: 'notebook', ch: 5, home: [onDesk(-.3, .42), E(0, DYAW + .3, 0), .8] },
    ...['PT', 'EN', 'ES', 'FR', 'DE', 'IT'].map((c, i) => { const th = -.62 + i * .3 + .32; return { k: c, pin: 1, ch: [1, 2, 3, 4, 4, 5][i],
      home: [V(Math.sin(th) * (PR + .03), -PH * .5, Math.cos(th) * (PR + .03)), E(0, th, 0), c === 'DE' ? .82 : 1] }; })
  ];
  PROPS.forEach((p, i) => { p.g = p.pin ? pin(p.k, p.k === 'IT') : make[p.k](); scene.add(p.g);
    p.ph = i / PROPS.length * Math.PI * 2 * 1.618 * 3; p.rr = i % 2 ? 1 : .8; p.hh = ((i * 37) % 11) / 11 - .5; p.ax = V(Math.sin(i * 2.1), 1, Math.cos(i * 1.3)).normalize(); p.init = false; });

  /* ---------- little Gabriel ---------- */
  const fig = G(); scene.add(fig);
  const real = { model: null, mixer: null, actions: {}, cur: null, bones: {}, floor: [], baseY: 0 }, pick3 = [];
  let seqDone = false;
  if (THREE.GLTFLoader) new THREE.GLTFLoader().load('assets/models/gabriel.glb', g => {
    const m = G(); m.add(g.scene);
    m.traverse(o => { if (o.isMesh) { o.frustumCulled = false; if (o.material && o.material.map) { const mp = o.material.map; mp.encoding = THREE.sRGBEncoding; o.material = new THREE.MeshToonMaterial({ map: mp, gradientMap: grad, side: THREE.DoubleSide }); } pick3.push(o); } });
    real.mixer = new THREE.AnimationMixer(m);
    g.animations.forEach(c => { c.tracks.forEach(tr => { if (/Hips\.position$/.test(tr.name)) { const v = tr.values, x0 = v[0], z0 = v[2]; for (let i = 0; i < v.length; i += 3) { v[i] = x0; v[i + 2] = z0; } } }); real.actions[c.name] = real.mixer.clipAction(c); });
    real.mixer.addEventListener('finished', () => { seqDone = true; });
    const idle = real.actions.Idle; if (idle) { idle.play(); real.mixer.update(0); real.cur = idle; }
    m.updateMatrixWorld(true);
    const bone = n => { let b = null; g.scene.traverse(o => { if (!b && o.isBone && o.name.replace(/[^A-Za-z0-9]/g, '').toLowerCase().endsWith(n)) b = o; }); return b; };
    const top = bone('headtopend'), toe = bone('lefttoeend') || bone('leftfoot');
    if (top && toe) { const h = top.getWorldPosition(V(0, 0, 0)).distanceTo(toe.getWorldPosition(V(0, 0, 0))) || 1; m.scale.setScalar(1.9 / h); m.updateMatrixWorld(true); m.position.y = -toe.getWorldPosition(V(0, 0, 0)).y + .02; }
    real.baseY = m.position.y; real.bones = { lh: bone('lefthand'), rh: bone('righthand'), sp: bone('spine2') || bone('spine1') || bone('spine'), head: bone('head') };
    g.scene.traverse(o => { if (o.isBone && /(foot|toe|hand|leg|head|hips|spine|arm)/i.test(o.name)) real.floor.push(o); });
    fig.add(m); real.model = m;
  }, undefined, e => console.warn('character', e));
  function play(name, once) { const a = real.actions[name]; if (!a || real.cur === a) return;
    a.reset(); a.setLoop(once ? THREE.LoopOnce : THREE.LoopRepeat, Infinity); a.clampWhenFinished = !!once; a.setEffectiveWeight(1).fadeIn(.4).play(); if (real.cur) real.cur.fadeOut(.4); real.cur = a; }

  /* ---------- per-chapter direction ---------- */
  const YAW = [0, .5, .3, .95, .25, DYAW, DYAW];
  let cur = 0, prev = 0, tapUntil = 0, mx = 0, my = 0, pmx = 0, pmy = 0;
  function enter(c) { prev = cur; cur = c; if (c === 6) seqDone = prev !== 5; }
  function wantClip(t) {
    if (t < tapUntil && cur !== 6) return [cur === 5 ? 'Sitting_Thumbs_Up' : 'Waving'];
    if (cur === 6) return ['Waving'];
    return [['Idle', 'Guitar_Playing', real.actions.Explaining ? 'Explaining' : 'Looking_Around', 'Walking_1', 'Skateboarding', 'Typing'][cur]];
  }

  /* ---------- camera / sizing ---------- */
  const cam = { d: 20, ty: 1.3, el: .16 };
  function resize() { renderer.setSize(W, H, false); camera.aspect = W / H; camera.setViewOffset(W, H, W / 2 - R.cx, H / 2 - R.cy, W, H); camera.updateProjectionMatrix(); }
  resize();
  const tanF = Math.tan(15 * Math.PI / 180);
  const fit = (needW, needH) => Math.max(needH / (2 * tanF * R.sh / H), needW / (2 * tanF * camera.aspect * R.sw / W));

  /* ---------- tap to say hi ---------- */
  const GREET = [['Olá!', 'PT'], ['Hello!', 'EN'], ['¡Hola!', 'ES'], ['Bonjour !', 'FR'], ['Hallo!', 'DE · learning']];
  let gi = 0, bubbleUntil = 0; const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  const hit = (x, y) => { ndc.set(x / W * 2 - 1, -(y / H) * 2 + 1); ray.setFromCamera(ndc, camera); return ray.intersectObjects(pick3, false).length > 0; };
  const blocked = el => el.closest('a,button,input,textarea,label,.note,.lab,.inner,.kit,header');
  document.addEventListener('pointermove', e => { mx = e.clientX / W - .5; my = e.clientY / H - .5; if (!on) return; document.body.style.cursor = !blocked(e.target) && hit(e.clientX, e.clientY) ? 'pointer' : ''; }, { passive: true });
  document.addEventListener('click', e => { if (!on || blocked(e.target) || !hit(e.clientX, e.clientY)) return; const [g, l] = GREET[gi++ % GREET.length]; if (bubble) bubble.innerHTML = `${g}<small>${l}</small>`; tapUntil = bubbleUntil = clock.elapsedTime + 2.2; });

  /* ---------- frame ---------- */
  const clock = new THREE.Clock(); let first = true;
  const _p = V(0, 0, 0), _q = new THREE.Quaternion(), _a = V(0, 0, 0), _b = V(0, 0, 0), _c = V(0, 0, 0), _x = V(0, 0, 0), _y = V(0, 0, 0), _z = V(0, 0, 0), _m = new THREE.Matrix4(), UP = V(0, 1, 0), look = V(0, 1, 0);
  let figY = 1.0, figYaw = 0, pedY = -6, deskS = .001;
  function frame() {
    requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), .05), t = reduce ? 8 : clock.elapsedTime;
    if (!on) return;
    const snap = first || reduce, k = snap ? 1 : 1 - Math.exp(-dt * 4.5), kf = snap ? 1 : 1 - Math.exp(-dt * 16);
    const Rorb = phone ? 2.15 : 3.3, oS = phone ? .78 : 1;

    // pedestal + figure
    pedY = lerp(pedY, cur === 0 ? -6 : 0, k); ped.position.y = pedY; ped.visible = pedY > -5.5; pedMat.color.lerp(PEDC[cur], k);
    const fy = cur === 0 ? 1.0 + Math.sin(t * 1.1) * .08 : (cur === 4 ? .09 : 0); figY = lerp(figY, fy, k);
    const yawT = cur === 0 ? Math.sin(t * .35) * .5 + .3 : YAW[cur]; figYaw = lerp(figYaw, yawT, k);
    fig.position.set(0, figY, 0); fig.rotation.y = figYaw;
    deskS = lerp(deskS, cur >= 5 ? DS : .001, k); desk.scale.setScalar(deskS); desk.visible = deskS > .01; for (let i = 0; i < 6; i++) desk.children[i].visible = cur !== 6;
    shadow.position.y = (cur === 0 ? -.9 : -PH - .12); shadow.scale.setScalar(cur === 0 ? 3.2 : PR * 3.4); shadow.material.opacity = lerp(shadow.material.opacity, cur === 0 ? .45 : 1, k);
    if (real.model) { const [n, once] = wantClip(t); play(n, once); real.mixer.update(dt);
      real.model.position.y = real.baseY; fig.updateMatrixWorld(true);
      if (cur > 0) { let lo = 1e9; for (const b of real.floor) { b.getWorldPosition(_a); if (_a.y < lo) lo = _a.y; } const fl = fig.position.y + .03; if (lo < fl) { real.model.position.y += fl - lo; fig.updateMatrixWorld(true); } } }

    // camera
    const needW = cur === 0 ? 2 * Rorb + 1.7 : cur >= 5 ? (phone ? 4.3 : 5.4) : (phone ? 4.2 : 2 * Rorb + 1.2), needH = cur === 0 ? (phone ? 4.3 : 4.9) : cur >= 5 ? 5.0 : 4.0;
    cam.d = lerp(cam.d, fit(needW, needH), k); cam.ty = lerp(cam.ty, cur === 0 ? 1.45 : cur >= 5 ? .7 : .85, k); cam.el = lerp(cam.el, cur === 0 ? .14 : cur >= 5 ? .4 : .24, k);
    pmx += (mx - pmx) * .05; pmy += (my - pmy) * .05; const az = .32 + pmx * .16, el = cam.el + pmy * .05;
    look.set(0, cam.ty, 0); camera.position.set(look.x + cam.d * Math.sin(az) * Math.cos(el), look.y + cam.d * Math.sin(el), look.z + cam.d * Math.cos(az) * Math.cos(el)); camera.lookAt(look);
    camera.updateMatrixWorld(true);

    // props
    const oc = cur === 0 ? 1.9 : 1.55;
    for (const p of PROPS) {
      let ks = k; const st = cur < p.ch ? 0 : (cur === p.ch && p.hold && real.model ? 1 : 2);
      let s = 1;
      if (st === 0) { const a = p.ph + t * (Math.PI * 2 / 44); const r = Rorb * p.rr;
        _p.set(Math.cos(a) * r, oc + p.hh * 1.5 + Math.sin(t * .5 + p.ph) * .14 + Math.sin(a) * r * .22, Math.sin(a) * r * .8);
        if (p.pin) _q.copy(camera.quaternion); else _q.setFromAxisAngle(p.ax, t * .35 + p.ph);
        s = oS * (p.pin ? 1.15 : (p.k === 'surfboard' || p.k === 'snowboard' ? .72 : 1));
      } else if (st === 1) { ks = kf; _z.set(Math.sin(figYaw), 0, Math.cos(figYaw));
        if (p.k === 'guitar') { real.bones.rh.getWorldPosition(_a); real.bones.lh.getWorldPosition(_b); real.bones.sp.getWorldPosition(_c);
          _a.lerp(_c, .3).addScaledVector(_z, .09); _a.y -= .04; _y.copy(_b).sub(_a).normalize(); _z.addScaledVector(_y, -_z.dot(_y)).normalize(); _x.crossVectors(_y, _z);
          _m.makeBasis(_x, _y, _z); _q.setFromRotationMatrix(_m); _p.copy(_a); s = .95; }
        else if (p.k === 'backpack') { real.bones.sp.getWorldPosition(_a); _p.copy(_a).addScaledVector(_z, -.3); _p.y -= .34; _q.setFromAxisAngle(UP, figYaw + Math.PI); s = .9; }
        else { _p.set(0, fig.position.y - .07, 0); _q.setFromAxisAngle(UP, figYaw); }
      } else { const h = cur >= 5 && p.home5 ? p.home5 : p.home; _p.copy(h[0]); _p.y += Math.min(0, pedY); _q.copy(h[1]); s = h[2]; }
      if (!p.init || snap) { p.g.position.copy(_p); p.g.quaternion.copy(_q); p.g.scale.setScalar(s); p.init = true; }
      else { p.g.position.lerp(_p, ks); p.g.quaternion.slerp(_q, ks); p.g.scale.setScalar(lerp(p.g.scale.x, s, ks)); }
    }
    first = false;
    renderer.render(scene, camera);

    if (bubble) { const show = t < bubbleUntil && real.bones.head; if (show) { real.bones.head.getWorldPosition(_a); _a.y += .5; _a.project(camera); bubble.style.left = ((_a.x + 1) / 2 * W) + 'px'; bubble.style.top = ((1 - _a.y) / 2 * H) + 'px'; } bubble.classList.toggle('on', !!show); }
  }
  requestAnimationFrame(frame);
  return { enter, resize };
}
})();
