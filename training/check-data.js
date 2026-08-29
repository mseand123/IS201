// Data sanity: every field the renderer touches must be the type the renderer expects.
const d = require('./data.js');
const fail = [];
const ck = (c, m) => { if (!c) fail.push('✗ ' + m); };

const STR = ['n','cat','why','setup','dose','prog','regr','flag','home','warmup','covert'];
const ARR = ['tags','steps','cues','faults'];
const NUM = ['est','repSec'];

Object.entries(d.EX).forEach(([k, e]) => {
  STR.forEach(f => ck(e[f] === undefined || typeof e[f] === 'string', k + '.' + f + ' should be a string, got ' + typeof e[f]));
  ARR.forEach(f => ck(e[f] === undefined || Array.isArray(e[f]), k + '.' + f + ' should be an array, got ' + typeof e[f]));
  NUM.forEach(f => ck(e[f] === undefined || typeof e[f] === 'number', k + '.' + f + ' should be a number, got ' + typeof e[f]));
  ck(typeof e.n === 'string' && e.n.length, k + ' needs a name');
  ck(typeof e.cat === 'string', k + ' needs a category');
  if (e.timer) ['w','r','rounds'].forEach(f => ck(typeof e.timer[f] === 'number', k + '.timer.' + f + ' should be a number'));
  (e.steps || []).forEach((st, i) => ck(typeof st === 'string', k + '.steps[' + i + '] should be a string'));
  if (e.covert) ck(['invisible','subtle','private'].includes(e.covert), k + '.covert has an unknown value: ' + e.covert);
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
  ck(['WARMUP','DESK','ARMOR','SHORT','RANGE','RECOVERY'].includes(r.tag), 'routine ' + r.id + ' has an unrendered tag: ' + r.tag);
  r.items.forEach(i => check(i.x, 'routine ' + r.id));
});
d.ARMOR.items.forEach(i => check(i.x, 'ARMOR'));
Object.entries(d.HOME_SUB).forEach(([k, v]) => { check(k, 'HOME_SUB key'); check(v.x, 'HOME_SUB value for ' + k); });

// every play-group id must resolve to a routine
const byId = new Set(d.ROUTINES.map(r => r.id));
d.PLAY_GROUPS.forEach(g => {
  ck(typeof g.n === 'string' && typeof g.sub === 'string', 'play group needs a name and a subtitle');
  g.ids.forEach(id => ck(byId.has(id), 'play group "' + g.n + '" references a missing routine: ' + id));
});
// nothing game-day should be unreachable from the play hub
const grouped = new Set(d.PLAY_GROUPS.flatMap(g => g.ids));
d.ROUTINES.filter(r => ['WARMUP', 'RECOVERY', 'RANGE'].includes(r.tag))
  .forEach(r => ck(grouped.has(r.id), r.id + ' is game-day but appears in no play group'));

// routine ids unique
const ids = d.ROUTINES.map(r => r.id);
ck(new Set(ids).size === ids.length, 'routine ids must be unique: ' + ids.filter((x,i)=>ids.indexOf(x)!==i).join(', '));
const aids = d.ARTICLES.map(a => a.id);
ck(new Set(aids).size === aids.length, 'article ids must be unique');

console.log('exercises:', Object.keys(d.EX).length, '| referenced:', seen.size, '| routines:', d.ROUTINES.length, '| articles:', d.ARTICLES.length);
if (fail.length) { console.log(fail.slice(0, 40).join('\n')); process.exit(1); }
console.log('SCHEMA OK');
