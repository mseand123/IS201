/* ===========================================================
   GROUND CONTACT — application
   =========================================================== */
(function () {
'use strict';

/* ---------- tiny DOM helpers ---------- */
const $ = (s, r) => (r || document).querySelector(s);
const el = (tag, attrs, kids) => {
  const n = document.createElement(tag);
  if (attrs) for (const k in attrs) {
    if (k === 'class') n.className = attrs[k];
    else if (k === 'html') n.innerHTML = attrs[k];
    else if (k.startsWith('on')) n.addEventListener(k.slice(2), attrs[k]);
    else if (attrs[k] !== null && attrs[k] !== undefined && attrs[k] !== false) n.setAttribute(k, attrs[k]);
  }
  (Array.isArray(kids) ? kids : kids != null ? [kids] : []).forEach(c => {
    if (c === null || c === undefined || c === false) return;
    n.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
  });
  return n;
};
const svgEl = (tag, attrs) => {
  const n = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const k in attrs) if (attrs[k] !== null && attrs[k] !== undefined) n.setAttribute(k, attrs[k]);
  return n;
};
const ico = (d, extra) => {
  const s = svgEl('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    'stroke-width': 1.8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', class: extra || 'nav-ico' });
  d.split('|').forEach(p => s.appendChild(svgEl('path', { d: p })));
  return s;
};

const ICONS = {
  today: 'M12 2v4|M12 22v-4|M2 12h4|M22 12h-4|M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8',
  program: 'M3 5h18|M3 12h18|M3 19h18|M8 3v4|M16 10v4|M11 17v4',
  library: 'M4 4h6v16H4z|M14 4h6v16h-6z|M7 8h0|M17 8h0',
  armor: 'M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z|M9 12l2 2 4-4',
  tests: 'M3 18l5-6 4 3 5-8|M3 21h18|M3 3v18',
  method: 'M4 4h11l5 5v11H4z|M15 4v5h5|M8 13h8|M8 17h5',
  play: 'M6 4l14 8-14 8z',
  pause: 'M7 4h4v16H7z|M13 4h4v16h-4z',
  reset: 'M3 12a9 9 0 1 0 3-6.7|M3 4v5h5',
  x: 'M6 6l12 12|M18 6L6 18',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18|M12 7v5l3 2',
  desk: 'M3 4h18v11H3z|M3 19h18|M9 15v4|M15 15v4',
  check: 'M4 12l6 6L20 6'
};

/* ---------- date utilities ---------- */
const iso = d => {
  const z = new Date(d.getTime() - d.getTimezoneOffset() * 6e4);
  return z.toISOString().slice(0, 10);
};
const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const dayIdx = d => (d.getDay() + 6) % 7;            // Mon = 0
const mondayOf = d => addDays(d, -dayIdx(d));
const DOW = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const fmtLong = d => d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
const fmtShort = d => d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
const daysBetween = (a, b) => Math.round((parse(iso(b)) - parse(iso(a))) / 864e5);

/* ---------- plan resolution ---------- */
function phaseFor(date) {
  const t = iso(date);
  for (const p of PHASES) if (t >= p.start && t <= p.end) return p;
  if (t < PHASES[0].start) return PHASES[0];
  return PHASES[PHASES.length - 1];               // past the plan: hold in-season logic
}
function planFor(date) {
  const p = phaseFor(date);
  const start = parse(p.start);
  const weeksIn = Math.max(0, Math.floor(daysBetween(start, date) / 7));
  const totalWeeks = Math.ceil((daysBetween(start, parse(p.end)) + 1) / 7);
  const di = dayIdx(date);
  const sid = p.micro[di];
  return { phase: p, week: Math.min(weeksIn + 1, totalWeeks), totalWeeks, di, sid, session: SESSIONS[sid] };
}
function copenWeekFor(date) {
  // The Copenhagen ladder starts with Phase 1 and runs 10 weeks, then holds at maintenance.
  const p1 = PHASES.find(p => p.id === 'p1');
  const w = Math.floor(daysBetween(parse(p1.start), date) / 7) + 1;
  if (w < 1) return null;
  return COPEN[Math.min(w, COPEN.length) - 1];
}

/* ---------- persistence ---------- */
const KEY = 'groundcontact.v1';
let S = { done: {}, armor: {}, readiness: {}, tests: [], notes: {}, settings: { theme: 'auto', mode: 'gym' } };
function load() {
  try { const r = localStorage.getItem(KEY); if (r) S = Object.assign(S, JSON.parse(r)); } catch (e) { /* private mode */ }
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* quota or private mode — app still works */ }
}

/* ---------- audio cues ---------- */
let actx = null;
function beep(freq, dur, vol) {
  try {
    if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
    if (actx.state === 'suspended') actx.resume();
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(0, actx.currentTime);
    g.gain.linearRampToValueAtTime(vol || .18, actx.currentTime + .01);
    g.gain.exponentialRampToValueAtTime(.0001, actx.currentTime + (dur || .12));
    o.connect(g); g.connect(actx.destination);
    o.start(); o.stop(actx.currentTime + (dur || .12) + .02);
  } catch (e) { /* audio unavailable — timer still runs */ }
}

/* ---------- timer engine ---------- */
const T = {
  cfg: null, phase: 'idle', round: 1, endsAt: 0, left: 0, running: false, raf: 0, lastTick: -1,
  start(cfg) {
    this.cfg = Object.assign({ w: 30, r: 30, rounds: 3, label: 'Hold' }, cfg);
    this.round = 1; this.phase = 'work'; this.left = this.cfg.w * 1000;
    this.endsAt = performance.now() + this.left; this.running = true; this.lastTick = -1;
    dock.hidden = false; beep(880, .1); this.loop();
    if (navigator.wakeLock) navigator.wakeLock.request('screen').then(l => this._lock = l).catch(() => {});
  },
  toggle() {
    if (!this.cfg) return;
    if (this.running) { this.running = false; this.left = Math.max(0, this.endsAt - performance.now()); cancelAnimationFrame(this.raf); }
    else { this.running = true; this.endsAt = performance.now() + this.left; this.loop(); }
    this.render();
  },
  stop() {
    this.running = false; this.cfg = null; this.phase = 'idle';
    cancelAnimationFrame(this.raf); dock.hidden = true;
    if (this._lock) { this._lock.release().catch(() => {}); this._lock = null; }
  },
  loop() {
    const step = () => {
      if (!this.running) return;
      this.left = this.endsAt - performance.now();
      const secs = Math.ceil(this.left / 1000);
      if (secs !== this.lastTick) {
        this.lastTick = secs;
        if (secs <= 3 && secs > 0) beep(this.phase === 'work' ? 660 : 520, .07, .12);
      }
      if (this.left <= 0) this.advance();
      this.render();
      this.raf = requestAnimationFrame(step);
    };
    this.raf = requestAnimationFrame(step);
  },
  advance() {
    const c = this.cfg;
    if (this.phase === 'work') {
      if (this.round >= c.rounds && !c.r) { beep(1180, .34, .22); return this.stop(); }
      if (!c.r) { this.round++; this.phase = 'work'; this.left = c.w * 1000; }
      else { this.phase = 'rest'; this.left = c.r * 1000; beep(440, .18, .16); }
    } else {
      if (this.round >= c.rounds) { beep(1180, .34, .22); return this.stop(); }
      this.round++; this.phase = 'work'; this.left = c.w * 1000; beep(880, .18, .18);
    }
    this.endsAt = performance.now() + this.left; this.lastTick = -1;
  },
  render() {
    if (!this.cfg) return;
    const total = (this.phase === 'work' ? this.cfg.w : this.cfg.r) * 1000;
    const frac = Math.max(0, Math.min(1, this.left / total));
    const C = 2 * Math.PI * 42;
    $('#ringProg').setAttribute('stroke-dasharray', C);
    $('#ringProg').setAttribute('stroke-dashoffset', C * (1 - frac));
    $('#ring').className = 'ring' + (this.phase === 'rest' ? ' rest' : '');
    const s = Math.max(0, this.left / 1000);
    $('#ringBig').textContent = s >= 60 ? Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0') : s.toFixed(1);
    $('#ringSub').textContent = this.phase === 'work' ? 'work' : 'rest';
    $('#dockPhase').textContent = this.phase === 'work' ? 'WORK' : 'REST';
    $('#dockRounds').textContent = 'Round ' + this.round + ' / ' + this.cfg.rounds;
    $('#dockTitle').textContent = this.cfg.label;
    $('#dockPlay').innerHTML = '';
    $('#dockPlay').appendChild(ico(this.running ? ICONS.pause : ICONS.play, 'nav-ico'));
  }
};

/* ---------- pick & run ---------- */
const PICK = { on: false, keys: new Set() };
function pickToggle(k) { PICK.keys.has(k) ? PICK.keys.delete(k) : PICK.keys.add(k); render(); }

/* ---------- gym / home resolution ---------- */
const isHome = () => S.settings.mode === 'home';
function resolve(it) {
  const sb = isHome() && HOME_SUB[it.x];
  if (!sb) return { x: it.x, d: it.d, note: it.note, swapped: false };
  // the gym item's note belongs to the gym exercise — a swap only carries a note the map supplies
  return { x: sb.x, d: sb.d || it.d, note: sb.note, swapped: true, from: it.x };
}

/* ===========================================================
   GUIDED SESSION PLAYER
   Full-screen, hands-free: it walks you through the session
   step by step, counts you in and out, and talks if you let it.
   =========================================================== */

// How long to rest after a set you finish by hand, by exercise category.
const REST_BY_CAT = { strength: 90, plyo: 90, speed: 150, iso: 75, cond: 60, throw: 60,
  armor: 45, tissue: 20, mobility: 20, breath: 15 };

