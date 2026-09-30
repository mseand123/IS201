#!/usr/bin/env node
/* The interactions the other checks cannot see: four tabs, the six Train pages, a queue built
   from two different pages, slim rows, home mode telling the truth, and the player opening with
   a real estimate. Serves the app itself and drives it in Chromium.
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

  // --- four tabs, and Train is six doors ---
  const tabs = (await p.locator('.tabbar button').allInnerTexts()).map(t => t.trim());
  ck(tabs.join('|') === 'Today|Train|Library|More', 'the tabs should be Today, Train, Library, More; got ' + tabs.join(', '));
  await p.keyboard.press('2'); await p.waitForTimeout(500);
  const tiles = (await p.locator('.tile-n').allInnerTexts()).map(t => t.trim());
  ck(tiles.join('|') === DATA.TRAIN_PAGES.map(pg => pg.n).join('|'),
     'Train should show the six pages in order, got ' + tiles.join(', '));
  ck(tiles[0] === 'The Holy Grail', 'the Holy Grail should be the first door');
  console.log('train:', tiles.join(' / '));

  // every routine is on a page, and every page opens onto it
  const esc = t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const reachable = new Set();
  for (let i = 0; i < await p.locator('.tile').count(); i++) {
    await p.locator('.tile').nth(i).click(); await p.waitForTimeout(350);
    (await p.locator('.routine h3').allInnerTexts()).forEach(t => reachable.add(t.trim()));
    await p.locator('.back-link').click(); await p.waitForTimeout(250);
  }
  DATA.ROUTINES.forEach(r => ck(reachable.has(r.n), r.id + ' (' + r.n + ') is on no Train page'));
  console.log('routines reachable from Train:', reachable.size, 'of', DATA.ROUTINES.length);
  const openPage = async name => {
    await p.keyboard.press('2'); await p.waitForTimeout(300);
    if (await p.locator('.back-link').count()) { await p.locator('.back-link').click(); await p.waitForTimeout(250); }
    await p.locator('.tile').filter({ has: p.locator('.tile-n', { hasText: new RegExp('^' + esc(name) + '$') }) }).first().click();
    await p.waitForTimeout(400);
  };
  const cardOf = name => p.locator('.routine').filter({ has: p.locator('h3', { hasText: new RegExp('^' + esc(name) + '$') }) }).first();

  // --- rows are slim: the name, the dose, a note; what it targets and costs is in the how-to ---
  await openPage('Frisbee');
  const wu = DATA.ROUTINES.find(r => r.id === 'warmup-full');
  await cardOf(wu.n).locator('.btn-pick').click(); await p.waitForTimeout(300);
  const wrows = cardOf(wu.n).locator('.pick-row');
  ck(await wrows.count() === wu.items.length, 'the warm-up should list ' + wu.items.length + ' rows, got ' + await wrows.count());
  ck(await cardOf(wu.n).locator('.cost-chip, .pick-targets').count() === 0, 'rows should not carry cost or targets lines any more');
  ck(await cardOf(wu.n).locator('.routine-targets').count() === 0, 'a card keeps its targets inside the fold until asked');
  await wrows.first().locator('.pick-open').click(); await p.waitForTimeout(300);
  const how = await p.locator('.modal').innerText();
  ck(how.includes(DATA.EX[wu.items[0].x].targets), 'the how-to should say what the exercise targets');
  await p.locator('.modal-close').click(); await p.waitForTimeout(200);

  // --- a queue built from two different pages runs as one session ---
  await openPage('Stretch');
  const a = p.locator('.routine').first();
  const aName = (await a.locator('h3').first().innerText()).trim();
  await a.locator('.btn-pick').click(); await p.waitForTimeout(250);
  await a.locator('.pick-row .tick').first().click(); await p.waitForTimeout(250);
  ck(await p.locator('#queuebar').isVisible(), 'one pick should raise the queue bar');
  await openPage('Legs');
  const c = cardOf('Legs · Quick');
  await c.locator('.btn-pick').click(); await p.waitForTimeout(250);
  await c.locator('.pick-row .tick').first().click(); await p.waitForTimeout(250);
  const bar = await p.locator('#queuebar').innerText();
  ck(/2 exercises/.test(bar), 'the queue should total both picks, got ' + bar.replace(/\n/g, ' | '));
  ck(bar.includes(aName) && bar.includes('Legs · Quick'), 'the queue should name both blocks, got ' + bar.replace(/\n/g, ' | '));
  await p.locator('#queuebar .queue-run').click(); await p.waitForTimeout(600);
  const step = (await p.locator('#runStep').innerText()).trim();
  const left = (await p.locator('#runLeft').innerText()).trim();
  // a pick from a circuit keeps the circuit's rounds
  const wantQ = [aName, 'Legs · Quick'].reduce((x, n) => x + (DATA.ROUTINES.find(r => r.n === n).rounds || 1), 0);
  ck(new RegExp('/\\s*' + wantQ + '$').test(step), 'the queue should run as one ' + wantQ + '-step session, got ' + step);
  ck(/min|\d\d\s*s/.test(left), 'the player should show a real estimate, got ' + left);
  console.log('queue across two pages:', step, left);
  await p.locator('.run button[aria-label="Exit session"]').click(); await p.waitForTimeout(300);
  ck(await p.locator('#queuebar').isHidden(), 'running the queue should empty it');

  // --- the Holy Grail: the list waits for a pick, the Daily Six and the Room Circuit run as circuits ---
  await openPage('The Holy Grail');
  const grailList = DATA.ROUTINES.find(r => r.id === 'grail-list');
  const gl = cardOf('The Holy Grail');
  ck(await gl.locator('.pick-row').count() === grailList.items.length, 'the Holy Grail list should start open with every pick showing');
  ck(await gl.locator('.btn-run').isDisabled(), 'with nothing ticked, the list should wait for a pick rather than run an hour of everything');
  await gl.locator('.pick-row .tick').nth(0).click(); await p.waitForTimeout(250);
  await gl.locator('.pick-row .tick').nth(4).click(); await p.waitForTimeout(250);
  ck(/Run 2 selected/.test(await gl.locator('.btn-run').innerText()), 'two ticks should offer to run two');
  await gl.locator('.btn-run').click(); await p.waitForTimeout(500);
  ck(/\/\s*2$/.test((await p.locator('#runStep').innerText()).trim()), 'the two picks should run as two steps');
  await p.locator('.run button[aria-label="Exit session"]').click(); await p.waitForTimeout(300);
  for (const [id, want] of [['grail-daily', 'Round 1 of 2'], ['room-circuit', 'Round 1 of 3']]) {
    const r = DATA.ROUTINES.find(x => x.id === id);
    await cardOf(r.n).locator('.btn-run').click(); await p.waitForTimeout(500);
    const top = (await p.locator('.run-meta').innerText()).replace(/\n/g, ' | ');
    ck(top.includes(want) && new RegExp('/\\s*' + r.items.length * r.rounds + '$').test(top),
       r.n + ' should run ' + r.items.length + ' moves × ' + r.rounds + ' rounds, got ' + top);
    console.log(r.n + ':', top);
    await p.locator('.run button[aria-label="Exit session"]').click(); await p.waitForTimeout(300);
  }

  // --- Fascia & Flow: the three cards, and Fascia Flow runs every move ---
  await openPage('Fascia & Flow');
  const flowPage = DATA.TRAIN_PAGES.find(pg => pg.id === 'flow');
  const flowCards = (await p.locator('.routine h3').allInnerTexts()).map(t => t.trim());
  ck(flowCards.join('|') === flowPage.groups[0].ids.map(id => DATA.ROUTINES.find(r => r.id === id).n).join('|'),
     'Fascia & Flow should show its three cards, got ' + flowCards.join(', '));
  const ff = DATA.ROUTINES.find(r => r.id === 'fascia-flow');
  await cardOf(ff.n).locator('.btn-run').click(); await p.waitForTimeout(500);
  const ffTop = (await p.locator('#runStep').innerText()).trim();
  ck(new RegExp('/\\s*' + ff.items.length + '$').test(ffTop), 'Fascia Flow should run ' + ff.items.length + ' steps, got ' + ffTop);
  await p.locator('.run button[aria-label="Exit session"]').click(); await p.waitForTimeout(300);

  // --- More: the plan, the tests, the reading and the backup each open ---
  await p.keyboard.press('4'); await p.waitForTimeout(400);
  const more = (await p.locator('.tile-n').allInnerTexts()).map(t => t.trim());
  ck(more.join('|') === 'Your plan|Tests|Read|Backup & voice', 'More should hold the plan, tests, reading and backup; got ' + more.join(', '));
  for (let i = 0; i < more.length; i++) {
    await p.locator('.tile').nth(i).click(); await p.waitForTimeout(350);
    ck(await p.locator('.view h2').count() > 0, more[i] + ' should open onto something');
    await p.locator('.back-link').click(); await p.waitForTimeout(250);
  }
  await p.locator('.tile').filter({ hasText: 'Your plan' }).first().click(); await p.waitForTimeout(350);
  const planTxt = await p.locator('.view').innerText();
  ck(/This week/.test(planTxt) && /The year/.test(planTxt) && /Copenhagen ladder/.test(planTxt), 'Your plan should hold the week, the year and the Copenhagen ladder');

  // --- Home mode: the Legs page lists what you will do, wall sits are on it, no gym lift survives ---
  await p.evaluate(() => { const s = JSON.parse(localStorage.getItem('groundcontact.v1') || '{}');
    s.settings = Object.assign(s.settings || {}, { mode: 'home' }); localStorage.setItem('groundcontact.v1', JSON.stringify(s)); });
  await p.reload({ waitUntil: 'load' }); await p.waitForTimeout(700);
  for (const pgId of ['legs', 'upper']) {
    const pg = DATA.TRAIN_PAGES.find(x => x.id === pgId);
    await openPage(pg.n);
    const names = new Set(); let swaps = 0;
    for (const id of pg.groups.flatMap(g => g.ids)) {
      const r = DATA.ROUTINES.find(x => x.id === id);
      const card = cardOf(r.n);
      if (!(await card.locator('.pick-row').count())) { await card.locator('.btn-pick').click(); await p.waitForTimeout(250); }
      const rows = (await card.locator('.pick-name').allInnerTexts()).map(t => t.trim());
      ck(rows.length === r.items.length, id + ' should list ' + r.items.length + ' rows at home, got ' + rows.length);
      ck(new Set(rows).size === rows.length, id + ' lists a row twice at home: ' + rows.join(', '));
      rows.forEach(n => names.add(n));
      swaps += await card.locator('.pick-dose .chip.swap').count();
      if (pg.groups[0].ids.includes(id)) {
        const mins = +(((await card.locator('.spread > .num').first().innerText()).match(/(\d+)\s*min/) || [])[1] || 0);
        ck(mins > 0 && mins <= 50, r.n + ' should be a complete workout of 50 minutes or less at home, got ' + mins);
      }
    }
    const gymNames = Object.keys(DATA.HOME_SUB).map(k => DATA.EX[k].n).filter(n => names.has(n));
    ck(!gymNames.length, 'the ' + pg.n + ' page lists gym exercises in Home mode: ' + gymNames.join(', '));
    ck(swaps > 0, 'a swapped row on ' + pg.n + ' should say HOME');
    if (pgId === 'legs') {
      ck(names.has('Wall Sit'), 'the Legs page should have wall sits');
      ['Copenhagen Hold (Short Lever)', 'Adductor Squeeze Isometric Ladder', 'Side-Lying Abduction Hold', 'Single-Leg Balance Progression']
        .forEach(n => ck(names.has(n), 'the Legs page should carry ' + n));
    }
    console.log(pg.n + ' at home:', names.size, 'exercises,', swaps, 'swapped, gym ones listed:', gymNames.length);
  }
  await p.evaluate(() => { const s = JSON.parse(localStorage.getItem('groundcontact.v1') || '{}');
    s.settings.mode = 'gym'; localStorage.setItem('groundcontact.v1', JSON.stringify(s)); });
  await p.reload({ waitUntil: 'load' }); await p.waitForTimeout(600);

  // --- home mode: anything that needs a gym must say how to do it without one ---
  // Bodyweight work needs no note; a barbell, a machine or a cable does.
  const GYM = /barbell|bench press|smith machine|\bmachine\b|cable|lat pulldown|leg curl|leg press|trap bar|squat rack|power rack|weight (?:plate|stack)|sled|kettlebell|dumbbell/i;
  const reached = new Set();
  DATA.ROUTINES.forEach(r => r.items.forEach(i => reached.add(i.x)));
  DATA.ARMOR.items.forEach(i => reached.add(i.x));
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
