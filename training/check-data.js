// Data sanity: every field the renderer touches must be the type the renderer expects.
const d = require('./data.js');
const fail = [];
const ck = (c, m) => { if (!c) fail.push('✗ ' + m); };

const STR = ['n','cat','why','setup','dose','prog','regr','flag','home','warmup','covert'];
const ARR = ['tags','steps','cues','faults'];
const NUM = ['est','repSec','cost'];

Object.entries(d.EX).forEach(([k, e]) => {
  STR.forEach(f => ck(e[f] === undefined || typeof e[f] === 'string', k + '.' + f + ' should be a string, got ' + typeof e[f]));
  ARR.forEach(f => ck(e[f] === undefined || Array.isArray(e[f]), k + '.' + f + ' should be an array, got ' + typeof e[f]));
  NUM.forEach(f => ck(e[f] === undefined || typeof e[f] === 'number', k + '.' + f + ' should be a number, got ' + typeof e[f]));
  ck(typeof e.n === 'string' && e.n.length, k + ' needs a name');
  ck(typeof e.cat === 'string', k + ' needs a category');
  if (e.timer) ['w','r','rounds'].forEach(f => ck(typeof e.timer[f] === 'number', k + '.timer.' + f + ' should be a number'));
  (e.steps || []).forEach((st, i) => ck(typeof st === 'string', k + '.steps[' + i + '] should be a string'));
  if (e.covert) ck(['invisible','subtle','private'].includes(e.covert), k + '.covert has an unknown value: ' + e.covert);
  if (e.cost !== undefined) ck([1,2,3].includes(e.cost), k + '.cost should be 1, 2 or 3, got ' + e.cost);
});

// every referenced exercise id must exist
const seen = new Set();
const check = (id, where) => { seen.add(id); ck(!!d.EX[id], where + ' references a missing exercise: ' + id); };
Object.entries(d.SESSIONS).forEach(([k, s]) => (s.blocks || []).forEach(b => {
  ck(typeof b.n === 'string', 'session ' + k + ' block needs a name');
  b.items.forEach(i => check(i.x, 'session ' + k));
}));
d.ROUTINES.forEach(r => {
  ck(typeof r.n === 'string' && typeof r.id === 'string', 'routine needs id and name');
  ck(['WARMUP','DESK','ARMOR','SHORT','RANGE','RECOVERY','POWER','BODY','TRAIL','BOSS','ROOM','GOATA','GRAIL'].includes(r.tag), 'routine ' + r.id + ' has an unrendered tag: ' + r.tag);
  r.items.forEach(i => check(i.x, 'routine ' + r.id));
});
d.ARMOR.items.forEach(i => check(i.x, 'ARMOR'));
Object.entries(d.HOME_SUB).forEach(([k, v]) => { check(k, 'HOME_SUB key'); check(v.x, 'HOME_SUB value for ' + k); });

// item group labels are strings
d.ROUTINES.forEach(r => r.items.forEach(i =>
  ck(i.g === undefined || typeof i.g === 'string', r.id + ' has a non-string group label')));

// every play-group id must resolve to a routine
const byId = new Set(d.ROUTINES.map(r => r.id));
d.PLAY_GROUPS.forEach(g => {
  ck(typeof g.n === 'string' && typeof g.sub === 'string', 'play group needs a name and a subtitle');
  g.ids.forEach(id => ck(byId.has(id), 'play group "' + g.n + '" references a missing routine: ' + id));
});
d.RANGE_GROUPS.forEach(g => {
  ck(typeof g.n === 'string' && typeof g.sub === 'string', 'range group needs a name and a subtitle');
  g.ids.forEach(id => ck(byId.has(id), 'range group "' + g.n + '" references a missing routine: ' + id));
});
d.TRAIL_GROUPS.forEach(g => {
  ck(typeof g.n === 'string' && typeof g.sub === 'string', 'trail group needs a name and a subtitle');
  g.ids.forEach(id => ck(byId.has(id), 'trail group "' + g.n + '" references a missing routine: ' + id));
});
d.ROUTINES.filter(r => r.tag === 'TRAIL').forEach(r =>
  ck(d.TRAIL_GROUPS.some(g => g.ids.includes(r.id)), r.id + ' is a trail block but appears in no trail group'));