function makeStep(it, blockName, key, ii) {
  const r = resolve(it), e = EX[r.x];
  if (!e) return null;
  const t = e.timer;
  return {
    ii: ii, key: key, block: blockName,
    x: r.x, dose: r.d, note: r.note || (isHome() && e.home) || e.flag || '',
    mode: t ? 'timed' : 'manual',
    work: t ? t.w : 0, rest: t ? t.r : 0, rounds: t ? t.rounds : 1,
    label: t ? t.label : '',
    restAfter: REST_BY_CAT[e.cat] != null ? REST_BY_CAT[e.cat] : 60
  };
}
function buildSteps(session, date, opts) {
  const steps = [];
  (session ? session.blocks : []).forEach((b, bi) =>
    b.items.forEach((it, ii) => { const st = makeStep(it, b.n, 'b' + bi, ii); if (st) steps.push(st); }));
  if (opts && opts.armor) ARMOR.items.forEach((it, ii) => {
    const st = makeStep(it, 'DAILY ARMOR', 'armor', ii); if (st) steps.push(st);
  });
  return steps;
}
// A routine or a hand-picked set: steps that do not belong to today's checklist.
function stepsFromItems(items, blockName) {
  return items.map((it, i) => makeStep(it, blockName, null, i)).filter(Boolean);
}

