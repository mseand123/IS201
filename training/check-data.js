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
  ck(['WARMUP','DESK','ARMOR','SHORT','RANGE','RECOVERY','POWER','BODY','TRAIL'].includes(r.tag), 'routine ' + r.id + ' has an unrendered tag: ' + r.tag);
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
d.BODY_GROUPS.forEach(g => {
  ck(typeof g.n === 'string' && typeof g.sub === 'string', 'body group needs a name and a subtitle');
  g.ids.forEach(id => ck(byId.has(id), 'body group "' + g.n + '" references a missing routine: ' + id));
});
// a body-part block only exists to be found by body part
d.ROUTINES.filter(r => r.tag === 'BODY').forEach(r =>
  ck(d.BODY_GROUPS.some(g => g.ids.includes(r.id)), r.id + ' is a body block but appears in no body group'));
// nothing game-day or range should be unreachable from the hub it belongs to
const grouped = new Set(d.PLAY_GROUPS.flatMap(g => g.ids).concat(d.RANGE_GROUPS.flatMap(g => g.ids)));
d.ROUTINES.filter(r => ['WARMUP', 'RECOVERY', 'RANGE'].includes(r.tag))
  .forEach(r => ck(grouped.has(r.id), r.id + ' is game-day but appears in no play group'));

// every warm-up exercise says what it targets — that is the label under the name
d.ROUTINES.filter(r => ['WARMUP','TRAIL'].includes(r.tag)).forEach(r => r.items.forEach(i =>
  ck(typeof (d.EX[i.x] || {}).targets === 'string' && d.EX[i.x].targets.length > 0,
     r.id + ' › ' + i.x + ' has no targets label')));
Object.values(d.EX).forEach(e => ck(e.targets === undefined || typeof e.targets === 'string', e.n + ' targets should be a string'));

// a warm-up's summary line is short and honest: required, and every term it names must
// appear in at least one of its items' targets
const norm = x => x.toLowerCase().replace(/[^a-z ]/g, ' ').replace(/\s+/g, ' ').trim();
d.ROUTINES.filter(r => ['WARMUP','TRAIL'].includes(r.tag)).forEach(r => {
  ck(typeof r.targets === 'string' && r.targets.length > 0, r.id + ' has no targets summary');
  ck(!r.targets || r.targets.split('·').length <= 9, r.id + ' targets summary is not short: ' + r.targets);
  const pool = norm(r.items.map(i => (d.EX[i.x] || {}).targets || '').join(' '));
  (r.targets || '').split('·').map(norm).filter(Boolean).forEach(term => {
    const words = term.replace(/&/g, ' ').split(' ').filter(w => w.length > 2 && !['and','the'].includes(w));
    ck(words.some(w => pool.includes(w.replace(/s$/, ''))), r.id + ' summary claims "' + term + '" but no item targets it');
  });
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
