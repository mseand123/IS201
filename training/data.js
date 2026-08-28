/* ===========================================================
   GROUND CONTACT — data layer
   Athlete: 25M · 6'1" · 150 lb · pro UFA ultimate · 4.6 DUPR pickleball
   History: SLAP-type labral tear (slight), adductor weakness, hamstring strain
   Preferences: isometrics, timed work, deep squat holds, fascial work
   =========================================================== */

const ATHLETE = {
  name: 'Sean',
  heightIn: 73,
  weightLb: 150,
  age: 25,
  sport: 'Ultimate (UFA) · cutter/handler workload',
  // Professional UFA GPS match demands — the numbers this program is built to beat.
  demands: [
    { k: 'Total distance / game', v: '6,940 m', n: '±1,982 — pro UFA GPS' },
    { k: 'High-speed running (>5.5 m/s)', v: '592 m', n: 'per game' },
    { k: 'High-intensity distance', v: '1,261 m', n: 'per game' },
    { k: 'Sprints / game', v: '15.9', n: 'max-effort efforts' },
    { k: 'Accels / decels', v: '46 / 47', n: 'per game — decel is the injury tax' },
    { k: 'Peak speed', v: '8.6 m/s', n: '≈ 19.2 mph' },
    { k: 'Heart rate', v: '82% mean / 99% peak', n: 'of HRmax' }
  ]
};

/* -----------------------------------------------------------
   EXERCISE LIBRARY
   cat: speed | plyo | strength | iso | armor | tissue | mobility | cond | throw | breath
   ----------------------------------------------------------- */
