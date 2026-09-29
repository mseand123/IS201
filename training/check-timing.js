#!/usr/bin/env node
/* The "left" figure in the player, checked against the estimator for every step the app
   can build. A four-round hold once read "~3 s left" because only the round in front of
   you was counted, so this walks hereSeconds() through every phase of every step.
   Run: node training/check-timing.js            (exit 1 on findings)                  */
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = __dirname;
const d = require(path.join(dir, 'data.js'));

// The same element stub audit.js uses: the app is a browser script, loaded here for its maths.
const mkEl = () => new Proxy({ style: {}, classList: { add(){}, remove(){}, toggle(){} }, children: [],
  setAttribute(){}, appendChild(){ return mkEl(); }, querySelector(){ return mkEl(); }, addEventListener(){},
  removeChild(){}, focus(){}, getContext(){ return null; } }, { get(t, k) { return k in t ? t[k] : (typeof k === 'string' && /^on/.test(k) ? null : t[k]); }, set(t, k, v) { t[k] = v; return true; } });
const sandbox = {
  console, Math, Date, JSON, Object, Array, Number, String, Boolean, RegExp, Set, Map, Promise, Error,
  parseInt, parseFloat, isNaN, isFinite, encodeURIComponent, decodeURIComponent, setTimeout, clearTimeout,
  document: { createElement: mkEl, createElementNS: mkEl, querySelector: mkEl, querySelectorAll: () => [], addEventListener(){}, body: mkEl(), documentElement: mkEl(), activeElement: null },
  window: { addEventListener(){}, matchMedia: () => ({ matches: false, addEventListener(){} }), scrollTo(){}, speechSynthesis: null, location: { hash: '' } },
  localStorage: { getItem: () => null, setItem(){}, removeItem(){} },
  navigator: { wakeLock: null, userAgent: 'audit' }, performance: { now: () => 0 },
  requestAnimationFrame: () => 0, cancelAnimationFrame(){}, matchMedia: () => ({ matches: false, addEventListener(){} }),
  ...d
};
sandbox.window.document = sandbox.document;
let src = fs.readFileSync(path.join(dir, 'app.js'), 'utf8');
src = src.replace(/\(function \(\) \{\s*'use strict';/, '').replace(/\}\)\(\);\s*$/, '');
src = src.replace(/\nload\(\);\nbuildShell\(\);\nrender\(\);\s*$/, '\n');
src += '\n;__out = { makeStep, stepSeconds, hereSeconds, manualSeconds, switchInfo, COUNT_IN, fmtMins };';
sandbox.__out = null;
vm.runInNewContext(src, sandbox, { filename: 'app.js' });
const A = sandbox.__out;
if (!A) { console.error('could not load the estimator'); process.exit(2); }

const fail = []; const ck = (c, m) => { if (!c) fail.push('✗ ' + m); };
const READY_MS = 4000;
let checked = 0, worst = null;

function checkStep(st, tag) {
  checked++;
  const total = A.stepSeconds(st);              // includes the 4 s count-in
  const ready = A.hereSeconds(st, 'ready', READY_MS, 1);
  // At "ready" the step has not started, so what is left is the whole step.
  const diff = Math.abs(ready - total);
  ck(diff <= 2, tag + ': the ready screen should owe ' + Math.round(total) + ' s, said ' + Math.round(ready));
  if (!worst || diff > worst.diff) worst = { tag: tag, diff: diff };

  const N = Math.max(1, st.rounds || 1);
  const rest = Math.max(st.rest || 0, A.switchInfo(st) ? 8 : 0);
  if (st.mode === 'timed') {
    const w1 = A.hereSeconds(st, 'work', st.work * 1000, 1);
    ck(Math.abs(w1 - (total - A.COUNT_IN)) <= 1,
       tag + ': round one should still owe ' + Math.round(total - A.COUNT_IN) + ' s, said ' + Math.round(w1));
    // it has to fall round by round, and never below the round in front of you
    let prev = w1;
    for (let r = 1; r <= N; r++) {
      const mid = A.hereSeconds(st, 'work', st.work * 1000 / 2, r);
      ck(mid >= st.work / 2 - 1, tag + ' round ' + r + ': said ' + Math.round(mid) + ' s with ' + Math.round(st.work / 2) + ' s on the clock');
      ck(mid <= prev + 1, tag + ' round ' + r + ': the estimate grew (' + Math.round(prev) + ' → ' + Math.round(mid) + ')');
      prev = mid;
      if (r < N && rest) {
        const rs = A.hereSeconds(st, 'rest', rest * 1000, r);
        ck(rs <= prev + 1, tag + ' rest ' + r + ': the estimate grew over the rest');
        ck(rs >= st.work * (N - r), tag + ' rest ' + r + ': ' + Math.round(rs) + ' s left but ' + (N - r) + ' rounds of ' + st.work + ' s to go');
        prev = rs;
      }
    }
    const last = A.hereSeconds(st, 'work', 1000, N);
    ck(last <= 2, tag + ': a second from the end it should read ~1 s, said ' + Math.round(last));
  } else {
    const m0 = A.hereSeconds(st, 'manual', 0, 1);
    ck(Math.abs(m0 - (total - A.COUNT_IN)) <= 2,
       tag + ': a hand-counted set should owe ' + Math.round(total - A.COUNT_IN) + ' s at the start, said ' + Math.round(m0));
    const mid = A.hereSeconds(st, 'manual', -5000, 1);
    ck(mid <= m0 + 1 && mid > 0, tag + ': a hand-counted estimate should tick down, ' + Math.round(m0) + ' → ' + Math.round(mid));
  }
}

const walk = (items, where) => items.forEach((it, i) => {
  const st = A.makeStep(it, where, null, i);
  if (st) checkStep(st, where + ' › ' + (d.EX[it.x] || {}).n);
});
Object.entries(d.SESSIONS).forEach(([k, s]) => (s.blocks || []).forEach(b => walk(b.items, k + '/' + b.n)));
d.ROUTINES.forEach(r => walk(r.items, r.id));
walk(d.ARMOR.items, 'ARMOR');
walk(d.FREE_WINS.items, 'FREE_WINS');

console.log('steps checked:', checked, '| worst ready-screen gap:', worst ? worst.diff.toFixed(1) + ' s (' + worst.tag + ')' : 'n/a');
if (fail.length) { console.log(fail.slice(0, 25).join('\n')); process.exit(1); }
console.log('TIMING OK');