d.BOSS_GROUPS.forEach(g => {
  ck(typeof g.n === 'string' && typeof g.sub === 'string', 'boss group needs a name and a subtitle');
  g.ids.forEach(id => ck(byId.has(id), 'boss group "' + g.n + '" references a missing routine: ' + id));
});
d.ROUTINES.filter(r => r.tag === 'BOSS').forEach(r =>
  ck(d.BOSS_GROUPS.some(g => g.ids.includes(r.id)), r.id + ' is a Boss block but appears in no boss group'));
// the ladder and the week are rendered as tables: every column has to be there
d.BOSS_LADDER.forEach((x, i) => ['w','rounds','holds','reps','note'].forEach(f =>
  ck(typeof x[f] === 'string' && x[f].length, 'BOSS_LADDER[' + i + '].' + f + ' should be a non-empty string')));
// each day names real Boss blocks, so its time is computed rather than written down
const checkWeek = (name, week, tag) => {
  ck(week.length === 7, name + ' needs seven days, got ' + week.length);
  week.forEach((x, i) => {
    ck(typeof x.d === 'string' && x.d.length, name + '[' + i + '] needs a day');
    ck(Array.isArray(x.ids), name + '[' + i + '].ids should be a list');
    (x.ids || []).forEach(e => {
      const id = typeof e === 'string' ? e : e.id;
      const r = d.ROUTINES.find(q => q.id === id);
      ck(r && r.tag === tag, name + ' ' + x.d + ' names ' + id + ', which is not a ' + tag + ' block');
      if (typeof e !== 'string') ck(Number.isInteger(e.rounds) && r && r.rounds && e.rounds < r.rounds,
        name + ' ' + x.d + ' asks ' + id + ' for ' + e.rounds + ' rounds, which must be fewer than its own');
    });
    ck((x.ids || []).length || typeof x.note === 'string', name + ' ' + x.d + ' has no blocks and no note');
  });
};
checkWeek('BOSS_WEEK', d.BOSS_WEEK, 'BOSS');
checkWeek('GOATA_WEEK', d.GOATA_WEEK, 'GOATA');
d.GOATA_GROUPS.forEach(g => g.ids.forEach(id => ck(byId.has(id), 'GOATA group "' + g.n + '" references a missing routine: ' + id)));
d.ROUTINES.filter(r => r.tag === 'GOATA').forEach(r =>
  ck(d.GOATA_GROUPS.some(g => g.ids.includes(r.id)), r.id + ' is a GOATA block but appears in no GOATA group'));
[['GOATA_RULES', ['h','t']], ['GOATA_TERMS', ['t','d']], ['GOATA_DAILY', ['h','t']], ['GOATA_LADDER', ['w','t']]].forEach(([k, fs]) =>
  d[k].forEach((x, i) => fs.forEach(f => ck(typeof x[f] === 'string' && x[f].length, k + '[' + i + '].' + f + ' should be a non-empty string'))));
ck(d.GOATA_RULES.length === 6, 'he has six form rules, the data has ' + d.GOATA_RULES.length);
d.GOATA_CHECK.forEach((x, i) => ck(typeof x === 'string' && x.length, 'GOATA_CHECK[' + i + '] should be a string'));
d.BOSS_OFF.forEach((x, i) => ck(typeof x.h === 'string' && typeof x.t === 'string' && typeof x.his === 'boolean',
  'BOSS_OFF[' + i + '] needs a heading, text, and whether it is his'));

// Legs, Upper Body and Core are the front door: every page and group is well-formed, every body
// block and every weak-link block has a home on one of them (the Weak-link tile is gone), and each
// page opens with complete workouts short enough to be the obvious choice.
d.BODY_PAGES.forEach(pg => {
  ck(typeof pg.id === 'string' && typeof pg.n === 'string' && typeof pg.blurb === 'string', 'a body page needs an id, a name and a blurb');
  ck(pg.intro === undefined || typeof pg.intro === 'string', pg.id + ' intro should be text');
  ck(pg.groups.length > 1 || typeof pg.intro === 'string', pg.id + ' has one group, so its intro stands in for the group subtitle and must be set');
  (pg.groups || []).forEach(g => {
    ck(typeof g.n === 'string' && typeof g.sub === 'string', pg.id + ' group needs a name and a subtitle');
    g.ids.forEach(id => ck(byId.has(id), pg.id + ' group "' + g.n + '" references a missing routine: ' + id));
  });
});
{
  const onPages = new Set(d.BODY_PAGES.flatMap(pg => pg.groups.flatMap(g => g.ids)));
  d.ROUTINES.filter(r => ['BODY', 'ARMOR'].includes(r.tag)).forEach(r =>
    ck(onPages.has(r.id), r.id + ' is a ' + r.tag + ' block but is on none of the Legs, Upper Body or Core pages'));
}
// nothing game-day or range should be unreachable from the hub it belongs to
const grouped = new Set(d.PLAY_GROUPS.flatMap(g => g.ids).concat(d.RANGE_GROUPS.flatMap(g => g.ids)));
d.ROUTINES.filter(r => ['WARMUP', 'RECOVERY', 'RANGE'].includes(r.tag))
  .forEach(r => ck(grouped.has(r.id), r.id + ' is game-day but appears in no play group'));