const EX = {

/* ============ FOOT, FASCIA, TISSUE ============ */
'ball-roll-foot': {
  n: 'Plantar Ball Roll', cat: 'tissue', tags: ['fascia','foot','daily','hamstring'],
  why: 'The one you already love, and it is the best-evidenced trick in the whole toolbox. Rolling the sole of the foot produces an immediate, measurable increase in hamstring and lumbar flexibility — sit-and-reach improves with a large effect size — without stretching the hamstring at all. The working explanation is the superficial back line: plantar fascia → calf → hamstring → sacrotuberous ligament → erectors are mechanically continuous, so downregulating tone at one end changes extensibility along the chain. For a guy with "tight hamstrings" and a strain history, this is how you buy range without pulling on healing tissue.',
  setup: 'Barefoot, standing, one hand on a wall. Lacrosse ball for aggressive, tennis ball for tolerable, frozen bottle if the plantar fascia is hot.',
  steps: [
    'Test first: feet together, slow toe-touch, note where your fingers land. Ten seconds, no bouncing.',
    'Place the ball under the arch of one foot. Load maybe 30–50% of bodyweight through it — enough to feel it, never enough to brace against.',
    'Roll heel → ball of foot in slow passes, about 3–4 seconds per direction. Cover the medial arch, the lateral band, and the heel edge.',
    'When you find a dense spot, park on it for 20–30 seconds and take three slow nasal breaths. Add toe curls and toe extensions on the spot to shear the tissue rather than just compress it.',
    'Retest the toe-touch on that side only. You should see a visible left/right difference. Then do the other foot.'
  ],
  cues: ['Slow. Fascia responds to sustained shear, not speed.','Breathe out on the tender spots — bracing defeats the point.','Pressure you can hold a conversation through, not pressure you fight.'],
  faults: ['Rolling fast like a rolling pin — no tissue change, just tickling.','Standing on it full bodyweight and gritting — that is a guarding response, tone goes up.','Skipping the retest, so you never learn how much it actually gives you.'],
  dose: '60–90 s per foot. Daily, and always before any session with sprinting or hamstring loading.',
  prog: 'Add the toe-extended version: prop the toes up the wall, roll the now-tensioned fascia.',
  regr: 'Softer ball, seated instead of standing.',
  timer: { w: 75, r: 5, rounds: 2, label: 'Plantar roll — switch feet' }
},
'short-foot': {
  n: 'Short Foot (Arch Doming)', cat: 'tissue', tags: ['foot','daily','iso'],
  why: 'An 8-week intrinsic foot protocol increases foot muscle volume and raises vertical propulsive force in running. The arch is your first spring: if it collapses passively, elastic energy leaks into the ground instead of returning to you. Every ground contact you take at 8.6 m/s starts here.',
  setup: 'Seated or standing, foot flat, barefoot.',
  steps: [
    'Keep the toes long and flat — this is not a toe curl.',
    'Draw the ball of the foot toward the heel, doming the arch. The foot gets shorter, the toes stay down.',
    'Hold 10 seconds while breathing. You should see the arch lift and feel a cramp-adjacent burn under the arch, not in the calf.',
    'Progress to standing on one leg while holding the dome.'
  ],
  cues: ['Toes stay long — if they claw, you are cheating with the long flexors.','Big toe stays pressed to the floor.','Think "suction cup", not "grip".'],
  faults: ['Toe curling.','Rolling the ankle outward to fake an arch.','Holding your breath through the cramp.'],
  dose: '3 × 10 s per foot seated, then 3 × 20 s standing single-leg.',
  prog: 'Single-leg standing → single-leg with the other leg swinging → short-foot held through a slow calf raise.',
  regr: 'Seated, hand-assisted arch lift to learn the feel.',
  timer: { w: 20, r: 10, rounds: 6, label: 'Short foot hold' }
},
'big-toe-iso': {
  n: 'Big Toe Flexion Isometric', cat: 'iso', tags: ['foot','iso','speed'],
  why: 'Big-toe flexor isometrics are specifically recommended 2–4×/week for athletes in sprinting, jumping and cutting sports. The hallux is the last thing to leave the ground on every sprint step and every cut — a weak one means force leaks laterally and your final push is soft.',
  setup: 'Barefoot, big toe on a folded towel or a 1 cm book edge, other toes on the floor.',
  steps: [
    'Press the big toe down into the surface as hard as you can while the other four toes stay relaxed and flat.',
    'Ramp to maximum over ~2 s, hold 10 s at genuine max intent.',
    'Relax fully for 20 s. Quality collapses fast on this one.'
  ],
  cues: ['Other toes stay quiet — isolate the hallux.','Drive down and slightly back, as if pulling the floor toward your heel.'],
  faults: ['Whole-foot pressing.','Toes clawing together.'],
  dose: '5 × 10 s per foot, 2–4× per week.',
  prog: 'Standing single-leg version, then loaded (hold a dumbbell).',
  regr: 'Seated, no towel, lighter intent.',
  timer: { w: 10, r: 20, rounds: 5, label: 'Big toe iso' }
},
'toe-yoga': {
  n: 'Toe Yoga', cat: 'tissue', tags: ['foot','daily'],
  why: 'Separates hallux control from the lesser toes. Cheap neurological hygiene for feet that live in shoes and cleats.',
  setup: 'Standing, feet flat, barefoot.',
  steps: ['Lift only the big toe, keep the other four down. 5 s.','Reverse: big toe down, other four up. 5 s.','Alternate. Do not let the foot roll.'],
  cues: ['Foot stays tripod-flat.','If you cannot do it, use your hand to hold the ones that should stay down.'],
  faults: ['The whole foot rolling in or out to fake it.'],
  dose: '10 alternations per foot.',
  prog: 'Toe splay with a band around the toes.',
  regr: 'Seated, hand-assisted.'
},
'tib-raise': {
  n: 'Tibialis Raise', cat: 'strength', tags: ['foot','decel','knee'],
  why: 'Ultimate is 47 decelerations a game. The anterior tibialis is a primary braking muscle for the shin over the foot, and it is almost never trained directly. Building it buys you shin-splint insurance and a better brake.',
  setup: 'Back against a wall, heels 20–30 cm out from the wall, legs straight-ish.',
  steps: [
    'Lean back into the wall, weight on the heels.',
    'Pull the toes up toward the shins as far as they will go, slowly.',
    'Lower under control over 3 s — the eccentric is the point.',
    'Full range every rep.'
  ],
  cues: ['Toes up, not just the forefoot — get the full dorsiflexion.','Slow down, then slower.'],
  faults: ['Bouncing.','Heels drifting so close to the wall that range disappears.'],
  dose: '2–3 × 20–25 reps, or 3 × 30 s isometric at end range.',
  prog: 'Feet further from the wall, or add weight on the toes.',
  regr: 'Seated, band around the forefoot.',
  timer: { w: 30, r: 30, rounds: 3, label: 'Tib hold' }
},
'calf-iso-soleus': {
  n: 'Bent-Knee Soleus Isometric', cat: 'iso', tags: ['iso','tendon','speed','achilles'],
  why: 'The soleus takes 6–8× bodyweight during running and is the biggest single contributor to vertical propulsion. Heavy, mid-duration isometrics at a bent knee are the highest-yield way to build Achilles/soleus stiffness without adding impact — exactly the "short, high-intensity isometric" prescription that supports tendon stiffness and readiness for high loading rates.',
  setup: 'Seated calf raise machine, or a barbell/heavy dumbbells across the knees while seated with the forefoot on a plate.',
  steps: [
    'Knee at ~90°, forefoot on the block, heel free.',
    'Press to a mid-range position — heel roughly level with the forefoot, not fully plantarflexed.',
    'Hold with hard intent for 30–45 s. The calf should be shaking by 25 s.',
    'Rest 90 s. Load should be heavy enough that 45 s is a genuine failure point.'
  ],
  cues: ['Mid-range, not top-range — that is where tendon load is highest.','Push the knee up into the load, do not just balance it.'],
  faults: ['Bouncing at the top.','Load too light — a comfortable 45 s does nothing.'],
  dose: '3–4 × 30–45 s, 90 s rest.',
  prog: 'Add load, or move to single-leg.',
  regr: 'Bodyweight seated, both legs.',
  timer: { w: 40, r: 90, rounds: 4, label: 'Soleus iso' }
},
'calf-raise-loaded': {
  n: 'Loaded Calf Raise — Straight & Bent', cat: 'strength', tags: ['foot','speed','tendon'],
  why: 'Straight-knee hits gastrocnemius (the sprinting spring), bent-knee hits soleus (the endurance and braking engine). You need both; most athletes train neither properly.',
  setup: 'Forefoot on a step or plate, full stretch available at the bottom.',
  steps: ['Lower slowly to a full stretch over 3 s.','Pause 1 s at the bottom without bouncing.','Drive to full plantarflexion, pause 1 s at the top.','Straight-leg set, then bent-knee set.'],
  cues: ['Full range, both ends.','Pause at the bottom kills the tendon bounce and forces muscle work.'],
  faults: ['Half range.','Rushing — this is one of the few places where slow beats fast.'],
  dose: '3 × 8–12 straight-knee, 3 × 12–15 bent-knee.',
  prog: 'Single-leg with dumbbell.',
  regr: 'Bodyweight, both legs, floor level.'
},
'barefoot-pogo-grass': {
  n: 'Barefoot Grass Pogos', cat: 'plyo', tags: ['foot','fascia','elastic','speed'],
  why: 'The lowest-intensity, highest-frequency way to train foot and ankle stiffness — the base of reactive strength. Barefoot on grass forces the intrinsic foot muscles to do their job instead of outsourcing it to a shoe. Schleip\'s elastic-recoil principle in its simplest form: rhythmic, small-amplitude oscillation that trains the tissue to return energy.',
  setup: 'Barefoot on grass or turf, feet hip width.',
  steps: [
    'Bounce on the balls of the feet with almost no knee bend — ankles do the work.',
    'Aim for a fast, quiet rhythm, roughly 2.5 contacts per second. Sound is your metric: quiet = stiff and elastic, thud = collapsing.',
    'Hands can stay on the hips. Stay tall — do not let the hips sink.',
    '20–30 contacts, then walk it off.'
  ],
  cues: ['Quiet feet. Listen, do not watch.','Stiff ankle, springy — "a ball, not a bag of sand".','Minimum ground time, not maximum height.'],
  faults: ['Bending the knees and turning it into squat jumps.','Landing flat-footed.','Going for height — height is not the goal, contact time is.'],
  dose: '3 × 20–30 contacts, full recovery between.',
  prog: 'Single-leg pogos → lateral pogos → pogos for max height with same contact time.',
  regr: 'Shoes on, lower amplitude, hold a rail.',
  timer: { w: 12, r: 60, rounds: 4, label: 'Pogo set' }
},
'foam-roll-post': {
  n: 'Roll & Reset Circuit', cat: 'tissue', tags: ['fascia','recovery'],
  why: 'Self-myofascial work does not lengthen fascia permanently, but it reliably produces short-term range gains with no strength loss — which makes it a warm-up and recovery tool rather than a treatment. Use it as a pre-mobility primer, not as therapy.',
  setup: 'Foam roller and a lacrosse ball.',
  steps: [
    'Quads and hip flexors: 45 s per side, slow, pause and breathe on dense spots.',
    'Lateral thigh (vastus lateralis, not the IT band itself): 45 s per side.',
    'Glute/piriformis on a ball against a wall or floor: 45 s per side.',
    'Thoracic spine over the roller: 8 slow extensions.',
    'Adductors face-down on the roller: 45 s per side — gentle, this area is your weak link.'
  ],
  cues: ['Exhale into pressure.','Cross-fibre strokes on dense spots, not just long passes.'],
  faults: ['Rolling directly on the IT band expecting it to change — it will not, it is a tendon-like structure.','Grinding hard enough that you brace.'],
  dose: '5–8 minutes total.',
  prog: 'Add movement while compressed (flex/extend the knee while on a dense spot).',
  regr: 'Softer roller, less bodyweight.',
  timer: { w: 45, r: 5, rounds: 8, label: 'Roll — change position' }
},

/* ============ THE HAMSTRING TRACK ============ */
'ham-iso-long': {
  n: 'Long-Length Hamstring Isometric', cat: 'iso', tags: ['hamstring','iso','daily','armor'],
  why: 'Over 80% of hamstring injuries happen in late swing during sprinting, when the muscle is long, lengthening fast, and contracting hard. Biceps femoris long head produces its highest force at roughly 45° hip flexion with 10–30° knee flexion — so that is where you train it. Isometric hip-extension protocols raise isometric knee-flexion torque ~10% and hip-extension force ~12%. This is your single best daily insurance policy, and it is a timed hold, which you like.',
  setup: 'Lie on your back, heels on a bench or box roughly knee-height, knees bent to about 20°, hips flexed to about 45°.',
  steps: [
    'Dig the heels down and back into the bench — think of dragging the bench toward you.',
    'Lift the hips just off the floor. Do not chase a high bridge; the hamstring, not the glute, should be the loudest thing.',
    'Hold 20–30 s at hard effort. Keep the knee angle shallow — a deeper knee bend shifts it to the glute.',
    'Progress to single leg once you can hold 30 s with the hamstring clearly dominant.'
  ],
  cues: ['Heels dig back, not down.','Shallow knee bend — nearly straight legs is the injury-relevant position.','If you cramp, that is the hamstring being under-trained at length. Shorten the hold and build.'],
  faults: ['Bridging high and turning it into a glute exercise.','Knees bent past 45° — you have left the injury-relevant range.','Holding your breath.'],
  dose: '3 × 20–30 s per side, daily to every other day.',
  prog: 'Single leg → feet on a swiss ball → add a weight vest.',
  regr: 'Two legs, heels on the floor, hips barely lifted.',
  timer: { w: 30, r: 45, rounds: 6, label: 'Long-length ham iso' }
},
'askling-extender': {
  n: 'Askling Extender', coach: 'L-protocol 1 of 3', cat: 'armor', tags: ['hamstring','rehab','mobility'],
  why: 'The L-protocol — Extender, Diver, Glider — returned athletes to sport in a mean 28 days versus 52 for conventional rehab, with lower reinjury at 2, 6 and 12 months. All three load the hamstring at long lengths rather than short ones. Even fully healed, running this weekly is the cheapest reinjury insurance there is.',
  setup: 'Lie on your back. Hold the injured-side thigh at ~90° hip flexion with both hands.',
  steps: [
    'Hold the thigh still at 90°.',
    'Slowly straighten the knee until you feel a mild, tolerable stretch — never pain.',
    'Slowly bend back. That is one rep, roughly 4 s each way.',
    'The thigh must not move. Only the knee.'
  ],
  cues: ['Slow and controlled — this is a lengthening drill, not a stretch you sink into.','Stop at mild tension, not at pain.'],
  faults: ['Letting the thigh drift.','Bouncing at end range.','Pushing into real pain — the protocol is explicit that pain is the stop sign.'],
  dose: '3 × 12 reps, once or twice daily during rehab; 1 × 12 as maintenance.',
  prog: 'Increase hip flexion angle slightly once painless.',
  regr: 'Less hip flexion, smaller knee range.'
},
'askling-diver': {
  n: 'Askling Diver', coach: 'L-protocol 2 of 3', cat: 'armor', tags: ['hamstring','rehab','balance'],
  why: 'The high-speed, high-load end of the L-protocol: a single-leg hip hinge into a near-horizontal "dive", loading the hamstring eccentrically at length with a balance demand on top.',
  setup: 'Stand on the injured leg, knee slightly flexed (10–20°), arms out in front like a diver.',
  steps: [
    'Hinge at the hip, reaching the arms forward and the free leg back, until the torso is near horizontal.',
    'Keep the standing knee angle constant throughout — it must not straighten or collapse.',
    'Return to standing under control.',
    'Simulate the movement of a dive: reaching, not folding.'
  ],
  cues: ['Hips square — do not let the free hip open to the sky.','Long line from head to free heel.','Standing knee angle locked.'],
  faults: ['Rotating the pelvis open.','Straightening the standing knee (turns it into a stretch).','Rushing the return.'],
  dose: '3 × 6 per side.',
  prog: 'Add a light dumbbell in the opposite hand.',
  regr: 'Fingertips on a wall or chair for balance.'
},
'askling-glider': {
  n: 'Askling Glider', coach: 'L-protocol 3 of 3', cat: 'armor', tags: ['hamstring','rehab','eccentric'],
  why: 'The hardest of the three and the closest to the sprinting injury mechanism: a slow eccentric slide into hip flexion with a nearly straight leg, then a hamstring-driven pull back. Athletes report this one as the true test of whether a hamstring is ready.',
  setup: 'Stand on the injured leg with your hands on a support. The other foot is on a slider, towel, or a smooth surface behind you.',
  steps: [
    'Support some weight through the hands.',
    'Let the injured leg glide forward, hip flexing, knee nearly straight, until you reach a mild stretch.',
    'Pull yourself back to the start using the hamstring — not the arms.',
    'Slow eccentric out, active concentric back.'
  ],
  cues: ['Arms assist on the way back, hamstring leads.','Never into pain.','The stretch you feel at the end of the glide is the working range.'],
  faults: ['Using the arms to do the return.','Bending the working knee to escape the stretch.'],
  dose: '3 × 4 per side, building to 3 × 6.',
  prog: 'Reduce hand support.',
  regr: 'More hand support, shorter glide.'
},
'nordic-curl': {
  n: 'Nordic Hamstring Curl', cat: 'strength', tags: ['hamstring','eccentric','armor'],
  why: 'The most robust hamstring injury-prevention exercise in sport, and the mechanism matters: eccentric — not isometric — hip-extension work is what actually lengthens biceps femoris fascicles. Longer fascicles mean the muscle reaches its danger length later in the sprint stride. Isometrics build torque; eccentrics build architecture. You need both, so this sits alongside your isometric work rather than replacing it.',
  setup: 'Kneel on a pad, ankles anchored under a bar, by a partner, or in a Nordic bench. Hands ready to catch.',
  steps: [
    'Torso and thighs in one straight line — hips stay extended the whole way.',
    'Lower forward as slowly as you possibly can, resisting with the hamstrings.',
    'The moment you lose control ("break point"), catch yourself with your hands.',
    'Push off the floor with the arms to return — the concentric is not the point.'
  ],
  cues: ['Hips locked — the second you break at the hip, the exercise is over.','Fight for every degree past your break point.','Note your break angle: it is a test as much as an exercise.'],
  faults: ['Hinging at the hips to make it easier — the most common error by far.','Dropping fast then catching.','Doing high volume: this is potent and produces heavy soreness. Low volume, high quality.'],
  dose: 'Week 1: 2 × 4. Build to 3 × 6–8 over 6 weeks. Never more than 2×/week.',
  prog: 'Slow the descent, then add band assistance removal, then arms crossed on chest.',
  regr: 'Band-assisted from an overhead anchor, or a razor curl instead.',
  flag: 'Expect real soreness after the first exposure. Do not do this within 72 h of a max-velocity sprint day early on.'
},
'razor-curl': {
  n: 'Razor Curl', cat: 'strength', tags: ['hamstring','eccentric'],
  why: 'A Nordic regression that keeps hip extension honest by adding a slight hip flexion at the top, biasing the hamstring at a longer length with less absolute load.',
  setup: 'Same as a Nordic, ankles anchored.',
  steps: ['Start with the hips flexed ~20–30°.','Lower under control while extending the hips into a straight line as you descend.','Reverse: pull back up while re-flexing the hips.'],
  cues: ['Hip angle changes are the whole trick.','Control, not speed.'],
  faults: ['Turning it into a hip hinge with no knee-flexor work.'],
  dose: '3 × 5–8.',
  prog: 'Reduce the hip flexion until it becomes a Nordic.',
  regr: 'Band assistance.'
},
'slider-leg-curl': {
  n: 'Slider Leg Curl', cat: 'strength', tags: ['hamstring','eccentric','home'],
  why: 'Trains knee flexion under an extended hip with continuous tension and no equipment. The eccentric out-phase is the useful part.',
  setup: 'Lie on your back, heels on sliders / towel on a smooth floor.',
  steps: ['Bridge the hips up and keep them up the entire set.','Slide the heels away slowly (3–4 s) until the legs are nearly straight.','Pull the heels back in under control.','Hips never touch the floor mid-set.'],
  cues: ['Hips stay high — the moment they drop, the hamstring unloads.','Slow out, controlled in.'],
  faults: ['Letting the hips sag.','Sliding out fast.'],
  dose: '3 × 6–10, or 3 × 5 with a 5-second eccentric.',
  prog: 'Single leg.',
  regr: 'Shorter range.'
},
'single-leg-rdl': {
  n: 'Single-Leg RDL', cat: 'strength', tags: ['hamstring','unilateral','balance'],
  why: 'Hamstring at length under load, plus the frontal-plane hip control that ultimate cutting demands. Unilateral loading also exposes the left/right asymmetries that predict injury.',
  setup: 'Dumbbell or kettlebell in the opposite hand to the standing leg.',
  steps: ['Soft knee, roughly 15° and locked there.','Hinge at the hip, weight tracking down the shin, free leg extending back as a counterweight.','Hips stay level — imagine a glass of water on the sacrum.','Stop when the hamstring is at end range, then drive the hip forward to stand.'],
  cues: ['Hip hinge, not a squat.','Free hip points at the floor, not the ceiling.','Long spine — the back does not round to add range.'],
  faults: ['Pelvis rotating open.','Reaching with the hands instead of hinging the hip.','Weight drifting to the toes.'],
  dose: '3 × 6–8 per side.',
  prog: 'Contralateral load → deficit standing on a plate → offset double load.',
  regr: 'Fingertips on a wall, bodyweight only.'
},
'hip-thrust': {
  n: 'Barbell Hip Thrust', cat: 'strength', tags: ['glute','accel','power'],
  why: 'Horizontal force production is what acceleration is made of, and the glutes are the primary engine. In an athlete carrying 150 lb on a 6\'1" frame, absolute hip-extension strength is one of the biggest available levers on your first three steps.',
  setup: 'Upper back on a bench, bar over the hips with a pad, feet flat, shins vertical at the top.',
  steps: ['Chin tucked, ribs down.','Drive through the heels to full hip extension.','Squeeze hard at the top for a full second — posterior pelvic tilt, no lumbar arch.','Lower under control to just above the floor.'],
  cues: ['Ribs down — the range comes from the hips, not the low back.','Shins vertical at lockout.','Pause at the top, every rep.'],
  faults: ['Hyperextending the lumbar spine to fake lockout.','Feet too close, so it becomes a quad exercise.'],
  dose: '3–4 × 5–8, or 4 × 20 s isometric holds at lockout.',
  prog: 'Single-leg, or pause-and-hold at the top.',
  regr: 'Glute bridge from the floor.',
  timer: { w: 20, r: 60, rounds: 4, label: 'Hip thrust iso hold' }
},
'nerve-glide-sciatic': {
  n: 'Sciatic Nerve Glide', cat: 'mobility', tags: ['hamstring','neural'],
  why: 'A meaningful share of "tight hamstrings" is not muscle at all — it is neural tension. If your hamstring range changes when you tuck your chin or point your toes, the limiter is the nerve, and stretching harder makes it worse. Gliding rather than stretching is the correct tool.',
  setup: 'Seated on a chair, slumped, one leg out.',
  steps: [
    'Test: sit tall, straighten one knee. Note the range. Now tuck your chin to your chest and repeat. If range drops noticeably, you have a neural component.',
    'The glide: as you extend the knee, look UP (slackens the nerve at the top).',
    'As you bend the knee, tuck the chin DOWN (slackens at the bottom).',
    'Never both ends tensioned at once. Smooth, no pain, no lingering.'
  ],
  cues: ['One end slack at all times — that is what makes it a glide, not a stretch.','No stretch sensation should build; if it does, reduce range.'],
  faults: ['Treating it as a stretch and holding.','Chasing symptoms into tingling.'],
  dose: '2 × 10 slow reps per side. Use on days the hamstring feels "tight but not sore".',
  prog: 'Standing version with the heel on a low box.',
  regr: 'Smaller range, less knee extension.'
},

/* ============ THE ADDUCTOR TRACK ============ */
'adductor-squeeze-iso': {
  n: 'Adductor Squeeze Isometric Ladder', cat: 'iso', tags: ['adductor','iso','daily','armor'],
  why: 'The squeeze test is both your diagnostic and your treatment. Adductor strength deficits are the clearest modifiable risk factor for groin injury in cutting sports, and an isometric squeeze at multiple hip angles is the safest way to load a cranky adductor daily. Three angles because the adductor group has different lines of pull through the range — 0° biases adductor magnus, 45° the longus/brevis, 90° the pectineus/anterior fibres.',
  setup: 'Lie on your back with a ball (or a blood-pressure cuff, if you want numbers) between the knees.',
  steps: [
    '0° position — legs straight, ball between the ankles. Squeeze, ramp to hard over 2 s, hold 10 s.',
    '45° position — knees bent ~45°, feet on the floor, ball between the knees. Squeeze 10 s.',
    '90° position — hips and knees at 90°, feet in the air, ball between the knees. Squeeze 10 s.',
    'That is one ladder. Rest 30 s. Repeat 3–5 ladders.',
    'Rate pain out of 10 each time. Under 3/10 and improving means keep loading. Above 5/10, or worse day to day, means back off the volume.'
  ],
  cues: ['Ramp into it — never snap into max.','Glutes and abs stay relatively quiet; the groin should be the loudest thing.','Same ball, same positions every time, so the numbers mean something.'],
  faults: ['Going to max intent on day one with a symptomatic groin.','Only doing the 45° version — the other two angles are where you are actually weak.'],
  dose: '3–5 ladders daily. Effort: start at 50–60% and add ~10% per week as pain allows.',
  prog: 'Add intent (up to max) → move to Copenhagen holds → full Copenhagen adduction.',
  regr: 'Fewer angles, submaximal effort, longer rests.',
  timer: { w: 10, r: 5, rounds: 6, label: 'Squeeze ladder — change angle' }
},
'copenhagen-hold': {
  n: 'Copenhagen Hold (Short Lever)', cat: 'iso', tags: ['adductor','iso','armor'],
  why: 'The entry point to the Copenhagen family. The Copenhagen adduction exercise consistently improves eccentric hip adduction strength, hip range of motion and dynamic balance, and reduces groin symptoms — and the effect depends on adequate volume and progressive overload, not on doing it once in a warm-up. Start with the isometric hold: it is the version you can actually recover from.',
  setup: 'Side plank on the forearm. Top leg\'s KNEE (not ankle) rests on a bench at about hip height. Bottom leg hangs free.',
  steps: [
    'Set the elbow directly under the shoulder.',
    'Lift the hips until the body is a straight line from ear to bottom ankle.',
    'Actively press the top knee down into the bench and lift the bottom leg to meet it.',
    'Hold. The burn should be in the inner thigh of the TOP leg.'
  ],
  cues: ['Straight line — hips do not sag or pike.','Press the top knee down; that is the adduction.','Bottom leg lifts to meet the top, it does not dangle.'],
  faults: ['Hips sagging (turns it into a shoulder exercise).','Using the ankle instead of the knee before you are ready — that jumps the lever length ~40%.','Doing them fresh off a game with an already-irritated groin.'],
  dose: '3 × 15–20 s per side. This is your Week 1–3 dose.',
  prog: 'Short-lever hold → long-lever (ankle on bench) hold → long-lever reps.',
  regr: 'Bottom leg foot on the floor for support.',
  timer: { w: 20, r: 40, rounds: 6, label: 'Copenhagen hold — switch sides' }
},
'copenhagen-adduction': {
  n: 'Copenhagen Adduction (Full)', cat: 'strength', tags: ['adductor','eccentric','armor'],
  why: 'The full eccentric-emphasis version. This is the exercise with a randomized controlled trial behind it for improving eccentric hip adduction strength in players with groin injury. It is also brutally hard — respect the progression or it will make your groin worse, not better.',
  setup: 'Side plank, top leg\'s ANKLE on a bench at hip height, bottom leg free below.',
  steps: [
    'From the bottom (hip on the floor), press the top ankle into the bench and lift the whole body into a straight line, bringing the bottom leg up to meet the top.',
    'Hold the top for a beat.',
    'Lower over 3 s — this eccentric phase is the money.',
    'Do not let the hip crash into the floor; touch and go.'
  ],
  cues: ['Slow down. Three seconds down, minimum.','Straight line at the top; no piking.','Ankle, not the arch, on the bench.'],
  faults: ['Skipping the short-lever phase and going straight here.','High volume too soon — soreness in the adductor lasts days.','Letting the top hip rotate back.'],
  dose: 'Wk1: 2×3/side. Wk2: 2×5. Wk3: 3×5. Wk4+: 3×6–8. Twice weekly, never on consecutive days.',
  prog: 'Add a weight vest or ankle weight once 3 × 8 is clean.',
  regr: 'Back to the short-lever hold, or do eccentric-only (lower slowly, reset with the hand).',
  flag: 'This is the primary fix for your weak adductor. Consistency beats intensity: the research says total volume drives the result.'
},
'hip-airplane': {
  n: 'Hip Airplane', cat: 'mobility', tags: ['adductor','hip','control'],
  why: 'Trains internal and external hip rotation under a single-leg load — the exact demand of planting and cutting. Adductors are powerful hip rotators, and an adductor that cannot control rotation is one that gets strained during a plant.',
  setup: 'Single-leg hinge position, torso near horizontal, hands out or on a support.',
  steps: ['Hinge into a single-leg RDL position and hold it.','Rotate the pelvis open toward the sky as far as the standing hip allows.','Rotate closed, dropping the free hip toward the floor — this is the internal rotation half and the hard one.','Move slowly; the standing foot must not move.'],
  cues: ['Torso stays still; the pelvis rotates around the femur.','Standing foot tripod stays planted — no rolling to the outside edge.'],
  faults: ['Rotating the whole body instead of the pelvis.','Losing the hinge and standing up.'],
  dose: '2 × 5 per side, slow.',
  prog: 'Hands off the support.',
  regr: 'Hands on a wall/rail, smaller range.'
},
'cossack-squat': {
  n: 'Cossack Squat', cat: 'mobility', tags: ['adductor','hip','mobility','strength'],
  why: 'Loaded adductor lengthening under control. Gets the groin strong at long lengths, which is exactly the position it fails in during a wide plant or a layout.',
  setup: 'Wide stance, toes slightly out. Hold a light plate or kettlebell as a counterweight.',
  steps: ['Shift weight into one leg and sit down into it, the other leg straightening.','Keep the straight leg\'s heel down; the toe can lift.','Descend as deep as you can while keeping the chest up and the working heel down.','Push back to centre through the working heel.'],
  cues: ['Counterweight forward lets you sit deeper.','Straight leg\'s heel stays down for the adductor stretch.','Chest tall, spine long.'],
  faults: ['Working heel lifting.','Rounding forward to fake depth.','Bouncing at the bottom.'],
  dose: '2–3 × 5 per side, or 3 × 20 s holds at the bottom.',
  prog: 'Add load, or pause 3 s at the bottom.',
  regr: 'Hold a rail, reduce depth, elevate the heel.',
  timer: { w: 20, r: 20, rounds: 6, label: 'Cossack hold — switch sides' }
},
'adductor-rockback': {
  n: 'Adductor Rock-Back (Frog)', cat: 'mobility', tags: ['adductor','mobility','daily'],
  why: 'Low-load, high-frequency adductor lengthening you can do daily without adding fatigue. Prepares the groin for the deep squat holds you like.',
  setup: 'On hands and knees, knees wide, shins in line with the thighs, feet flat or toes together.',
  steps: ['Set a neutral spine.','Rock the hips back toward the heels until you feel a stretch through the inner thighs.','Rock forward. Rhythmic, 2 s each way.','After 10 reps, hold the back position for 30 s and breathe into it.'],
  cues: ['Spine neutral — do not let the low back round to add range.','Feel it in the inner thigh, not the knee.'],
  faults: ['Knee pain — if present, narrow the knees or reduce the rock.','Lumbar rounding.'],
  dose: '10 rocks + 30 s hold. Daily.',
  prog: 'Wider knees, longer hold.',
  regr: 'Narrower knees, smaller range.',
  timer: { w: 30, r: 10, rounds: 3, label: 'Frog hold' }
},
'skater-bound': {
  n: 'Lateral Skater Bound', cat: 'plyo', tags: ['adductor','lateral','elastic','cod'],
  why: 'The plyometric that most resembles an ultimate cut: lateral force production, single-leg landing, adductor and glute-med eccentric control. Trains the groin to absorb, not just to squeeze.',
  setup: 'Open space, athletic stance.',
  steps: ['Push laterally off one leg, land on the other, stick the landing for one full second.','Land with the knee tracking over the middle of the foot and the hip loaded, not the knee caving.','Once sticking is clean, remove the pause and bound continuously for elastic quality.'],
  cues: ['Stick before you bounce — earn the reactive version.','Push off the outside edge, land on a stable tripod foot.','Hip absorbs, not the knee.'],
  faults: ['Knee caving inward on landing.','Landing stiff-legged.','Going for maximum distance before landings are controlled.'],
  dose: 'Stick version: 3 × 5 per side. Continuous: 3 × 6 per side.',
  prog: 'Stick → continuous → continuous for distance → with a med ball held.',
  regr: 'Small lateral hops, both feet.'
},

/* ============ THE SHOULDER / LABRUM TRACK ============ */
'cuff-iso-er': {
  n: 'Rotator Cuff Isometric — ER/IR', cat: 'iso', tags: ['shoulder','labrum','iso','daily','armor'],
  why: 'Non-operative management of SLAP-type labral lesions succeeds in returning throwers to sport more often than surgery does — roughly 71% return to the same or better level with scapular stabilisation and posterior capsule work. Isometrics at low abduction angles load the cuff without the compression and torsion the labrum dislikes, and they are timed holds, which suits you.',
  setup: 'Stand with the affected arm at your side, elbow at 90°, a rolled towel between elbow and ribs.',
  steps: [
    'External rotation: press the back of the wrist into a wall or door frame. Ramp to ~60–70% over 2 s, hold 20–30 s.',
    'Internal rotation: turn around, press the palm into the frame. Same ramp and hold.',
    'Repeat at 45° of abduction once the 0° version is symptom-free.',
    'Keep the towel pinned — if it drops, you are substituting with the lat.'
  ],
  cues: ['Elbow pinned to the ribs.','Submaximal and pain-free beats maximal and provocative.','Shoulder blade stays set down and back; do not shrug.'],
  faults: ['Going to full max effort early.','Letting the elbow drift away from the body.','Doing these overhead before the low-angle versions are clean.'],
  dose: '3 × 20–30 s each direction, daily.',
  prog: '0° → 45° abduction → 90° abduction (only when fully symptom-free).',
  regr: 'Lighter effort, shorter holds.',
  flag: 'Stop and reassess if you get a deep, clicking, catching sensation at the front of the joint. That is labral, not muscular.',
  timer: { w: 25, r: 20, rounds: 6, label: 'Cuff iso — change direction' }
},
'sleeper-stretch': {
  n: 'Sleeper Stretch (Posterior Capsule)', cat: 'mobility', tags: ['shoulder','labrum','gird'],
  why: 'Athletes with GIRD — glenohumeral internal rotation deficit — are roughly twice as likely to be injured over a three-year window. Posterior capsule stretching resolves GIRD in about 90% of athletes who have it. For a thrower with a labral history, a tight posterior capsule pushes the humeral head forward and up, which is precisely what irritates the superior labrum.',
  setup: 'Lie on the affected side, shoulder under you, arm out at 90° of abduction, elbow bent 90°.',
  steps: [
    'Roll back about 10–20° so you are not lying directly on the point of the shoulder.',
    'Use the free hand to gently rotate the forearm down toward the floor (internal rotation).',
    'Stop at a firm stretch at the BACK of the shoulder. Hold 30 s.',
    'Front-of-shoulder pinching means stop immediately and reduce the angle.'
  ],
  cues: ['Stretch belongs at the back of the shoulder. Anywhere else is wrong.','Roll off the point of the shoulder slightly.','Gentle. This is a capsule, not a muscle.'],
  faults: ['Lying flat on the shoulder and cranking — this jams the joint and can irritate the labrum.','Feeling it in the front — that is anterior instability, not a stretch.','Bouncing.'],
  dose: '3 × 30 s, daily if you have a side-to-side IR difference over 15°. Skip if you do not.',
  prog: 'Cross-body adduction stretch as a companion.',
  regr: 'Cross-body stretch only.',
  flag: 'Measure first. If your IR difference is under 15°, you do not have GIRD and you do not need this. Stretching a capsule you do not need to stretch is how throwers create instability.'
},
'prone-ytw': {
  n: 'Prone Y-T-W', cat: 'strength', tags: ['shoulder','scap','labrum'],
  why: 'Scapular dyskinesis is one of the three things the SLAP literature says rehab must address, alongside GIRD and cuff strength. If the scapula does not upwardly rotate on time, the labrum takes the load instead.',
  setup: 'Face down on an incline bench or on the floor. Very light or no weight — 2–5 lb is plenty.',
  steps: [
    'Y: arms overhead at ~45°, thumbs up. Lift by first setting the shoulder blade into the back pocket, then raising the arm.',
    'T: arms straight out to the sides, thumbs up. Squeeze the blades together and down.',
    'W: elbows bent, pull the elbows back and down toward the hip pockets, rotating the forearms up.',
    'Two seconds up, hold one, three seconds down.'
  ],
  cues: ['Scapula moves first, arm second.','No shrugging — if the traps light up at the top, the weight is too heavy.','Chin tucked, neck long.'],
  faults: ['Using weight heavy enough to force upper-trap dominance.','Rushing.','Arching the low back to lift higher.'],
  dose: '2 × 8 each position, 2–3×/week.',
  prog: 'Add 2 lb at a time. Slower tempos before heavier loads.',
  regr: 'No weight, smaller range.'
},
'landmine-press': {
  n: 'Half-Kneeling Landmine Press', cat: 'strength', tags: ['shoulder','labrum','press'],
  why: 'Your labrum-safe pressing option. The landmine arc keeps the humerus in the scapular plane and stops short of full overhead, so you build pressing strength without the end-range compression and torsion that provokes a superior labral lesion.',
  setup: 'Barbell in a landmine or a corner. Half-kneeling, down knee on the same side as the pressing arm.',
  steps: ['Bar in the hand at shoulder height, elbow tucked.','Ribs down, glute of the down leg squeezed — no lumbar arch.','Press up and forward along the bar\'s arc, finishing with the arm long and the shoulder blade rotating up.','Control back to the shoulder.'],
  cues: ['Press along the arc, not straight up.','Ribs down; the range comes from the shoulder, not the spine.','Full reach at the top — let the shoulder blade travel.'],
  faults: ['Arching the back to press higher.','Pressing into pain.','Losing the half-kneeling position.'],
  dose: '3 × 6–8 per side.',
  prog: 'Heavier, then standing, then single-arm with a contralateral stance.',
  regr: 'Lighter, seated, shorter range.',
  flag: 'Replaces overhead barbell pressing entirely while the labrum is a concern.'
},
'bottoms-up-carry': {
  n: 'Bottoms-Up KB Carry', cat: 'strength', tags: ['shoulder','labrum','stability'],
  why: 'An unstable load forces reflexive cuff co-contraction — exactly what a labrum-compromised shoulder needs — at a load light enough to be entirely safe. It also trains the grip-to-cuff irradiation that keeps the humeral head centred.',
  setup: 'Kettlebell held upside down, elbow at 90°, bell balanced above the fist.',
  steps: ['Crush the handle.','Rib cage down, shoulder blade set.','Walk 20–30 m without letting the bell tip.','Switch hands.'],
  cues: ['Grip hard — the cuff follows the grip.','Wrist straight and stacked.','Do not lean away from the bell.'],
  faults: ['Side-bending away from the load.','Shrugging.'],
  dose: '3 × 20–30 m per side.',
  prog: 'Heavier bell, or overhead bottoms-up (only when fully asymptomatic).',
  regr: 'Static hold instead of walking.'
},
'band-pull-apart': {
  n: 'Band Pull-Apart & Face Pull', cat: 'strength', tags: ['shoulder','scap','daily'],
  why: 'High-frequency, low-cost posterior shoulder volume. For a thrower, the pull-to-push ratio should be at least 2:1 and probably 3:1.',
  setup: 'Light band at chest height for pull-aparts; band or cable at eye height for face pulls.',
  steps: ['Pull-apart: arms straight, pull the band to the chest, squeezing the blades. 2 s hold.','Face pull: pull to the forehead, ending with the hands wide and the forearms vertical, external rotation at the finish.','Slow return — the eccentric is half the work.'],
  cues: ['Blades down and back, not shrugged.','Finish with the pinkies leading on the face pull.'],
  faults: ['Shrugging.','Band too heavy so the traps take over.'],
  dose: '2–3 × 15–20. Can be done daily.',
  prog: 'Thicker band.',
  regr: 'Lighter band, fewer reps.'
},
'weighted-pullup': {
  n: 'Chin-Up / Weighted Pull-Up', cat: 'strength', tags: ['upper','pull','mass'],
  why: 'The single best upper-body strength and mass builder for a light athlete, and a shoulder-friendly one if you use a full-range hang and a neutral or supinated grip. At 150 lb, added upper-body mass is a genuine performance lever for you.',
  setup: 'Neutral or supinated grip. Full hang at the bottom.',
  steps: ['Start from a dead hang with the shoulder blades relaxed, then set them down and back.','Pull the elbows to the ribs, chest toward the bar.','Lower over 3 s to a full hang.'],
  cues: ['Initiate with the scapulae, then the arms.','Chest up through the whole pull.','Full hang each rep — this is also shoulder health work.'],
  faults: ['Kipping.','Half range at the bottom.','Wide pronated grip with a cranky shoulder — go neutral instead.'],
  dose: '4 × 4–6 with added weight, or 3 × AMRAP-2 bodyweight.',
  prog: 'Add 5 lb when you hit 6 clean reps.',
  regr: 'Band-assisted or eccentric-only (jump up, lower 5 s).',
  flag: 'If a full dead hang bothers the labrum, stop just short of full relaxation at the bottom and keep the blades slightly engaged.'
},

/* ============ ISOMETRIC MAIN LIFTS ============ */
'iso-split-squat-yield': {
  n: 'Yielding Split Squat Isometric', cat: 'iso', tags: ['iso','tendon','legs','favourite'],
  why: 'Yielding isometrics — holding a position under load, typically 20–120 s — build tendon capacity, reinforce positions, and are the right tool in the early phase of a block. Hold type fatigues faster than push type at the same intensity, which is why these feel disproportionately hard. This is your tendon-thickening, position-owning work.',
  setup: 'Split stance, back knee an inch off the floor, front shin roughly vertical. Dumbbells at the sides or a barbell on the back.',
  steps: [
    'Descend into the bottom position and stop with the back knee an inch off the floor.',
    'Front foot drives down and back into the floor; do not just balance there.',
    'Hold 45–90 s. Torso tall, ribs down.',
    'Rest 90 s between sides.'
  ],
  cues: ['Actively pull the floor toward you with the front foot.','90/90 knee angles.','If it feels like standing still, add load.'],
  faults: ['Passive hanging — the whole point is active tension.','Front knee collapsing inward.','Torso pitching forward to escape the quads.'],
  dose: '3 × 45–60 s per side, building to 90 s. Load: enough that the last 15 s is a fight.',
  prog: 'Time first (to 90 s), then load, then rear-foot elevated.',
  regr: 'Bodyweight, shorter holds, hand on a rail.',
  timer: { w: 60, r: 90, rounds: 6, label: 'Split squat hold — switch legs' }
},
'iso-split-squat-overcome': {
  n: 'Overcoming Split Squat Push', cat: 'iso', tags: ['iso','rfd','speed','power'],
  why: 'Overcoming isometrics — maximal force against an immovable object — maximise rate of force development by recruiting high-threshold motor units without any eccentric cost. Because you produce enormous force with essentially zero muscle damage, they are the ideal high-intensity stimulus in-season and the day before a game. Short duration is the rule: when rate of force is the goal, limit the time you are forced to produce.',
  setup: 'Barbell in a rack set on pins, loaded to immovable. Split stance underneath, bar across the back at the position you want to train (usually a strong, near-lockout angle).',
  steps: [
    'Get into position and take up the slack.',
    'Push into the bar as hard and as FAST as you can. Maximum intent from the first millisecond.',
    'Hold maximum for 5–6 seconds, then release completely.',
    'Rest 60–90 s. Five to six reps total; when intent drops, the set is over.'
  ],
  cues: ['Explode into the bar — the intent is "move it", even though it will not move.','Maximum from rep one; there is no ramping in an RFD set.','Full relaxation between reps.'],
  faults: ['Gradually building tension — that trains max strength, not RFD.','Long holds — past ~6 s you are training something else.','Doing these when tired; quality is everything.'],
  dose: '5 × 5–6 s per side, 90 s rest. Twice weekly max.',
  prog: 'Change the joint angle (weakest position), not the duration.',
  regr: 'Push against a immovable band or a wall in a lunge position.',
  timer: { w: 6, r: 90, rounds: 5, label: 'Max intent push' }
},
'iso-trap-bar-pull': {
  n: 'Overcoming Trap Bar Pull', cat: 'iso', tags: ['iso','rfd','power'],
  why: 'Whole-body overcoming isometric. Massive neural stimulus, zero eccentric damage, three minutes of your day. This is the single best "I have no time and a game on Saturday" strength dose.',
  setup: 'Trap bar or straight bar in a rack, set at mid-shin, loaded far beyond what you can lift, or with straps anchored to the floor.',
  steps: ['Set your deadlift position exactly as you would for a real pull.','Take up the slack — bar tight against the pins.','Pull as hard and fast as possible for 5–6 s.','Release fully. Rest 90 s.'],
  cues: ['Same setup as a real lift, or you train a position you never use.','Fast intent, not a slow grind.'],
  faults: ['Rounding the back and grinding.','Setting the pins at an angle you never actually use.'],
  dose: '5 × 5 s, 90 s rest.',
  prog: 'Two pin heights: mid-shin and just below the knee.',
  regr: 'Submaximal effort while you learn the position.',
  timer: { w: 6, r: 90, rounds: 5, label: 'Max intent pull' }
},
'wall-sit-iso': {
  n: 'Wall Sit', cat: 'iso', tags: ['iso','legs','simple'],
  why: 'The most accessible yielding isometric there is. Excellent as an accumulation tool and as an honest measure of quadriceps endurance under fatigue.',
  setup: 'Back flat against a wall, thighs parallel to the floor, knees at 90°, feet hip width.',
  steps: ['Slide down until the thighs are parallel.','Weight through the heels, back flat against the wall.','Hold. Breathe normally — no breath-holding.','Single-leg version: extend one leg, hold half the time.'],
  cues: ['Thighs truly parallel — most people cheat high.','Push the back into the wall.'],
  faults: ['Hands on the thighs.','Sitting above parallel.'],
  dose: '3 × 60–90 s, or 3 × 30 s single-leg.',
  prog: 'Single-leg, or hold a plate on the lap.',
  regr: 'Higher position, shorter hold.',
  timer: { w: 75, r: 60, rounds: 3, label: 'Wall sit' }
},
'iso-nordic-hold': {
  n: 'Nordic Hold at Break Angle', cat: 'iso', tags: ['hamstring','iso','tendon'],
  why: 'Takes the safest, highest-tension portion of the Nordic — the hold just before your break point — and turns it into a timed effort. Far less soreness than full Nordics, most of the tension.',
  setup: 'Nordic setup, ankles anchored.',
  steps: ['Lower to roughly 10° above your break angle.','Hold there, hips locked in line with the torso.','Hold 10–20 s. Catch with the hands when you fail.'],
  cues: ['Hips extended.','Stop above your break angle — you want a hold, not a fall.'],
  faults: ['Hinging at the hip.','Going past the break angle and turning it into a crash.'],
  dose: '3 × 10–20 s.',
  prog: 'Lower angle, longer hold.',
  regr: 'Higher angle (closer to upright).',
  timer: { w: 15, r: 60, rounds: 3, label: 'Nordic hold' }
},
'deep-squat-hold': {
  n: 'Deep Squat Hold', cat: 'iso', tags: ['mobility','iso','daily','favourite','fascia'],
  why: 'Your favourite, and it earns its place. A deep squat is the position your hips, knees and ankles need to keep access to, and accumulated time in it is the cheapest way to keep it. It also loads the adductors and the posterior hip capsule at end range under bodyweight, which is loaded stretching — the kind of exposure animal work associates with real tissue adaptation. Treat it as a daily accumulation target, not a workout.',
  setup: 'Feet roughly shoulder width, toes out 10–20°, barefoot ideally.',
  steps: [
    'Sit all the way down, heels flat. If the heels lift, put a 1–2 cm wedge or a book under them to start.',
    'Elbows inside the knees, hands together, gently pushing the knees out.',
    'Chest up, long spine. Breathe into the belly and the back of the ribs.',
    'Accumulate five minutes across the day. Two minutes at a time is plenty; three sets of 100 s is fine.',
    'Add value: rock side to side, rotate the torso, lift one heel then the other, reach one arm overhead.'
  ],
  cues: ['Heels down. If they will not stay down, that is an ankle problem — see knee-to-wall.','Breathe. If you cannot breathe in the position, you are not in the position, you are fighting it.','Long spine, not a rounded slump — a slump is rest, not training.'],
  faults: ['Slumping into the low back and calling it mobility.','Forcing depth with a wedge forever instead of building ankle range.','Doing it only in a workout instead of throughout the day.'],
  dose: '5 minutes accumulated daily. During phone calls, while reading, before bed.',
  prog: 'Remove the heel wedge → hold a plate at the chest → add rotation and reaches → 5 min unbroken.',
  regr: 'Hold a doorframe, or a wedge under the heels, or box-supported.',
  timer: { w: 100, r: 30, rounds: 3, label: 'Deep squat hold' }
},
'iso-hip-flexor': {
  n: 'Standing Hip Flexor Isometric', cat: 'iso', tags: ['iso','hip','speed'],
  why: 'Hip flexor strength above 90° is a direct contributor to sprint stride frequency and to the knee drive that separates fast cutters from quick ones. Almost nobody trains it above 90°, which is where it is weakest.',
  setup: 'Stand tall, hold a rail lightly for balance.',
  steps: ['Lift one knee as high as it will go — above hip height.','Actively pull it higher against the limit of your range. No band needed at first.','Hold 15–20 s at hard effort, standing leg tall and glute engaged.','Switch.'],
  cues: ['Stand tall — do not lean back to lift higher.','Standing side glute squeezed.'],
  faults: ['Posterior pelvic tilt to fake range.','Leaning the torso back.'],
  dose: '3 × 15–20 s per side.',
  prog: 'Add a band or ankle weight, or do it seated with a load on the thigh.',
  regr: 'Lower knee height, hold a rail.',
  timer: { w: 18, r: 15, rounds: 6, label: 'Hip flexor iso — switch' }
},
'rkc-plank': {
  n: 'RKC Plank', cat: 'iso', tags: ['iso','core','trunk'],
  why: 'A 20-second RKC plank done properly beats a three-minute regular plank. Ultimate is full of one-sided, rotational, decelerating loads — the trunk\'s job is to not leak force between the hips and the shoulders.',
  setup: 'Forearm plank, elbows slightly further forward than usual.',
  steps: ['Squeeze the glutes as hard as possible — this posteriorly tilts the pelvis.','Pull the elbows toward the toes (they will not move) to fire the lats.','Brace the abs as if about to take a punch.','Hold 15–20 s at genuine maximum. Rest 45 s.'],
  cues: ['Maximum contraction of everything, not a comfortable hold.','Ribs pulled down toward the hips.','If you can hold it for a minute, you are not doing it right.'],
  faults: ['Sagging hips.','Holding for time instead of for tension.'],
  dose: '3 × 15–20 s.',
  prog: 'Long-lever (elbows further forward) or single-arm.',
  regr: 'Knees down.',
  timer: { w: 20, r: 45, rounds: 3, label: 'RKC plank' }
},
'pallof-press': {
  n: 'Pallof Press & Hold', cat: 'iso', tags: ['core','anti-rotation','iso'],
  why: 'Anti-rotation strength is what lets a thrower generate hip-shoulder separation without the low back or the shoulder paying for it. Directly relevant to hucking.',
  setup: 'Cable or band at chest height, stand side-on, feet shoulder width.',
  steps: ['Hold the handle at the sternum, brace.','Press straight out. The band will try to rotate you; do not let it.','Hold at full extension for 5–10 s.','Return slowly.'],
  cues: ['Ribs down, glutes on.','Fight the rotation, do not just move the arms.'],
  faults: ['Rotating the torso.','Shrugging.'],
  dose: '3 × 5 reps with 5 s holds per side, or 3 × 30 s static hold.',
  prog: 'Half-kneeling → tall-kneeling → split stance → heavier.',
  regr: 'Lighter band, closer to the anchor.',
  timer: { w: 30, r: 30, rounds: 6, label: 'Pallof hold — switch sides' }
},

/* ============ STRENGTH ============ */
'trap-bar-deadlift': {
  n: 'Trap Bar Deadlift', cat: 'strength', tags: ['power','legs','mass'],
  why: 'The best strength-to-risk ratio for a field athlete: more upright torso than a straight-bar pull, less shear on the spine, and it transfers well to sprint acceleration. Your primary max-strength lift.',
  setup: 'Feet hip width inside the bar, high handles until the position is clean.',
  steps: ['Hips between a squat and a hinge, chest up, lats set (armpits over the bar).','Take up slack, then push the floor away.','Lock out with the glutes, no hyperextension.','Lower under control — this is not a drop.'],
  cues: ['Push the floor away rather than pull the bar up.','Bar path stays vertical over mid-foot.','Air in, brace, go.'],
  faults: ['Hips shooting up first.','Rounding the upper back under heavy load.','Jerking off the floor before the slack is out.'],
  dose: 'Strength: 4 × 3–5 @ 80–88%. Speed-strength: 6 × 3 @ 60–70% moving fast.',
  prog: 'Add 5 lb/week or a rep per set. Track bar speed if you can.',
  regr: 'Elevated handles or a block pull.'
},
'rfess': {
  n: 'Rear-Foot Elevated Split Squat', cat: 'strength', tags: ['legs','unilateral','mass'],
  why: 'Loads one leg heavily without loading the spine heavily — perfect for a light athlete who needs leg strength but does not need to be crushed by axial load. Also exposes side-to-side differences you cannot hide.',
  setup: 'Rear foot on a bench about knee height, front foot far enough forward that the shin stays near vertical at the bottom.',
  steps: ['Torso upright, ribs down.','Descend until the back knee is just above the floor.','Pause a beat at the bottom.','Drive through the whole front foot, especially the heel.'],
  cues: ['Front knee tracks over the second and third toes.','Rear leg is a kickstand, not an engine.','Pause at the bottom kills the bounce.'],
  faults: ['Front foot too close, so the knee jams forward.','Rear leg pushing.','Torso collapsing forward.'],
  dose: '3–4 × 6–8 per side.',
  prog: 'Load, then a 2 s pause, then a deficit under the front foot.',
  regr: 'Rear foot on a lower box or floor split squat.'
},
'atg-split-squat': {
  n: 'ATG Split Squat', cat: 'strength', tags: ['knee','mobility','hip'],
  why: 'Essentially a loaded stretch: a huge range of motion at hip, knee and ankle under light load. Loaded, long-length work is the version of "mobility" that actually builds tissue rather than just borrowing range for an hour.',
  setup: 'Long split stance, front heel down, back knee travelling toward the floor. Start with no load and a hand support.',
  steps: ['Front foot far forward; descend until the hamstring meets the calf if you can.','Front heel stays down the entire time.','Back knee lightly kisses the floor, back leg long.','Drive up without letting the front heel lift.'],
  cues: ['Heel down is non-negotiable — reduce range instead.','Torso tall.','Slow at the bottom, no bouncing.'],
  faults: ['Front heel lifting.','Descending fast into the bottom.','Loading before the range is available.'],
  dose: '2–3 × 5–8 per side, light.',
  prog: 'Add a light dumbbell, then a plate held at the chest.',
  regr: 'Hold a rail, shorter range, elevate the front foot.'
},
'front-squat': {
  n: 'Front Squat', cat: 'strength', tags: ['legs','trunk','mass'],
  why: 'More upright than a back squat, kinder to the shoulder than a low-bar back squat, and it forces trunk strength. If the front rack bothers the labrum, use a safety-squat bar or a heels-elevated goblet squat instead.',
  setup: 'Bar on the front delts, elbows high, fingertip grip or crossed arms.',
  steps: ['Elbows up throughout — if they drop, the bar goes forward.','Sit down between the hips, knees travelling forward.','Depth: hip crease below the knee if the position holds.','Drive up, elbows still high.'],
  cues: ['Elbows to the ceiling.','Big brace before descending.','Knees out.'],
  faults: ['Elbows dropping.','Butt wink at the bottom from limited ankle range.'],
  dose: '3–4 × 4–6.',
  prog: 'Load, or pause 2 s at the bottom.',
  regr: 'Goblet squat, or safety-squat bar.',
  flag: 'The front rack loads the shoulder in flexion. If it aggravates the labrum, use straps or switch to a safety-squat bar — no reason to fight it.'
},
'reverse-lunge-slider': {
  n: 'Slider Reverse Lunge', cat: 'strength', tags: ['legs','control','decel'],
  why: 'Continuous tension, no impact, and a strong eccentric control demand. Great in-season when you need leg work without adding pounding.',
  setup: 'One foot on a slider on a smooth floor.',
  steps: ['Slide one foot back into a lunge, front shin near vertical.','Descend slowly, back knee toward the floor.','Pull the slider back in using the front leg — do not push with the back.'],
  cues: ['Front leg does 100% of the work.','Slow slide out.'],
  faults: ['Pushing back with the sliding leg.','Dumping into the bottom.'],
  dose: '3 × 8 per side.',
  prog: 'Hold dumbbells.',
  regr: 'Reduce depth.'
},
'back-extension-iso': {
  n: 'Back Extension Hold', cat: 'iso', tags: ['posterior','iso','trunk'],
  why: 'Posterior chain endurance under isometric load. Ultimate makes you hinge, brake and reach thousands of times per game; the erectors and glutes need endurance, not just peak strength.',
  setup: '45° or horizontal back extension bench.',
  steps: ['Hinge down to a full stretch.','Rise until the body is a straight line — not into extension.','Hold there, glutes squeezed, spine neutral.','30–45 s.'],
  cues: ['Straight line, not arched.','Glutes finish the movement, not the low back.'],
  faults: ['Hyperextending at the top.','Holding the breath.'],
  dose: '3 × 30–45 s.',
  prog: 'Hold a plate at the chest.',
  regr: 'Floor-based glute bridge hold.',
  timer: { w: 40, r: 45, rounds: 3, label: 'Back ext hold' }
},
'suitcase-carry': {
  n: 'Suitcase Carry', cat: 'strength', tags: ['core','grip','trunk'],
  why: 'Lateral trunk strength and grip in one, and it directly trains the anti-lateral-flexion demand of running with one arm extended for a disc.',
  setup: 'One heavy dumbbell or kettlebell in one hand.',
  steps: ['Stand tall, shoulders level, ribs down.','Walk 30–40 m without leaning either way.','Switch sides.'],
  cues: ['Do not lean away from the weight.','Shoulders square and level.'],
  faults: ['Leaning to counterbalance.','Shrugging the loaded side.'],
  dose: '3 × 30–40 m per side, heavy.',
  prog: 'Heavier, or longer distance.',
  regr: 'Lighter load.'
},

/* ============ PLYOMETRICS & ELASTIC ============ */
'pogo-jumps': {
  n: 'Pogo Jumps (Ankle Stiffness)', cat: 'plyo', tags: ['elastic','speed','foot'],
  why: 'Pogos are the base of reactive strength: low intensity, high frequency, training foot and ankle stiffness, rhythm and repeated fast ground contacts. This is the drill that shortens your ground contact time, and ground contact time is the difference between fast and quick.',
  setup: 'Shoes or barefoot, on a firm surface with some give (track, turf, gym floor).',
  steps: ['Feet hip width, knees almost straight — under 15° of bend.','Bounce continuously off the ankles.','Contact times as short as possible; think "hot floor".','20–30 contacts, then stop before quality drops.'],
  cues: ['Quiet, fast, minimum ground time.','Toes pulled up before contact (pre-tension the ankle).','Stiff, not stiff-legged: the ankle springs, it does not lock.'],
  faults: ['Knee bend creeping in.','Heels touching down.','Continuing past the point where the rhythm slows.'],
  dose: '3–4 × 20–30 contacts.',
  prog: 'Two-leg → single-leg → single-leg lateral → pogos for height with the same contact time.',
  regr: 'Lower amplitude, fewer contacts.'
},
'depth-jump': {
  n: 'Depth Jump', cat: 'plyo', tags: ['elastic','power','high-intensity'],
  why: 'The highest-intensity plyometric, and it only pays once you have earned it. Athletes with an RSI of 2.0–3.0 should use depth jumps from their individually tested optimal drop height. Using the height that maximises YOUR reactive strength index is what makes the difference — most people just pick a box.',
  setup: 'Box at your tested optimal height (usually 30–50 cm). Landing area with some give.',
  steps: ['Step off — do not jump off, do not step down.','Land on the balls of the feet with pre-tensioned ankles.','Minimise ground contact time — target under 0.25 s — and jump as high as possible.','Full recovery between reps: 60–90 s.'],
  cues: ['Touch and go. The floor is hot.','Land tall and stiff, not deep and soft.','If the contact feels long and squishy, the box is too high.'],
  faults: ['Jumping off the box (changes the drop height and the landing).','Sinking into a deep countermovement on landing.','High volume — this is a shock method, not a conditioning drill.'],
  dose: '3–4 × 4–5 reps, 90 s rest. Once a week, only in Phase 3.',
  prog: 'Test optimal height every 6 weeks and adjust; do not just add height.',
  regr: 'Drop jumps from a lower box, or box jumps.',
  flag: 'Prerequisite: a clean RSI of at least 1.5 and a solid strength base. Skip this entirely in a phase where the hamstring or groin is symptomatic.'
},
'hurdle-hops': {
  n: 'Continuous Hurdle Hops', cat: 'plyo', tags: ['elastic','stiffness'],
  why: 'Trains stiff, repeated ground contacts with a vertical demand and a hard constraint. The hurdle forces height while the "continuous" instruction forces short contacts.',
  setup: '4–6 hurdles at 45–75 cm, spaced about 1 m apart.',
  steps: ['Hop over each hurdle with both feet, landing and leaving immediately.','Knees stay relatively straight — this is an ankle and hip drill, not a knee drill.','Arms cycle rhythmically.','Reset fully between sets.'],
  cues: ['Bounce, do not squat and jump.','Arms drive the rhythm.'],
  faults: ['Pausing between hurdles.','Deep knee bend on landing.','Hurdles too high, forcing a tuck.'],
  dose: '4 × 5 hurdles, 90 s rest.',
  prog: 'Higher hurdles, then single-leg.',
  regr: 'Lower hurdles or line hops.'
},
'broad-jump': {
  n: 'Standing Broad Jump', cat: 'plyo', tags: ['power','test','horizontal'],
  why: 'The most honest field test of horizontal power there is, and horizontal power is what acceleration is made of. Also a training tool: maximal intent, low volume.',
  setup: 'Flat, non-slip surface, room to land.',
  steps: ['Feet hip width behind a line.','Swing the arms back, load the hips, then explode forward and up.','Aim for a 45° takeoff, not straight up.','Land absorbing through hips and knees, and stick it.'],
  cues: ['Arms are half the jump — throw them.','Hips back, then hips through.','Stick the landing every rep; a landing you cannot hold is a jump you did not earn.'],
  faults: ['Jumping too vertical.','Not using the arms.','Chasing distance with a sloppy landing.'],
  dose: '4–6 singles with full recovery. Test: best of 3.',
  prog: 'Triple broad jump (3 continuous) for elastic quality.',
  regr: 'Submaximal jumps with stuck landings.'
},
'bounds': {
  n: 'Alternating Bounds', cat: 'plyo', tags: ['elastic','horizontal','speed'],
  why: 'The bridge between plyometrics and sprinting: horizontal force, single-leg, long ground contacts you progressively shorten. This is where fascial elastic recoil is most obviously trained — the catapult mechanism in a human gait pattern.',
  setup: '30–40 m of grass or track.',
  steps: ['Start with a jog-in of 5–10 m.','Push off one leg, fly, land on the other, immediately push again.','Aim for distance per bound, then progressively for less ground time at the same distance.','Count bounds over 30 m: fewer bounds means more powerful ones.'],
  cues: ['Reach forward with the knee, strike down and back with the foot.','Tall posture, hips high.','Feel the "give and return" — do not muscle it.'],
  faults: ['Bounding upward instead of forward.','Landing ahead of the centre of mass and braking.','Doing them fatigued.'],
  dose: '4–6 × 30 m, full recovery.',
  prog: 'Single-leg bounds (same leg repeatedly) once alternating is clean.',
  regr: 'Power skips or bounding for 15 m.'
},
'elastic-rebound-flow': {
  n: 'Fascial Rebound Flow', cat: 'plyo', tags: ['fascia','elastic','prep'],
  why: 'Schleip\'s elastic-recoil work in practice: rhythmic, oscillatory, multi-directional pre-bounces that use stored energy rather than muscular effort. During hopping, muscle fibres contract nearly isometrically while the fascial elements lengthen and shorten like a spring, and regular oscillatory exercise increases the storage capacity of those tissues. He also cautions that untamed rebound training injures people more than standard strength work — so this is deliberately submaximal and rhythmic, not maximal.',
  setup: 'Open space, no equipment.',
  steps: [
    'Start with small, rhythmic bounces on the spot — hands loose, jaw loose, breathing free.',
    'Add a pre-bounce before each movement: a small countermovement that pre-loads the tissue, then release.',
    'Cycle through: forward-back skips, lateral shuffles with a bounce, arm swings with a torso wind-up and release, diagonal reaches.',
    'The rule: every direction change is preceded by a small pre-load and driven by the rebound out of it, not by muscular effort.',
    '3–5 minutes, continuous, playful.'
  ],
  cues: ['Effortless is the target. If it feels like work, you are muscling it.','Pre-load, then release — like a bow, not a punch.','Loose jaw, loose hands.'],
  faults: ['Turning it into hard plyometrics.','Doing it fatigued or cold.','Maximal amplitude — this is submaximal by design.'],
  dose: '3–5 min, as a primer before speed or elastic work.',
  prog: 'Larger amplitudes, more complex directions.',
  regr: 'Smaller amplitude, on the spot only.',
  timer: { w: 240, r: 0, rounds: 1, label: 'Rebound flow' }
},
'cmj': {
  n: 'Countermovement Jump', cat: 'plyo', tags: ['test','power'],
  why: 'The standard field measure of lower-body power, and a useful daily readiness check: a CMJ that is 5%+ below your rolling average is a reliable sign of neuromuscular fatigue.',
  setup: 'Flat surface. Use a phone jump app or a wall-touch mark.',
  steps: ['Stand tall, hands on hips (or free for a max test — pick one and stay consistent).','Dip fast to a self-selected depth, then jump maximally.','Land softly.','Best of three, full recovery.'],
  cues: ['Fast dip, faster reversal.','Same protocol every time or the numbers mean nothing.'],
  faults: ['Changing arm rules between tests.','Testing fatigued and comparing to a fresh number.'],
  dose: 'Test: 3 reps. Readiness check: 2 reps.',
  prog: '—', regr: '—'
},

/* ============ SPEED ============ */
'wall-drill': {
  n: 'Wall Drill — March / Switch', cat: 'speed', tags: ['speed','technique','accel'],
  why: 'Teaches the acceleration body angle and the front-side mechanics that most field-sport athletes never learn. The wall removes balance from the equation so you can feel the position.',
  setup: 'Hands on a wall, body at ~45°, straight line from head to the support ankle.',
  steps: ['One knee up, thigh parallel, ankle dorsiflexed, heel under the hip.','March: slowly alternate, holding each position for 2 s. 6 per side.','Switch: quick single exchanges, 3 per side.','Continuous: rapid alternations, 6–10 total, staying rigid at the trunk.'],
  cues: ['Straight line from ear to ankle — no hip pike.','Toes up, heel under the butt, knee up.','Strike down and back, not out in front.'],
  faults: ['Hips sagging or piking.','Reaching the foot out in front.','Heels dropping to the floor on the support side.'],
  dose: 'Marches 2 × 6/side, switches 2 × 3/side, continuous 2 × 8.',
  prog: 'March → switch → continuous → into a 10 m sprint.',
  regr: 'Marches only, slower.'
},
'a-skip': {
  n: 'A-Skip', cat: 'speed', tags: ['speed','technique','warmup'],
  why: 'Rhythm, front-side mechanics, and ankle stiffness in one drill. The universal sprint warm-up for a reason.',
  setup: '20–30 m of open space.',
  steps: ['Skip with a knee drive to hip height, ankle dorsiflexed.','Strike down and back under the hip, not out in front.','Stay tall, arms driving from the shoulder.','Fast ground contacts — the skip is quick, not floaty.'],
  cues: ['Toes up, knee up, foot down and back.','Tall posture, no leaning back.','Punch the ground.'],
  faults: ['Leaning back.','Reaching the foot forward.','Floating instead of striking.'],
  dose: '2 × 20 m.',
  prog: 'A-skip → B-skip (add a leg extension and pawback).',
  regr: 'A-march.'
},
'accel-sprint': {
  n: 'Acceleration Sprint (10–30 m)', cat: 'speed', tags: ['speed','accel','high-intensity'],
  why: 'Acceleration is the primary speed quality in ultimate: 47 decelerations and 46 accelerations a game, and most cuts are won in the first three steps. Acceleration-based sessions use 10–30 m sprints for a total volume of 100–160 m — small volumes, maximum quality.',
  setup: 'Turf or track, thoroughly warm. Cones at 10, 20, 30 m.',
  steps: ['Start from a 2-point or 3-point stance, or a push-up start for variety.','First 3 steps: aggressive shin angles, push the ground back, do not pop up.','Rise gradually over 15–20 m — no sudden standing up.','Full recovery: 2–3 min between reps. This is not conditioning.'],
  cues: ['Push, do not reach.','Patience — stay low longer than feels natural.','Arms drive from the shoulder, hand from hip to eye.'],
  faults: ['Standing up in the first three steps.','Short rest, turning a speed session into conditioning.','Doing it on tired legs.'],
  dose: '5–8 × 20 m, or 4–6 × 30 m. Total 100–160 m of actual sprinting.',
  prog: 'Add resisted starts (sled at 10–20% BW) or a 30 m build.',
  regr: 'Submaximal 90% builds, shorter distance.'
},
'flying-30': {
  n: 'Flying Sprint (20–40 m build + 20 m fly)', cat: 'speed', tags: ['speed','maxv','high-intensity'],
  why: 'Max velocity work is the highest-value and highest-risk thing you do. Regular exposure to very high speed reduces injury risk when the base is there — and eccentric hamstring strength actually drops when athletes exceed roughly 7–8 weekly efforts above 90% of max velocity. So: 1–2 exposures a week, 3–4 quality reps, and never on tired legs.',
  setup: 'Track or long flat turf, at least 80 m. Cones marking a 30 m build-up and a 20 m fly zone.',
  steps: ['Build gradually over 30 m to about 95%.','Hold maximum through the fly zone — relaxed face, relaxed hands.','Decelerate gradually over the next 20–30 m; never slam the brakes.','Rest 4–5 minutes. Yes, really.'],
  cues: ['Relax the face and jaw at top speed — tension slows you down.','Tall, cyclical, strike under the hip.','Do not "try harder" in the fly zone. Try smoother.'],
  faults: ['Too little rest — the third rep at 95% teaches you to be slow.','Sprinting on legs that are sore or a hamstring that feels grabby.','Hard deceleration at the end.'],
  dose: '3–4 reps, 4–5 min rest. Total max-velocity volume 60–100 m.',
  prog: 'Longer fly zone (30 m) once the 20 m is clean.',
  regr: 'Build to 90% instead, or run on grass.',
  flag: 'ABSOLUTE RULE with a hamstring history: if it feels grabby, tight, or "not right" in the warm-up, the max-velocity work is cancelled that day. Not reduced — cancelled. Do tempo instead.'
},
'curve-sprint': {
  n: 'Curved Sprint', cat: 'speed', tags: ['speed','ultimate','cod'],
  why: 'Almost nothing in ultimate happens in a straight line. Curved sprinting has different mechanics and different hip demands, and running curves in training is how you avoid meeting them for the first time in a game. The inside leg\'s adductor and the outside leg\'s glute-med take the brunt — both are your weak links.',
  setup: 'Mark a large arc (roughly 8–10 m radius) on turf.',
  steps: ['Build into the curve at 90–95%.','Lean into the turn from the ankles, not by bending at the waist.','Inside arm shortens, outside arm drives across.','Run both directions equally.'],
  cues: ['Lean from the ground up, whole body.','Inside foot lands more under the body, outside foot drives wider.'],
  faults: ['Bending at the waist.','Only ever running one direction.'],
  dose: '4–6 × 30 m, alternating directions.',
  prog: 'Tighter radius, higher speed.',
  regr: 'Larger radius, submaximal.'
},
'cut-decel': {
  n: 'Deceleration & Cut Mechanics', cat: 'speed', tags: ['cod','decel','ultimate','adductor'],
  why: 'You decelerate 47 times a game. Deceleration is where hamstrings and groins tear, and it is a trainable skill with a technical model: get low early, take short braking steps, keep the centre of mass behind the plant foot. Most athletes train acceleration and never train the brake.',
  setup: 'Cones at 0, 10, 15 m on turf.',
  steps: [
    'Accelerate 10 m at ~80%.',
    'Decelerate to a complete stop within 5 m: lower the hips, chop the steps shorter, torso stays upright, plant foot lands in front of the centre of mass.',
    'Hold the stopped position for one second — no stumbling.',
    'Progress: stop, then cut at 45°, then 90°, then a full 180° plant and re-accelerate.'
  ],
  cues: ['Sit down into the stop — hips drop, chest stays up.','Short choppy steps, wide base.','Plant foot outside the hip on a cut, never under it.'],
  faults: ['Stopping with a stiff, upright single step (the knee-injury pattern).','Knee caving on the plant.','Cutting off a straight, locked leg.'],
  dose: '6–8 reps, building the intensity across the session.',
  prog: '80% → 90% → full speed → reactive (react to a partner\'s call or a thrown disc).',
  regr: 'Slower approach, longer stopping distance.'
},
'tempo-runs': {
  n: 'Extensive Tempo Runs', cat: 'cond', tags: ['conditioning','recovery','aerobic'],
  why: 'The backbone of the high-low system: submaximal running at 65–75% that builds the aerobic base and capillary density that ultimate demands, without the CNS cost of a speed session. It is how you fill the "low" days without compromising the "high" ones — and it accelerates recovery rather than adding fatigue.',
  setup: 'Grass field, ideally barefoot or in flats. Mark 100 m.',
  steps: [
    'Run 100 m in roughly 70% of your best time — for most, 15–19 s. It should feel relaxed and mechanically clean.',
    'Walk back the 100 m as recovery (roughly 45–60 s).',
    'That is one rep. Do them in sets of 4–6 with an extra minute between sets.',
    'Total volume 1,000–2,000 m. If your form degrades, the session is over.'
  ],
  cues: ['Relaxed, tall, rhythmic — this is technique practice at a survivable speed.','If you are breathing hard enough that you cannot talk, you are running too fast.'],
  faults: ['Running too fast — the most common error, and it turns a low day into a high day.','Cutting the walk-back short.'],
  dose: 'Phase 1: 1,200–1,600 m. Later phases: 800–1,200 m. Twice weekly on low days.',
  prog: 'More volume, not more speed.',
  regr: 'Less volume, longer recovery.',
  timer: { w: 17, r: 50, rounds: 12, label: 'Tempo 100 — walk back' }
},
'rsa-protocol': {
  n: 'Repeat Sprint Ability (Game Model)', cat: 'cond', tags: ['conditioning','ultimate','specific'],
  why: 'Built directly from the UFA GPS data: roughly 16 max sprints per game with incomplete recovery, and a documented 10% drop in high-intensity running in the second half. This session trains the exact thing that falls apart — your ability to repeat a max effort after an incomplete rest.',
  setup: 'Turf, cones at 0 and 40 m.',
  steps: [
    'Sprint 40 m at maximum.',
    'Walk/jog back within 25 seconds — the point is that the recovery is incomplete.',
    'Repeat for 6 reps. That is one set.',
    'Rest 4 minutes between sets. Do 3 sets.',
    'Track your first and last rep times. A drop of more than 8% means your repeat-sprint ability is the limiter, not your top speed.'
  ],
  cues: ['Max effort on every rep, including the last.','The fatigue is the training stimulus — do not pace it.'],
  faults: ['Pacing to survive the set.','Doing this in a phase where speed development is the priority — it interferes.'],
  dose: '3 sets of 6 × 40 m. Once weekly in Phase 4 and in-season prep.',
  prog: 'Reduce recovery to 20 s, or add a fourth set.',
  regr: '4 reps per set, 30 s recovery.',
  timer: { w: 6, r: 25, rounds: 6, label: 'RSA — sprint then walk back' }
},

/* ============ THROWING / MED BALL ============ */
'medball-rotational': {
  n: 'Rotational Scoop Throw', cat: 'throw', tags: ['power','rotation','ultimate'],
  why: 'Hucking is a rotational power expression starting from the ground. A med ball scoop throw trains the same hip-to-shoulder sequencing at a load your shoulder can tolerate — no overhead position, no labral compression.',
  setup: 'Side-on to a solid wall, 2–3 m away, 3–6 kg med ball.',
  steps: ['Load into the back hip, ball low and outside the back thigh.','Drive the back hip through, then the torso, then the arms — in that order.','Release across the body into the wall.','Catch or let it drop; reset each rep.'],
  cues: ['Hips lead, arms finish.','Push the back foot into the ground to start the throw.','Maximum intent every rep — this is a power drill, not a conditioning drill.'],
  faults: ['Arms-only throwing.','Rotating the whole body as one block with no separation.','Too heavy a ball, which kills speed.'],
  dose: '4 × 5 per side, full intent, 60 s rest.',
  prog: 'Add a step into the throw, then a shuffle.',
  regr: 'Lighter ball, half-kneeling.'
},
'medball-slam-rot': {
  n: 'Rotational Slam', cat: 'throw', tags: ['power','rotation','core'],
  why: 'Trains the deceleration side of rotation: a hard throw down and across builds the anti-rotation strength that protects the low back and the shoulder during a big pull.',
  setup: 'Non-bouncing slam ball, 4–8 kg.',
  steps: ['Raise the ball to the outside of one shoulder — not directly overhead if the labrum is a concern.','Slam it down diagonally outside the opposite foot.','Follow through fully.'],
  cues: ['Diagonal, not vertical.','Exhale hard on the slam.'],
  faults: ['Going fully overhead with a symptomatic shoulder.','Rounding the low back to generate force.'],
  dose: '3 × 6 per side.',
  prog: 'Heavier ball.',
  regr: 'Lighter ball, smaller range.',
  flag: 'Keep the ball outside the shoulder line rather than directly overhead while the labrum is a consideration.'
},
'throw-volume': {
  n: 'Structured Throwing Session', cat: 'throw', tags: ['ultimate','skill','shoulder'],
  why: 'Throwing volume is training load, and it is the load most ultimate players never track. With a labral history, unmanaged throwing volume — especially hammers, blades and long backhands — is the most likely thing to flare the shoulder. Structure it and it becomes an asset instead of a variable.',
  setup: 'Partner or a wall, full warm-up done.',
  steps: [
    'Warm-up: cuff isometrics, band pull-aparts, then 20 short flicks and backhands at 50%.',
    'Build: 15 medium at 70%, both sides, alternating.',
    'Quality block: 20–30 hucks at 85–100%. Count them. This is the number that matters.',
    'Overhead throws (hammers/blades): cap at 10 and only if the shoulder is completely quiet that week.',
    'Cool down: 10 easy flicks, then cross-body stretch and cuff isometrics.'
  ],
  cues: ['Legs and hips generate the throw. If your shoulder is doing the work, your mechanics failed first.','Count the hard ones — hard throws are the load, easy ones are not.'],
  faults: ['Going straight to full-power hucks without a build.','Unlimited hammers.','Throwing hard the day after a heavy pulling session.'],
  dose: 'Hucks: cap at 30 per session, 90 per week early in a build. Track it.',
  prog: 'Add 10% weekly to the hard-throw count, no more.',
  regr: 'Reduce hard throws, keep the short game.',
  flag: 'Overhead throws are the highest-risk pattern for a superior labral lesion. Treat them like a heavy lift, not like a warm-up.'
},

/* ============ MOBILITY ============ */
'ninety-ninety': {
  n: '90/90 Hip Switch', cat: 'mobility', tags: ['hip','daily','rotation'],
  why: 'Hip internal rotation is the range most field athletes lose first and the one that matters most for a clean plant. Losing IR pushes the load into the adductor and the low back — your two known weak points.',
  setup: 'Seated on the floor, front leg at 90°, back leg at 90°.',
  steps: ['Sit tall on both sit bones.','Lift both knees and rotate them to the other side under control — do not use your hands.','Pause in the middle, torso tall.','Progress: lean forward over the front shin (external rotation stretch), then lift the back knee off the floor (internal rotation strength).'],
  cues: ['Torso stays tall throughout.','Slow rotation, no momentum.','Lifting the back knee is the hard, valuable part.'],
  faults: ['Hands doing the work.','Collapsing the spine to reach further.'],
  dose: '10 switches, then 5 lifts per side.',
  prog: 'Add the knee lifts and hold them for 5 s.',
  regr: 'Hands on the floor for support.'
},
'couch-stretch': {
  n: 'Active Couch Stretch', cat: 'mobility', tags: ['hip','anterior','daily'],
  why: 'Hip flexor length directly limits hip extension, and hip extension is where sprint force comes from. The ATG version prescribes 1–2 sets of 60 seconds per side twice weekly, done actively — squeezing the glute rather than passively hanging in it.',
  setup: 'Half-kneeling with the back foot up a wall or on a couch, front foot flat.',
  steps: ['Rear knee against the wall base, shin flat up the wall.','Tuck the pelvis under — posterior tilt — before you go anywhere.','Squeeze the rear glute hard. This is the "active" part and it is what makes it work.','Rise the torso as tall as the pelvic tuck allows. Hold 60 s, breathing.'],
  cues: ['Tuck first, then rise. Never arch the low back to get "deeper".','Glute on the stretched side stays squeezed the whole time.'],
  faults: ['Arching the low back — this fakes range and irritates the spine.','Passive hanging with a relaxed glute.','Knee pain — put a pad under the knee.'],
  dose: '2 × 60 s per side.',
  prog: 'Torso more upright, or add a light overhead reach.',
  regr: 'Rear foot on the floor instead of the wall.',
  timer: { w: 60, r: 15, rounds: 4, label: 'Couch stretch — switch sides' }
},
'knee-to-wall': {
  n: 'Knee-to-Wall Ankle Mobilisation', cat: 'mobility', tags: ['ankle','daily','squat'],
  why: 'Ankle dorsiflexion is the most common limiter of a heels-down deep squat and of a low acceleration position. It is also a number you can track: distance from wall to big toe when the knee touches without the heel lifting. Target 10–12 cm and symmetry.',
  setup: 'Facing a wall, foot pointed straight at it.',
  steps: ['Big toe a hand-width from the wall.','Drive the knee forward over the second toe to touch the wall, heel glued down.','If it touches, move back a centimetre and repeat. Find your limit, then work there.','10 slow reps, then 3 × 20 s holds at end range. Add a band around the ankle pulling backward for a joint mobilisation.'],
  cues: ['Heel must stay down; that is the whole test.','Knee tracks over the second toe, not inward.'],
  faults: ['Heel lifting.','Knee caving in to fake range.','Foot turning out.'],
  dose: '10 reps + 3 × 20 s per side. Daily if under 10 cm.',
  prog: 'Add a band mobilisation, or load it in a deep squat.',
  regr: 'Reduce range.',
  timer: { w: 20, r: 10, rounds: 6, label: 'Ankle hold — switch sides' }
},
'jefferson-curl': {
  n: 'Jefferson Curl', cat: 'mobility', tags: ['posterior','spine','hamstring'],
  why: 'Loaded spinal flexion, done light and slow, builds tolerance and range through the whole posterior chain — hamstrings, erectors and the thoracolumbar fascia. It is the controlled version of the thing that scares people about bending over, and it is very good for a chronically "tight" posterior chain.',
  setup: 'Stand on a box, very light weight (start with 5–10 lb, seriously).',
  steps: ['Tuck the chin, then roll down one vertebra at a time — head, neck, upper back, mid, low.','Legs stay straight but not locked.','Reach the bottom, pause 2 s.','Roll back up in reverse order, low back last.','Six seconds down, six seconds up.'],
  cues: ['Segmental — you are trying to articulate, not just fold.','Absurdly light weight. This is a mobility drill, not a lift.','Breathe out on the way down.'],
  faults: ['Too much weight — the single biggest error.','Hinging as one block instead of rolling.','Rushing.'],
  dose: '3 × 5 reps, very light.',
  prog: 'Add 5 lb every 2–3 weeks, never faster.',
  regr: 'No weight, floor-level instead of a box.',
  flag: 'Skip entirely if you have any current low back or disc symptoms.'
},
'thoracic-opener': {
  n: 'Thoracic Extension & Rotation', cat: 'mobility', tags: ['spine','shoulder','daily'],
  why: 'A stiff thoracic spine forces the shoulder to find range it does not have — which is exactly how a labrum gets irritated. Give the mid-back back its extension and rotation and the shoulder stops compensating.',
  setup: 'Foam roller across the mid-back, or on all fours for rotation.',
  steps: ['Roller: hands behind head, extend over the roller at one segment for 5 breaths, then move up 2 cm. Cover 4 positions.','Rotation: on all fours, one hand behind the head, rotate the elbow up toward the ceiling, follow it with the eyes. 8 per side.','Exhale into the extension.'],
  cues: ['Extend at the mid-back, not the low back — ribs stay down.','Follow the elbow with your eyes.'],
  faults: ['Hyperextending the lumbar spine.','Rushing through positions.'],
  dose: '4 positions × 5 breaths + 8 rotations per side. Daily.',
  prog: 'Add a light weight overhead in the extension.',
  regr: 'Towel roll instead of a foam roller.'
},
'hanging-decompression': {
  n: 'Passive Hang', cat: 'mobility', tags: ['shoulder','spine','grip'],
  why: 'Builds shoulder range and grip, and decompresses the spine. With a labral history, the rule is to keep a little scapular engagement rather than hanging fully dead — a completely passive hang puts the labrum and capsule at the end of their range with your whole bodyweight on them.',
  setup: 'Pull-up bar, feet able to touch down.',
  steps: ['Grip the bar, feet lightly on the floor at first.','Let the body lengthen but keep a slight downward pull through the shoulder blades.','Breathe. 20–30 s.','Progress to a full hang only if it is completely symptom-free.'],
  cues: ['Active-ish: shoulders not fully dumped.','Breathe into the ribs.'],
  faults: ['Fully passive hanging with a cranky shoulder.','Bouncing or swinging.'],
  dose: '3 × 20–30 s, daily.',
  prog: 'Full hang, then single-arm assisted.',
  regr: 'Feet supported, partial bodyweight.',
  flag: 'Any pinching or clicking at the front of the shoulder means stop and keep the feet down.',
  timer: { w: 30, r: 45, rounds: 3, label: 'Hang' }
},
'pancake-sit': {
  n: 'Active Pancake Sit', cat: 'mobility', tags: ['adductor','hip','iso'],
  why: 'End-range adductor work in the seated straddle. Active — pressing the legs down and lifting out of the hips — rather than passive, because the adductor you need is a strong one at length, not a floppy one.',
  setup: 'Seated on the floor, legs wide, sitting on a cushion if the pelvis rolls back.',
  steps: ['Sit tall on the sit bones. If you cannot, elevate the hips.','Press the backs of the knees into the floor and hold 10 s.','Walk the hands forward with a long spine, stop when the low back starts to round.','Hold 30–45 s, breathing. Then press the hands into the floor and try to lift the hips slightly — active, not passive.'],
  cues: ['Long spine — depth is not the goal, position is.','Toes pointing up, not rolled in.'],
  faults: ['Rounding the back to reach further.','Passive hanging in the stretch.'],
  dose: '3 × 30–45 s.',
  prog: 'Wider, or lower without elevation.',
  regr: 'Sit on a cushion or against a wall.',
  timer: { w: 45, r: 20, rounds: 3, label: 'Pancake hold' }
},

/* ============ BREATH & RECOVERY ============ */
'box-breathing': {
  n: 'Box Breathing Down-Regulation', cat: 'breath', tags: ['recovery','cns','daily'],
  why: 'Post-session parasympathetic switch. Two minutes of extended-exhale nasal breathing measurably shifts heart rate variability and shortens the time you spend in a sympathetic state after a hard session — which is the actual bottleneck on how often you can train hard.',
  setup: 'Lying down, knees bent, one hand on the belly.',
  steps: ['Inhale through the nose for 4 s.','Hold for 4 s.','Exhale through the nose for 6–8 s — the long exhale is the active ingredient.','Hold empty for 2 s. Repeat.'],
  cues: ['Belly and lower ribs expand, not the chest and shoulders.','Exhale longer than the inhale, always.'],
  faults: ['Chest breathing.','Straining on the holds.'],
  dose: '3–5 minutes after every hard session and before sleep.',
  prog: 'Extend the exhale to 10 s.',
  regr: '4-4-4 with no empty hold.',
  timer: { w: 300, r: 0, rounds: 1, label: 'Box breathing' }
},
'co2-tolerance': {
  n: 'CO₂ Tolerance Test', cat: 'breath', tags: ['recovery','test'],
  why: 'A free, repeatable proxy for autonomic recovery state. A control-pause that drops sharply from your baseline usually shows up a day or two before you feel run down.',
  setup: 'Seated, calm, at least 10 minutes after any activity.',
  steps: ['Breathe normally for a minute.','Take a normal (not maximal) inhale, then exhale fully.','Start a timer and hold until the first strong urge to breathe — not to maximum.','Record the seconds. Track it as a trend, not a single number.'],
  cues: ['Normal breath in, not a big one.','Stop at the first real urge — this is not a breath-hold contest.'],
  faults: ['Maximal inhale (inflates the score).','Pushing to the limit (makes it unrepeatable).'],
  dose: 'Once a week, same time of day.',
  prog: '—', regr: '—'
},
'contrast-shower': {
  n: 'Contrast Shower Protocol', cat: 'breath', tags: ['recovery'],
  why: 'Useful for between-game and between-session recovery, when feeling fresh tomorrow matters more than adapting maximally. The important caveat: cold immersion immediately after strength training blunts hypertrophy and strength adaptations, so keep it away from your lifting.',
  setup: 'Shower with hot and cold.',
  steps: ['1 min hot (comfortably hot), then 30 s cold (as cold as it goes).','Repeat 4–5 cycles.','Finish on cold on a game/tournament day; finish on hot the evening before a training day.'],
  cues: ['Breathe slowly through the cold — do not gasp.'],
  faults: ['Using it within 4–6 h of a strength session you want adaptation from.'],
  dose: '6–8 min, on tournament days and after games.',
  prog: 'Longer cold phases.',
  regr: 'Cool rather than cold.',
  flag: 'Avoid within 4–6 h of strength training in a building phase — it works against the adaptation you just paid for.',
  timer: { w: 60, r: 30, rounds: 5, label: 'Hot → cold' }
},
'nsdr': {
  n: 'NSDR / Nap Protocol', cat: 'breath', tags: ['recovery','cns'],
  why: 'Sleep is the highest-leverage recovery variable and nothing else is close. A 20-minute nap or a non-sleep deep rest session restores reaction time and CNS readiness measurably, and it is the difference between two hard sessions a week and three.',
  setup: 'Dark, cool room, alarm set for 25 minutes.',
  steps: ['Lie down, alarm at 20–25 min (longer means sleep inertia).','Long exhales for the first 2 minutes.','Do not chase sleep — rest counts.','Get up immediately when the alarm goes.'],
  cues: ['Before 3 pm, or it costs you at night.'],
  faults: ['90-minute "naps" that wreck the night.'],
  dose: '20–25 min on high-load days.',
  prog: '—', regr: '—',
  timer: { w: 1200, r: 0, rounds: 1, label: 'NSDR' }
}
};