function say(text) {
  if (S.settings.voice === false) return;
  try {
    if (!window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.02; u.pitch = 1; u.volume = .9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } catch (e) { /* no speech available — beeps still carry the session */ }
}

const RUN = {
  active: false, steps: [], i: 0, phase: 'ready', round: 1,
  left: 0, endsAt: 0, running: false, raf: 0, lastTick: -1,
  startedAt: 0, elapsed: 0, date: null, cueIdx: 0, cueAt: 0,

  open(steps, date, startAt, meta) {
    if (!steps.length) return;
    this.meta = meta || null;
    T.stop();
    this.steps = steps; this.i = Math.max(0, Math.min(startAt || 0, steps.length - 1));
    this.active = true; this.startedAt = Date.now(); this.date = date;
    document.body.classList.add('running');
    runEl.hidden = false;
    this.lock();
    this.enter('ready');
  },
  close(completed) {
    this.active = false; this.running = false;
    cancelAnimationFrame(this.raf);
    document.body.classList.remove('running');
    runEl.hidden = true;
    try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {}
    if (this._lock) { this._lock.release().catch(() => {}); this._lock = null; }
    save(); render();
  },
  lock() {
    if (navigator.wakeLock) navigator.wakeLock.request('screen').then(l => this._lock = l).catch(() => {});
  },

  step() { return this.steps[this.i]; },

  enter(phase) {
    const st = this.step();
    this.phase = phase; this.lastTick = -1; this.cueIdx = 0; this.cueAt = Date.now();
    if (phase === 'ready') {
      this.round = 1;
      this.left = 4000; this.running = true;
      say(EX[st.x].n);
    } else if (phase === 'work') {
      this.left = st.work * 1000; this.running = true;
      beep(880, .14, .2);
      if (st.rounds > 1) say(this.round === st.rounds ? 'Last round' : 'Go');
    } else if (phase === 'rest') {
      this.left = st.rest * 1000; this.running = true;
      beep(440, .2, .16); say('Rest');
    } else if (phase === 'manual') {
      this.left = 0; this.running = true;   // counts up
      this.startManual = Date.now();
    } else if (phase === 'restAfter') {
      this.left = st.restAfter * 1000; this.running = true;
      beep(440, .2, .16);
      const nx = this.steps[this.i + 1];
      say(nx ? 'Rest. Next, ' + EX[nx.x].n : 'Rest');
    } else if (phase === 'done') {
      this.running = false; this.elapsed = Date.now() - this.startedAt;
      if (this.meta && this.meta.routine) {
        (S.routineLog || (S.routineLog = [])).push({ d: iso(this.date || new Date()), id: this.meta.routine });
        save();
      }
      beep(1180, .4, .24); say('Session complete');
      this.build(); return;
    }
    this.endsAt = performance.now() + this.left;
    this.loop(); this.build();
  },

  markDone() {
    const st = this.step(); if (!st || !this.date || !st.key) return;
    const d = iso(this.date);
    if (st.key === 'armor') { const a = S.armor[d] || (S.armor[d] = {}); a[st.ii] = 1; }
    else { const m = S.done[d] || (S.done[d] = {}); m[st.key + ':' + st.ii] = 1; }
    save();
  },

  next() {
    this.markDone();
    if (this.i >= this.steps.length - 1) return this.enter('done');
    this.i++; this.enter('ready');
  },
  prev() {
    if (this.i === 0) return this.enter('ready');
    this.i--; this.enter('ready');
  },
  advance() {              // a countdown reached zero
    const st = this.step();
    if (this.phase === 'ready') return this.enter(st.mode === 'timed' ? 'work' : 'manual');
    if (this.phase === 'work') {
      if (this.round < st.rounds) {
        if (st.rest) return this.enter('rest');
        this.round++; return this.enter('work');
      }
      return this.next();   // a timed step's own config already carries its rest
    }
    if (this.phase === 'rest') { this.round++; return this.enter('work'); }
    if (this.phase === 'restAfter') return this.next();
  },
  doneEarly() { this.next(); },              // finish it now, count it done
  skip() {                                   // move on without counting it
    if (this.i >= this.steps.length - 1) return this.enter('done');
    this.i++; this.enter('ready');
  },
  toggle() {
    if (!this.active || this.phase === 'done') return;
    if (this.running) { this.running = false; this.left = Math.max(0, this.endsAt - performance.now()); cancelAnimationFrame(this.raf); }
    else { this.running = true; this.endsAt = performance.now() + this.left; this.loop(); }
    this.build();
  },
  loop() {
    cancelAnimationFrame(this.raf);
    const step = () => {
      if (!this.running || !this.active) return;
      if (this.phase === 'manual') {
        this.left = -(Date.now() - this.startManual);      // count up
      } else {
        this.left = this.endsAt - performance.now();
        const secs = Math.ceil(this.left / 1000);
        if (secs !== this.lastTick) {
          this.lastTick = secs;
          if (secs <= 3 && secs > 0 && this.phase !== 'ready') beep(this.phase === 'work' ? 660 : 520, .07, .13);
          if (secs <= 3 && secs > 0 && this.phase === 'ready') beep(600, .06, .1);
        }
        if (this.left <= 0) { this.advance(); return; }
      }
      // rotate the coaching cue every 6 s
      const cues = EX[this.step().x].cues || [];
      if (cues.length > 1 && Date.now() - this.cueAt > 6000) {
        this.cueIdx = (this.cueIdx + 1) % cues.length; this.cueAt = Date.now();
      }
      this.tick();
      this.raf = requestAnimationFrame(step);
    };
    this.raf = requestAnimationFrame(step);
  },

  build() { buildRun(); },
  tick() { tickRun(); }
};
function st_manualDone() {
  const st = RUN.step();
  if (st.restAfter && RUN.i < RUN.steps.length - 1) { RUN.markDone(); RUN.enter('restAfter'); }
  else RUN.next();
}

/* ---------- the full-screen player UI ----------
   Built once per step/phase change; the rAF loop only touches the few
   nodes that actually change. Rebuilding on every frame detaches the
   buttons mid-tap, which loses presses on a phone.                     */
const runEl = el('div', { class: 'run', hidden: true, role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Guided session' });

function fmtClock(ms) {
  const s = Math.max(0, Math.round(ms / 1000));
  return s >= 60 ? Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0') : String(s);
}

function phaseTotalMs() {
  const st = RUN.step();
  if (RUN.phase === 'ready') return 4000;
  if (RUN.phase === 'rest') return st.rest * 1000;
  if (RUN.phase === 'restAfter') return st.restAfter * 1000;
  return st.work * 1000;
}

// Timer labels read "Plantar roll — switch feet"; only the instruction half
// is worth putting inside the ring, since the name is already on screen.
function ringTag(st, isRest, isReady) {
  if (!st.label || isRest || isReady) return null;
  const i = st.label.indexOf('—');
  if (i < 0) return null;
  return el('span', { class: 'run-tag' }, st.label.slice(i + 1).trim());
}

function buildRun() {
  if (!RUN.active) return;
  const st = RUN.step(), e = EX[st.x];
  runEl.innerHTML = '';
  RUN.ui = {};

  if (RUN.phase === 'done') {
    const mins = Math.max(1, Math.round(RUN.elapsed / 60000));
    runEl.appendChild(el('div', { class: 'run-done' }, [
      el('div', { class: 'eyebrow' }, 'Session complete'),
      el('h2', { class: 'display', style: 'font-size:clamp(2.2rem,9vw,3.4rem)' }, 'Done'),
      el('p', { class: 'num', style: 'font-size:var(--t-lg)' }, RUN.steps.length + ' exercises · ' + mins + ' min'),
      el('p', { class: 'small muted', style: 'max-width:34ch;text-align:center' },
        'Everything is ticked off on the Today screen. Log how it felt in the notes while it is fresh.'),
      el('button', { class: 'btn btn-hi', style: 'margin-top:1rem', onclick: () => RUN.close(true) }, 'Finish')
    ]));
    return;
  }

  const isRest = RUN.phase === 'rest' || RUN.phase === 'restAfter';
  const isReady = RUN.phase === 'ready';
  const isManual = RUN.phase === 'manual';
  const C = 2 * Math.PI * 88;

  const svg = svgEl('svg', { viewBox: '0 0 200 200' });
  svg.appendChild(svgEl('circle', { cx: 100, cy: 100, r: 88, fill: 'none', 'stroke-width': 7, stroke: 'var(--line)' }));
  let prog = null;
  if (!isManual) {                            // no countdown to draw on a hand-timed set
    prog = svgEl('circle', {
      cx: 100, cy: 100, r: 88, fill: 'none', 'stroke-width': 7,
      stroke: isRest ? 'var(--brand)' : 'var(--hi-fill)', 'stroke-linecap': 'round',
      'stroke-dasharray': C, 'stroke-dashoffset': 0, transform: 'rotate(-90 100 100)'
    });
    svg.appendChild(prog);
  }
  RUN.ui.prog = prog; RUN.ui.C = C;

  const nextStep = RUN.steps[RUN.i + 1];
  const hint = RUN.i === RUN.steps.length - 1 ? 'Last one — finish strong'
    : nextStep ? 'Next: ' + EX[nextStep.x].n : '';

  const bar = el('i', { style: 'width:' + (RUN.i / RUN.steps.length * 100).toFixed(1) + '%' });
  runEl.appendChild(el('div', { class: 'run-top' }, [
    el('div', { class: 'run-bar' }, [bar]),
    el('div', { class: 'run-meta' }, [
      el('span', null, st.block),
      el('span', { class: 'num' }, (RUN.i + 1) + ' / ' + RUN.steps.length),
      el('button', { class: 'btn btn-ghost btn-sm', onclick: () => RUN.close(false), 'aria-label': 'Exit session' }, [ico(ICONS.x, 'nav-ico')])
    ])
  ]));

  const time = el('span', { class: 'run-time num' }, '0');
  const cue = el('p', { class: 'run-cue', 'aria-live': 'polite' }, '');
  RUN.ui.time = time; RUN.ui.cue = cue;

  const between = RUN.phase === 'restAfter' && nextStep;
  runEl.appendChild(el('div', { class: 'run-body' }, [
    el('h2', { class: 'display run-name' }, between ? 'Rest' : e.n),
    el('div', { class: 'run-dose num' }, between
      ? ['Up next · ' + EX[nextStep.x].n]
      : [
        st.dose,
        st.rounds > 1 && !isReady ? el('span', { class: 'run-round' }, 'Round ' + RUN.round + ' / ' + st.rounds) : null
      ]),
    el('div', { class: 'run-ring' + (isRest ? ' rest' : '') }, [
      svg,
      el('div', { class: 'run-ring-label' }, [
        time,
        ringTag(st, isRest, isReady)
      ])
    ]),
    cue,
    st.note && (isReady || isManual) ? el('p', { class: 'run-note' }, st.note) : null
  ]));

  runEl.appendChild(el('div', { class: 'run-foot' }, [
    el('div', { class: 'run-ctl' }, [
      el('button', { class: 'btn run-btn', onclick: () => RUN.prev(), 'aria-label': 'Previous exercise' }, '‹ Back'),
      isManual
        ? el('button', { class: 'btn btn-hi run-btn run-btn-main', onclick: () => st_manualDone() }, 'Done')
        : el('button', { class: 'btn btn-hi run-btn run-btn-main', onclick: () => RUN.toggle() }, RUN.running ? 'Pause' : 'Resume'),
      el('button', {
        class: 'btn run-btn',
        onclick: () => (isRest ? RUN.doneEarly() : isManual ? RUN.skip() : RUN.doneEarly())
      }, isRest ? 'Skip rest' : isManual ? 'Skip' : 'Done early')
    ]),
    el('div', { class: 'row', style: 'gap:.4rem' }, [
      el('button', { class: 'btn btn-ghost btn-sm', onclick: () => openEx(between ? nextStep.x : st.x) },
        between ? 'How-to · next' : 'Show how-to'),
      el('button', {
        class: 'btn btn-ghost btn-sm',
        onclick: () => { S.settings.voice = S.settings.voice === false; save(); buildRun(); }
      }, S.settings.voice === false ? 'Voice off' : 'Voice on')
    ]),
    el('div', { class: 'run-hint' }, between ? '' : hint)
  ]));

  tickRun();
}

function tickRun() {
  if (!RUN.active || RUN.phase === 'done' || !RUN.ui || !RUN.ui.time) return;
  const st = RUN.step(), e = EX[st.x];
  const isRest = RUN.phase === 'rest' || RUN.phase === 'restAfter';
  const isManual = RUN.phase === 'manual';
  const total = phaseTotalMs();

  if (RUN.ui.prog) {
    const frac = Math.max(0, Math.min(1, RUN.left / (total || 1)));
    RUN.ui.prog.setAttribute('stroke-dashoffset', (RUN.ui.C * (1 - frac)).toFixed(1));
  }

  const t = isManual ? fmtClock(-RUN.left)
    : RUN.left >= 60000 ? fmtClock(RUN.left)
    : Math.max(0, RUN.left / 1000).toFixed(RUN.left < 10000 ? 1 : 0);
  if (RUN.ui.time.textContent !== t) RUN.ui.time.textContent = t;

  const cues = e.cues || [];
  const nx = RUN.steps[RUN.i + 1];
  const switchCue = st.label && st.label.indexOf('—') >= 0 ? st.label.slice(st.label.indexOf('—') + 1).trim() : '';
  const text = RUN.phase === 'rest' ? (switchCue ? switchCue.charAt(0).toUpperCase() + switchCue.slice(1) : 'Rest — next round coming')
    : RUN.phase === 'restAfter' ? (nx ? EX[nx.x].n + ' · ' + nx.dose : 'Rest')
    : RUN.phase === 'ready' ? 'Get ready'
    : isManual ? 'Tap done when the set is finished'
    : (cues[RUN.cueIdx] || st.dose);
  if (RUN.ui.cue.textContent !== text) RUN.ui.cue.textContent = text;
}

/* ---------- shared bits ---------- */
const typeChip = t => el('span', { class: 'chip ' + (t === 'HIGH' ? 'hard' : t === 'MED' ? 'warn' : 'good') }, [
  el('span', { class: 'load ' + (t === 'HIGH' ? 'l3' : t === 'MED' ? 'l2' : 'l1'), 'aria-hidden': 'true' },
    [el('i'), el('i'), el('i')]),
  t + ' DAY'
]);

function exLink(id, label) {
  return el('button', { type: 'button', onclick: () => openEx(id) }, label || EX[id].n);
}

/* ---------- exercise modal ---------- */
function openEx(id) {
  const e = EX[id]; if (!e) return;
  const body = el('div', { class: 'howto' }, [
    el('div', { class: 'stack stack-xs' }, [
      el('div', { class: 'eyebrow' }, e.cat.toUpperCase() + (e.coach ? ' · ' + e.coach : '')),
      el('h2', { class: 'display', style: 'font-size:var(--t-xl)' }, e.n),
      el('div', { class: 'row', style: 'margin-top:.35rem' }, (e.tags || []).map(t => el('span', { class: 'chip' }, t)))
    ]),
    el('p', { style: 'max-width:64ch;color:var(--ink-2)' }, e.why),
    e.flag ? el('div', { class: 'callout hard' }, [el('div', { class: 'h' }, 'For you specifically'), el('p', { class: 'small' }, e.flag)]) : null,
    e.home ? el('div', { class: 'callout' }, [el('div', { class: 'h' }, 'At home'), el('p', { class: 'small' }, e.home)]) : null,
    e.covert ? el('div', { class: 'callout' }, [
      el('div', { class: 'h' }, 'At a desk · ' + COVERT[e.covert].l),
      el('p', { class: 'small' }, COVERT[e.covert].d)
    ]) : null,
    HOME_SUB[id] ? el('div', { class: 'callout' }, [
      el('div', { class: 'h' }, 'Needs a gym'),
      el('p', { class: 'small' }, [
        'In Home mode this is swapped for ', el('strong', null, EX[HOME_SUB[id].x].n), ' — ' + HOME_SUB[id].d + '.'
      ])
    ]) : null,
    el('div', { class: 'stack stack-xs' }, [
      el('div', { class: 'eyebrow' }, 'Set-up'),
      el('p', { class: 'small' }, e.setup)
    ]),
    el('div', { class: 'stack stack-xs' }, [
      el('div', { class: 'eyebrow' }, 'Execution'),
      el('ol', { class: 'small' }, e.steps.map(s => el('li', null, s)))
    ]),
    el('div', { style: 'display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(220px,1fr))' }, [
      el('div', { class: 'stack stack-xs' }, [
        el('div', { class: 'eyebrow' }, 'Cues'),
        el('ul', { class: 'cue-list' }, (e.cues || []).map(c => el('li', null, [el('span', { class: 'm' }, '›'), el('span', null, c)])))
      ]),
      el('div', { class: 'stack stack-xs' }, [
        el('div', { class: 'eyebrow' }, 'Common faults'),
        el('ul', { class: 'cue-list fault-list' }, (e.faults || []).map(c => el('li', null, [el('span', { class: 'm' }, '×'), el('span', null, c)])))
      ])
    ]),
    el('dl', { class: 'kv' }, [
      el('dt', null, 'Dose'), el('dd', null, e.dose),
      el('dt', null, 'Progress'), el('dd', null, e.prog),
      el('dt', null, 'Regress'), el('dd', null, e.regr)
    ]),
    e.timer ? el('div', { class: 'row' }, [
      el('button', {
        class: 'btn btn-hi', onclick: () => { T.start(e.timer); closeModal(); }
      }, [ico(ICONS.clock, 'nav-ico'), 'Start timer · ' + e.timer.w + 's × ' + e.timer.rounds]),
      el('span', { class: 'xs muted' }, e.timer.r ? e.timer.r + 's rest between' : 'continuous')
    ]) : null
  ]);
  showModal(body);
}

const modalBg = el('div', { class: 'modal-bg', hidden: true, onclick: ev => { if (ev.target === modalBg) closeModal(); } });
const modalBox = el('div', { class: 'modal', role: 'dialog', 'aria-modal': 'true' });
modalBg.appendChild(modalBox);
function showModal(content) {
  modalBox.innerHTML = '';
  modalBox.appendChild(el('button', { class: 'btn btn-ghost btn-sm modal-close', onclick: closeModal, 'aria-label': 'Close' }, [ico(ICONS.x, 'nav-ico')]));
  modalBox.appendChild(content);
  modalBg.hidden = false; modalBox.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}
function closeModal() { modalBg.hidden = true; document.body.style.overflow = ''; }
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (!modalBg.hidden) return closeModal();
  if (RUN.active) RUN.close(false);
});

/* ===========================================================
   VIEW: TODAY
   =========================================================== */
let viewDate = new Date();

function itemRow(date, key, it, i) {
  const r = resolve(it);
  const e = EX[r.x]; if (!e) return null;
  const d = iso(date);
  const doneMap = S.done[d] || (S.done[d] = {});
  const id = key + ':' + i;
  const picked = PICK.keys.has(id);
  const row = el('div', {
    class: 'item' + (doneMap[id] && !PICK.on ? ' done' : '') + (PICK.on ? ' pickable' : '') + (picked ? ' picked' : ''),
    onclick: PICK.on ? (ev) => { if (!ev.target.closest('.item-actions')) pickToggle(id); } : null
  });
  const tick = el('button', {
    class: 'tick' + (PICK.on ? ' pick' : ''),
    'aria-pressed': (PICK.on ? picked : !!doneMap[id]) ? 'true' : 'false',
    'aria-label': (PICK.on ? 'Select ' : 'Mark ') + e.n,
    onclick: (ev) => {
      ev.stopPropagation();
      if (PICK.on) return pickToggle(id);
      if (doneMap[id]) delete doneMap[id]; else { doneMap[id] = 1; beep(760, .06, .09); }
      save(); render();
    }
  }, [svgEl('svg', { viewBox: '0 0 24 24' })]);
  tick.querySelector('svg').appendChild(svgEl('path', { d: 'M4 12l6 6L20 6', fill: 'none', stroke: 'currentColor' }));
  row.appendChild(tick);
  row.appendChild(el('div', { class: 'item-name' }, [
    exLink(r.x),
    r.swapped ? el('span', { class: 'chip swap', title: 'Swapped in for ' + EX[r.from].n }, 'HOME') : null
  ]));
  row.appendChild(el('div', { class: 'item-dose' }, r.d));
  const note = r.note || e.flag;
  if (note) row.appendChild(el('div', { class: 'item-note' }, note));
  if (isHome() && e.home) row.appendChild(el('div', { class: 'item-note home-note' }, e.home));
  const acts = el('div', { class: 'item-actions' });
  acts.appendChild(el('button', {
    class: 'btn btn-sm', title: 'Start the guided session here',
    'aria-label': 'Start guided session at ' + e.n,
    onclick: () => startRun(date, key + ':' + i)
  }, [ico(ICONS.play, 'nav-ico')]));
  row.appendChild(acts);
  return row;
}

// Open the player, optionally starting at a given block:item.
function startRun(date, at, opts) {
  const pl = planFor(date);
  const o = opts || { armor: true };
  const steps = buildSteps(pl.session, date, o);
  let idx = 0;
  if (at) {
    const [k, ii] = at.split(':');
    const found = steps.findIndex(st => st.key === k && String(st.ii) === ii);
    if (found >= 0) idx = found;
  }
  RUN.open(steps, date, idx);
}
function startArmorRun(date) {
  RUN.open(buildSteps(null, date, { armor: true }), date, 0);
}

function blockCard(date, b, bi) {
  return el('section', { class: 'block' }, [
    el('header', { class: 'block-head' }, [
      el('span', { class: 'name' }, b.n),
      b.why ? el('span', { class: 'why' }, b.why) : null
    ]),
    ...b.items.map((it, i) => itemRow(date, 'b' + bi, it, i)).filter(Boolean)
  ]);
}

function readinessCard(date) {
  const d = iso(date);
  const r = S.readiness[d];
  if (r) {
    const flags = r; const score = READINESS.q.reduce((a, q) => a + (r[q.id] || 0), 0);
    const v = READINESS.verdict(score, flags);
    return el('div', { class: 'callout ' + (v.k === 'red' ? 'hard' : v.k === 'amber' ? 'warnc' : '') }, [
      el('div', { class: 'row' }, [
        el('span', { class: 'chip ' + (v.k === 'red' ? 'hard' : v.k === 'amber' ? 'warn' : 'good') }, [el('span', { class: 'dot' }), 'READINESS ' + score + '/30']),
        el('strong', { class: 'small' }, v.t),
        el('button', { class: 'btn btn-ghost btn-sm', style: 'margin-left:auto', onclick: () => { delete S.readiness[d]; save(); render(); } }, 'Redo')
      ]),
      el('p', { class: 'small' }, v.d)
    ]);
  }
  const vals = {};
  const card = el('div', { class: 'card-flat stack stack-sm' }, [
    el('div', { class: 'spread' }, [
      el('div', { class: 'eyebrow' }, 'Morning check-in · 20 seconds'),
      el('span', { class: 'xs muted' }, '1 = bad · 5 = great')
    ]),
    ...READINESS.q.map(q => {
      const wrap = el('div', { class: 'row', style: 'justify-content:space-between' }, [
        el('span', { class: 'small' }, q.n),
        el('div', { class: 'row', style: 'gap:.25rem' }, [1, 2, 3, 4, 5].map(v =>
          el('button', {
            class: 'btn btn-sm', 'data-v': v, onclick: ev => {
              vals[q.id] = v;
              wrap.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b === ev.currentTarget ? 'true' : 'false'));
              ev.currentTarget.style.background = 'var(--brand-2)'; ev.currentTarget.style.color = '#EAF7F2';
              wrap.querySelectorAll('button').forEach(b => { if (b !== ev.currentTarget) { b.style.background = ''; b.style.color = ''; } });
            }
          }, String(v)))
        )
      ]);
      return wrap;
    }),
    el('button', {
      class: 'btn btn-primary', onclick: () => {
        READINESS.q.forEach(q => { if (!vals[q.id]) vals[q.id] = 3; });
        S.readiness[d] = vals; save(); render();
      }
    }, 'Log readiness')
  ]);
  return card;
}

