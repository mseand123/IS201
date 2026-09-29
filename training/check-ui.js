#!/usr/bin/env node
/* The interactions the other checks cannot see: the hub's sections, a queue built from two
   different blocks, every row carrying its label, home mode telling the truth, and the player
   opening with a real estimate. Serves the app itself and drives it in Chromium.
   Run: node training/check-ui.js          (needs playwright; exit 1 on findings)          */
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
let chromium;
for (const p of ['playwright', '/opt/node22/lib/node_modules/playwright']) {
  try { chromium = require(p).chromium; break; } catch { /* try the next one */ }
}
if (!chromium) { console.log('SKIPPED — playwright is not installed'); process.exit(0); }

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  let f = path.join(root, decodeURIComponent(req.url.split('?')[0]));
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  fs.readFile(f, (err, buf) => {
    if (err) { res.writeHead(404); return res.end('no'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
    res.end(buf);
  });
});

const fail = []; const ck = (c, m) => { if (!c) fail.push('✗ ' + m); };
const DATA = require('./data.js');

(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port + '/training/';
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route('https://fonts.googleapis.com/**', r => r.fulfill({ contentType: 'text/css', body: '' }));
  await ctx.route('**/*.woff2', r => r.abort());
  const p = await ctx.newPage();
  p.on('pageerror', e => fail.push('PAGEERROR: ' + e.message));
  p.on('console', m => { if (m.type() === 'error' && !/font|manifest|favicon/i.test(m.text())) fail.push('console: ' + m.text()); });
  await p.goto(base, { waitUntil: 'load' });
  await p.waitForTimeout(800);

  // --- the hub shows every section, and each one opens ---
  await p.keyboard.press('3'); await p.waitForTimeout(500);
  const tiles = (await p.locator('.tile-n').allInnerTexts()).map(t => t.trim());
  ['Frisbee', 'By body part', 'Stretching & range', 'Boss Your Game', 'Hiking', 'Weak-link blocks']
    .forEach(n => ck(tiles.includes(n), 'the hub is missing the ' + n + ' tile'));
  console.log('hub tiles:', tiles.length);

  // every routine the hub can reach, against the data
  const reachable = new Set();
  for (let i = 0; i < await p.locator('.tile').count(); i++) {
    await p.locator('.tile').nth(i).click(); await p.waitForTimeout(350);
    (await p.locator('.routine h3').allInnerTexts()).forEach(t => reachable.add(t.trim()));
    await p.locator('.back-link').click(); await p.waitForTimeout(250);
  }
  DATA.ROUTINES.filter(r => r.tag !== 'DESK').forEach(r =>
    ck(reachable.has(r.n), r.id + ' (' + r.n + ') is in no section of the hub'));
  console.log('routines reachable from the hub:', reachable.size);

  // --- every row in a labelled block says what it targets and what it costs ---
  const strict = ['WARMUP', 'TRAIL', 'BOSS'];
  const sample = DATA.ROUTINES.filter(r => strict.includes(r.tag)).slice(0, 3);
  for (const r of sample) {
    let found = false;
    for (let i = 0; i < await p.locator('.tile').count(); i++) {
      await p.locator('.tile').nth(i).click(); await p.waitForTimeout(300);
      const card = p.locator('.routine').filter({ hasText: r.n }).first();
      if (await card.count()) {
        await card.locator('.btn-pick').click(); await p.waitForTimeout(300);
        const rows = card.locator('.pick-row');
        ck(await rows.count() === r.items.length, r.id + ' should list ' + r.items.length + ' rows, got ' + await rows.count());
        ck(await card.locator('.cost-chip').count() > 0, r.id + ' rows should show what they cost');
        ck(await card.locator('.pick-targets').count() === r.items.length, r.id + ' every row should carry a targets label');
        found = true;
      }
      await p.locator('.back-link').click(); await p.waitForTimeout(220);
      if (found) break;
    }
    ck(found, r.id + ' could not be found in any section');
  }

  // --- a queue built from two different blocks runs as one session ---
  await p.locator('.tile').filter({ hasText: 'Stretching & range' }).first().click(); await p.waitForTimeout(400);
  const a = p.locator('.routine').first();
  const aName = (await a.locator('h3').first().innerText()).trim();
  await a.locator('.btn-pick').click(); await p.waitForTimeout(250);
  await a.locator('.pick-row .tick').first().click(); await p.waitForTimeout(250);
  ck(await p.locator('#queuebar').isVisible(), 'one pick should raise the queue bar');
  await p.locator('.back-link').click(); await p.waitForTimeout(300);
  await p.locator('.tile').filter({ hasText: 'Boss Your Game' }).first().click(); await p.waitForTimeout(400);
  const c = p.locator('.routine').filter({ hasText: 'Upper Pull' }).first();
  await c.locator('.btn-pick').click(); await p.waitForTimeout(250);
  await c.locator('.pick-row .tick').first().click(); await p.waitForTimeout(250);
  const bar = await p.locator('#queuebar').innerText();
  ck(/2 exercises/.test(bar), 'the queue should total both picks, got ' + bar.replace(/\n/g, ' | '));
  ck(bar.includes(aName) && bar.includes('Upper Pull'), 'the queue should name both blocks, got ' + bar.replace(/\n/g, ' | '));
  await p.locator('#queuebar .queue-run').click(); await p.waitForTimeout(600);
  const step = (await p.locator('#runStep').innerText()).trim();
  const left = (await p.locator('#runLeft').innerText()).trim();
  ck(/\/\s*2$/.test(step), 'the queue should run as one 2-step session, got ' + step);
  ck(/min|\d\d\s*s/.test(left), 'the player should show a real estimate, got ' + left);
  ck(!/^~[0-9]\s*s left$/.test(left), 'a multi-round step should not read "~3 s left", got ' + left);
  console.log('queue across two blocks:', step, left);
  await p.locator('.run button[aria-label="Exit session"]').click(); await p.waitForTimeout(300);
  ck(await p.locator('#queuebar').isHidden(), 'running the queue should empty it');

  // --- the Room Circuit runs as a real circuit: every move, every round, labelled ---
  await p.keyboard.press('3'); await p.waitForTimeout(400);
  ck((await p.locator('.tile-n').first().innerText()).trim() === 'Room Circuit', 'the Room Circuit should be the first tile');
  await p.locator('.tile').filter({ hasText: 'Room Circuit' }).first().click(); await p.waitForTimeout(400);
  const room = DATA.ROUTINES.find(r => r.id === 'room-circuit');
  await p.locator('.routine').filter({ hasText: room.n }).first().locator('.btn-run').click(); await p.waitForTimeout(600);
  const roomTop = (await p.locator('.run-meta').innerText()).replace(/\n/g, ' | ');
  ck(new RegExp('/\\s*' + room.items.length * room.rounds + '$').test(roomTop.split(' | ').pop()),
     'the Room Circuit should run ' + room.items.length * room.rounds + ' steps, got ' + roomTop);
  ck(/Round 1 of 3/.test(roomTop), 'the player should say which round, got ' + roomTop);
  console.log('room circuit:', roomTop);
  await p.locator('.run button[aria-label="Exit session"]').click(); await p.waitForTimeout(300);
  await p.locator('.back-link').click(); await p.waitForTimeout(250);

  // --- Boss Your Game: the week is computed and runnable, and nothing is below his numbers ---
  await p.keyboard.press('3'); await p.waitForTimeout(400);
  await p.locator('.tile').filter({ hasText: 'Boss Your Game' }).first().click(); await p.waitForTimeout(500);
  const bossTxt = await p.locator('.view').innerText();
  ck(/run \d+ to \d+ minutes rather than his ten to twenty/.test(bossTxt), 'the Boss intro should state the computed time range');
  ck(/Off the floor/i.test(bossTxt) && /His five rules/.test(bossTxt), 'the off-the-floor card is missing');
  ck(/cold water in the hours after a strength session/i.test(bossTxt), 'the cold-tub conflict should be spelled out');
  const weekRows = p.locator('table.data').last().locator('tbody tr');
  ck(await weekRows.count() === DATA.BOSS_WEEK.length, 'the week should have ' + DATA.BOSS_WEEK.length + ' rows');
  const monTime = (await weekRows.first().innerText()).match(/≈\s*(\d+)\s*min/);
  ck(monTime && +monTime[1] > 30, 'Monday should show its real length, not his ~30 min, got ' + (monTime && monTime[1]));
  await weekRows.first().locator('button').click(); await p.waitForTimeout(600);
  const monSteps = (await p.locator('#runStep').innerText()).trim();
  const wantMon = ['boss-warmup'].concat(DATA.BOSS_WEEK[0].ids)
    .reduce((a, id) => a + DATA.ROUTINES.find(r => r.id === id).items.length, 0);
  ck(new RegExp('/\\s*' + wantMon + '$').test(monSteps), 'Monday should run warm-up + its blocks as ' + wantMon + ' steps, got ' + monSteps);
  console.log('Boss Monday runs as one session:', monSteps, monTime && monTime[1] + ' min');
  await p.locator('.run button[aria-label="Exit session"]').click(); await p.waitForTimeout(300);

  // his minimums, read off the handoff: sets × reps per side can never be below his rounds × reps
  const MIN = { 'sl-hop-exit': 9, 'split-jump': 30, 'bridge-leg-raise': 18, 'pushup': 30, 'pullup': 15, 'bodyweight-squat': 10 };
  DATA.ROUTINES.filter(r => r.tag === 'BOSS').forEach(r => r.items.forEach(it => {
    if (!MIN[it.x]) return;
    const m = it.d.match(/^(\d+)\s*×\s*(\d+)/) || it.d.match(/^(\d+)()/);
    const total = m[2] ? +m[1] * +m[2] : +m[1];
    ck(total >= MIN[it.x], r.id + ' › ' + it.x + ' is ' + total + ', below his minimum of ' + MIN[it.x]);
  }));

  // Home mode must not delete the pull-ups or duplicate a row
  await p.evaluate(() => { const s = JSON.parse(localStorage.getItem('groundcontact.v1') || '{}');
    s.settings = Object.assign(s.settings || {}, { mode: 'home' }); localStorage.setItem('groundcontact.v1', JSON.stringify(s)); });
  await p.reload({ waitUntil: 'load' }); await p.waitForTimeout(700);
  await p.keyboard.press('3'); await p.waitForTimeout(400);
  await p.locator('.tile').filter({ hasText: 'Boss Your Game' }).first().click(); await p.waitForTimeout(500);
  for (const id of ['boss-pull', 'boss-ankles', 'boss-core-hip']) {
    const r = DATA.ROUTINES.find(x => x.id === id);
    const card = p.locator('.routine').filter({ hasText: r.n }).first();
    await card.locator('.btn-pick').click(); await p.waitForTimeout(300);
    const names = (await card.locator('.pick-name').allInnerTexts()).map(t => t.trim());
    ck(new Set(names).size === names.length, id + ' in Home mode lists a row twice: ' + names.join(', '));
    if (id === 'boss-pull') ck(names.includes('Pull-Up'), 'Home mode should keep the pull-ups, got ' + names.join(', '));
  }
  await p.evaluate(() => { const s = JSON.parse(localStorage.getItem('groundcontact.v1') || '{}');
    s.settings.mode = 'gym'; localStorage.setItem('groundcontact.v1', JSON.stringify(s)); });
  await p.reload({ waitUntil: 'load' }); await p.waitForTimeout(600);

  // --- GOATA: the screen, the rules, a runnable week, and the jump work as sets ---
  await p.keyboard.press('3'); await p.waitForTimeout(400);
  await p.locator('.tile').filter({ hasText: 'GOATA Movement' }).first().click(); await p.waitForTimeout(500);
  const goTxt = await p.locator('.view').innerText();
  ck(DATA.GOATA_RULES.every(x => goTxt.includes(x.h)), 'GOATA should show all six form rules');
  ck(/not the evidence/.test(goTxt), 'GOATA should say his anti-lifting view is his opinion');
  const goWeek = p.locator('table.data').filter({ hasText: 'Workout A' }).first();
  const sat = goWeek.locator('tbody tr').filter({ hasText: 'Sat' }).first();
  ck(/\(2 rounds\)/.test(await sat.innerText()), 'the light Saturday should be two rounds');
  await goWeek.locator('tbody tr').first().locator('button').click(); await p.waitForTimeout(600);
  const goMon = (await p.locator('#runStep').innerText()).trim();
  const wantGo = 4 * 2 + 6 * 3;
  ck(new RegExp('/\\s*' + wantGo + '$').test(goMon), 'GOATA Monday should run warm-up ×2 + A ×3 = ' + wantGo + ' steps, got ' + goMon);
  console.log('GOATA Monday:', goMon);
  await p.locator('.run button[aria-label="Exit session"]').click(); await p.waitForTimeout(300);
  await p.locator('.back-link').click(); await p.waitForTimeout(250);

  // --- home mode: anything that needs a gym must say how to do it without one ---
  // Bodyweight work needs no note; a barbell, a machine or a cable does.
  const GYM = /barbell|bench press|smith machine|\bmachine\b|cable|lat pulldown|leg curl|leg press|trap bar|squat rack|power rack|weight (?:plate|stack)|sled|kettlebell|dumbbell/i;
  const reached = new Set();
  DATA.ROUTINES.forEach(r => r.items.forEach(i => reached.add(i.x)));
  DATA.ARMOR.items.forEach(i => reached.add(i.x));
  DATA.FREE_WINS.items.forEach(i => reached.add(i.x));
  Object.values(DATA.SESSIONS).forEach(s => (s.blocks || []).forEach(bk => bk.items.forEach(i => reached.add(i.x))));
  const noPath = [...reached].filter(id => {
    const e = DATA.EX[id];
    const needsKit = GYM.test([e.setup || '', (e.steps || []).join(' '), e.n].join(' '));
    return needsKit && !e.home && !DATA.HOME_SUB[id];
  });
  ck(noPath.length === 0, 'gym exercises with no home path: ' + noPath.join(', '));
  console.log('reachable exercises:', reached.size, '| gym ones with no home path:', noPath.length);

  await b.close(); server.close();
  console.log(fail.length ? fail.slice(0, 20).join('\n') : 'UI OK');
  process.exit(fail.length ? 1 : 0);
})();