/* -----------------------------------------------------------
   THE DAILY ARMOR — 12 minutes, every single day, no exceptions
   ----------------------------------------------------------- */
const ARMOR = {
  n: 'The Daily Armor',
  sub: '12 minutes · every day · the thing that actually keeps you on the field',
  why: 'Three injury histories, three protocols, one block. Adductor, hamstring and shoulder each need frequency more than they need intensity — the Copenhagen literature is explicit that total accumulated volume drives the result, and the SLAP literature says the same about scapular and cuff work. Doing this daily at 60% beats doing it twice a week at 100%.',
  items: [
    { x: 'ball-roll-foot', d: '60 s per foot', note: 'Toe-touch test before and after. This also primes the whole posterior chain.' },
    { x: 'adductor-squeeze-iso', d: '3 ladders (0°/45°/90°, 10 s each)', note: 'Log the pain score. This is the weak link — it gets fed daily.' },
    { x: 'ham-iso-long', d: '3 × 25 s per side', note: 'Shallow knee bend. Long lengths only.' },
    { x: 'cuff-iso-er', d: '2 × 25 s ER + IR', note: 'Elbow pinned, submaximal, pain-free.' },
    { x: 'short-foot', d: '3 × 10 s per foot', note: 'Do it while brushing your teeth.' },
    { x: 'deep-squat-hold', d: '5 min accumulated across the day', note: 'Not in the 12 minutes — this is a lifestyle target.' }
  ]
};