function armorCard(date) {
  const d = iso(date);
  const a = S.armor[d] || (S.armor[d] = {});
  const doneCount = ARMOR.items.filter((_, i) => a[i]).length;
  return el('section', { class: 'block' }, [
    el('header', { class: 'block-head' }, [
      el('span', { class: 'name' }, 'THE DAILY ARMOR'),
      el('span', { class: 'why' }, doneCount + ' / ' + ARMOR.items.length + ' · every day, no exceptions')
    ]),
    ...ARMOR.items.map((it, i) => {
      const r = resolve(it), e = EX[r.x];
      const aid = 'armor:' + i, apicked = PICK.keys.has(aid);
      const row = el('div', {
        class: 'item' + (a[i] && !PICK.on ? ' done' : '') + (PICK.on ? ' pickable' : '') + (apicked ? ' picked' : ''),
        onclick: PICK.on ? (ev) => { if (!ev.target.closest('.item-actions')) pickToggle(aid); } : null
      });
      const tick = el('button', {
        class: 'tick' + (PICK.on ? ' pick' : ''),
        'aria-pressed': (PICK.on ? apicked : !!a[i]) ? 'true' : 'false', 'aria-label': 'Mark ' + e.n,
        onclick: (ev) => {
          ev.stopPropagation();
          if (PICK.on) return pickToggle(aid);
          if (a[i]) delete a[i]; else { a[i] = 1; beep(760, .06, .09); } save(); render();
        }
      }, [svgEl('svg', { viewBox: '0 0 24 24' })]);
      tick.querySelector('svg').appendChild(svgEl('path', { d: 'M4 12l6 6L20 6', fill: 'none', stroke: 'currentColor' }));
      row.appendChild(tick);
      row.appendChild(el('div', { class: 'item-name' }, [exLink(r.x)]));
      row.appendChild(el('div', { class: 'item-dose' }, r.d));
      if (r.note) row.appendChild(el('div', { class: 'item-note' }, r.note));
      if (isHome() && e.home) row.appendChild(el('div', { class: 'item-note home-note' }, e.home));
      const acts = el('div', { class: 'item-actions' });
      acts.appendChild(el('button', {
        class: 'btn btn-sm', title: 'Start the armor block here',
        'aria-label': 'Start armor at ' + e.n,
        onclick: () => { RUN.open(buildSteps(null, date, { armor: true }), date, i); }
      }, [ico(ICONS.play, 'nav-ico')]));
      row.appendChild(acts);
      return row;
    })
  ]);
}

function viewToday() {
  const date = viewDate;
  const pl = planFor(date);
  const s = pl.session;
  const d = iso(date);
  const isToday = d === iso(new Date());
  const cw = copenWeekFor(date);

  const head = el('div', { class: 'today-head' }, [
    el('div', { class: 'stack stack-xs' }, [
      el('div', { class: 'eyebrow' }, (isToday ? 'Today · ' : '') + fmtLong(date)),
      el('h1', { class: 'display today-title' }, s.n),
      el('div', { class: 'today-meta', style: 'margin-top:.5rem' }, [
        typeChip(s.type),
        el('span', { class: 'chip' }, '≈ ' + s.dur + ' MIN'),
        el('span', { class: 'chip' }, pl.phase.tag + ' · WK ' + pl.week + '/' + pl.totalWeeks)
      ])
    ]),
    el('div', { class: 'row' }, [
      el('button', { class: 'btn btn-sm', onclick: () => { viewDate = addDays(viewDate, -1); render(); } }, '‹ Prev'),
      !isToday ? el('button', { class: 'btn btn-sm', onclick: () => { viewDate = new Date(); render(); } }, 'Today') : null,
      el('button', { class: 'btn btn-sm', onclick: () => { viewDate = addDays(viewDate, 1); render(); } }, 'Next ›')
    ])
  ]);

  const done = S.done[d] || {};
  const total = s.blocks.reduce((a, b) => a + b.items.length, 0);
  const doneN = Object.keys(done).length;
  const startRow = el('div', { class: 'start-row' }, [
    el('button', { class: 'btn btn-hi btn-start', onclick: () => startRun(date, null, { armor: true }) },
      [ico(ICONS.play, 'nav-ico'), 'Start guided session']),
    el('button', { class: 'btn btn-start-alt', onclick: () => startRun(date, null, { armor: false }) }, 'Session only'),
    el('button', { class: 'btn btn-start-alt', onclick: () => startArmorRun(date) }, 'Armor only · 12 min'),
    el('button', {
      class: 'btn btn-start-alt', 'aria-pressed': PICK.on ? 'true' : 'false',
      onclick: () => { PICK.on = !PICK.on; if (!PICK.on) PICK.keys.clear(); render(); }
    }, PICK.on ? 'Cancel picking' : 'Pick & run'),
    el('span', { class: 'xs muted' }, PICK.on
      ? 'Tap the exercises you want, then run just those.'
      : 'Full screen, counts you in and out, talks you through it.')
  ]);

  const swaps = s.blocks.reduce((a, b) => a + b.items.filter(it => isHome() && HOME_SUB[it.x]).length, 0);
  return el('div', { class: 'stack stack-lg' }, [
    head,
    el('p', { class: 'session-purpose' }, s.purpose),
    startRow,
    isHome() ? el('div', { class: 'callout' }, [
      el('div', { class: 'h' }, 'Home mode' + (swaps ? ' · ' + swaps + (swaps === 1 ? ' swap' : ' swaps') + ' today' : '')),
      el('p', { class: 'small' }, swaps
        ? 'Every lift that needs a gym has been swapped for a bodyweight, doorway or backpack equivalent, marked HOME below. Sprinting and jumping are unchanged — they never needed a gym.'
        : 'Nothing in today\'s session needs a gym. Run it exactly as written.')
    ]) : null,
    readinessCard(date),
    cw && ['strength-a', 'strength-b', 'accel-strength-max', 'maxv-strength-iso', 'maxv-contrast', 'accel-depth'].includes(pl.sid)
      ? el('div', { class: 'callout' }, [
        el('div', { class: 'h' }, 'Copenhagen ladder · week ' + cw.w + ' of 10'),
        el('p', { class: 'small' }, [el('strong', null, EX[cw.ex].n), ' — ' + cw.d + ' · ' + cw.f]),
        cw.note ? el('p', { class: 'small muted' }, cw.note) : null
      ]) : null,
    el('div', { class: 'stack stack-md' }, [
      el('div', { class: 'sec-head' }, [
        el('div', { class: 'spread' }, [
          el('h2', null, 'The session'),
          el('span', { class: 'num xs muted' }, doneN + ' / ' + total + ' complete')
        ]),
        el('div', { class: 'trace' })
      ]),
      ...s.blocks.map((b, i) => blockCard(date, b, i))
    ]),
    el('div', { class: 'stack stack-md' }, [
      el('div', { class: 'sec-head' }, [el('h2', null, 'Armor'), el('div', { class: 'trace' })]),
      armorCard(date)
    ]),
    pickBar(date),
    el('div', { class: 'shortcut' }, [
      el('span', { class: 'eyebrow' }, 'At your desk'),
      ...['desk-reset', 'desk-armor', 'desk-foot'].map(id => {
        const r = ROUTINES.find(x => x.id === id);
        return r ? el('button', {
          class: 'btn btn-sm', onclick: () => RUN.open(stepsFromItems(r.items, r.n), date, 0, { routine: r.id })
        }, [ico(ICONS.play, 'nav-ico'), r.n + ' · ' + r.min + ' min']) : null;
      }).filter(Boolean),
      el('button', { class: 'btn btn-ghost btn-sm', onclick: () => go('desk') }, 'All desk routines →')
    ]),
    el('div', { class: 'stack stack-sm' }, [
      el('div', { class: 'eyebrow' }, 'Session notes'),
      el('textarea', {
        rows: 3, placeholder: 'How it felt, loads used, anything that grabbed…',
        oninput: ev => { S.notes[d] = ev.target.value; save(); }
      }, S.notes[d] || '')
    ])
  ]);
}