// every warm-up exercise says what it targets — that is the label under the name
d.ROUTINES.filter(r => ['WARMUP','TRAIL','BOSS','ROOM','GOATA','GRAIL'].includes(r.tag)).forEach(r => r.items.forEach(i =>
  ck(typeof (d.EX[i.x] || {}).targets === 'string' && d.EX[i.x].targets.length > 0,
     r.id + ' › ' + i.x + ' has no targets label')));
Object.values(d.EX).forEach(e => ck(e.targets === undefined || typeof e.targets === 'string', e.n + ' targets should be a string'));

// a warm-up's summary line is short and honest: required, and every term it names must
// appear in at least one of its items' targets
const norm = x => x.toLowerCase().replace(/[^a-z ]/g, ' ').replace(/\s+/g, ' ').trim();
d.ROUTINES.filter(r => ['WARMUP','TRAIL','BOSS','ROOM','GOATA','GRAIL'].includes(r.tag)).forEach(r => {
  ck(typeof r.targets === 'string' && r.targets.length > 0, r.id + ' has no targets summary');
  ck(!r.targets || r.targets.split('·').length <= 9, r.id + ' targets summary is not short: ' + r.targets);
  const pool = norm(r.items.map(i => (d.EX[i.x] || {}).targets || '').join(' '));
  (r.targets || '').split('·').map(norm).filter(Boolean).forEach(term => {
    const words = term.replace(/&/g, ' ').split(' ').filter(w => w.length > 2 && !['and','the'].includes(w));
    ck(words.some(w => pool.includes(w.replace(/s$/, ''))), r.id + ' summary claims "' + term + '" but no item targets it');
  });
});

// A gym->home swap replaces the exercise, so two gym items that share a home stand-in turn one
// block into the same exercise twice. It happened in seven blocks before this check covered them all:
// Chest, Shoulders & Push became Push-Up Plus five times. Only duplicates Home mode CREATES count —
// a block that repeats an exercise on purpose in Gym mode is left alone.
{
  const home = i => (i.atHome || d.HOME_SUB[i.x] || {}).x || i.x;
  const dup = xs => [...new Set(xs.filter((x, k) => xs.indexOf(x) !== k))];
  const check = (where, items) => {
    const gym = dup(items.map(i => i.x));
    dup(items.map(home)).filter(x => !gym.includes(x))
      .forEach(x => ck(false, where + ' runs ' + x + ' twice in Home mode (from ' + items.filter(i => home(i) === x).map(i => i.x).join(' + ') + ')'));
  };
  d.ROUTINES.forEach(r => check(r.id, r.items));
  Object.entries(d.SESSIONS).forEach(([k, s]) => check('session ' + k, (s.blocks || []).flatMap(b => b.items)));
}

// a circuit says how many rounds and how long to rest between them, as whole numbers
d.ROUTINES.filter(r => r.rounds !== undefined).forEach(r => {
  ck(Number.isInteger(r.rounds) && r.rounds >= 2 && r.rounds <= 6, r.id + '.rounds should be 2\u20136, got ' + r.rounds);
  ck(r.roundRest === undefined || (Number.isInteger(r.roundRest) && r.roundRest >= 15 && r.roundRest <= 240),
     r.id + '.roundRest should be 15\u2013240 s, got ' + r.roundRest);
});

// The labral tear is in the hip. The app was first written for a shoulder (SLAP) tear, and that
// premise quietly outlived the correction once; it should not be able to come back.
{
  const text = JSON.stringify(d);
  ['SLAP', 'superior labral', 'labrum-safe', 'labrum-compromised', 'Overhead barbell pressing is off']
    .forEach(w => ck(!text.includes(w), 'data mentions "' + w + '", but the labral tear is in the hip'));
}