/* -----------------------------------------------------------
   SESSION TEMPLATES
   type: HIGH (CNS-expensive) | MED | LOW  — never two HIGH in a row
   ----------------------------------------------------------- */
const SESSIONS = {

'restore': {
  n: 'Restore', type: 'LOW', dur: 45,
  purpose: 'A low day is not a wasted day — it is what makes the next high day possible. Blood flow, tissue quality, range, parasympathetic tone. Nothing here should raise your heart rate above conversational.',
  blocks: [
    { n: 'TISSUE', why: 'Range without cost', items: [
      { x: 'ball-roll-foot', d: '90 s per foot' },
      { x: 'foam-roll-post', d: '6 min circuit' },
      { x: 'thoracic-opener', d: '4 positions × 5 breaths + 8 rotations/side' }
    ]},
    { n: 'RANGE', why: 'End-range exposure at low load', items: [
      { x: 'ninety-ninety', d: '10 switches + 5 knee lifts/side' },
      { x: 'couch-stretch', d: '2 × 60 s per side', note: 'Tuck the pelvis first, squeeze the glute the whole time.' },
      { x: 'adductor-rockback', d: '10 rocks + 30 s hold' },
      { x: 'pancake-sit', d: '3 × 40 s, active' },
      { x: 'jefferson-curl', d: '3 × 5, very light', note: 'Absurdly light. This is articulation practice, not a lift.' },
      { x: 'deep-squat-hold', d: '3 × 100 s', note: 'The good stuff. Breathe in the bottom.' }
    ]},
    { n: 'FLOW', why: 'Movement, not exercise', items: [
      { x: 'hanging-decompression', d: '3 × 25 s' },
      { x: 'box-breathing', d: '4 min', note: 'Long exhales. This is the actual session finisher.' }
    ]}
  ]
},

'tempo-tissue': {
  n: 'Tempo + Tissue', type: 'LOW', dur: 65,
  purpose: 'The workhorse low day. Extensive tempo builds the aerobic base ultimate demands — 82% of max HR for the whole game — while actively speeding recovery from the high days on either side. Run it too fast and you have turned a low day into a mediocre high day and ruined both.',
  blocks: [
    { n: 'PRIME', why: 'Wake up the feet before you run on them', items: [
      { x: 'ball-roll-foot', d: '60 s per foot' },
      { x: 'toe-yoga', d: '10 alternations per foot' },
      { x: 'a-skip', d: '2 × 20 m' },
      { x: 'barefoot-pogo-grass', d: '2 × 20 contacts', note: 'Barefoot on grass if you can.' }
    ]},
    { n: 'TEMPO', why: 'Aerobic base + capillarisation, zero CNS cost', items: [
      { x: 'tempo-runs', d: '3 sets × 4 × 100 m @ 70%, walk-back recovery', note: 'Target 15–19 s per 100. If you cannot talk, slow down.' }
    ]},
    { n: 'ARMOR+', why: 'The rehab tracks fit best on low days', items: [
      { x: 'askling-extender', d: '2 × 12 per side' },
      { x: 'askling-diver', d: '3 × 6 per side' },
      { x: 'askling-glider', d: '3 × 4 per side' },
      { x: 'copenhagen-hold', d: '3 × 20 s per side' },
      { x: 'tib-raise', d: '3 × 25' }
    ]},
    { n: 'TISSUE', why: 'Finish parasympathetic', items: [
      { x: 'deep-squat-hold', d: '2 × 2 min' },
      { x: 'box-breathing', d: '3 min' }
    ]}
  ]
},

'found-lift': {
  n: 'Foundation Lift', type: 'MED', dur: 70,
  purpose: 'Movement quality and connective tissue before load. In a restoration block you are re-earning positions, not chasing numbers. Everything is slow, everything is full range, nothing is near failure.',
  blocks: [
    { n: 'PRIME', why: '', items: [
      { x: 'ball-roll-foot', d: '60 s per foot' },
      { x: 'knee-to-wall', d: '10 reps + 3 × 20 s per side' },
      { x: 'ninety-ninety', d: '10 switches' }
    ]},
    { n: 'MAIN', why: 'Positions under light load, long ranges', items: [
      { x: 'atg-split-squat', d: '3 × 6 per side, bodyweight or light' },
      { x: 'single-leg-rdl', d: '3 × 8 per side, light' },
      { x: 'iso-split-squat-yield', d: '3 × 45 s per side', note: 'Bodyweight or light DBs. Learn the hold before you load it.' },
      { x: 'wall-sit-iso', d: '3 × 60 s', note: 'Pure accumulation. Thighs actually parallel.' },
      { x: 'slider-leg-curl', d: '3 × 8 with a 4-second slide out' }
    ]},
    { n: 'ARMOR', why: 'Rebuild the weak links first', items: [
      { x: 'copenhagen-hold', d: '3 × 15 s per side' },
      { x: 'prone-ytw', d: '2 × 8 each position, 2–5 lb' },
      { x: 'band-pull-apart', d: '3 × 15' },
      { x: 'rkc-plank', d: '3 × 20 s' }
    ]},
    { n: 'FINISH', why: '', items: [
      { x: 'deep-squat-hold', d: '3 × 100 s' },
      { x: 'box-breathing', d: '3 min' }
    ]}
  ]
},

'accel-plyo': {
  n: 'Acceleration + Low Plyos', type: 'HIGH', dur: 80,
  purpose: 'The first speed day of a build. Acceleration mechanics at submaximal-to-high intensity, plus the low-intensity plyometrics that build ankle stiffness. Total sprint volume stays small and quality stays absolute.',
  blocks: [
    { n: 'PRIME', why: 'Feet, then fascia, then mechanics', items: [
      { x: 'ball-roll-foot', d: '60 s per foot' },
      { x: 'elastic-rebound-flow', d: '4 min' },
      { x: 'a-skip', d: '2 × 20 m' },
      { x: 'wall-drill', d: 'March 2 × 6/side, switch 2 × 3/side' }
    ]},
    { n: 'ELASTIC', why: 'Stiffness before speed — pogos prime the ankles for the sprint', items: [
      { x: 'pogo-jumps', d: '3 × 25 contacts' },
      { x: 'big-toe-iso', d: '4 × 10 s per foot', note: 'The hallux is the last thing to leave the ground on every step.' },
      { x: 'iso-hip-flexor', d: '3 × 18 s per side' },
      { x: 'broad-jump', d: '4 singles, stick every landing' }
    ]},
    { n: 'SPEED', why: 'Quality over quantity — 120 m of real sprinting', items: [
      { x: 'accel-sprint', d: '6 × 20 m from a 2-point stance, 2–3 min rest', note: 'Stay low longer than feels natural. Full rest.' }
    ]},
    { n: 'STRENGTH', why: 'Heavy work goes on the same day as speed, not the day after', items: [
      { x: 'trap-bar-deadlift', d: '4 × 5 @ ~80%' },
      { x: 'hip-thrust', d: '3 × 8' },
      { x: 'calf-iso-soleus', d: '3 × 40 s' }
    ]},
    { n: 'ARMOR', why: '', items: [
      { x: 'ham-iso-long', d: '3 × 25 s per side' },
      { x: 'copenhagen-hold', d: '3 × 20 s per side' }
    ]}
  ]
},

'strength-a': {
  n: 'Strength A — Bilateral + Isometric', type: 'HIGH', dur: 75,
  purpose: 'Max force production plus long-duration yielding isometrics. In a foundation phase the isometrics do the tendon work while the bilateral lifts do the muscle work. At 150 lb on a 6\'1" frame, absolute strength and lean mass are both genuine performance levers for you.',
  blocks: [
    { n: 'PRIME', why: '', items: [
      { x: 'ball-roll-foot', d: '60 s per foot' },
      { x: 'knee-to-wall', d: '10 reps per side' },
      { x: 'barefoot-pogo-grass', d: '2 × 20' },
      { x: 'ninety-ninety', d: '10 switches' }
    ]},
    { n: 'MAIN', why: 'Force first, while fresh', items: [
      { x: 'trap-bar-deadlift', d: '4 × 4–5 @ 80–85%', note: 'Push the floor away. Stop the set if bar speed visibly drops.' },
      { x: 'front-squat', d: '3 × 5', note: 'Safety-squat bar or goblet if the front rack bothers the shoulder.' }
    ]},
    { n: 'ISOMETRIC', why: 'Yielding isos build tendon capacity — 20–120 s is the window', items: [
      { x: 'iso-split-squat-yield', d: '3 × 60 s per side, loaded' },
      { x: 'calf-iso-soleus', d: '4 × 40 s, heavy' },
      { x: 'back-extension-iso', d: '3 × 40 s' }
    ]},
    { n: 'ARMOR', why: '', items: [
      { x: 'nordic-curl', d: '2 × 5', note: 'Hips locked. Low volume, high quality.' },
      { x: 'copenhagen-adduction', d: 'Per your current Copenhagen week' },
      { x: 'weighted-pullup', d: '4 × 5' }
    ]},
    { n: 'FINISH', why: '', items: [
      { x: 'deep-squat-hold', d: '2 × 2 min' },
      { x: 'box-breathing', d: '3 min' }
    ]}
  ]
},

'strength-b': {
  n: 'Strength B — Unilateral + Groin', type: 'HIGH', dur: 75,
  purpose: 'Single-leg strength is where asymmetries live, and asymmetries are what tear. This is also the day the adductor gets its heaviest dose of the week, because it is your weakest link and the one with the clearest evidence behind the fix.',
  blocks: [
    { n: 'PRIME', why: '', items: [
      { x: 'ball-roll-foot', d: '60 s per foot' },
      { x: 'adductor-rockback', d: '10 rocks + 30 s hold' },
      { x: 'hip-airplane', d: '2 × 5 per side' }
    ]},
    { n: 'MAIN', why: 'One leg at a time, honestly', items: [
      { x: 'rfess', d: '4 × 6 per side' },
      { x: 'single-leg-rdl', d: '3 × 8 per side' },
      { x: 'reverse-lunge-slider', d: '3 × 8 per side' }
    ]},
    { n: 'GROIN', why: 'The main event — progressive Copenhagen loading', items: [
      { x: 'copenhagen-adduction', d: 'Per your current Copenhagen week', note: 'Three seconds down. Never rush the eccentric.' },
      { x: 'cossack-squat', d: '3 × 5 per side' },
      { x: 'skater-bound', d: '3 × 5 per side, stick each landing' }
    ]},
    { n: 'ARMOR', why: '', items: [
      { x: 'razor-curl', d: '3 × 6' },
      { x: 'calf-raise-loaded', d: '3 × 10 straight-knee + 3 × 14 bent-knee' },
      { x: 'suitcase-carry', d: '3 × 30 m per side' },
      { x: 'pallof-press', d: '3 × 5 with 5 s holds per side' }
    ]}
  ]
},

'upper-throw': {
  n: 'Upper + Throw', type: 'MED', dur: 65,
  purpose: 'Pull-dominant upper body, labrum-safe pressing, rotational power, and structured throwing volume. Overhead barbell pressing is off the menu; the landmine arc gives you the strength without the labral compression.',
  blocks: [
    { n: 'SHOULDER PREP', why: 'Never throw or press cold with a labral history', items: [
      { x: 'cuff-iso-er', d: '3 × 25 s ER + IR' },
      { x: 'band-pull-apart', d: '2 × 15 + 15 face pulls' },
      { x: 'thoracic-opener', d: '4 positions × 5 breaths + 8 rotations/side' },
      { x: 'sleeper-stretch', d: '3 × 30 s', note: 'Only if your IR difference is over 15°. Measure first.' }
    ]},
    { n: 'PULL', why: '3:1 pull to push for a throwing shoulder', items: [
      { x: 'weighted-pullup', d: '4 × 4–6' },
      { x: 'prone-ytw', d: '2 × 8 each' },
      { x: 'bottoms-up-carry', d: '3 × 25 m per side' }
    ]},
    { n: 'PUSH', why: 'Scapular-plane pressing only', items: [
      { x: 'landmine-press', d: '3 × 7 per side' }
    ]},
    { n: 'ROTATE + THROW', why: 'Hip-led rotation, then the disc', items: [
      { x: 'medball-rotational', d: '4 × 5 per side, max intent' },
      { x: 'medball-slam-rot', d: '3 × 6 per side' },
      { x: 'throw-volume', d: 'Full session — count hard throws, cap at 30' }
    ]},
    { n: 'FINISH', why: '', items: [
      { x: 'cuff-iso-er', d: '2 × 25 s each way', note: 'Bookend the session with cuff work.' }
    ]}
  ]
},

'accel-strength-max': {
  n: 'Acceleration + Max Strength', type: 'HIGH', dur: 85,
  purpose: 'Phase 2\'s big day. Sprint acceleration first while the nervous system is clean, then the heaviest lifting of the week. Speed always precedes strength on a combined day — never the reverse.',
  blocks: [
    { n: 'PRIME', why: '', items: [
      { x: 'ball-roll-foot', d: '60 s per foot' },
      { x: 'elastic-rebound-flow', d: '4 min' },
      { x: 'a-skip', d: '2 × 20 m' },
      { x: 'wall-drill', d: 'Full sequence' },
      { x: 'pogo-jumps', d: '2 × 20 contacts' }
    ]},
    { n: 'SPEED', why: '140 m of true acceleration work', items: [
      { x: 'accel-sprint', d: '4 × 20 m + 3 × 30 m, 3 min rest', note: 'Every rep is a max rep. If a rep is slow, the session ends.' },
      { x: 'cut-decel', d: '6 reps at 80–90%' }
    ]},
    { n: 'MAX STRENGTH', why: 'Heavy, low reps, long rests', items: [
      { x: 'trap-bar-deadlift', d: '5 × 3 @ 85–90%, 3 min rest' },
      { x: 'rfess', d: '3 × 5 per side, heavy' },
      { x: 'hip-thrust', d: '4 × 5' }
    ]},
    { n: 'ARMOR', why: '', items: [
      { x: 'nordic-curl', d: '3 × 6' },
      { x: 'ham-iso-long', d: '3 × 25 s per side' },
      { x: 'copenhagen-adduction', d: 'Per your current Copenhagen week' }
    ]}
  ]
},

'maxv-strength-iso': {
  n: 'Max Velocity + Overcoming Isos', type: 'HIGH', dur: 80,
  purpose: 'Top-end speed plus the highest-RFD strength method there is. Overcoming isometrics produce enormous force with no eccentric damage, which is exactly what you want late in a training week.',
  blocks: [
    { n: 'PRIME', why: 'Max velocity demands a genuinely long warm-up', items: [
      { x: 'ball-roll-foot', d: '90 s per foot' },
      { x: 'elastic-rebound-flow', d: '5 min' },
      { x: 'a-skip', d: '3 × 20 m' },
      { x: 'ham-iso-long', d: '2 × 20 s per side', note: 'Pre-activate before you sprint on it. Non-negotiable.' },
      { x: 'accel-sprint', d: '2 × 20 m build-ups at 85%' }
    ]},
    { n: 'MAX VELOCITY', why: '1–2 exposures a week, 60–100 m total, full recovery', items: [
      { x: 'flying-30', d: '4 × (30 m build + 20 m fly), 5 min rest', note: 'If the hamstring feels grabby in the warm-up, this block is cancelled. Do tempo instead.' },
      { x: 'curve-sprint', d: '4 × 30 m, alternating directions' }
    ]},
    { n: 'OVERCOMING ISO', why: 'Max RFD with zero eccentric cost', items: [
      { x: 'iso-trap-bar-pull', d: '5 × 5 s max intent, 90 s rest' },
      { x: 'iso-split-squat-overcome', d: '5 × 6 s per side, 90 s rest' }
    ]},
    { n: 'ARMOR', why: '', items: [
      { x: 'copenhagen-adduction', d: 'Per your current Copenhagen week' },
      { x: 'calf-iso-soleus', d: '3 × 40 s' },
      { x: 'box-breathing', d: '4 min' }
    ]}
  ]
},

'maxv-contrast': {
  n: 'Max Velocity + French Contrast', type: 'HIGH', dur: 85,
  purpose: 'The peak of the elastic phase. French contrast pairs a heavy lift, a plyometric, a loaded jump and an assisted/overspeed movement inside one complex — the most potent power-conversion method there is, and the most demanding. Only in Phase 3, only when fresh.',
  blocks: [
    { n: 'PRIME', why: '', items: [
      { x: 'ball-roll-foot', d: '90 s per foot' },
      { x: 'elastic-rebound-flow', d: '5 min' },
      { x: 'a-skip', d: '3 × 20 m' },
      { x: 'ham-iso-long', d: '2 × 20 s per side' },
      { x: 'pogo-jumps', d: '2 × 20 contacts' }
    ]},
    { n: 'MAX VELOCITY', why: 'Speed before everything', items: [
      { x: 'flying-30', d: '4 × (30 m build + 20 m fly), 5 min rest' }
    ]},
    { n: 'FRENCH CONTRAST', why: 'Heavy → plyo → loaded jump → overspeed, 3 rounds, 3 min between', items: [
      { x: 'trap-bar-deadlift', d: 'A1: 3 reps @ 85%' },
      { x: 'hurdle-hops', d: 'A2: 5 hurdles, continuous' },
      { x: 'broad-jump', d: 'A3: 3 max broad jumps' },
      { x: 'bounds', d: 'A4: 20 m downhill or band-assisted bounds', note: 'Complete the whole complex, then rest 3 full minutes. 3 rounds total.' }
    ]},
    { n: 'ARMOR', why: '', items: [
      { x: 'ham-iso-long', d: '3 × 25 s per side' },
      { x: 'copenhagen-adduction', d: 'Per your current Copenhagen week' },
      { x: 'box-breathing', d: '4 min' }
    ]}
  ]
},

'elastic-cod': {
  n: 'Elastic + Change of Direction', type: 'HIGH', dur: 70,
  purpose: 'Where reactive strength meets ultimate. Every drill here is about direction change: the plant, the brake, the re-accelerate. This is also the single most adductor-demanding session of the week, so it never sits next to Copenhagen volume.',
  blocks: [
    { n: 'PRIME', why: '', items: [
      { x: 'ball-roll-foot', d: '60 s per foot' },
      { x: 'elastic-rebound-flow', d: '4 min' },
      { x: 'adductor-rockback', d: '10 rocks' },
      { x: 'skater-bound', d: '2 × 4 per side, stick landings' }
    ]},
    { n: 'ELASTIC', why: 'Reactive strength, short contacts', items: [
      { x: 'pogo-jumps', d: '3 × 25, then 2 × 15 single-leg per side' },
      { x: 'hurdle-hops', d: '4 × 5 hurdles' },
      { x: 'bounds', d: '4 × 30 m' }
    ]},
    { n: 'CHANGE OF DIRECTION', why: 'The actual sport skill', items: [
      { x: 'cut-decel', d: '8 reps: 2 × stop, 2 × 45°, 2 × 90°, 2 × 180°' },
      { x: 'curve-sprint', d: '4 × 30 m, both directions' },
      { x: 'skater-bound', d: '3 × 6 per side, continuous' }
    ]},
    { n: 'ARMOR', why: '', items: [
      { x: 'ham-iso-long', d: '3 × 25 s per side' },
      { x: 'copenhagen-hold', d: '3 × 20 s per side', note: 'Holds today, not full Copenhagens — the cutting already taxed the groin.' }
    ]}
  ]
},

'accel-depth': {
  n: 'Acceleration + Depth Jumps', type: 'HIGH', dur: 75,
  purpose: 'The highest-intensity plyometric day of the whole year. Depth jumps from your individually tested optimal height, and nothing else that competes with them for nervous system.',
  blocks: [
    { n: 'PRIME', why: '', items: [
      { x: 'ball-roll-foot', d: '60 s per foot' },
      { x: 'elastic-rebound-flow', d: '4 min' },
      { x: 'wall-drill', d: 'Full sequence' },
      { x: 'pogo-jumps', d: '3 × 20 contacts' }
    ]},
    { n: 'SPEED', why: '', items: [
      { x: 'accel-sprint', d: '5 × 20 m, 3 min rest' }
    ]},
    { n: 'SHOCK', why: 'Depth jumps — 16–20 total contacts, 90 s rest, full quality', items: [
      { x: 'depth-jump', d: '4 × 4 from your tested optimal height, 90 s rest', note: 'Contact time under 0.25 s. If it feels squishy, lower the box.' },
      { x: 'broad-jump', d: '4 singles' }
    ]},
    { n: 'STRENGTH', why: 'Reduced volume — the plyos were the main course', items: [
      { x: 'trap-bar-deadlift', d: '3 × 3 @ 80%, fast' },
      { x: 'iso-split-squat-overcome', d: '4 × 6 s per side' }
    ]},
    { n: 'ARMOR', why: '', items: [
      { x: 'ham-iso-long', d: '3 × 25 s per side' },
      { x: 'copenhagen-adduction', d: 'Per your current Copenhagen week' }
    ]}
  ]
},

'speed-power': {
  n: 'Speed + Power Lift', type: 'HIGH', dur: 70,
  purpose: 'Pre-season sharpening: everything is fast, nothing is grindy. Loads drop, bar speed and intent rise. You are converting the strength you built into the speed you use.',
  blocks: [
    { n: 'PRIME', why: '', items: [
      { x: 'ball-roll-foot', d: '60 s per foot' },
      { x: 'elastic-rebound-flow', d: '4 min' },
      { x: 'a-skip', d: '2 × 20 m' },
      { x: 'ham-iso-long', d: '2 × 20 s per side' }
    ]},
    { n: 'SPEED', why: '', items: [
      { x: 'accel-sprint', d: '5 × 20 m' },
      { x: 'flying-30', d: '3 × (30 m build + 20 m fly)' }
    ]},
    { n: 'POWER', why: 'Speed-strength: 60–70%, moving fast', items: [
      { x: 'trap-bar-deadlift', d: '6 × 3 @ 60–70%, maximum bar speed' },
      { x: 'hip-thrust', d: '4 × 5, explosive' },
      { x: 'broad-jump', d: '5 singles' }
    ]},
    { n: 'ARMOR', why: '', items: [
      { x: 'ham-iso-long', d: '3 × 25 s per side' },
      { x: 'copenhagen-hold', d: '3 × 20 s per side' }
    ]}
  ]
},

'rsa-cond': {
  n: 'Repeat Sprint Conditioning', type: 'MED', dur: 55,
  purpose: 'Built from the UFA game model: sixteen sprints per game and a documented 10% drop in high-intensity running in the second half. This is the session that fixes the second half.',
  blocks: [
    { n: 'PRIME', why: '', items: [
      { x: 'ball-roll-foot', d: '60 s per foot' },
      { x: 'a-skip', d: '2 × 20 m' },
      { x: 'accel-sprint', d: '3 × 20 m build-ups' }
    ]},
    { n: 'RSA', why: 'Max efforts on incomplete recovery — the second-half problem', items: [
      { x: 'rsa-protocol', d: '3 sets × 6 × 40 m, 25 s between reps, 4 min between sets', note: 'Time rep 1 and rep 6. Over 8% drop-off means this is your limiter.' }
    ]},
    { n: 'TISSUE', why: '', items: [
      { x: 'deep-squat-hold', d: '2 × 2 min' },
      { x: 'ball-roll-foot', d: '60 s per foot' },
      { x: 'box-breathing', d: '4 min' }
    ]}
  ]
},

'cod-throw': {
  n: 'COD + Throwing Volume', type: 'HIGH', dur: 75,
  purpose: 'Game-shaped: cutting patterns at full speed, then a high-volume throwing block. Pre-season is where you find out whether the shoulder can take a real week of throwing.',
  blocks: [
    { n: 'PRIME', why: '', items: [
      { x: 'ball-roll-foot', d: '60 s per foot' },
      { x: 'cuff-iso-er', d: '3 × 25 s each way' },
      { x: 'elastic-rebound-flow', d: '4 min' },
      { x: 'band-pull-apart', d: '2 × 15' }
    ]},
    { n: 'CUTTING', why: 'Ultimate-shaped movement at speed', items: [
      { x: 'cut-decel', d: '8 reps, full speed, reactive' },
      { x: 'curve-sprint', d: '6 × 30 m, both directions' },
      { x: 'skater-bound', d: '3 × 6 per side' }
    ]},
    { n: 'THROW', why: 'Load-managed', items: [
      { x: 'medball-rotational', d: '3 × 5 per side' },
      { x: 'throw-volume', d: 'Full session, hard throws capped at 30' }
    ]},
    { n: 'ARMOR', why: '', items: [
      { x: 'cuff-iso-er', d: '2 × 25 s each way' },
      { x: 'ham-iso-long', d: '3 × 25 s per side' }
    ]}
  ]
},

'maintenance': {
  n: 'Maintenance Lift', type: 'MED', dur: 45,
  purpose: 'Enough load to hold what you built, not enough to cost you anything. In-season and pre-season, minimum effective dose is the entire philosophy.',
  blocks: [
    { n: 'PRIME', why: '', items: [
      { x: 'ball-roll-foot', d: '60 s per foot' },
      { x: 'ninety-ninety', d: '10 switches' }
    ]},
    { n: 'MAIN', why: 'Two heavy sets, that is genuinely enough', items: [
      { x: 'trap-bar-deadlift', d: '3 × 3 @ 82%' },
      { x: 'rfess', d: '2 × 6 per side' },
      { x: 'weighted-pullup', d: '3 × 5' }
    ]},
    { n: 'ARMOR', why: '', items: [
      { x: 'copenhagen-hold', d: '3 × 20 s per side' },
      { x: 'ham-iso-long', d: '3 × 25 s per side' },
      { x: 'cuff-iso-er', d: '2 × 25 s each way' }
    ]}
  ]
},

'power-lift': {
  n: 'In-Season Power Lift', type: 'HIGH', dur: 50,
  purpose: 'Short, heavy, fast, done. In-season the goal is to preserve force output without accumulating fatigue — high intensity, minimal volume, no soreness. Never chase a pump in July.',
  blocks: [
    { n: 'PRIME', why: '', items: [
      { x: 'ball-roll-foot', d: '60 s per foot' },
      { x: 'pogo-jumps', d: '2 × 20 contacts' }
    ]},
    { n: 'MAIN', why: 'Three heavy sets, high bar speed, stop while it is fast', items: [
      { x: 'trap-bar-deadlift', d: '3 × 3 @ 82–85%' },
      { x: 'rfess', d: '2 × 5 per side' },
      { x: 'weighted-pullup', d: '3 × 4' }
    ]},
    { n: 'ISO', why: 'Force without fatigue — the in-season cheat code', items: [
      { x: 'iso-trap-bar-pull', d: '4 × 5 s max intent' },
      { x: 'iso-nordic-hold', d: '3 × 15 s', note: 'Most of the Nordic tension, a fraction of the soreness. The right in-season choice.' },
      { x: 'calf-iso-soleus', d: '3 × 35 s' }
    ]},
    { n: 'ARMOR', why: '', items: [
      { x: 'ham-iso-long', d: '3 × 25 s per side' },
      { x: 'copenhagen-hold', d: '3 × 20 s per side' }
    ]}
  ]
},

'practice-throw': {
  n: 'Team Practice / Throwing', type: 'MED', dur: 90,
  purpose: 'Sport practice is training load. Warm up like it is a session, manage the throwing count like it is a lift, and finish with the shoulder work you would otherwise skip.',
  blocks: [
    { n: 'PRIME', why: 'Do this before team warm-up, not instead of it', items: [
      { x: 'ball-roll-foot', d: '60 s per foot' },
      { x: 'cuff-iso-er', d: '2 × 25 s each way' },
      { x: 'ham-iso-long', d: '2 × 20 s per side' },
      { x: 'elastic-rebound-flow', d: '3 min' }
    ]},
    { n: 'PRACTICE', why: '', items: [
      { x: 'throw-volume', d: 'Track hard throws. Cap at 40 on a practice day.' }
    ]},
    { n: 'POST', why: 'The five minutes nobody does', items: [
      { x: 'cuff-iso-er', d: '2 × 25 s each way' },
      { x: 'deep-squat-hold', d: '2 min' },
      { x: 'box-breathing', d: '3 min' }
    ]}
  ]
},

'speed-microdose': {
  n: 'Speed Micro-Dose', type: 'MED', dur: 30,
  purpose: 'In-season, you still need max-velocity exposure — it is protective, not just productive — but you cannot afford a full session. Three reps, full recovery, in and out.',
  blocks: [
    { n: 'PRIME', why: '', items: [
      { x: 'ball-roll-foot', d: '60 s per foot' },
      { x: 'elastic-rebound-flow', d: '3 min' },
      { x: 'a-skip', d: '2 × 20 m' },
      { x: 'ham-iso-long', d: '2 × 20 s per side' }
    ]},
    { n: 'SPEED', why: 'Small dose, full quality — this is a deposit, not a withdrawal', items: [
      { x: 'accel-sprint', d: '3 × 20 m' },
      { x: 'flying-30', d: '2 × (30 m build + 20 m fly), 5 min rest' }
    ]},
    { n: 'TISSUE', why: '', items: [
      { x: 'deep-squat-hold', d: '2 × 2 min' },
      { x: 'ball-roll-foot', d: '60 s per foot' }
    ]}
  ]
},

'primer': {
  n: 'Game-Day-Minus-One Primer', type: 'LOW', dur: 25,
  purpose: 'The day before a game you want the nervous system switched on and the body completely unfatigued. Overcoming isometrics are perfect here: maximal force, zero muscle damage, no soreness tomorrow.',
  blocks: [
    { n: 'PRIME', why: '', items: [
      { x: 'ball-roll-foot', d: '60 s per foot' },
      { x: 'elastic-rebound-flow', d: '3 min' }
    ]},
    { n: 'POTENTIATE', why: 'Switch it on, do not wear it out', items: [
      { x: 'pogo-jumps', d: '2 × 15 contacts' },
      { x: 'broad-jump', d: '3 singles' },
      { x: 'iso-trap-bar-pull', d: '3 × 5 s max intent' },
      { x: 'accel-sprint', d: '2 × 20 m at 90%' }
    ]},
    { n: 'DOWN', why: '', items: [
      { x: 'deep-squat-hold', d: '2 min' },
      { x: 'box-breathing', d: '5 min' },
      { x: 'nsdr', d: '20 min if you can' }
    ]}
  ]
},

'game': {
  n: 'Game Day', type: 'HIGH', dur: 180,
  purpose: 'Roughly 6,940 m total, 592 m of high-speed running, 16 sprints, 46 accelerations and 47 decelerations. Your warm-up decides whether you meet that fresh or cold.',
  blocks: [
    { n: 'PRE (T-60)', why: 'The shoulder and the groin get prepared before the team warm-up', items: [
      { x: 'ball-roll-foot', d: '60 s per foot' },
      { x: 'adductor-squeeze-iso', d: '2 ladders, submaximal' },
      { x: 'cuff-iso-er', d: '2 × 20 s each way' },
      { x: 'ham-iso-long', d: '2 × 20 s per side', note: 'Post-activation potentiation for the exact tissue that tears.' }
    ]},
    { n: 'PRE (T-30)', why: 'Ramp the system', items: [
      { x: 'elastic-rebound-flow', d: '4 min' },
      { x: 'a-skip', d: '2 × 20 m' },
      { x: 'pogo-jumps', d: '2 × 15' },
      { x: 'accel-sprint', d: '3 builds: 70%, 85%, 95%' },
      { x: 'cut-decel', d: '4 cuts, building to game speed' }
    ]},
    { n: 'POST', why: 'The 10 minutes that decide how Sunday feels', items: [
      { x: 'ball-roll-foot', d: '90 s per foot' },
      { x: 'deep-squat-hold', d: '2 min' },
      { x: 'contrast-shower', d: '6 min, finish cold' },
      { x: 'box-breathing', d: '5 min' }
    ]}
  ]
},

'flush': {
  n: 'Flush', type: 'LOW', dur: 45,
  purpose: 'Day after a game. Move blood, restore range, downregulate. Nothing hard, nothing new, nothing that produces soreness.',
  blocks: [
    { n: 'MOVE', why: 'Blood flow, not training', items: [
      { x: 'tempo-runs', d: '2 sets × 4 × 100 m at 60%, very easy', note: 'Or a 30-minute easy hike. Hiking counts — it is the same job.' }
    ]},
    { n: 'TISSUE', why: '', items: [
      { x: 'ball-roll-foot', d: '90 s per foot' },
      { x: 'foam-roll-post', d: '6 min' },
      { x: 'nerve-glide-sciatic', d: '2 × 10 per side', note: 'If the hamstrings feel tight rather than sore, this is the right tool.' },
      { x: 'deep-squat-hold', d: '3 × 100 s' }
    ]},
    { n: 'DOWN', why: '', items: [
      { x: 'co2-tolerance', d: 'One measurement — log it in Tests', note: 'Same time of day each week. A sharp drop usually shows up before you feel run down.' },
      { x: 'box-breathing', d: '5 min' },
      { x: 'contrast-shower', d: '6 min' }
    ]}
  ]
},

'play': {
  n: 'Play', type: 'MED', dur: 90,
  purpose: 'Pickleball, a hike, a pickup game. Play is not a break from training — it is the reason for it, and varied movement is genuinely good for connective tissue. Just warm up the groin and the shoulder first, because pickleball is a lateral-lunge sport and your groin is the weak link.',
  blocks: [
    { n: 'PRE', why: 'Five minutes so pickleball does not cost you a groin', items: [
      { x: 'ball-roll-foot', d: '60 s per foot' },
      { x: 'adductor-squeeze-iso', d: '2 ladders' },
      { x: 'skater-bound', d: '2 × 4 per side' },
      { x: 'cuff-iso-er', d: '2 × 20 s each way' }
    ]},
    { n: 'PLAY', why: 'Actually play', items: [
      { x: 'throw-volume', d: 'If throwing: warm up properly and count hard throws.' }
    ]},
    { n: 'POST', why: '', items: [
      { x: 'ball-roll-foot', d: '60 s per foot' },
      { x: 'deep-squat-hold', d: '2 min' },
      { x: 'adductor-rockback', d: '10 rocks + 30 s hold' }
    ]}
  ]
},

'off': {
  n: 'Off', type: 'LOW', dur: 12,
  purpose: 'A genuine day off. The Daily Armor still happens — twelve minutes, that is the whole deal — and then you go live your life. Adaptation happens on this day, not on the hard ones.',
  blocks: [
    { n: 'ARMOR ONLY', why: 'Frequency is the active ingredient', items: [
      { x: 'deep-squat-hold', d: '5 min accumulated across the day' },
      { x: 'box-breathing', d: '5 min before bed' }
    ]}
  ]
}
};

