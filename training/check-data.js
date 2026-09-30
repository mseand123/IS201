// Data sanity: every field the renderer touches must be the type the renderer expects.
const d = require('./data.js');
const fail = [];
const ck = (c, m) => { if (!c) fail.push('✗ ' + m); };

const STR = ['n','cat','why','setup','dose','prog','regr','flag','home','warmup'];
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
  ck(e.covert === undefined, k + ' still says how covert it is at a desk; the desk sessions are gone');
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
  ck(['WARMUP','ARMOR','RANGE','RECOVERY','POWER','BODY','ROOM','GRAIL','FLOW'].includes(r.tag), 'routine ' + r.id + ' has an unrendered tag: ' + r.tag);
  r.items.forEach(i => check(i.x, 'routine ' + r.id));
});
d.ARMOR.items.forEach(i => check(i.x, 'ARMOR'));
Object.entries(d.HOME_SUB).forEach(([k, v]) => { check(k, 'HOME_SUB key'); check(v.x, 'HOME_SUB value for ' + k); });

// item group labels are strings
d.ROUTINES.forEach(r => r.items.forEach(i =>
  ck(i.g === undefined || typeof i.g === 'string', r.id + ' has a non-string group label')));

// The Train tab is six pages, each a few complete workouts. Every page and group is well-formed,
// every routine sits on exactly one page — a workout nothing can reach has no reason to exist —
// and no page grows back into a wall of cards.
const byId = new Set(d.ROUTINES.map(r => r.id));
ck(Array.isArray(d.TRAIN_PAGES) && d.TRAIN_PAGES.length === 6, 'the Train tab is six pages');
const placed = {};
d.TRAIN_PAGES.forEach(pg => {
  ck(['id', 'n', 'icon', 'blurb'].every(f => typeof pg[f] === 'string' && pg[f].length), 'a Train page needs an id, a name, an icon and a blurb');
  ck(pg.intro === undefined || typeof pg.intro === 'string', pg.id + ' intro should be text');
  ck(pg.groups.length > 1 || typeof pg.intro === 'string', pg.id + ' has one group, so its intro stands in for the group heading and must be set');
  const n = pg.groups.reduce((x, g) => x + g.ids.length, 0);
  ck(n >= 1 && n <= 8, pg.id + ' holds ' + n + ' workouts; a page is meant to be a few');
  pg.groups.forEach(g => {
    ck(typeof g.n === 'string' && (g.sub === undefined || typeof g.sub === 'string'), pg.id + ' group needs a name, and any subtitle as text');
    g.ids.forEach(id => {
      ck(byId.has(id), pg.id + ' group "' + g.n + '" references a missing routine: ' + id);
      ck(!placed[id], id + ' is on both ' + placed[id] + ' and ' + pg.id);
      placed[id] = pg.id;
    });
  });
});
d.ROUTINES.forEach(r => ck(placed[r.id], r.id + ' is on none of the Train pages, so nothing can reach it'));

// every warm-up exercise says what it targets — that is the label under the name
d.ROUTINES.filter(r => ['WARMUP','ROOM','GRAIL','FLOW'].includes(r.tag)).forEach(r => r.items.forEach(i =>
  ck(typeof (d.EX[i.x] || {}).targets === 'string' && d.EX[i.x].targets.length > 0,
     r.id + ' › ' + i.x + ' has no targets label')));
Object.values(d.EX).forEach(e => ck(e.targets === undefined || typeof e.targets === 'string', e.n + ' targets should be a string'));

// a warm-up's summary line is short and honest: required, and every term it names must
// appear in at least one of its items' targets
const norm = x => x.toLowerCase().replace(/[^a-z ]/g, ' ').replace(/\s+/g, ' ').trim();
d.ROUTINES.filter(r => ['WARMUP','ROOM','GRAIL','FLOW'].includes(r.tag)).forEach(r => {
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
  const WORDS = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];
  const more = rd.match(/\*\*More\*\* \|.*?the (\d+)-test battery.*?\b([A-Za-z]+) essays/);
  ck(!!more, 'README no longer states the test and essay counts in the form check-data reads');
  if (more) {
    ck(+more[1] === d.TESTS.length, 'README says a ' + more[1] + '-test battery; there are ' + d.TESTS.length);
    ck(WORDS[d.ARTICLES.length] === more[2].toLowerCase(), 'README says ' + more[2] + ' essays; there are ' + d.ARTICLES.length);
  }
} catch { /* README is optional to the app */ }

console.log('exercises:', Object.keys(d.EX).length, '| referenced:', seen.size, '| routines:', d.ROUTINES.length, '| articles:', d.ARTICLES.length);
if (fail.length) { console.log(fail.slice(0, 40).join('\n')); process.exit(1); }
console.log('SCHEMA OK');