/* ===========================================================
   VIEW: PROGRAM
   =========================================================== */
function pickBar(date) {
  if (!PICK.on) return null;
  const n = PICK.keys.size;
  const est = (() => {
    const steps = buildSteps(planFor(date).session, date, { armor: true })
      .filter(st => PICK.keys.has(st.key + ':' + st.ii));
    const secs = steps.reduce((a, st) => a + (st.mode === 'timed'
      ? st.work * st.rounds + st.rest * (st.rounds - 1) : 45) + 6, 0);
    return Math.max(1, Math.round(secs / 60));
  })();
  return el('div', { class: 'pick-bar' }, [
    el('span', { class: 'num small' }, n ? n + ' selected · ≈ ' + est + ' min' : 'Tap exercises to select'),
    el('button', { class: 'btn btn-sm btn-ghost', onclick: () => { PICK.keys.clear(); render(); } }, 'Clear'),
    el('button', {
      class: 'btn btn-hi', disabled: n ? null : 'disabled',
      onclick: () => {
        const steps = buildSteps(planFor(date).session, date, { armor: true })
          .filter(st => PICK.keys.has(st.key + ':' + st.ii));
        if (steps.length) { PICK.on = false; RUN.open(steps, date, 0); }
      }
    }, [ico(ICONS.play, 'nav-ico'), 'Run ' + (n || '') ])
  ]);
}

function viewProgram() {
  const today = new Date();
  const mon = mondayOf(viewDate);
  const cur = phaseFor(today);

  const weekGrid = el('div', { class: 'week' }, DOW.map((dw, i) => {
    const dt = addDays(mon, i);
    const pl = planFor(dt);
    const isT = iso(dt) === iso(today);
    const dn = Object.keys(S.done[iso(dt)] || {}).length;
    return el('button', {
      class: 'day' + (isT ? ' today' : ''), onclick: () => { viewDate = dt; go('today'); }
    }, [
      el('div', { class: 'spread' }, [
        el('span', { class: 'dow' }, dw),
        el('span', { class: 'load ' + (pl.session.type === 'HIGH' ? 'l3' : pl.session.type === 'MED' ? 'l2' : 'l1') }, [el('i'), el('i'), el('i')])
      ]),
      el('span', { class: 'nm' }, pl.session.n),
      el('span', { class: 'xs muted num dt' }, fmtShort(dt) + (dn ? ' · ' + dn + ' done' : '')),
    ]);
  }));

  const first = parse(PHASES[0].start), last = parse(PHASES[PHASES.length - 1].end);
  const span = daysBetween(first, last) || 1;
  const timeline = el('div', { class: 'phase-bar' }, PHASES.map(p => {
    const a = daysBetween(first, parse(p.start)) / span * 100;
    const w = (daysBetween(parse(p.start), parse(p.end)) + 1) / span * 100;
    const isNow = p.id === cur.id;
    return el('div', { class: 'phase-row' }, [
      el('span', { class: 'small' + (isNow ? '' : ' muted') }, p.n),
      el('div', { class: 'phase-track', title: p.start + ' → ' + p.end }, [
        el('div', { class: 'phase-fill' + (isNow ? ' now' : ''), style: 'left:' + a.toFixed(2) + '%;width:' + w.toFixed(2) + '%' })
      ])
    ]);
  }));

  return el('div', { class: 'stack stack-xl' }, [
    el('div', { class: 'stack stack-md' }, [
      el('div', { class: 'sec-head' }, [
        el('h2', null, 'This week'),
        el('div', { class: 'trace' }),
        el('p', { class: 'small muted' }, 'Week of ' + fmtShort(mon) + ' · ' + cur.n + '. Bars show CNS cost: one bar is a low day, three is a high day. Never two threes back to back.')
      ]),
      el('div', { class: 'row', style: 'margin-bottom:.6rem' }, [
        el('button', { class: 'btn btn-sm', onclick: () => { viewDate = addDays(mon, -7); render(); } }, '‹ Previous week'),
        el('button', { class: 'btn btn-sm', onclick: () => { viewDate = new Date(); render(); } }, 'This week'),
        el('button', { class: 'btn btn-sm', onclick: () => { viewDate = addDays(mon, 7); render(); } }, 'Next week ›')
      ]),
      weekGrid
    ]),
    el('div', { class: 'stack stack-md' }, [
      el('div', { class: 'sec-head' }, [
        el('h2', null, 'The year'),
        el('div', { class: 'trace' }),
        el('p', { class: 'small muted' }, 'Anchored to the UFA calendar: the 2026 season closed at Championship Weekend on August 28, and the 2027 season opens in late April. Everything counts backward from there.')
      ]),
      timeline,
      el('div', { class: 'stack stack-sm', style: 'margin-top:.8rem' }, PHASES.map(p => el('div', {
        class: 'card' + (p.id === cur.id ? '' : ''), style: p.id === cur.id ? 'border-color:var(--hi-fill)' : ''
      }, [
        el('div', { class: 'spread' }, [
          el('div', { class: 'row' }, [
            el('span', { class: 'eyebrow' }, p.tag),
            el('h3', { class: 'display', style: 'font-size:var(--t-md)' }, p.n),
            p.id === cur.id ? el('span', { class: 'chip solid' }, 'CURRENT') : null
          ]),
          el('span', { class: 'num xs muted' }, fmtShort(parse(p.start)) + ' → ' + fmtShort(parse(p.end)))
        ]),
        el('p', { class: 'small', style: 'margin-top:.4rem;max-width:70ch' }, p.focus),
        el('ul', { class: 'small muted', style: 'margin-top:.4rem' }, p.keys.map(k => el('li', null, k))),
        el('div', { class: 'row', style: 'margin-top:.5rem' }, p.micro.map((sid, i) =>
          el('span', { class: 'chip', title: SESSIONS[sid].n }, DOW[i] + ' · ' + SESSIONS[sid].n)))
      ])))
    ]),
    el('div', { class: 'stack stack-md' }, [
      el('div', { class: 'sec-head' }, [
        el('h2', null, 'Weak-link blocks'),
        el('div', { class: 'trace' }),
        el('p', { class: 'small muted' }, 'The rehab tracks as standalone blocks, for when you want to hit one thing properly rather than fit it around a session.')
      ]),
      el('div', { class: 'routine-grid' }, ROUTINES.filter(r => r.tag === 'ARMOR').map(r => routineCard(r, today)))
    ]),
    el('div', { class: 'stack stack-md' }, [
      el('div', { class: 'sec-head' }, [
        el('h2', null, 'When time is short'),
        el('div', { class: 'trace' }),
        el('p', { class: 'small muted' }, 'Not the whole session — the part of it with the highest return.')
      ]),
      el('div', { class: 'routine-grid' }, ROUTINES.filter(r => r.tag === 'SHORT').map(r => routineCard(r, today)))
    ]),
    el('div', { class: 'stack stack-md' }, [
      el('div', { class: 'sec-head' }, [
        el('h2', null, 'Copenhagen ladder'),
        el('div', { class: 'trace' }),
        el('p', { class: 'small muted' }, 'Ten weeks to rebuild the adductor. Volume drives the outcome, so the jumps are deliberately small — most people who fail this exercise failed the progression, not the exercise.')
      ]),
      el('div', { class: 'table-scroll' }, [el('table', { class: 'data' }, [
        el('thead', null, [el('tr', null, [el('th', null, 'Wk'), el('th', null, 'Exercise'), el('th', null, 'Dose'), el('th', null, 'Freq'), el('th', null, 'Note')])]),
        el('tbody', null, COPEN.map(c => {
          const now = copenWeekFor(new Date());
          return el('tr', { style: now && now.w === c.w ? 'background:var(--warn-bg)' : '' }, [
            el('td', { class: 'n' }, String(c.w)),
            el('td', null, [exLink(c.ex)]),
            el('td', null, c.d), el('td', null, c.f),
            el('td', { class: 'small muted' }, c.note)
          ]);
        }))
      ])])
    ])
  ]);
}