/* -----------------------------------------------------------
   ANNUAL PLAN — anchored to the UFA calendar
   2026 Championship Weekend: Aug 27–28. 2027 season opens ~late April.
   micro[] is Mon → Sun
   ----------------------------------------------------------- */
const PHASES = [
  { id:'p0', n:'Restoration', tag:'PHASE 0', start:'2026-08-31', end:'2026-09-13',
    focus:'Decompress from the season. Re-earn range, feed the injured tissues, run the full test battery so every later phase has a baseline.',
    keys:['No max efforts of any kind','Test battery in week 2','Daily Armor becomes automatic here or it never will'],
    micro:['restore','tempo-tissue','restore','found-lift','tempo-tissue','play','off'] },

  { id:'p1', n:'Tendon & Tissue Foundation', tag:'PHASE 1', start:'2026-09-14', end:'2026-10-25',
    focus:'Six weeks of long-duration yielding isometrics, eccentric loading and hypertrophy. Build the tissue that later phases will ask to be explosive. Copenhagen and Askling protocols start here and never stop.',
    keys:['Yielding isos 20–90 s — tendon capacity','Bodyweight target: +6–8 lb of lean mass across P1–P2','Sprint volume stays low: accel only, no max velocity','Copenhagen progression Weeks 1–6'],
    micro:['strength-a','tempo-tissue','accel-plyo','upper-throw','strength-b','play','restore'] },

  { id:'p2', n:'Max Strength & Stiffness', tag:'PHASE 2', start:'2026-10-26', end:'2026-12-20',
    focus:'The heaviest block of the year, plus overcoming isometrics for rate of force development. Strength is the ceiling that power gets converted from — this is where the ceiling goes up.',
    keys:['Trap bar to 85–90%','Overcoming isos: 5 s, max intent, 90 s rest','Max velocity enters at 1 exposure per week','Full Copenhagen 3 × 6–8'],
    micro:['accel-strength-max','tempo-tissue','upper-throw','restore','maxv-strength-iso','play','restore'] },

  { id:'dl1', n:'Deload', tag:'DELOAD', start:'2026-12-21', end:'2026-12-27',
    focus:'Volume down 50%, intensity maintained. Travel, eat, sleep. Keep the Daily Armor and the deep squat holds; drop everything else to half.',
    keys:['Half the sets, same loads','Armor every day','Retest nothing — just recover'],
    micro:['restore','tempo-tissue','maintenance','restore','play','play','off'] },

  { id:'p3', n:'Elastic Conversion', tag:'PHASE 3', start:'2026-12-28', end:'2027-02-21',
    focus:'Turn strength into speed. French contrast, depth jumps at your tested optimal height, maximum velocity sprinting, and the fascial elastic work that makes ground contacts shorter.',
    keys:['Depth jumps only from your tested RSI-optimal height','Max velocity 2× per week — and never more than 8 efforts above 90%','Strength volume drops, intensity stays','This is the highest-injury-risk phase: the Armor is not optional'],
    micro:['maxv-contrast','tempo-tissue','elastic-cod','restore','accel-depth','play','restore'] },

  { id:'p4', n:'Pre-Season Specific', tag:'PHASE 4', start:'2027-02-22', end:'2027-04-18',
    focus:'Make it look like ultimate. Repeat-sprint ability, game-speed cutting, throwing volume ramped 10% a week, strength dropped to maintenance.',
    keys:['RSA once weekly — fix the second-half decline','Throwing volume ramps 10%/week, tracked','Strength: 2 short sessions, heavy and fast','Peak the test battery in the last week'],
    micro:['speed-power','rsa-cond','cod-throw','restore','practice-throw','maintenance','restore'] },

  { id:'p5', n:'In-Season', tag:'PHASE 5', start:'2027-04-19', end:'2027-08-29',
    focus:'Preserve everything, accumulate nothing. One heavy short lift, one speed micro-dose, a primer the day before games, and the Armor every single day. The season is the training.',
    keys:['Minimum effective dose — never chase soreness in July','Overcoming isos are the in-season strength method','Speed micro-dose keeps max velocity, which is protective','Game day is the high day; build the week around it'],
    micro:['flush','power-lift','practice-throw','speed-microdose','primer','game','flush'] }
];