// The Holy Grail is only useful while it stays short: one to three per body part, and a Daily Six of six.
{
  const list = d.ROUTINES.find(r => r.id === 'grail-list'), six = d.ROUTINES.find(r => r.id === 'grail-daily');
  ck(list && six, 'the Holy Grail needs its list and its Daily Six');
  if (six) ck(six.items.length === 6, 'the Daily Six has ' + six.items.length + ' moves');
  if (six) six.items.forEach(i => ck((d.EX[i.x].cost || 2) < 3, 'the Daily Six is done every day, so ' + i.x + ' cannot be rated Taxing'));
  // it is all done at home without weights, so Gym and Home mode must show the same thing
  [list, six].filter(Boolean).forEach(r => r.items.forEach(i =>
    ck(!d.HOME_SUB[i.x], r.id + ' › ' + i.x + ' swaps in Home mode, but the Holy Grail is home-only already')));
  if (list) {
    const groups = []; let g = null;
    list.items.forEach(i => { if (i.g) { g = { n: i.g, k: 0 }; groups.push(g); } g.k++; });
    groups.forEach(x => ck(x.k >= 1 && x.k <= 3, 'the Holy Grail group ' + x.n + ' has ' + x.k + ' picks; the point is one to three'));
  }
}

// A per-item home override names a real exercise, and says it as a string.
const allItems = d.ROUTINES.flatMap(r => r.items.map(i => [r.id, i]))
  .concat(Object.entries(d.SESSIONS).flatMap(([k, s]) => (s.blocks || []).flatMap(b => b.items.map(i => ['session ' + k, i]))));
allItems.filter(([, i]) => i.atHome !== undefined).forEach(([where, i]) => {
  ck(i.atHome && typeof i.atHome === 'object' && d.EX[i.atHome.x], where + ' › ' + i.x + '.atHome must name an exercise');
  ['d', 'note'].forEach(f => ck(i.atHome[f] === undefined || typeof i.atHome[f] === 'string', where + ' › ' + i.x + '.atHome.' + f + ' should be a string'));
});

// routine ids unique
const ids = d.ROUTINES.map(r => r.id);
ck(new Set(ids).size === ids.length, 'routine ids must be unique: ' + ids.filter((x,i)=>ids.indexOf(x)!==i).join(', '));
const aids = d.ARTICLES.map(a => a.id);
ck(new Set(aids).size === aids.length, 'article ids must be unique');

// The README's own numbers have gone stale four times. They are data now, not prose.
const fsx = require('fs');
try {
  const rd = fsx.readFileSync(__dirname + '/README.md', 'utf8');
  const nogym = Object.keys(d.EX).filter(i => !d.HOME_SUB[i]).length;
  const lib = rd.match(/\*\*Library\*\* \| (\d+) exercises, filterable to the (\d+) that need no gym/);
  ck(!!lib, 'README no longer states the library counts in the form check-data reads');
  if (lib) {
    ck(+lib[1] === Object.keys(d.EX).length, 'README says ' + lib[1] + ' exercises; there are ' + Object.keys(d.EX).length);
    ck(+lib[2] === nogym, 'README says ' + lib[2] + ' need no gym; there are ' + nogym);
  }
  const WORDS = ['Zero','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen','Twenty'];
  const ess = rd.match(/\*\*Method\*\* \| ([A-Za-z]+) essays/);
  ck(!ess || WORDS[d.ARTICLES.length] === ess[1],
     'README says ' + (ess && ess[1]) + ' essays; there are ' + d.ARTICLES.length + ' (' + WORDS[d.ARTICLES.length] + ')');
  const tst = rd.match(/\*\*Tests\*\* \| (\d+)-test battery/);
  ck(!tst || +tst[1] === d.TESTS.length, 'README says a ' + (tst && tst[1]) + '-test battery; there are ' + d.TESTS.length);
} catch { /* README is optional to the app */ }

console.log('exercises:', Object.keys(d.EX).length, '| referenced:', seen.size, '| routines:', d.ROUTINES.length, '| articles:', d.ARTICLES.length);
if (fail.length) { console.log(fail.slice(0, 40).join('\n')); process.exit(1); }
console.log('SCHEMA OK');