/* ===========================================================
   VIEW: QUICK — routines and a build-your-own picker
   =========================================================== */
const COVERT = {
  invisible: { l: 'Invisible', d: 'Nobody can tell you are doing this.', k: 'good' },
  subtle:    { l: 'Subtle', d: 'Reads as fidgeting or a stretch.', k: 'warn' },
  private:   { l: 'Needs a moment', d: 'Fine alone; not in an open-plan office.', k: 'hard' }
};
const BUILD = { keys: new Set(), q: '', cat: 'all' };

function routineCard(r, date) {
  const log = S.routineLog || [];
  const today = iso(new Date());
  const timesToday = log.filter(x => x.d === today && x.id === r.id).length;
  const cov = r.covert ? COVERT[r.covert] : null;
  return el('div', { class: 'card routine' }, [
    el('div', { class: 'spread' }, [
      el('div', { class: 'row', style: 'gap:.4rem' }, [
        el('h3', { style: 'font-size:var(--t-md);font-weight:600' }, r.n),
        cov ? el('span', { class: 'chip ' + cov.k, title: cov.d }, cov.l) : null,
        timesToday ? el('span', { class: 'chip good' }, '✓ ' + (timesToday > 1 ? timesToday + '×' : '') + ' today') : null
      ]),
      el('span', { class: 'num xs muted' }, r.min + ' min')
    ]),
    el('p', { class: 'small muted' }, r.sub),
    el('p', { class: 'small' }, r.why),
    el('div', { class: 'routine-list' }, r.items.map(it =>
      el('button', { class: 'mini', onclick: () => openEx(it.x) }, EX[it.x].n))),
    el('button', {
      class: 'btn btn-primary btn-run', onclick: () => RUN.open(stepsFromItems(r.items, r.n), date, 0, { routine: r.id })
    }, [ico(ICONS.play, 'nav-ico'), 'Run · ' + r.items.length + (r.items.length === 1 ? ' exercise' : ' exercises')])
  ]);
}

function viewDesk() {
  const date = new Date();
  const deskEx = Object.keys(EX).filter(id => (EX[id].tags || []).includes('desk'));
  const byCovert = k => deskEx.filter(id => EX[id].covert === k);
  return el('div', { class: 'stack stack-xl' }, [
    el('div', { class: 'stack stack-md' }, [
      el('div', { class: 'sec-head' }, [
        el('h2', null, 'At your desk'),
        el('div', { class: 'trace' }),
        el('p', { class: 'small muted', style: 'max-width:72ch' },
          'Isometrics and tissue work you can run in a chair, in a meeting, on a call. Both the Copenhagen and the non-operative hip labrum literature point the same way: the armor protocols respond to accumulated frequency far more than to intensity. A workday is the largest unused training window you have.')
      ]),
      el('div', { class: 'routine-grid' }, ROUTINES.filter(r => r.tag === 'DESK').map(r => routineCard(r, date)))
    ]),
    el('div', { class: 'stack stack-md' }, [
      el('div', { class: 'sec-head' }, [
        el('h2', null, 'How visible each one is'),
        el('div', { class: 'trace' })
      ]),
      ...[['invisible', 'Nobody can tell'], ['subtle', 'Reads as fidgeting or a stretch'], ['private', 'Fine alone, not in an open-plan office']]
        .map(([k, label]) => {
          const list = byCovert(k);
          if (!list.length) return null;
          return el('div', { class: 'stack stack-sm' }, [
            el('div', { class: 'row' }, [
              el('span', { class: 'chip ' + COVERT[k].k }, COVERT[k].l),
              el('span', { class: 'small muted' }, label)
            ]),
            el('div', { class: 'row', style: 'gap:.3rem' }, list.map(id =>
              el('button', { class: 'mini', onclick: () => openEx(id) }, EX[id].n)))
          ]);
        }).filter(Boolean)
    ])
  ]);
}

function viewBuild() {
  const date = new Date();
  const ids = Object.keys(EX).filter(id => {
    const e = EX[id];
    const q = BUILD.q.trim().toLowerCase();
    const catOk = BUILD.cat === 'all' ? true
      : BUILD.cat === '__desk' ? (e.tags || []).includes('desk')
      : BUILD.cat === '__home' ? !HOME_SUB[id]
      : (e.cat === BUILD.cat || (e.tags || []).includes(BUILD.cat));
    return catOk && (!q || e.n.toLowerCase().includes(q) || (e.tags || []).join(' ').includes(q));
  });
  const picked = [...BUILD.keys];

  return el('div', { class: 'stack stack-xl' }, [
    el('div', { class: 'stack stack-md' }, [
      el('div', { class: 'sec-head' }, [
        el('h2', null, 'Build your own'),
        el('div', { class: 'trace' }),
        el('p', { class: 'small muted' }, 'Pick any exercises from the library and run them as a guided circuit. To pick from today\'s session instead, use Pick & run on the Today screen.')
      ]),
      el('div', { class: 'filters' }, [
        el('input', {
          type: 'text', placeholder: 'Search…', value: BUILD.q, style: 'min-width:170px',
          oninput: ev => {
            BUILD.q = ev.target.value; const pos = ev.target.selectionStart; render();
            const n = document.querySelector('.build-search'); if (n) { n.focus(); n.setSelectionRange(pos, pos); }
          }, class: 'build-search'
        }),
        ...[['all', 'All'], ['__desk', 'Desk'], ['__home', 'No gym'], ['iso', 'Isometrics'],
            ['armor', 'Rehab'], ['tissue', 'Tissue'], ['mobility', 'Mobility'], ['plyo', 'Plyos'], ['strength', 'Strength']]
          .map(([k, label]) => el('button', {
            class: 'btn btn-sm', 'aria-pressed': BUILD.cat === k ? 'true' : 'false',
            onclick: () => { BUILD.cat = k; render(); }
          }, label))
      ]),
      el('div', { class: 'lib-grid' }, ids.map(id => {
        const on = BUILD.keys.has(id);
        return el('button', {
          class: 'lib-card build-card' + (on ? ' picked' : ''), 'aria-pressed': on ? 'true' : 'false',
          onclick: () => { on ? BUILD.keys.delete(id) : BUILD.keys.add(id); render(); }
        }, [
          el('span', { class: 'n' }, EX[id].n),
          el('span', { class: 'd' }, EX[id].dose),
          el('div', { class: 'row', style: 'gap:.25rem;margin-top:.15rem' }, [
            EX[id].covert ? el('span', { class: 'chip ' + COVERT[EX[id].covert].k }, COVERT[EX[id].covert].l) : null,
            ...(EX[id].tags || []).slice(0, 2).map(t => el('span', { class: 'chip' }, t))
          ])
        ]);
      })),
      picked.length ? el('div', { class: 'pick-bar' }, [
        el('span', { class: 'num small' }, picked.length + ' selected'),
        el('button', { class: 'btn btn-sm btn-ghost', onclick: () => { BUILD.keys.clear(); render(); } }, 'Clear'),
        el('button', {
          class: 'btn btn-hi',
          onclick: () => RUN.open(stepsFromItems(picked.map(x => ({ x: x, d: EX[x].dose })), 'CUSTOM'), date, 0)
        }, [ico(ICONS.play, 'nav-ico'), 'Run ' + picked.length])
      ]) : null
    ])
  ]);
}

/* ===========================================================
   VIEW: LIBRARY
   =========================================================== */
let libFilter = 'all', libQuery = '';
const CATS = [
  ['all', 'All'], ['__desk', 'Desk'], ['__home', 'No gym needed'], ['iso', 'Isometrics'], ['speed', 'Speed'], ['plyo', 'Plyometrics'],
  ['strength', 'Strength'], ['armor', 'Rehab'], ['tissue', 'Tissue & fascia'],
  ['mobility', 'Mobility'], ['cond', 'Conditioning'], ['throw', 'Throwing'], ['breath', 'Breath']
];
function viewLibrary() {
  const ids = Object.keys(EX).filter(id => {
    const e = EX[id];
    const catOk = libFilter === 'all' ? true
      : libFilter === '__desk' ? (e.tags || []).includes('desk')
      : libFilter === '__home' ? !HOME_SUB[id]
      : (e.cat === libFilter || (e.tags || []).includes(libFilter));
    const q = libQuery.trim().toLowerCase();
    const qOk = !q || e.n.toLowerCase().includes(q) || (e.tags || []).join(' ').includes(q) || e.why.toLowerCase().includes(q);
    return catOk && qOk;
  });
  return el('div', { class: 'stack stack-md' }, [
    el('div', { class: 'sec-head' }, [
      el('h2', null, 'Exercise library'),
      el('div', { class: 'trace' }),
      el('p', { class: 'small muted' }, Object.keys(EX).length + ' exercises. Every one has a set-up, a step-by-step, coaching cues, the faults that ruin it, and why it is in the program at all.')
    ]),
    el('div', { class: 'filters' }, [
      el('input', {
        type: 'text', placeholder: 'Search…', value: libQuery, style: 'min-width:180px',
        oninput: ev => { libQuery = ev.target.value; const f = document.activeElement === ev.target; render(); if (f) { const n = $('.filters input'); n.focus(); n.setSelectionRange(n.value.length, n.value.length); } }
      }),
      ...CATS.map(([k, label]) => el('button', {
        class: 'btn btn-sm', 'aria-pressed': libFilter === k ? 'true' : 'false',
        onclick: () => { libFilter = k; render(); }
      }, label))
    ]),
    el('div', { class: 'lib-grid' }, ids.map(id => el('button', { class: 'lib-card', onclick: () => openEx(id) }, [
      el('span', { class: 'n' }, EX[id].n),
      el('span', { class: 'd' }, EX[id].dose),
      el('div', { class: 'row', style: 'gap:.25rem;margin-top:.15rem' }, (EX[id].tags || []).slice(0, 3).map(t => el('span', { class: 'chip' }, t)))
    ]))),
    viewBuild()
  ]);
}

/* ===========================================================
   VIEW: TESTS  (charts)
   =========================================================== */