/* -----------------------------------------------------------
   COPENHAGEN PROGRESSION — the adductor rebuild, 10 weeks
   ----------------------------------------------------------- */
const COPEN = [
  { w:1,  ex:'copenhagen-hold',      d:'2 × 15 s per side',  f:'2×/wk', note:'Short lever, knee on the bench. Learn the straight line.' },
  { w:2,  ex:'copenhagen-hold',      d:'3 × 15 s per side',  f:'2×/wk', note:'Add a set, not a second.' },
  { w:3,  ex:'copenhagen-hold',      d:'3 × 20 s per side',  f:'3×/wk', note:'Third session enters. Soreness should be mild by now.' },
  { w:4,  ex:'copenhagen-hold',      d:'3 × 30 s per side, long lever', f:'2×/wk', note:'Ankle moves to the bench. This is a ~40% jump in lever — drop the time if needed.' },
  { w:5,  ex:'copenhagen-adduction', d:'2 × 3 per side',     f:'2×/wk', note:'First reps. Three-second lower. Expect real soreness.' },
  { w:6,  ex:'copenhagen-adduction', d:'2 × 5 per side',     f:'2×/wk', note:'' },
  { w:7,  ex:'copenhagen-adduction', d:'3 × 5 per side',     f:'2×/wk', note:'' },
  { w:8,  ex:'copenhagen-adduction', d:'3 × 6 per side',     f:'2×/wk', note:'Retest the squeeze here. Expect a real jump in mmHg.' },
  { w:9,  ex:'copenhagen-adduction', d:'3 × 8 per side',     f:'2×/wk', note:'' },
  { w:10, ex:'copenhagen-adduction', d:'3 × 8 + 5 lb vest',  f:'2×/wk', note:'Maintenance from here: 2 × 8 once weekly, forever. It does not stay fixed if you stop.' }
];

