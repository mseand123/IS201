#!/usr/bin/env node
/* Loads the app's own estimator (no browser) and audits every step the app can build:
   unparseable doses, per-side/round mismatches, outlier durations, and a duration table.
   Run: node training/audit.js            (exit 1 on findings)                        */
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = __dirname;
const d = require(path.join(dir, 'data.js'));

// A permissive element stub so module-level el(...) calls at load time do not explode.
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
src += '\n;__out = { manualSeconds, stepSeconds, timerFromDose, SIDE_MULT, switchInfo, makeStep, buildSteps, stepsFromItems, runSeconds, sessionSeconds, REST_BY_CAT, SET_REST, fmtMins };';
sandbox.__out = null;
vm.runInNewContext(src, sandbox, { filename: 'app.js' });
const A = sandbox.__out;
if (!A) { console.error('could not load estimator'); process.exit(2); }

const findings = [];
const flag = (sev, where, msg) => findings.push({ sev, where, msg });
const perSide = /per (side|leg|foot|arm|hand)|each (side|leg|foot|arm|hand)|each direction/i;

function auditItems(items, where) {
  items.forEach((it, i) => {
    const e = d.EX[it.x]; if (!e) return;
    const st = A.makeStep(it, where, null, i); if (!st) return;
    const dose = it.d || e.dose || '';
    const secs = A.stepSeconds(st);
    const tag = where + ' › ' + e.n + ' [' + dose + ']';
    if (st.mode === 'manual') {
      const raw = A.manualSeconds(st.x, st.dose, st.est);
      const probe = A.manualSeconds(st.x, (st.dose || '').replace(/\d+/g, '999'), st.est);
      if (!st.est && !e.est && /\d/.test(dose) && raw === probe) flag('warn', tag, 'dose fell to the flat fallback — the estimator could not read it');
      if (!/\d/.test(st.dose || '') && !st.est && !e.est) flag('warn', tag, 'dose has no number and no est — estimated at a flat ' + raw + ' s');
    }
    // per-side doses must produce an even round count so sides balance
    if (perSide.test(dose) && st.rounds % 2 !== 0) flag('error', tag, 'per-side dose but ' + st.rounds + ' round(s) — sides will not balance');
    // switch alert only fires with a rest; a per-side step with no rest is silent
    if (perSide.test(dose) && st.rounds > 1 && !st.rest) flag('error', tag, 'per-side step with no changeover rest — no switch alert');
    if (secs > 30 * 60 && !(st.est || e.est)) flag('warn', tag, 'single step estimated at ' + A.fmtMins(secs));
    if (secs < 8) flag('warn', tag, 'single step estimated at ' + secs + ' s');
    if (st.mode === 'timed' && st.work > 600) flag('warn', tag, 'timed work of ' + st.work + ' s per round');
  });
}
Object.entries(d.SESSIONS).forEach(([k, s]) => (s.blocks || []).forEach(b => auditItems(b.items, 'session ' + k + ' / ' + b.n)));
d.ROUTINES.forEach(r => auditItems(r.items, 'routine ' + r.id));
auditItems(d.ARMOR.items, 'ARMOR');

// duration tables
const rows = d.ROUTINES.map(r => [A.fmtMins(A.runSeconds(A.stepsFromItems(r.items, r.n))), r.tag, r.n]);
console.log('ROUTINES'); rows.forEach(([m, t, n]) => console.log('  ' + m.padStart(9) + '  ' + t.padEnd(9) + n));
console.log('SESSIONS (with armor)');
Object.entries(d.SESSIONS).forEach(([k, s]) => {
  const secs = s.fixed ? s.dur * 60 : A.runSeconds(A.buildSteps(s, new Date(), { armor: true }));
  const line = '  ' + A.fmtMins(secs).padStart(9) + '  ' + (s.type || '').padEnd(5) + s.n + (s.fixed ? '  (fixed)' : '');
  console.log(line);
  if (!s.fixed && secs > 100 * 60) flag('warn', 'session ' + k, 'runs ' + A.fmtMins(secs) + ' with armor');
});
console.log('ARMOR  ' + A.fmtMins(A.runSeconds(A.buildSteps(null, new Date(), { armor: true }))));

console.log();
const errs = findings.filter(f => f.sev === 'error'), warns = findings.filter(f => f.sev === 'warn');
warns.forEach(f => console.log('  warn  ' + f.where + ' — ' + f.msg));
errs.forEach(f => console.log('  ERROR ' + f.where + ' — ' + f.msg));
console.log('\n' + errs.length + ' error(s), ' + warns.length + ' warning(s)');
process.exit(errs.length ? 1 : 0);