function seriesFor(id) {
  return S.tests.filter(t => t.id === id).sort((a, b) => a.d < b.d ? -1 : 1);
}
function lineChart(specs, opts) {
  // specs: [{id, name, color, pts:[{d,v}]}]  — single series gets no legend box.
  const W = 320, H = 130, P = { t: 14, r: 34, b: 22, l: 34 };
  const all = specs.flatMap(s => s.pts);
  if (!all.length) return el('p', { class: 'small muted' }, 'No data yet — log a result to start the trend.');
  const dates = [...new Set(all.map(p => p.d))].sort();
  const xs = d => dates.length < 2 ? (W - P.r + P.l) / 2 : P.l + (dates.indexOf(d) / (dates.length - 1)) * (W - P.l - P.r);
  let lo = Math.min(...all.map(p => p.v)), hi = Math.max(...all.map(p => p.v));
  if (opts && opts.target != null) { lo = Math.min(lo, opts.target); hi = Math.max(hi, opts.target); }
  const pad = (hi - lo) * .18 || Math.abs(hi * .1) || 1;
  lo -= pad; hi += pad;
  const ys = v => P.t + (1 - (v - lo) / (hi - lo)) * (H - P.t - P.b);

  const svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': (opts && opts.label) || 'trend chart' });
  // recessive grid
  [0, .5, 1].forEach(f => {
    const y = P.t + f * (H - P.t - P.b);
    svg.appendChild(svgEl('line', { x1: P.l, x2: W - P.r, y1: y, y2: y, stroke: 'var(--line)', 'stroke-width': 1 }));
  });
  svg.appendChild(svgEl('text', { x: P.l - 5, y: P.t + 4, 'text-anchor': 'end', 'font-size': 8, fill: 'var(--muted)', 'font-family': 'var(--mono)' })).textContent = hi.toFixed(hi < 10 ? 1 : 0);
  svg.appendChild(svgEl('text', { x: P.l - 5, y: H - P.b + 3, 'text-anchor': 'end', 'font-size': 8, fill: 'var(--muted)', 'font-family': 'var(--mono)' })).textContent = lo.toFixed(lo < 10 ? 1 : 0);
  if (opts && opts.target != null) {
    const y = ys(opts.target);
    svg.appendChild(svgEl('line', { x1: P.l, x2: W - P.r, y1: y, y2: y, stroke: 'var(--faint)', 'stroke-width': 1, 'stroke-dasharray': '3 3' }));
    const tl = svgEl('text', { x: W - P.r + 3, y: y + 3, 'font-size': 8, fill: 'var(--muted)', 'font-family': 'var(--mono)' });
    tl.textContent = 'target'; svg.appendChild(tl);
  }
  specs.forEach((sp, si) => {
    if (!sp.pts.length) return;
    const dpath = sp.pts.map((p, i) => (i ? 'L' : 'M') + xs(p.d).toFixed(1) + ' ' + ys(p.v).toFixed(1)).join(' ');
    svg.appendChild(svgEl('path', { d: dpath, fill: 'none', stroke: sp.color, 'stroke-width': 2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
    sp.pts.forEach((p, i) => {
      const last = i === sp.pts.length - 1;
      svg.appendChild(svgEl('circle', {
        cx: xs(p.d), cy: ys(p.v), r: last ? 4 : 2.6,
        fill: last ? sp.color : 'var(--raised)', stroke: sp.color, 'stroke-width': 2
      }));
    });
    // direct label on the emphasised endpoint, offset clear of the mark
    const lastP = sp.pts[sp.pts.length - 1];
    const lx = xs(lastP.d), atEdge = lx > W - P.r - 26;
    const above = si === 0;
    const ly = Math.max(P.t + 8, Math.min(H - P.b - 2, ys(lastP.v) + (above ? -9 : 15)));
    const lab = svgEl('text', {
      x: atEdge ? lx - 7 : lx + 7, y: ly, 'font-size': 9.5, fill: 'var(--ink)',
      'font-family': 'var(--mono)', 'font-weight': 600, 'text-anchor': atEdge ? 'end' : 'start'
    });
    lab.textContent = (specs.length > 1 ? sp.name + ' ' : '') + lastP.v;
    svg.appendChild(lab);
  });
  const wrap = el('div', { class: 'chart-wrap' }, [svg]);
  if (specs.length > 1) wrap.appendChild(el('div', { class: 'legend' }, specs.map(sp =>
    el('span', null, [el('i', { style: 'background:' + sp.color }), sp.name]))));
  return wrap;
}

function testCard(t) {
  if (t.pair && t.pair < t.id) return null;  // render the pair once, on the first id
  const partner = t.pair ? TESTS.find(x => x.id === t.pair) : null;
  const specs = [{ id: t.id, name: partner ? 'L' : t.n, color: 'var(--s1)', pts: seriesFor(t.id) }];
  if (partner) specs.push({ id: partner.id, name: 'R', color: 'var(--s2)', pts: seriesFor(partner.id) });
  const name = partner ? t.n.replace(/ — [LR]$/, '') : t.n;
  const latest = specs.map(s => s.pts[s.pts.length - 1]).filter(Boolean);
  const inputs = el('div', { class: 'row', style: 'gap:.35rem' }, specs.map(sp => {
    const inp = el('input', { type: 'number', step: 'any', placeholder: partner ? sp.name : t.u, style: 'width:' + (partner ? '68px' : '92px') });
    inp.dataset.id = sp.id; return inp;
  }));
  return el('div', { class: 'card stack stack-sm' }, [
    el('div', { class: 'spread' }, [
      el('div', { class: 'stack stack-xs' }, [
        el('h3', { style: 'font-size:var(--t-base);font-weight:600' }, name),
        el('span', { class: 'xs muted num' }, 'target ' + t.target + ' ' + t.u + ' · ' + (t.dir === 'up' ? 'higher is better' : 'lower is better'))
      ]),
      latest.length ? el('div', { class: 'stat', style: 'text-align:right' }, [
        el('span', { class: 'v' }, latest.map(p => p.v).join(' / ')),
        el('span', { class: 'l' }, t.u)
      ]) : null
    ]),
    lineChart(specs, { target: t.target, label: name + ' trend' }),
    el('details', null, [
      el('summary', { class: 'xs muted', style: 'cursor:pointer' }, 'Protocol & why'),
      el('p', { class: 'small', style: 'margin-top:.4rem' }, [el('strong', null, 'How: '), t.how]),
      el('p', { class: 'small muted', style: 'margin-top:.3rem' }, t.why)
    ]),
    el('div', { class: 'row' }, [
      inputs,
      el('button', {
        class: 'btn btn-sm btn-primary', onclick: ev => {
          const d = iso(new Date());
          inputs.querySelectorAll('input').forEach(i => {
            if (i.value === '') return;
            const v = parseFloat(i.value);
            if (isNaN(v)) return;
            S.tests = S.tests.filter(x => !(x.id === i.dataset.id && x.d === d));
            S.tests.push({ id: i.dataset.id, d, v });
            i.value = '';
          });
          save(); render();
        }
      }, 'Log'),
      specs.some(s => s.pts.length) ? el('button', {
        class: 'btn btn-ghost btn-sm', onclick: () => {
          const ids = specs.map(s => s.id);
          const lastD = S.tests.filter(x => ids.includes(x.id)).map(x => x.d).sort().pop();
          S.tests = S.tests.filter(x => !(ids.includes(x.id) && x.d === lastD));
          save(); render();
        }
      }, 'Undo last') : null
    ])
  ]);
}

function viewTests() {
  const groups = [['hip', 'Hip'], ['groin', 'Groin'], ['hamstring', 'Hamstring'],
    ['power', 'Power'], ['speed', 'Speed'], ['elastic', 'Elastic'],
    ['mobility', 'Mobility'], ['shoulder', 'Shoulder'],
    ['conditioning', 'Conditioning'], ['recovery', 'Recovery'], ['body', 'Body']];
  const nextTest = (() => {
    const last = S.tests.map(t => t.d).sort().pop();
    if (!last) return 'Run the full battery this week to set your baseline.';
    const days = daysBetween(parse(last), new Date());
    return days >= 28 ? 'Battery due — ' + days + ' days since the last one.' : 'Next battery in ' + (28 - days) + ' days.';
  })();
  return el('div', { class: 'stack stack-xl' }, [
    el('div', { class: 'stack stack-md' }, [
      el('div', { class: 'sec-head' }, [
        el('h2', null, 'Test battery'),
        el('div', { class: 'trace' }),
        el('p', { class: 'small muted' }, 'Every four weeks, same day of the week, same time, same shoes, same order — fresh, not after a session. ' + nextTest + ' Untested training is guessing.')
      ]),
      el('div', { class: 'callout' }, [
        el('div', { class: 'h' }, 'The three numbers that drive the program'),
        el('p', { class: 'small' }, 'Your FADIR score and hip internal rotation gate how deep you train the hip — a rising FADIR score means something in your training has gone too deep, and it is the earliest warning you get. Your drop-jump RSI decides which plyometrics you are allowed: under 1.5 stay on pogos and hops, 1.5–2.0 unlocks moderate work, 2.0+ unlocks depth jumps. Your shoulder IR difference decides whether you do sleeper stretches at all — under 15° means you do not have GIRD and should not be stretching that capsule.')
      ])
    ]),
    ...groups.map(([g, label]) => {
      const cards = TESTS.filter(t => t.cat === g).map(testCard).filter(Boolean);
      if (!cards.length) return null;
      return el('div', { class: 'stack stack-sm' }, [
        el('div', { class: 'eyebrow' }, label),
        el('div', { class: 'test-grid' }, cards)
      ]);
    }).filter(Boolean),
    el('div', { class: 'stack stack-sm' }, [
      el('div', { class: 'eyebrow' }, 'All logged results'),
      el('div', { class: 'table-scroll' }, [el('table', { class: 'data' }, [
        el('thead', null, [el('tr', null, [el('th', null, 'Date'), el('th', null, 'Test'), el('th', null, 'Value'), el('th', null, '')])]),
        el('tbody', null, S.tests.slice().sort((a, b) => a.d < b.d ? 1 : -1).map(r => {
          const t = TESTS.find(x => x.id === r.id) || { n: r.id, u: '' };
          return el('tr', null, [
            el('td', { class: 'num small' }, r.d),
            el('td', { class: 'small' }, t.n),
            el('td', { class: 'n' }, r.v + ' ' + t.u),
            el('td', null, [el('button', {
              class: 'btn btn-ghost btn-sm', onclick: () => { S.tests = S.tests.filter(x => x !== r); save(); render(); }
            }, 'Delete')])
          ]);
        }))
      ])])
    ])
  ]);
}

/* ===========================================================
   VIEW: METHOD
   =========================================================== */
let article = 'method';
function viewMethod() {
  const a = ARTICLES.find(x => x.id === article) || ARTICLES[0];
  return el('div', { class: 'stack stack-md' }, [
    el('div', { class: 'filters' }, ARTICLES.map(x => el('button', {
      class: 'btn btn-sm', 'aria-pressed': x.id === a.id ? 'true' : 'false',
      onclick: () => { article = x.id; render(); window.scrollTo(0, 0); }
    }, x.n))),
    el('div', { class: 'sec-head' }, [
      el('h2', null, a.n),
      el('div', { class: 'trace' }),
      el('p', { class: 'small muted' }, a.sub)
    ]),
    el('div', { class: 'prose' }, a.body.map(b => {
      if (b.h) return el('h3', null, b.h);
      if (b.p) return el('p', null, b.p);
      if (b.ul) return el('ul', null, b.ul.map(i => el('li', null, i)));
      if (b.callout) return el('div', { class: 'callout ' + (b.callout.k || '') }, [
        b.callout.h ? el('div', { class: 'h' }, b.callout.h) : null,
        el('p', { class: 'small' }, b.callout.p)
      ]);
      return null;
    }).filter(Boolean))
  ]);
}

/* ===========================================================
   Shell + router
   =========================================================== */
const NAV = [
  ['today', 'Today', ICONS.today, '1'],
  ['desk', 'Desk', ICONS.desk, '2'],
  ['program', 'Program', ICONS.program, '3'],
  ['library', 'Library', ICONS.library, '4'],
  ['tests', 'Tests', ICONS.tests, '5'],
  ['method', 'Method', ICONS.method, '6']
];
let route = 'today';
function go(r) { route = r; window.scrollTo(0, 0); render(); }

const dock = el('aside', { class: 'dock', hidden: true, 'aria-live': 'off' }, [
  el('div', { class: 'dock-head' }, [
    ico(ICONS.clock, 'nav-ico'),
    el('span', { class: 't', id: 'dockTitle' }, 'Timer'),
    el('button', { class: 'btn btn-ghost btn-sm', style: 'margin-left:auto', onclick: () => T.stop(), 'aria-label': 'Stop timer' }, [ico(ICONS.x, 'nav-ico')])
  ]),
  el('div', { class: 'dock-body' }, [
    (() => {
      const r = el('div', { class: 'ring', id: 'ring' });
      const s = svgEl('svg', { viewBox: '0 0 96 96', width: 96, height: 96 });
      s.appendChild(svgEl('circle', { class: 'track', cx: 48, cy: 48, r: 42, fill: 'none', 'stroke-width': 6 }));
      s.appendChild(svgEl('circle', { class: 'prog', id: 'ringProg', cx: 48, cy: 48, r: 42, fill: 'none', 'stroke-width': 6 }));
      r.appendChild(s);
      r.appendChild(el('div', { class: 'ring-label' }, [
        el('span', { class: 'big', id: 'ringBig' }, '0.0'),
        el('span', { class: 'sub', id: 'ringSub' }, 'work')
      ]));
      return r;
    })(),
    el('div', { class: 'dock-ctl' }, [
      el('span', { class: 'dock-phase', id: 'dockPhase' }, 'WORK'),
      el('span', { class: 'dock-rounds', id: 'dockRounds' }, 'Round 1 / 1'),
      el('div', { class: 'row', style: 'gap:.35rem' }, [
        el('button', { class: 'btn btn-hi', id: 'dockPlay', onclick: () => T.toggle(), 'aria-label': 'Play or pause' }, [ico(ICONS.pause, 'nav-ico')]),
        el('button', { class: 'btn btn-sm', onclick: () => { if (T.cfg) T.start(T.cfg); }, 'aria-label': 'Restart' }, [ico(ICONS.reset, 'nav-ico')])
      ])
    ])
  ])
]);

function strip() {
  const pl = planFor(new Date());
  const d = iso(new Date());
  const a = S.armor[d] || {};
  const armorN = ARMOR.items.filter((_, i) => a[i]).length;
  const r = S.readiness[d];
  const score = r ? READINESS.q.reduce((x, q) => x + (r[q.id] || 0), 0) : null;
  const v = r ? READINESS.verdict(score, r) : null;
  // 28-day armor streak strip
  const cells = [];
  for (let i = 27; i >= 0; i--) {
    const dd = iso(addDays(new Date(), -i));
    const m = S.armor[dd] || {};
    const n = ARMOR.items.filter((_, j) => m[j]).length;
    cells.push(el('i', { class: n >= ARMOR.items.length - 1 ? 'on' : n > 0 ? 'part' : '', title: dd + ' · ' + n + '/' + ARMOR.items.length }));
  }
  return el('div', { class: 'strip' }, [
    el('div', { class: 'strip-brand' }, [
      el('span', { class: 'brand-mark', style: 'font-size:.8rem' }, 'GC'),
      el('span', { class: 'brand-sub', style: 'font-size:9px' }, 'ground contact')
    ]),
    el('div', { class: 'strip-item' }, [el('span', { class: 'eyebrow' }, 'Phase'), el('span', { class: 'v' }, pl.phase.tag + ' · ' + pl.phase.n)]),
    el('div', { class: 'strip-sep' }),
    el('div', { class: 'strip-item wide' }, [el('span', { class: 'eyebrow' }, 'Week'), el('span', { class: 'v' }, pl.week + ' / ' + pl.totalWeeks)]),
    el('div', { class: 'strip-sep' }),
    el('div', { class: 'strip-item' }, [el('span', { class: 'eyebrow' }, 'Today'), el('span', { class: 'v' }, pl.session.n)]),
    el('div', { class: 'strip-sep' }),
    el('div', { class: 'strip-item wide' }, [el('span', { class: 'eyebrow' }, 'Armor · 28 days'), el('div', { class: 'streak', style: 'margin-top:3px' }, cells)]),
    el('div', { class: 'row strip-right', style: 'margin-left:auto;gap:.5rem' }, [
      v ? el('span', { class: 'chip chip-status ' + (v.k === 'red' ? 'hard' : v.k === 'amber' ? 'warn' : 'good') }, [el('span', { class: 'dot' }), v.k.toUpperCase()])
        : el('span', { class: 'chip chip-status' }, armorN + '/' + ARMOR.items.length + ' ARMOR'),
      modeToggle()
    ])
  ]);
}

function modeToggle() {
  const mk = (k, label, title) => el('button', {
    class: 'seg-btn', 'aria-pressed': S.settings.mode === k ? 'true' : 'false', title: title,
    onclick: () => { S.settings.mode = k; save(); render(); }
  }, label);
  return el('div', { class: 'seg', role: 'group', 'aria-label': 'Equipment mode' }, [
    mk('gym', 'Gym', 'Full program as written'),
    mk('home', 'Home', 'No weights — swaps every gym lift for a bodyweight or backpack equivalent')
  ]);
}

function render() {
  const main = $('#main');
  main.innerHTML = '';
  main.appendChild(strip());
  const v = el('div', { class: 'view' }, [
    route === 'today' ? viewToday() :
    route === 'desk' ? viewDesk() :
    route === 'program' ? viewProgram() :
    route === 'library' ? viewLibrary() :
    route === 'tests' ? viewTests() : viewMethod()
  ]);
  main.appendChild(v);
  document.querySelectorAll('[data-route]').forEach(b => {
    b.setAttribute('aria-current', b.dataset.route === route ? 'page' : 'false');
  });
  if (T.cfg) T.render();
}

function buildShell() {
  const rail = el('nav', { class: 'rail' }, [
    el('div', { class: 'brand' }, [
      el('span', { class: 'brand-mark', html: 'Ground<br><span>Contact</span>' }),
      el('span', { class: 'brand-sub' }, 'elastic athlete OS')
    ]),
    el('div', { class: 'nav' }, NAV.map(([r, label, icon, k]) => el('button', {
      'data-route': r, onclick: () => go(r)
    }, [ico(icon), label, el('span', { class: 'k' }, k)]))),
    el('div', { class: 'rail-foot' }, [
      el('button', { class: 'btn btn-sm', onclick: exportData }, 'Copy backup'),
      el('button', { class: 'btn btn-sm', onclick: importData }, 'Restore backup'),
      el('span', { class: 'xs muted' }, 'Saved on this device only.')
    ])
  ]);
  const main = el('main', { class: 'main', id: 'main' });
  const tabs = el('nav', { class: 'tabbar' }, NAV.map(([r, label, icon]) => el('button', {
    'data-route': r, onclick: () => go(r)
  }, [ico(icon, 'nav-ico'), label])));
  document.body.appendChild(el('div', { class: 'shell' }, [rail, main]));
  document.body.appendChild(tabs);
  document.body.appendChild(dock);
  document.body.appendChild(runEl);
  document.body.appendChild(modalBg);
}

function exportData() {
  const txt = JSON.stringify(S);
  navigator.clipboard.writeText(txt).then(
    () => alert('Backup copied to the clipboard. Paste it somewhere safe — a note, an email to yourself.'),
    () => window.prompt('Copy this backup:', txt)
  );
}
function importData() {
  const t = window.prompt('Paste a backup here. This replaces everything currently saved.');
  if (!t) return;
  try { S = Object.assign({ done: {}, armor: {}, readiness: {}, tests: [], notes: {}, settings: {} }, JSON.parse(t)); save(); render(); }
  catch (e) { alert('That did not parse as a backup.'); }
}

document.addEventListener('keydown', e => {
  if (e.target.matches('input, textarea')) return;
  if (RUN.active) {
    if (e.key === ' ') { e.preventDefault(); RUN.phase === 'manual' ? st_manualDone() : RUN.toggle(); }
    if (e.key === 'ArrowRight') RUN.phase === 'manual' ? RUN.skip() : RUN.doneEarly();
    if (e.key === 'ArrowLeft') RUN.prev();
    return;
  }
  const n = NAV.find(x => x[3] === e.key);
  if (n) go(n[0]);
  if (e.key === ' ' && T.cfg) { e.preventDefault(); T.toggle(); }
});

load();
buildShell();
render();
})();