/* -----------------------------------------------------------
   TEST BATTERY — every 4 weeks, same day, same order, same shoes
   ----------------------------------------------------------- */
const TESTS = [
  { id:'bw',        n:'Bodyweight',              u:'lb',   dir:'up',   cat:'body',
    target:158, how:'Morning, after the bathroom, before food. Same scale.',
    why:'At 6\'1" and 150 lb you are running out of mass before you run out of talent. +8–10 lb of lean mass is one of the largest available performance levers you have — more force into the ground, more mass to hold a cut, more durability in contact.' },
  { id:'broad',     n:'Standing Broad Jump',     u:'cm',   dir:'up',   cat:'power',
    target:280, how:'Best of 3, full recovery, stick every landing. Measure heel to line.',
    why:'The cleanest field measure of horizontal power. 280 cm (9\'2") puts you in a strong field-athlete band; elite is 300+.' },
  { id:'cmj',       n:'Countermovement Jump',    u:'cm',   dir:'up',   cat:'power',
    target:55, how:'Phone jump app or a wall touch. Hands on hips, same rule every time. Best of 3.',
    why:'Vertical power plus a daily fatigue proxy — a CMJ 5%+ below your rolling average means the nervous system is not ready for a high day.' },
  { id:'t10',       n:'10 m Sprint',             u:'s',    dir:'down', cat:'speed',
    target:1.65, how:'Timing gates if you have them, phone video at 60 fps if not. 2-point start, best of 3, 3 min rest.',
    why:'Pure acceleration. In ultimate the first three steps win most cuts.' },
  { id:'t30',       n:'30 m Sprint',             u:'s',    dir:'down', cat:'speed',
    target:3.95, how:'Same setup as the 10 m; take the split.',
    why:'Acceleration plus the transition to upright running.' },
  { id:'vmax',      n:'Peak Speed (flying 20)',  u:'m/s',  dir:'up',   cat:'speed',
    target:9.0, how:'30 m build, time the next 20 m, divide 20 by the time. Best of 3, 5 min rest.',
    why:'Professional UFA players average 8.6 m/s peak. 9.0+ makes you a genuine deep threat and, because high-speed exposure is protective, a more durable one.' },
  { id:'rsi',       n:'Drop Jump RSI',           u:'ratio',dir:'up',   cat:'elastic',
    target:2.5, how:'Drop from 30 cm, jump immediately for max height. RSI = jump height (m) ÷ ground contact time (s). Use a phone app. Test 30/40/50 cm to find your optimal height for depth jumps.',
    why:'The single best measure of elastic quality. Under 1.5, stay on low plyos; 1.5–2.0 unlocks moderate; 2.0–3.0 unlocks depth jumps. Soccer midfielders and wingers sit at 2.0–2.8.' },
  { id:'squeeze_l', n:'Adductor Squeeze 45° — L',u:'mmHg', dir:'up',   cat:'groin', pair:'squeeze_r',
    target:250, how:'Lie on your back, knees at 45°, a blood-pressure cuff inflated to 10 mmHg between the knees. Squeeze maximally for 5 s. Best of 3. Record pain 0–10 too.',
    why:'The most direct measure of your known weak link. Track the absolute number AND the left/right difference — over 10% asymmetry is the flag.' },
  { id:'squeeze_r', n:'Adductor Squeeze 45° — R',u:'mmHg', dir:'up',   cat:'groin', pair:'squeeze_l',
    target:250, how:'Same protocol, other side. (With a cuff between the knees you get one number — measure single-leg against a wall for side-specific values.)',
    why:'Asymmetry predicts groin injury better than absolute strength does.' },
  { id:'copen_l',   n:'Copenhagen Hold Max — L', u:'s',    dir:'up',   cat:'groin', pair:'copen_r',
    target:45, how:'Long-lever Copenhagen hold to failure. One attempt per side.',
    why:'Functional adductor endurance at length. Under 30 s means the Copenhagen progression is not finished.' },
  { id:'copen_r',   n:'Copenhagen Hold Max — R', u:'s',    dir:'up',   cat:'groin', pair:'copen_l',
    target:45, how:'Same, other side.',
    why:'The difference between sides matters more than the number.' },
  { id:'nordic',    n:'Nordic Break Angle',      u:'°',    dir:'down', cat:'hamstring',
    target:35, how:'Film from the side. Measure the torso angle from vertical at the point you lose control. Lower is better.',
    why:'Direct eccentric hamstring strength. Getting past 30° from vertical is strong; most athletes break at 50–60°.' },
  { id:'aslr',      n:'Toe-Touch Gap',           u:'cm',   dir:'down', cat:'mobility',
    target:0, how:'Feet together, slow reach. Measure fingertips to floor — negative if you go past. Test before AND after plantar rolling.',
    why:'Posterior chain extensibility, and the number that shows you the foot-rolling effect in real time. The before/after gap is the interesting part.' },
  { id:'ktw_l',     n:'Knee-to-Wall — L',        u:'cm',   dir:'up',   cat:'mobility', pair:'ktw_r',
    target:11, how:'Foot square to the wall, knee drives over the second toe, heel stays down. Measure big toe to wall at the furthest point where the knee still touches.',
    why:'Ankle dorsiflexion. Under 10 cm limits the deep squat, the low acceleration position, and safe deceleration.' },
  { id:'ktw_r',     n:'Knee-to-Wall — R',        u:'cm',   dir:'up',   cat:'mobility', pair:'ktw_l',
    target:11, how:'Same, other side.',
    why:'A side-to-side difference over 1.5 cm shows up as a cutting asymmetry.' },
  { id:'girddiff',  n:'Shoulder IR Difference',  u:'°',    dir:'down', cat:'shoulder',
    target:10, how:'Lie on your back, shoulder at 90° abduction, elbow at 90°. Stabilise the shoulder blade with your other hand and rotate the forearm toward the floor. Measure both sides with a phone inclinometer; record throwing side minus non-throwing side.',
    why:'Over 15° of deficit is GIRD, and GIRD roughly doubles injury risk over three years. This is the number that decides whether you should be doing sleeper stretches at all.' },
  { id:'squat5',    n:'Deep Squat Hold',         u:'s',    dir:'up',   cat:'mobility',
    target:300, how:'Unbroken bottom-position hold, heels down, no support. One attempt.',
    why:'Your favourite position, quantified. Five unbroken minutes with heels flat is a genuinely rare standard.' },
  { id:'rsadrop',   n:'RSA Drop-Off',            u:'%',    dir:'down', cat:'conditioning',
    target:6, how:'Run the RSA protocol. Drop-off = (rep 6 time − rep 1 time) ÷ rep 1 time × 100.',
    why:'Directly targets the documented 10% second-half decline in high-intensity running. Under 6% means your engine is not the limiter.' },
  { id:'co2',       n:'CO₂ Tolerance',           u:'s',    dir:'up',   cat:'recovery',
    target:45, how:'Normal inhale, full exhale, hold to the first strong urge. Same time of day, seated, calm.',
    why:'A free autonomic-recovery proxy. Track the trend — a sharp drop usually precedes feeling run down by a day or two.' }
];

/* -----------------------------------------------------------
   READINESS — the auto-regulation rules
   ----------------------------------------------------------- */
const READINESS = {
  q: [
    { id:'sleep',   n:'Sleep',           lo:'Under 6 h / broken', hi:'8 h+ / solid' },
    { id:'soreness',n:'Soreness',        lo:'Significant / limiting', hi:'None' },
    { id:'energy',  n:'Energy & mood',   lo:'Flat, unmotivated', hi:'Sharp, keen' },
    { id:'groin',   n:'Groin',           lo:'Sore / tender', hi:'Quiet' },
    { id:'ham',     n:'Hamstring',       lo:'Grabby / tight', hi:'Quiet' },
    { id:'shoulder',n:'Shoulder',        lo:'Achy / clicking', hi:'Quiet' }
  ],
  verdict(score, flags) {
    if (flags.ham <= 2) return { k:'red', t:'Hamstring flag — no sprinting today',
      d:'The rule is absolute: a hamstring that feels grabby in the warm-up cancels max-velocity work. Not reduced — cancelled. Swap today for Tempo + Tissue, run the Askling protocol, and reassess tomorrow. Over 80% of hamstring injuries happen at high speed, and the warning almost always arrives before the tear.' };
    if (flags.groin <= 2) return { k:'red', t:'Groin flag — cutting and Copenhagens are off',
      d:'Drop all change-of-direction work and full Copenhagen reps. Keep the squeeze isometrics at 50–60% effort — loading a cranky adductor submaximally is treatment, loading it maximally is an injury. Reassess in 48 h.' };
    if (flags.shoulder <= 2) return { k:'red', t:'Shoulder flag — throwing volume halved',
      d:'Cut hard throws by half, no overhead throws at all, no pressing. Keep the cuff isometrics at low angles and the scapular work — those are the treatment. Deep clicking or catching at the front of the joint means see someone.' };
    if (score >= 24) return { k:'green', t:'Green — run the session as written',
      d:'Everything is available today. If it is a high day, take the full sprint volume and the full loads.' };
    if (score >= 17) return { k:'amber', t:'Amber — keep the intensity, cut the volume',
      d:'Drop one set from every main lift and take two reps off the sprint volume. Intensity is what preserves adaptation; volume is what costs recovery. Cut volume, never intensity.' };
    return { k:'red', t:'Red — convert to a low day',
      d:'Swap today for Restore or Tempo + Tissue. A high day taken on an empty tank buys fatigue at full price and adaptation at a discount. The Armor still happens.' };
  }
};

/* -----------------------------------------------------------
   THE METHOD — why any of this is here
   ----------------------------------------------------------- */
const ARTICLES = [
{ id:'method', n:'The Method', sub:'Five rules the whole program obeys', body:[
  {p:'This is not a collection of good exercises. It is a system with an order of operations, and the order is what makes it work. If you only ever remember five things, remember these.'},
  {h:'1 · High days are high, low days are low, and nothing in between'},
  {p:'The single most common way athletes stall is by training in the middle: every session moderately hard, nothing ever fully recovered, nothing ever fully expressed. Charlie Francis\'s high-low model is the fix. High days — sprinting, jumping, heavy lifting, games — are CNS-expensive and need 48 hours between them. Low days — extensive tempo, tissue work, mobility — are deliberately easy enough that they accelerate recovery rather than compete with it. A "medium" day gives you the fatigue of a high day and the adaptation of a low one.'},
  {p:'In practice: never two high days back to back, and a low day is only low if you could hold a conversation through it. Running tempo too fast is the most common way people quietly break this program.'},
  {h:'2 · Speed always comes first in a session, and first in a week'},
  {p:'Sprinting, jumping and max-intent isometrics are nervous-system qualities. They are only trainable when the nervous system is fresh. Heavy lifting after sprinting is fine; sprinting after heavy lifting is a waste of a sprint. Every combined session in this program is ordered: prime → elastic → speed → strength → armor. That order is not negotiable.'},
  {h:'3 · The weak link sets the ceiling'},
  {p:'You have three: an adductor that is weak, a hamstring that has torn, and a labrum with a history. None of them will be fixed by a general training program, and any one of them can end a season. That is why the Daily Armor exists as a separate, non-negotiable twelve-minute block that happens on rest days, travel days and game days. Twelve minutes a day for a year is 73 hours of targeted work on the exact tissues most likely to sideline you. That is more than any physio will ever give you.'},
  {h:'4 · Isometrics are a family, not an exercise'},
  {p:'You like isometrics, which is convenient, because they are genuinely the right tool three separate times in this program — but they are three different tools and confusing them wastes the effort. See the Isometrics page.'},
  {h:'5 · Do the boring thing for longer than feels reasonable'},
  {p:'The Copenhagen literature is explicit that outcomes depend on adequate volume and progressive overload, not on the exercise being clever. The Askling protocol beats conventional rehab because it is done at long muscle lengths, consistently, not because the three exercises are magic. Almost everything here rewards a year of consistency far more than it rewards intensity in any given week.'},
  {callout:{k:'warnc', h:'One honest caveat', p:'This is a training program written from the research and from your description of yourself, not a medical assessment. A labral tear and a hamstring strain are things a sports physio should lay eyes on at least once — particularly to measure your shoulder internal rotation properly and to confirm what kind of labral lesion you have. Everything here is built to be safe without that, but "safe without an assessment" is not the same as "as good as an assessment".'}}
]},

{ id:'iso', n:'Isometrics, Properly', sub:'Three different tools that look identical from the outside', body:[
  {p:'An isometric is any contraction where the joint angle does not change. That definition covers two methods with opposite purposes, and mixing them up is why most people get little from isometric training.'},
  {h:'Yielding isometrics — holding a position against a load'},
  {p:'A loaded split squat hold. A wall sit. A Copenhagen hold. The load is trying to move you and you are refusing. These are typically held for 20–120 seconds, and they build tendon capacity, positional strength and tissue tolerance. They also fatigue you: at the same relative intensity, a hold-type contraction fails faster than a push-type one.'},
  {p:'Use them in a foundation phase, in rehab, and any time you want the tendon to get more capable of taking load. Long-duration holds also have a genuine analgesic effect on an irritable tendon.'},
  {h:'Overcoming isometrics — pushing against something that will not move'},
  {p:'A bar loaded past your max against pins. A push against an immovable object. Nothing moves because nothing can. These are 5–6 seconds, maximum intent from the very first millisecond, and their purpose is rate of force development: recruiting high-threshold motor units and training the nervous system to reach peak force faster.'},
  {p:'The critical detail is duration. When rate of force is the goal, you want to limit the time you are producing force — beyond about six seconds you have stopped training RFD and started training something else. And because there is no eccentric component, there is essentially no muscle damage: you get an enormous neural stimulus and wake up fine. That makes overcoming isometrics the best in-season strength method there is, and the correct thing to do the day before a game.'},
  {h:'The sequencing trap'},
  {p:'Here is the nuance most people miss, and it comes straight from Alex Natera\'s work: short, high-intensity isometrics support tendon stiffness and readiness for high loading rates, while longer-duration isometrics have a pain-relieving effect but increase stress relaxation in the tendon — they temporarily make it more compliant. A compliant tendon is a slower tendon.'},
  {p:'So: long holds are foundation-phase and rehab work, and they belong away from your fastest sessions. Short max-intent holds are performance work and can go right before or on the same day as speed. Do not do 90-second split squat holds an hour before a max-velocity session and expect to be springy.'},
  {callout:{k:'', h:'How this program uses them', p:'Phase 1 leans on yielding isos (tendon capacity). Phase 2 introduces overcoming isos (RFD). Phase 3 keeps overcoming isos and drops most long holds. In-season, overcoming isos become the primary strength method. The Daily Armor uses submaximal yielding isos throughout, because low-load frequency is what injured tissue responds to.'}}
]},

{ id:'fascia', n:'The Fascia Layer, Honestly', sub:'What holds up, what is theory, and what to actually do', body:[
  {p:'You asked about fascia specifically, so here is the straight version — including where the popular story runs ahead of the evidence, because you will get more out of this if you know which parts are load-bearing.'},
  {h:'What is well supported'},
  {p:'Elastic energy storage and return in tendon and aponeurosis is real, measured, and central to fast movement. During hopping and running, muscle fibres contract close to isometrically while the tendinous tissues lengthen and shorten like a spring — the muscle acts as a strut and the tendon does the springing. Regular oscillatory exercise increases the storage capacity of those tissues. This is the "catapult mechanism", and it is the reason pogos, bounds and depth jumps improve your speed more than the same time spent on leg press.'},
  {p:'Also well supported: remote effects along myofascial chains, at least acutely. Self-myofascial release of the plantar surface produces a statistically significant, large-effect improvement in hamstring and lumbar flexibility measured by sit-and-reach — without touching the hamstring. This has been replicated across several studies. That is exactly the ball-under-the-foot trick you already like, and it earns its daily spot.'},
  {h:'What is plausible but softer'},
  {p:'The specific "anatomy trains" line diagrams — the idea that a discrete superficial back line runs foot to skull as a functional unit — are a useful model rather than a proven anatomical circuit. The measured effects are real; the tidy explanation is a hypothesis. It works, and we are not fully sure why.'},
  {p:'"Fascial fitness" training principles — slow melting stretches, rebound elasticity, proprioceptive refinement, hydration through varied loading — are reasonable, physiologically motivated, and not yet supported by strong performance trials. Schleip himself warns that untamed rebound training produces more injuries than standard muscle training. So the elastic rebound work in this program is deliberately submaximal, rhythmic, and used as a primer, not as a main course.'},
  {h:'What to ignore'},
  {p:'Claims that rolling "breaks up adhesions" or permanently lengthens fascia. The forces required to deform dense fascia mechanically are far beyond what a foam roller produces. The effects are real but they are neurological and short-lived — which makes rolling an excellent warm-up and recovery tool and a poor treatment. Roll before you move, not instead of moving.'},
  {h:'What this program actually does about it'},
  {ul:[
    'Plantar ball rolling daily and before every running session — the best-evidenced item on the list, and it takes 90 seconds.',
    'Rebound flow as a primer before elastic and speed work: rhythmic pre-load-and-release in multiple directions, submaximal by design.',
    'Pogos, bounds and hurdle hops as the real elastic training — this is where tendon stiffness genuinely changes.',
    'Loaded long-length work (deep squat holds, ATG split squats, Cossacks, pancake sits) as the "loaded stretch" stimulus, which has better support than passive stretching for actual tissue adaptation.',
    'Varied movement — hiking, pickleball, play — kept in the plan deliberately. Connective tissue responds to load variety in a way it does not respond to the same three lifts.'
  ]}
]},

{ id:'groin', n:'Dossier: The Adductor', sub:'Your weakest link, and the one with the clearest fix', body:[
  {p:'A weak adductor in a cutting sport is not a minor asymmetry. Groin injuries are among the most common and most stubborn problems in field sport, and adductor strength is the most modifiable risk factor we know of.'},
  {h:'What the evidence actually says'},
  {p:'The Copenhagen adduction exercise reliably improves eccentric hip adduction strength, hip range of motion, dynamic balance and groin symptoms — that part is consistent across studies, including a randomised controlled trial in players with existing groin injury. Effects scale with training volume and progressive overload.'},
  {p:'The honest caveat: whether it actually reduces groin injury RATES is contested. There is Grade B evidence suggesting inclusion of the Copenhagen may not be associated with reduced injury rates, and reviews describe the prevention evidence as conflicting. So the case for doing it is "it fixes the deficit that predicts the injury", not "it is proven to prevent the injury". For someone who already knows they have the deficit, that is more than enough reason.'},
  {h:'Your protocol'},
  {ul:[
    'Daily: the squeeze isometric ladder at 0°, 45° and 90° of hip flexion. Three angles because the adductor group\'s line of pull changes through the range. Log the pain score.',
    'Twice weekly: the Copenhagen progression, ten weeks, on the Program page. It starts with 15-second short-lever holds for a reason — people who skip to full reps get a sore groin and quit.',
    'Weekly: long-length adductor loading — Cossack squats and active pancake sits — because the groin fails at length during a wide plant, not in the middle of its range.',
    'Every session: lateral skater bounds. Squeezing strength is not the same as absorbing strength, and the plant is an absorbing problem.'
  ]},
  {h:'The rules'},
  {ul:[
    'Never full Copenhagens on consecutive days. The soreness lasts 48–72 hours early on.',
    'Pain up to 3/10 during the squeeze is acceptable and expected if you are rebuilding. Above 5/10, or worse day over day, means cut the volume.',
    'Never do Copenhagen volume the day before or after a heavy change-of-direction session — those are the same tissue.',
    'Pickleball is a lateral-lunge sport. Warm up the groin before you play, every time.',
    'After the ten weeks: 2 × 8 once a week, indefinitely. It does not stay fixed if you stop.'
  ]}
]},

{ id:'ham', n:'Dossier: The Hamstring', sub:'Where it tears, and the two things that change that', body:[
  {p:'More than 80% of hamstring injuries in sport happen during sprinting — specifically in late swing, when the hamstring is long, lengthening fast, and contracting hard to decelerate the shin before foot strike. That single fact determines everything sensible you can do about it.'},
  {h:'Long, not short'},
  {p:'Training the hamstring in a shortened position — seated leg curls, short-range bridges — trains it where it does not fail. The biceps femoris long head produces its peak force at roughly 45° of hip flexion with only 10–30° of knee flexion. Nearly straight leg, hip flexed. That is the position in this program\'s daily long-length isometric, and it is why the knee stays nearly straight in it.'},
  {h:'Isometrics and eccentrics do different jobs'},
  {p:'This distinction matters and is usually blurred. An isometric hip-extension intervention raised isometric knee-flexion torque about 10% and hip extension force about 12%, and grew semitendinosus volume 15%. But eccentric — not isometric — hip extension work is what actually lengthened biceps femoris fascicles. Longer fascicles mean the muscle reaches its critical length later in the stride.'},
  {p:'So: isometrics build torque and are safe to do daily. Eccentrics build architecture and must be dosed carefully. You need both, which is why the Daily Armor holds the isometric and the strength days carry the Nordics — low volume, high quality, never more than twice a week.'},
  {h:'The Askling L-protocol'},
  {p:'Three exercises — Extender, Diver, Glider — all loading the hamstring at long lengths. Athletes on this protocol returned to sport in a mean 28 days versus 52 on conventional rehab, with lower reinjury at 2, 6 and 12 months. Even fully healed, running it weekly as maintenance is close to free.'},
  {h:'"Tight" is often not tight'},
  {p:'A meaningful share of chronic hamstring tightness is neural rather than muscular. The test takes ten seconds: sit, straighten one knee to your range, then tuck your chin to your chest and try again. If range drops noticeably, the limiter is neural tension and stretching harder makes it worse. Use nerve glides instead. And test your toe-touch before and after plantar ball rolling — if 90 seconds under your foot buys you range, the hamstring was never the problem in the first place.'},
  {callout:{k:'hard', h:'The one absolute rule', p:'If the hamstring feels grabby, tight or "not right" during a warm-up, max-velocity sprinting is cancelled that day. Not reduced. Cancelled. Do tempo instead. The warning sensation almost always arrives before the tear, and almost nobody listens to it.'}}
]},

{ id:'shoulder', n:'Dossier: The Labrum', sub:'Non-operative management for a throwing athlete', body:[
  {p:'A superior labral (SLAP-type) lesion in an overhead athlete is one of the few injuries where the conservative route has a better track record than surgery. Return to overhand throwing is more common with non-operative treatment, and a program built on posterior capsule stretching and scapular correction is more successful than surgery for most throwers with SLAP lesions. Around 71% return to the same level or better with a regimen of scapular stabilisation and posterior capsular work.'},
  {h:'The three things rehab must address'},
  {ul:[
    'GIRD — glenohumeral internal rotation deficit. Players with GIRD are roughly twice as likely to be injured over a three-year window, and posterior capsule stretching resolves it in about 90% of athletes who have it.',
    'Scapular dyskinesis — if the shoulder blade does not upwardly rotate on schedule, the labrum absorbs load that the mechanics should have handled.',
    'Rotator cuff and core strength — the cuff centres the humeral head; the core is where a throw actually starts.'
  ]},
  {h:'Measure before you stretch'},
  {p:'This is the part people get wrong. Sleeper stretches are the right tool if — and only if — you have a genuine internal rotation deficit. Measure both shoulders at 90° of abduction with the scapula stabilised. If the difference is under 15°, you do not have GIRD and you should not be stretching a capsule that is doing its job. Throwers create anterior instability by stretching posterior capsules they did not need to stretch. Test it, log it in the Tests page, and let the number decide.'},
  {h:'What this program changes for you'},
  {ul:[
    'No overhead barbell pressing. Half-kneeling landmine presses instead — the arc keeps the humerus in the scapular plane and stops short of the end-range position that provokes a superior labral lesion.',
    'At least 3:1 pull to push volume.',
    'Cuff isometrics daily at 0° and 45° of abduction, submaximal and pain-free. Timed holds, which suits you.',
    'Hangs stay slightly active rather than fully dead-hanging, so the labrum and capsule are not taking your whole bodyweight at end range.',
    'Overhead throws — hammers, blades — are treated like a heavy lift: capped at 10 per session and only in a week where the shoulder is completely quiet.',
    'Hard throws are counted. Throwing volume is the load nobody tracks and the one most likely to flare this.'
  ]},
  {callout:{k:'hard', h:'When to stop and get it looked at', p:'Deep clicking, catching, or a sensation of the shoulder shifting at the front of the joint during a throw is labral, not muscular. Persistent night pain, or a sudden loss of throwing velocity you cannot warm out of, is the same. Those are physio or orthopaedic questions, not training questions, and no amount of cuff work is the right answer to them.'}}
]},

{ id:'fuel', n:'Fuelling at 150 lb', sub:'The largest untapped lever you have', body:[
  {p:'At 6\'1" and 150 lb your BMI is about 19.8. You are running an elite engine on a light chassis. A Garmin fitness age of 18 tells you the aerobic system is excellent; it says nothing about force production, and force is what a cut is made of. Adding 8–12 lb of lean mass over an off-season would very likely do more for your ultimate than any single training block in this program.'},
  {h:'The numbers'},
  {ul:[
    'Protein: 1.6–2.2 g/kg — for you, roughly 110–150 g a day. The high end during Phases 1 and 2. This is the one you will most likely be under on.',
    'Energy: a surplus of roughly 300–500 kcal a day during Phases 1–2 supports about 0.5–1 lb a week of mostly lean gain. Faster than that and you are mostly adding fat.',
    'Carbohydrate: this is where light endurance-power athletes chronically under-eat. On high days you want carbohydrate before and after, not just protein. Under-fuelled sprint sessions are the fastest way to accumulate soft-tissue injuries.',
    'Creatine monohydrate: 5 g daily, no loading needed. The most well-supported ergogenic aid in existence, and it is specifically useful for repeated maximal efforts — which is literally the description of an ultimate game.',
    'Around a game: carbohydrate before and at half time. The documented 10% second-half decline in high-intensity running is partly fitness and partly fuel.'
  ]},
  {h:'The practical version'},
  {p:'You do not need to weigh food. You need three real meals plus two substantial snacks, protein at every one of them, and a genuine post-session meal within about two hours of every high day. The most common failure mode for a light athlete is not a bad diet — it is simply not eating enough times a day.'},
  {callout:{k:'warnc', h:'Where this stops', p:'General sports-nutrition principles, not a personalised plan. If you want to seriously chase a body-composition change, a sports dietitian will do it better and faster than a website, and will catch things like low energy availability that a training app cannot see.'}}
]},

{ id:'numbers', n:'The Numbers That Matter', sub:'What a pro UFA game actually asks of you', body:[
  {p:'Every choice in this program traces back to GPS data from professional Ultimate Frisbee Association players. The demands are higher than the collegiate and club data most ultimate training is built on — so most ultimate training under-prepares people.'},
  {h:'What a game costs'},
  {ul:[
    '≈ 6,940 m of total distance — with high variance between roles and games.',
    '≈ 592 m of high-speed running above 5.5 m/s.',
    '≈ 1,261 m of high-intensity distance.',
    '≈ 15.9 max-effort sprints.',
    '≈ 46 accelerations and 47 decelerations — the decelerations are the injury tax and the least-trained quality.',
    'Peak speed averaging 8.6 m/s (≈19.2 mph).',
    'Heart rate at 82% of max on average and 99% at peak, for the whole game.',
    'High-intensity running drops about 10% in the second half.'
  ]},
  {h:'What that implies for training'},
  {ul:[
    'Peak speed of 8.6 m/s is the professional average. Beating it makes you a deep threat, and because high-speed exposure is protective when the base is there, it also makes you more durable. Hence max-velocity work in Phases 2–5.',
    '47 decelerations a game is why deceleration mechanics are a trained skill here, not an afterthought.',
    'A 10% second-half decline is a repeat-sprint-ability problem, and RSA is trainable — hence the game-model conditioning session in Phase 4.',
    '82% of max HR sustained for a whole game is why extensive tempo runs are non-negotiable on low days. The aerobic base is what lets you repeat the sprints.',
    'Sixteen sprints with incomplete recovery is a very different demand from sixteen sprints with full recovery. Both are in the program, in different phases, for different reasons.'
  ]}
]},

{ id:'sources', n:'Sources', sub:'Where the claims come from', body:[
  {p:'Every protocol in this program traces to published work. These are the primary anchors, so you can check any of it yourself.'},
  {ul:[
    'Physical Demands in Competitive Ultimate Frisbee — J Strength Cond Res, 2015; plus professional UFA GPS data (NSCA 2025 poster) for the pro-level numbers used throughout.',
    'Askling et al. — L-protocol vs conventional hamstring rehabilitation: 28 vs 52 days to return, lower reinjury at 2, 6 and 12 months.',
    'Comparative effectiveness of rehabilitation protocols for hamstring injuries — systematic review and meta-analysis, 2025.',
    'Effect of an Isometric or Eccentric Hip Extension Exercise Intervention on Hamstring Strength, Architecture and Morphology — PubMed 35941515.',
    'The Neuromuscular Effects of the Copenhagen Adductor Exercise — systematic review, Int J Sports Phys Ther.',
    'Copenhagen adduction exercise on eccentric hip adduction strength in players with groin injury — RCT, PubMed 38376593.',
    'Can the Copenhagen Adduction Exercise Prevent Groin Injuries in Soccer Players? — critically appraised topic, PubMed 37734743 (the Grade B caveat).',
    'Superior Labral Anterior to Posterior Tear Management in Athletes — PMC6110067 (non-operative outcomes, GIRD, scapular rehab).',
    'Grieve et al. — immediate effect of bilateral plantar self-myofascial release on hamstring and lumbar flexibility; and Self-Myofascial Release of the Superficial Back Line Improves Sit-and-Reach Distance (PubMed 30860410).',
    'Increasing Hamstring Range of Motion via Plantar Myofascial Release — critically appraised topic, IJATT 2024.',
    'Schleip — Training Principles for Fascial Connective Tissues; and work on the catapult mechanism and elastic recoil.',
    'Effects of plyometric and isometric training on muscle and tendon stiffness in vivo — PMC5555899.',
    'Alex Natera on rate of force development, and on short vs long-duration isometrics and tendon stress relaxation.',
    'Effects of Plyometric Jump Training on the Reactive Strength Index — systematic review with meta-analysis, PMC10115703; RSI banding for plyometric progression.',
    'Sprint dosage and the high-low system — including the finding that eccentric hamstring strength falls when athletes exceed 7–8 weekly efforts above 90% of max velocity.',
    'The impact of intrinsic foot muscle strengthening exercises in asymptomatic athletes — systematic review, 2024; and Frontiers, How to Evaluate and Improve Foot Strength in Athletes.'
  ]},
  {p:'Where the evidence is mixed, this program says so rather than picking the flattering reading — see the Copenhagen caveat in the adductor dossier and the fascia page.'}
]}
];

if (typeof module !== 'undefined') { module.exports = { EX, SESSIONS, PHASES, TESTS, ARTICLES, ARMOR, COPEN, READINESS, ATHLETE }; }
