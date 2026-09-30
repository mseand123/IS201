# Ground Contact

An elastic-athlete training system built for one athlete: 25, 6'1", 150 lb, professional
UFA ultimate, 4.6 DUPR pickleball, with a hip (acetabular) labral tear that is improving, a weak adductor and
a hamstring strain history.

Open `index.html` (or `training/` on the published site). Everything runs in the browser and
saves to `localStorage` on that device — no account, no server, no network needed after the
fonts load.

## What is in it

| View | What it does |
|---|---|
| **Today** | Resolves the date against the annual plan and renders that session — every block, dose and coaching note — plus a readiness check-in that auto-regulates the day, the Daily Armor, and a notes field. |
| **Train** | Six pages, a few complete workouts on each: **The Holy Grail** (the Daily Six, the best-of list, the Room Circuit), **Legs**, **Upper & Core**, **Fascia & Flow**, **Stretch** and **Frisbee**. |
| **Library** | 138 exercises, filterable to the 115 that need no gym. Each has set-up, step-by-step execution, coaching cues, the faults that ruin it, dose, progression/regression, and why it is in the program. |
| **More** | Your plan — this week's microcycle with CNS-cost meters, the periodised year against the UFA calendar, and the 10-week Copenhagen ladder — then the 22-test battery on a 4-week cycle, fourteen essays (the training model, isometrics, an honest read on fascia, training without a gym, injury dossiers for the hip labrum / adductor / hamstring, the throwing shoulder, fuelling, the UFA numbers, sources), and backup. |

## The lean cut

The app had grown to six tabs, thirteen Program tiles, 65 workouts and 201 exercises, and the best of
it was hard to find. It is now four tabs, six Train pages, 29 workouts and 138 exercises. What stayed
is what gets used: the Holy Grail, complete leg and upper-body workouts at sensible lengths, the
hamstring work, the plyometric ladder, the stretching, game day, and a new **Fascia & Flow** page.

What went, and where its best parts landed:

- **Boss Your Game** and **GOATA** — their best moves were already in the Holy Grail, the Room
  Circuit and the body workouts. GOATA's floor warm-up survives as **Groundwork** on Fascia & Flow.
- **Hiking**, the **desk sessions**, **Hotel Room**, **Elastic Primer**, the two isometric-contrast
  blocks, and the one-area blocks (Hip, Hip Strength, Hip Flexor, Groin, Knee & Ankle, Calves/Feet &
  Ankles, Throwing Shoulder, Upper & Trunk) — the complete workouts cover the same ground.
- **The Daily tab** — the Daily Armor still runs with Today's session; the free wins became the
  **Fascia Flow** workout.
- **Tests** and the **Method** essays moved under **More**, with the week, the year, the Copenhagen
  ladder and backup — which, until now, was only reachable from the desktop sidebar.
- Every exercise nothing used any more — 63 of them — left the Library.

Rows got lighter too. An exercise row is its name, its dose and the one note that explains the dose;
what it targets, what it costs and the full how-to are one tap away. A card's targets line moved into
its *About this workout* fold. Everything cut is in git history if any of it is wanted back.

## Gym / Home

A toggle in the status strip switches equipment mode. In **Home** mode every lift that needs a
gym is swapped in place for a bodyweight, doorway or backpack equivalent (marked `HOME` on the
item), and exercises that work either way show their at-home adaptation. Phases, sessions and
ordering are identical in both modes — only the implement changes. Sprinting, jumping and the
whole Daily Armor were never gym work and are unchanged.

The map lives in `HOME_SUB` in `data.js`: `gymExerciseId → { x: homeExerciseId, d: dose }`.
Anything not in that map already works at home. The Library has a **No gym needed** filter that
reads the same map, and More → Read has an essay on what a home track actually costs.

## Guided session

**Start session** on the Today screen opens a full-screen player that walks the whole
session — every block, then the Daily Armor — one exercise at a time:

- A four-second count-in per exercise, then the timer, with beeps on the last three seconds
- Timed exercises run their prescribed work / rest / rounds; rep-based sets count up and wait
  for you to tap **Done**
- Coaching cues rotate every six seconds inside the exercise; between-exercise rests announce
  what's next
- **Side switches are alerted, not implied**: a between-rounds rest on a per-side exercise takes
  over the screen with the instruction ("SWITCH FEET"), plays a three-tone rise instead of the
  plain rest tone, says it out loud with the side coming up, and pulses the ring. During work,
  a Left/Right chip shows which side you're on, so it's never a guess mid-set. Switch rests get
  a minimum of 8 seconds regardless of the configured rest
- Speech announces each exercise and each rest — toggle it with **Voice on / off**
- The right-hand button means one thing per phase: **Next round** / **Next side** while rounds
  remain, **Done early** on the last one, **Skip rest** during a rest, **Skip** on a hand-timed
  set. Ending a round never leaves the exercise; **Finish exercise** in the link row does that
- **Pause works everywhere**, including on hand-timed sets: the pause button sits in the player's
  top bar the whole time, the ring and clock dim, a `Paused` tag shows inside the ring, speech
  stops, and the main button reads **Resume**. Count-up sets resume from where they stopped rather
  than restarting. `Space` does the same thing from a keyboard
- **Back** and **How-to** without losing your place — mid-session the dialog leads with the steps and cues and folds the rationale away
- Screen wake lock while it runs; completed exercises tick themselves off on the Today screen

## Warm-up

The RAMP-ordered warm-ups open Train → Frisbee, and the full one sits on the Today quick-start row:
**Frisbee Warm-Up** (~41 min, game day), **Warm-Up · Short** (~25 min), **Sprint-Ready · Minimum**
(~12 min) and **Half-Time Top-Up** (~5 min). The full one also warms the throwing arm (see the audit
below); the shorter ones are legs and hips — getting the body ready to sprint. Eleven new exercises back
them, including 8-way hips and clamshells, a short deep squat hold placed early, and graded
build-up runs and cutting build-ups so the first hard plant of the day is deliberate.

### The game-day warm-up, audited

A full pass over the Frisbee Warm-Up as the player actually runs it, not as the list reads:

- **The frog rock-back ran the wrong exercise.** The row said "10 rocks + 20 s hold"; the player ran
  three 30-second holds and no rocks. It now runs one 50-second step: rock ten, then hold.
- **It did not fit its own start time.** Thirty-nine minutes, with "start around 40 minutes before
  pull" and "warm your throws up separately" — leaving no time for the throws. It now says to roll
  your feet while you lace up and start about 45 minutes out, and `check-timing.js` fails any routine
  that says when to start it and runs longer than that.
- **The throwing arm was not warmed up at all.** A short ARM block now sits between the leg work and
  the sprints: a rotator-cuff isometric each direction, then a throwing ladder built short to long
  with only two or three hucks. Sprints still come last, so the final thing before the pull is
  running fast.
- **Twelve minutes of floor work after a three-minute jog**, with three overlapping glute moves.
  The clamshell is gone (8-way hips covers it, standing, so you stay warm) and 8-way hips is five
  reps a position instead of eight — the block is under ten minutes now.
- **Stale hip caution**: the deep-squat notes no longer ask you to check for a pinch.

The same "row says one thing, timer runs another" bug turned up in knee-to-wall in four other blocks
(Range Block, Tight Calves, Legs, and a hiking block since cut); each now runs one timed set per side matching
its row.

## Stretching

There is no static stretching in any of the three warm-ups — they are dynamic, activation and
potentiation only. The reasoning is in More → Read, under **Stretching, Static and Dynamic**:
the acute force loss is real but small and dose-dependent (meaningful past ~60 s per muscle,
trivial below), and the more important point is that stretching has no demonstrated
injury-prevention effect where strength training has a large one. Two athlete-specific cautions
apply — passive end-range hip flexion/adduction/IR is the provocative position for a labral hip,
and "tight hamstrings" in a sprinter is usually protective tone rather than short tissue.

The static work moved to the **Range Block**, the first card on Train → Stretch: ~18 minutes of loaded and actively-held positions run
after a session or on an off day, dosed weekly (~5 min accumulated per muscle group per week) rather
than daily. The deep squat hold is the one static position kept in the warm-up — short, loaded, early,
and doubling as a daily read on the hip.

### Home mode has to be honest

Home mode swaps 25 gym lifts for backpack, doorway and furniture versions, marked HOME. What it did
*not* do was say anything about the exercises it left alone — and several of those read as gym work.
On a Strength A day in Home mode you would see **Yielding Split Squat Isometric** (setup: dumbbells
or a barbell), **Nordic Hamstring Curl** (ankles under a bar or a Nordic bench) and **Copenhagen
Adduction** (a bench), all with no indication that a backpack, a couch and a coffee table
respectively do the job. The home notes existed on the exercises; the rows never rendered them.

Rows in Home mode now show the home note when the exercise is not swapped and its set-up needs kit —
a bench, a bar, a band — on Today and inside every picker; "Floor only" on a bodyweight row was noise. The Passive Hang was the one genuine hole, needing a pull-up bar with
no home story at all, so it gained one (including the no-bar version: kneel, hold a table edge, lean
back for the same traction). A test now walks every reachable exercise and fails if any of them needs
equipment while offering neither a swap nor a note — currently 125 reachable, 0 without a home path.

### Home mode lists what you will do

The lists still showed the gym. A block's picker named the gym lift — **Trap Bar Deadlift** on a
Home-mode leg page — and swapped it only once you pressed Run. Every list now goes through the same
`resolve()` as the player, so it names the exercise you will actually do, with its own dose, note and
how-to, and a swapped row carries a **HOME** chip on its name.

Showing the real names exposed the next problem: swaps landing on something the block already did —
five presses all becoming the same push-up. Ten `HOME_SUB` entries were pointed somewhere better: the
incline press becomes feet-up push-ups, the overhead press pike push-ups, the weighted pull-up a bodyweight one, the bottoms-up carry plank walk-ups, the hip
thrust the single-leg couch thrust, the loaded calf raise the single-leg one off a step, the suitcase
carry a bear crawl, hurdle hops lateral bench hops and the post-session foam roll a ball on the glute.
Where the general swap is right almost everywhere but wrong in one block, the item carries its own
`atHome: { x, d, note }`, which `resolve()` applies before `HOME_SUB` — the trap bar in the Power &
Lift session becomes a backpack hinge, the Pallof press in Core & Trunk bear-plank shoulder taps.

`check-data.js` fails any routine or session that Home mode gives a duplicate row (one that is already
a duplicate in Gym mode is the block's own business). `check-ui.js` opens the Legs and Upper & Core pages in Home mode and
fails if a gym exercise with a swap is listed, if any row appears twice, or if the wall sits are
missing. Its first run caught one more: the Plyometric Ladder listed Pogo Jumps twice, the second
being the single-leg version, which is now its own exercise, **Single-Leg Pogos**.

### The hip flexor toolkit, finished

The hip flexor work went strength-heavy and stretch-thin: one isometric hold, one loaded lengthener
and the couch stretch, which is the *advanced* stretch and needs a wall. Two additions close it.

- **Standing Split-Stance Hip Flexor Stretch** — no floor, works in trousers on a sideline, which is
  the whole reason it exists. The right pick between games.
- **Half-Kneeling Hip Flexor Stretch** — the standard one, and the entry point that was missing. The
  couch stretch is now correctly positioned as its progression rather than the only option.

Both carry the same two rules, because both stretches fail the same way: tuck the pelvis first,
squeeze the glute on the stretched side. Skip either and you are stretching your lumbar spine. The
three stretches are grouped easiest-to-hardest in the **Tight Hip Flexors** block on Train → Stretch,
so there is always one you will actually do. The strength half is the standing hip-flexor hold in the
warm-ups.

### Rows you can act on

The changes to every exercise row, in the pickers and on Today.

**The whole row opens the how-to.** It used to be the name text only, which is a small target on
a phone and gives no hint that there is anything to tap. The name, the dose and the note now sit
inside one button. The tick stays a separate control: it selects, or marks done, and never opens the
dialog.

**Each row has its own Start.** Running one exercise previously meant opening its dialog and
finding *Run this exercise* in there. Now it is one tap from the list, which is what you want when
the answer is "just the deep squat hold".

**Each row explains its own dose.** An item's note — whose number it is, what to change, when to
stop — used to render on a session row and nowhere else, so the routine pickers hid the one line
that says *his number is 30 s* or *swap this if the shoulder pinches*. Notes now render in the
picker too, under the dose.

**Each exercise says what it costs.** `exCost()` rates every exercise 1, 2 or 3 and the how-to shows
it under the name, with the same three-bar load meter the session chips use, because this is the same high-low currency the
whole program runs on:

| | meaning |
|---|---|
| Light · stack freely | no meaningful CNS cost — tissue, mobility, breath, the daily work |
| Moderate | most isometrics, most strength, the armor tracks |
| Taxing · do fresh | sprinting, intensive plyos, eccentrics, the heaviest bilateral lifts |

Most of it derives from category and tags. Nineteen exercises carry an explicit `cost` because the
derivation would be wrong on them, and those are the interesting cases: barefoot pogos and the
rebound flow are *deliberately* extensive and submaximal, so they are light despite being plyos;
A-skips and wall drills are technique rather than sprinting; extensive tempo is rated light because
the program uses it to *accelerate* recovery, while the repeat-sprint protocol next to it is rated
taxing. `check-data.js` enforces that `cost` is 1, 2 or 3.

### Picks from several blocks, one session

Selecting exercises used to be a per-card affair: pick three things in Tight Hips, hit
**Run 3 selected**, and if you also wanted one thing out of Legs · Quick you ran a
second session afterwards. Picks are now one queue. `RSEL` already remembered a selection per
block; the missing piece was somewhere to see the total and a single Run.

A bar appears at the bottom of the screen the moment anything is picked, sits above the tab bar
on a phone, and hides itself while the player is open. It says how many exercises are picked,
names the blocks they came from, and gives the running estimate — then **Run together** and
**Clear**.

- **Blocks run in the order you picked from them**, not the order the data lists them. `QSEQ`
  records which block was picked from first; within a block the authored order is kept, because
  that order is the point of a block.
- **The player names the block on each step**, so a queue spanning three blocks still says where
  you are, and *Next:* reads across the boundary.
- **The picker tells you a pick is waiting elsewhere** — `+ 2 picked in other blocks` under the
  Select all / Clear row, so you don't have to remember what you left selected two screens ago.
- **Running the queue empties it.** A stale pick that runs by surprise a day later is worse than
  re-picking, and the same rule already applied to the Today builder.

`queueBlocks()` / `queueCount()` / `queueSteps()` are the whole API; `renderQueue()` draws the bar
on every render, and the per-card **Run N selected** button still works exactly as it did.

### Train: six pages

`TRAIN_PAGES` in `data.js` is the whole Train tab. Each page is a title, one line on how to use it,
and a few complete workouts; `check-data.js` fails the build if a routine sits on no page or on two,
or if a page grows past eight workouts.

| page | workouts (minutes, at home) |
|---|---|
| The Holy Grail | The Daily Six (14) · the Holy Grail list (pick any) · the Room Circuit (21) |
| Legs | Legs · Full (36) · Legs · Quick (16) · Hamstring Insurance (17) · Hamstring Strength (25) · Plyometric Ladder (36) |
| Upper & Core | Upper Body · Quick (16) · Chest, Shoulders & Push (29) · Back & Pull (22) · Core & Trunk (18) |
| Fascia & Flow | Fascia Flow (10) · Ball Work · Legs & Hips (12) · Groundwork (6) |
| Stretch | Range Block (18) · Tight Hamstrings, Hips, Hip Flexors, Groin, Calves & Ankles, Back & Shoulders (8–24) |
| Frisbee | Frisbee Warm-Up (41) · Warm-Up · Short (25) · Sprint-Ready · Minimum (12) · Half-Time Top-Up (5) · Between Games (18) · Post-Game Flush (17) · Tournament Night (22) |

**Legs · Full** is eight moves for everything from the hips down, twice a week: the deep squat hold,
one-leg quads and glutes (split squat, hip thrust), the hamstring's two jobs (the Nordic, then the
single-leg RDL — the single-leg hamstring bridge at home), and a finish of Copenhagen hold, wall sit
and calf raise. The heavy two-leg lifts stay on the weekly plan's strength days, where they are
programmed against the rest of the week. **Legs · Quick** is six bodyweight moves for two rounds, the
same in both modes, for a busy day. **Upper Body · Quick** is five moves for three rounds with a
pull-up bar and the floor — two pushes, two pulls and a trunk move.

**Hamstring Strength** is the step after Hamstring Insurance: the Nordic for lengthening strength
through the knee, and the Askling Diver, single-leg bridge and walkout for hip extension with the knee
nearly straight — the job the biceps femoris does, and where it strains. Insurance daily while the
hamstring is cranky; Strength twice a week once it is calm; full-speed sprinting again once the
single-leg bridge reps are within about 10% side to side.

**Fascia & Flow** is the tissue and movement page. **Fascia Flow** (~10 min, any day) is the old
free wins turned into one pass: the plantar ball roll, two minutes of rebound bounces, hip circles, a
90-second deep squat, two hangs from the pull-up bar, and two minutes of box breathing. It is honest
about what it is — the effect on the tissue is short-lived, so it works because it is daily. **Ball
Work** is the same rolling trick further up the leg, after training, and **Groundwork** is Andrew
Blake's (GOATA) floor warm-up — crawl, rock back, walk in to a squat, sit in it — as an opener before
anything.

### The Holy Grail

The answer to "there is too much in here": the first page of Train, with the Daily Six, the list and the
Room Circuit.

**The Daily Six** — six moves, two rounds, about 14 minutes, at home with no weights, and safe to
repeat every day because none of them needs two days to recover from. The validator enforces that: nothing rated Taxing is allowed in.

| move | each round | for |
|---|---|---|
| Split squat hold | 40 s per side | quads & glutes |
| Push-up | 15 | chest, shoulders, arms |
| Pull-up | 6, two short of failing | back, arms |
| Long-length hamstring hold | 30 s per side | hamstrings |
| One-leg couch hip thrust hold | 30 s per side | glutes |
| Copenhagen hold | 20 s per side | groin |

**The Holy Grail** — the best for each body part out of everything in the app, one to three per
part, **all at home with no weights**: a floor, a couch or bed, a table and a pull-up bar.

| part | picks |
|---|---|
| Hamstrings | Nordic (feet under the couch) · glute bridge walkout · single-leg hamstring bridge |
| Hips & groin | single-leg hip thrust off the couch · Copenhagen off the bed · hip airplane |
| Legs | couch-elevated split squat, bodyweight · wall sit |
| Calves & ankles | single-leg calf raise off a step · pogo hops |
| Push | push-ups · pike push-ups |
| Pull | pull-ups · table rows |
| Core | dead bug · side plank |
| Movement & landing | deep squat hold · GOATA's forefoot squat hold · single-leg hop and stick |

The **single-leg hamstring bridge** (heel on the couch, knee only slightly bent) took the long-length
hold's slot — the hold is still done daily in the Daily Six — and it doubles as a test: lower scores
on it went with more hamstring strains in professional footballers. A wall sit joined Legs, and a
single-leg calf raise started a Calves & Ankles group with the pogos, because pogos build stiffness
but not calf and Achilles strength.

Two new exercises came with the no-weights rule: the **glute bridge walkout** (bridge up, walk the
heels out and back — the best bodyweight hamstring move after the Nordic) and the **single-leg hip
thrust** off the couch, which replaced the barbell hip thrust. The single-leg RDL (a dumbbell) and
the barbell split squat left the list, and the split-squat hold's how-to now treats bodyweight as the
default rather than dumbbells. `check-data.js` fails any Holy Grail item that has a Home swap, so
Gym and Home mode always show the same list.

It is a *menu*: a routine marked `open` starts with its list showing, and its Run button waits for a
tick — "Tick what you want" — rather than offering to run all nineteen. Picks here join picks from
any other card in the queue bar. `check-data.js` keeps it short: one to three per group, and a Daily
Six of exactly six.

### Room Circuit

The simple one, on the Holy Grail page. Six moves that need a floor, a bed and a pull-up bar,
run as a real circuit — every move once, a rest, then again:

| move | per round | for |
|---|---|---|
| Couch-elevated split squat | 8 per side | legs |
| Push-up | 15 | chest, shoulders, triceps |
| Toes-up bridge hold | 40 s | hamstrings |
| Side-lying abduction hold | 30 s per side | the side of the hip |
| Bear plank | 40 s | trunk |
| Copenhagen hold, off the bed | 20 s per side | groin — the weakest link |

Three rounds is about 21 minutes; stop after two on a short day.
Nothing in it takes the hip into deep flexion under load, so it works on a day the hip is grumbling.
The push-up row says what a pull-up bar laid on the floor buys you — straight wrists, and a chest
that can sink below the hands for extra range at the stretched end — and to wedge it so it can't roll.

**Circuits are a player feature now, not a data trick.** A routine can carry `rounds` and
`roundRest`. The card lists each move once; `routineSteps()` builds the whole thing — every move,
every round, the block label reading *Round 2 of 3*, and a rest after the last move of each round
but the final one, announced as *Round 1 done. Rest.* A timed step can now carry that rest too
(`after`), which the player, the estimator and the remaining-time maths all honour. Every place a
whole routine is run or timed goes through `routineSteps()`, so the card, the queue and the player
all agree. `check-timing.js` walks circuits as the player runs them, and
`check-data.js` bounds `rounds` to 2–6 and `roundRest` to 15–240 s. Inside a round the rest between
moves is only the changeover, capped at 15 s (`CIRCUIT_MOVE`), because moving on to a different
exercise *is* the rest; the real rest comes at the end of the round.

### The hip is good — the app now treats it that way

Your hip is doing well and the goal is strength, and your deep squat is pain-free. The app was
written for a hip that needed protecting, and it read that way everywhere: a "HIP LABRUM RULE" flag
on every deep squat, and hip blocks pitched as "loading a labral hip without provoking it". Now the
deep-squat flag is a one-line *check* (a front-of-hip pinch means back that rep off), and hip strength
comes from the complete workouts: the single-leg hip thrust, the split squat, the Copenhagen and the
hip airplane, loaded and progressed.

### The labral tear is the hip — and the app now says so everywhere

The tear is in the hip (acetabular) and improving. The app was first written for a shoulder (SLAP)
tear, and that premise had outlived the hip track that replaced it: the data header and this README
still said SLAP, a dozen shoulder exercises justified themselves by "your labrum", and the Upper +
Throw session's description said *overhead barbell pressing is off the menu* while its own push block
programmed overhead pressing. All of it now reasons from what is true — you are a thrower — and the
restrictions that only existed for a shoulder tear are gone (the overhead-press ban, the medicine-ball
slam kept below shoulder height, the landmine press as a *substitute*). The cuff, scapular and
thoracic work stays; a throwing shoulder wants it regardless. Eight shoulder exercises swapped their
`labrum` tag for `thrower`, so a Library search for *labrum* now finds hip work only.

## Injury prevention, against the actual data

The published epidemiology for ultimate points at the knee first (19.5–39.7% of lower-limb
injuries), the thigh second (11.9–31.9%) and the ankle third (15.5–30.1%), with a mechanism that
is overwhelmingly non-contact: decelerating, cutting and landing under accumulated fatigue.

The thigh is covered by the Nordics, the Askling protocol and the long-length isometrics — Hamstring
Insurance and Hamstring Strength on the Legs page, and the long hold in the Daily Six. The knee and
ankle get their landing work from the Plyometric Ladder's stuck landings, the single-leg hop and stick
in the Holy Grail, and the wall sit and calf raises in Legs · Full, and the end of every warm-up
rehearses deceleration with build-ups and cutting build-ups.

The hip flexor needs both halves and usually gets one. It is a sprint muscle — flexion above 90°
drives knee lift and stride frequency — and a short one caps hip extension, which is where sprint
force comes from. Its strength comes from the standing hip-flexor hold in the warm-ups and its length
from Tight Hip Flexors. The couch stretch takes the hip into *extension* — the opposite end from the
flexion-adduction-internal-rotation position a labrum objects to — so it needs no caution.

**Sprint-Ready · Minimum** (~12 min) is the fourth warm-up: what survives when the warm-up is
stripped to only the load-bearing parts — raise, leg swings, one hamstring long-length isometric,
and four graded build-ups. It exists because a short warm-up that gets done beats a thorough one
that gets skipped.

## After the game, and between games

Three separate problems, three blocks, on Train → Frisbee:

- **Post-Game Flush** (~17 min) — after a single game. Deliberately narrow, because the evidence
  for active cool-downs is weak: the best review of the question found them largely ineffective
  for soreness, performance and injury. What it is actually for is getting range back before you
  stiffen overnight and dropping out of a sympathetic state so eating and sleeping happen sooner.
- **Between Games** (~18 min) — a long gap at a tournament, which is a different problem from
  half-time: fully cold, possibly stiff, but with a game already in the legs. Spend the first hour
  horizontal and eating; start this about twenty minutes before pull and do not skip the top of
  the intensity ladder.
- **Tournament Night** (~25 min) — day one done, playing again tomorrow. The block itself is the
  small part; its notes carry the actual hierarchy — sleep, then carbohydrate early (~1 g/kg/hr
  for the first few hours), then protein and fluid. Cold water immersion is included *here*
  specifically, because it improves next-day sprint recovery at a tournament while blunting
  adaptation when used after ordinary strength training.

The reasoning, including what is theatre, is in More → Read, under **Recovery, Honestly**.

## Ball work

The plantar roll now leads all four pre-play warm-ups (not Half-Time — cleats are on and it is five
minutes), placed first so it happens sitting down while lacing up, at no cost in warm-up time. Its
own prescription reads "always before any session with sprinting or hamstring loading", and until
now not one warm-up contained it; the Daily Armor's copy also ran at the *end* of every session,
which is the opposite of what that line asks for. `buildSteps` now moves the armor copy to the
front of a session, or drops it when the session already prescribes one, so the written rule and
the actual running order agree.

Plantar rolling is the best-evidenced item in the program — a large-effect improvement in hamstring
and lumbar range without stretching the hamstring at all — and it sits in the Daily Armor, the
warm-ups and Fascia Flow. **Ball Work · Legs & Hips** (~12 min, Train → Fascia & Flow) applies the same trick to the
four targets above the ankle worth having: glute and deep rotators, lateral hip (TFL and glute
medius), adductor, and calf plus peroneals.

The claim is deliberately modest and matches the fascia article: the effect is neurological, fades
within about half an hour, and costs no strength — so it is a primer or a comfort measure, not a
treatment. Two things are left out on purpose. The IT band, because it is anchored fascia that
cannot be lengthened and rolling it is mostly just painful, and the front of the hip crease, which
is the wrong neighbourhood for a labral hip.

`check-data.js` validates the content schema — field types, referenced exercise ids, unique
routine and article ids, and that no routine carries a tag no screen renders. Run it with
`node training/check-data.js`.

## The audit pass

Two validators run without a browser:

- `node training/check-data.js` — content schema: field types, referenced ids, unique ids, every
  routine tag renders, every routine sits on exactly one Train page.
- `node training/audit.js` — loads the app's own estimator in a Node `vm` sandbox and walks every
  step the app can build (every session block, routine, the armor): doses the estimator cannot
  read, per-side doses whose round count would leave sides unbalanced, per-side steps with no
  changeover (so no switch alert), outlier durations, and a duration table for every routine and
  session. Exit 1 on errors.

The first run of `audit.js` found that any bare count without a "×" — "15 per side",
"10 switches", "4 singles", "3 max broad jumps" — fell to a flat 60 s. That was most of the
activation work in the warm-ups. `manualSeconds` now reads a leading count followed by a
non-unit word, and a bare distance. Copenhagen items outside a ladder week now resolve to the
week-1 dose instead of an unreadable sentence, and the three authored doses with no number
carry an `est`. The two sessions over 100 minutes were trimmed to 98 and 95.

A Playwright sweep (`everything.js` in the scratchpad) opens all 150 how-tos, runs all 29 routines
end to end, and starts all 24 sessions, failing on any page error.

## Elastic and isometric

The app is named after ground contact and had no block devoted to it — plyometrics lived as
garnish inside lifting sessions. The **Plyometric Ladder** (~36 min, Train → Legs → Spring) fixes
that: extensive to intensive — prime, pogos, single-leg pogos, low hurdle rebounds, skater bounds,
alternating bounds, stuck broad jumps, then depth jumps behind a gate. The gate is a countermovement
jump within 10% of the logged best; below it, the ladder ends after the bounds. Phase labels render in
the list and the player. (The isometric-contrast blocks that sat beside it went in the lean cut.)

**Ground Contact: Plyometrics, Properly** is the article behind it, under More → Read: fast vs slow
stretch-shortening cycle, RSI as the number that matters (it is the Drop Jump test under More →
Tests), contacts not sets, box height by rebound not by height, the 48-hour rule, landing quality
tied to the knee data, and the honest size of the potentiation effect. Flanagan & Comyns, the
Ramirez-Campillo plyometric reviews and Seitz & Haff are in Sources.

## Sides on hand-counted sets

A set the athlete counts themselves — "8 per side", "3 x 6 per side" — used to run as a single
step whose **Done** ended the exercise, with nothing saying to switch. Only *timed* per-side work
got the changeover screen. That affected 44 distinct doses across the app: clamshells, 8-way hips,
the whole Askling protocol, single-leg RDLs, skater bounds.

`makeStep` now takes a hand-counted step's round count from its dose through the same `SIDE_MULT`
the timed path uses, so those steps run two rounds with the existing switch screen, tone, voice
line and Left/Right chip between them. **Done** reads "Done · this side" while a side remains and
finishes only the side; **Finish exercise** still ends the whole thing. `sides.js` covers it.

Two knock-on fixes: a hand-counted step contributed zero to the header's remaining-time estimate,
so a set you were part-way through read "~0 s left" — it now uses the step's own estimate. And
three compound doses were ambiguous once sides were real, because "per side" only applied to part
of them: the pogo prescription split into its double-leg and single-leg halves, the 90/90 dose
now names the hold, and the glute bridge dropped its double-leg preamble into the exercise's own
steps.

## What each thing is for

Exercises can carry a `targets` string — plain language, not tags: "Glute max · hip extension",
"Achilles & calves · ankle stiffness". It renders in three places: under the name in the how-to,
under the dose in the player (so mid-set you know what you are supposed to feel), and as a short
authored **Targets** line inside a routine card's *About this workout* fold. The card line is written, not
derived — a union of seventeen items is a paragraph, not a label — and `check-data.js` verifies
every term in it against the items' own targets, so it cannot claim something the block does not do. `check-data.js`
requires it on every warm-up item. The Frisbee Warm-Up also gained a **Standing Hip Flexor
Isometric** in the activate block, right after the glute bridge: extensor, then the flexor it
works against. Until then the hip flexors were mobilised (lunges, leg swings) and driven (A-skips)
but never activated.

## The warm-up order

The Frisbee Warm-Up runs strict RAMP, and now says so: each item carries an optional `g` group
label, rendered as a divider in the list and as the block name in the player, so you can see
which phase you are in rather than trusting the order.

    PREP        plantar roll, sitting, while you lace up
    RAISE       easy jog — nothing else works before this
    MOBILISE    leg swings, lunge with rotation, deep squat hold, adductor rock-back
    ACTIVATE    clamshells, 8-way hips, glute bridge, adductor squeeze, hamstring isometric
    POTENTIATE  A-skip, carioca, pogos, build-ups at 60/75/90/95%, cutting build-ups

Nothing fast happens before the raise, and the intensity ladder is unbroken from a skip to a
95% run to a cut — `ramp.js` asserts that ordering rather than leaving it to inspection.

One gap this audit found: every hip item in the warm-up was abduction or rotation — clamshells,
8-way hips, glute medius. Nothing asked the gluteus maximus to *extend* the hip, which is the
propulsive action in sprinting, so the first few strides were handing more work to the hamstring.
**Glute Bridge → Single Leg** now closes that, for about thirty seconds.

## Deploying it

`node training/build.js` also writes `netlify/` — a drag-and-drop deploy folder. Drop it on
https://app.netlify.com/drop and it is live. The folder is generated; edit `training/` and rebuild
rather than touching it.

It is a proper installable app once deployed: `manifest.webmanifest` plus icons make it
add-to-home-screen on iOS and Android, and `sw.js` caches the shell so it opens **with no signal** —
which matters, because the place you most need it is a field. The cache name is stamped with a hash
of the page, so a rebuild evicts the old one. Fonts are the only external request, and the CSS
carries real fallback stacks for when they cannot load.

### Two ways to deploy

- **`index-deploy.html`** — the whole app as one file. Drag it straight onto Netlify Drop, which
  accepts a lone HTML file. Nothing to unzip. The manifest and the touch icon are inlined as data
  URIs, so it still adds to an iPhone home screen; it also opens by double-clicking from disk. The
  one thing it cannot do is register a service worker, so this version has no offline cache.
- **`netlify/`** — the folder. Same app plus `sw.js`, the manifest and icons as real files, so it
  installs on Android too and works with no signal. Drag the folder, or connect the repo to Netlify
  with the publish directory set to `netlify` and skip dragging entirely.

### The icon

`assets/icon.svg` is the source: a disc in flight, seen edge-on, in the app's own field green and
disc yellow. `assets/icon-192.png` and `icon-512.png` are rendered from it headlessly, and `build.js`
copies them into `netlify/`. To change the mark, edit the SVG and re-render both PNGs rather than
editing the bitmaps. It is drawn inside the maskable safe zone (the middle 80%), so Android can crop
it to any shape without clipping the disc, and it still reads at 32px in a browser tab.

## The look

The identity was right — turf-biased neutrals, field green, disc yellow, Archivo over IBM Plex —
but the treatment was loud: monospace uppercase on every label, a hairline border on every
surface, 3px corners, dotted rules, and a four-item status strip crammed into a phone header.
The pass was restraint, not a restyle:

- **Type.** Uppercase is now a role, not a default: the eyebrow above a thing, the small label on
  a block or table, the phase dividers in a running list, and the exercise name in the player
  (read at arm's length mid-set). Section headings, chips, tabs, the status strip and the player's
  controls are sentence case in the body face. Mono is reserved for numbers, times and doses.
- **Shape.** One radius scale (`--r-sm` 8, `--r-md` 12, `--r-lg` 16, pills at 999) and one soft
  lift (`--lift`). Surfaces sit on the ground by contrast, so their edge is `--edge` — the line
  token at 60% — instead of a full hairline. List rows keep their separators; cards do not.
- **Header on a phone.** One line: the mark, today's session, the Gym/Home toggle. Phase and
  week live on Today and under More → Your plan, where they are already shown.
- The dotted "trace" rule under headings is retired (kept in the DOM, `display: none`).

Nothing about colour changed; the validated palette and both themes are untouched.

## Getting around

### Today is a launchpad, not a checklist

Today used to list all 23 exercises of the day across four screens, with an explanatory note under
most rows. The player walks you through them one at a time anyway, so that list was reference
material occupying the screen you open most. It now shows the session as four collapsed block
headers with counts, opening on tap, and the Daily Armor runs at the end of the session.

| | before | after |
|---|---|---|
| words | 468 | 157 |
| screens tall | 4.1 | 1.8 |
| tappable elements | 94 | 51 |

### A general athlete's app with a frisbee layer

Frisbee is one page of six rather than the front door, because the daily and range work carries any
sport and Frisbee is the game-day layer on top. Every frisbee
section is untouched: the five warm-ups, the play groups, the UFA-anchored phases and the game-model
conditioning all stay exactly as they were. The change is framing, not content.

The Train tab is a hub, not a scroll: six doors, each opening one page with a way back. Frisbee is the
game-day page and groups everything by when you reach for it: **Before you play**, **Between games**,
**After you play**. `TRAIN_PAGES` in `data.js` defines every page, and `check-data.js` fails the build
if a routine is on none of them.

Three things follow from treating this as a phone app rather than a document:

- A routine's rationale and targets are collapsed behind **About this workout**, so a list of
  blocks stays scannable. Open state persists across re-renders.
- The Library is two tabs, **Browse** and **Build a session**. It used to render all 149 exercise
  cards *and* 149 builder cards on one page — roughly 39 phone screens. Search and the category
  chips are sticky, so they stay reachable inside a long list.
- Tapping the tab you are already on returns to that screen's top level.

Keyboard — app: `1`–`4` switch tabs. Player: `Space` pause/done, `←` `→` step, `Esc` exit.

## Not following the plan

Any day can be swapped: **Train something else** on the Today screen lists every session with its
type and computed length, marks the planned one, and flags any choice that would put two
CNS-expensive days back to back against the day before or after. The override is stored per date
in `S.override`, so the week grid, estimates and weekly balance all follow it.

**More → Your plan** carries a **weekly balance** panel — high days, max-velocity exposures,
Copenhagen sessions, Nordic sessions — measured against what *this phase* plans rather than a
fixed target, so a restoration block with no high days reads as correct instead of a shortfall.
Plus a warning naming any back-to-back high days. That is the check that keeps improvisation honest: day order is
flexible, weekly structure is not.

## Voice

The player speaks each exercise, each rest and every side switch. It ranks the browser's
available voices and picks the best English one rather than the default, preferring enhanced /
premium / neural voices and demoting the novelty ones. **Change voice** (in the player, under More → Backup &
voice, or in the desktop sidebar) lists them with a tap-to-hear preview, three speeds, and an off switch. On iOS the best
voices are a free download under Settings › Accessibility › Spoken Content › Voices.

## Durations

Every duration in the app comes from one estimator that mirrors what the player actually does:
a 4-second count-in per exercise, work × rounds plus the rests between them for timed work, and
for hand-timed sets a read of the dose text (sets × reps at a per-category tempo, sprint
distances with their stated rest, explicit minutes). Sessions dominated by an activity the app
can't time — a game, a team practice, pickleball — carry `fixed: true` and use their authored
duration instead; a few exercises carry an explicit `est` for the same reason.

**The written dose drives the timer.** `timerFromDose` turns "3 × 25 s per side" into 6 rounds of
25 seconds, so the row, the countdown and the estimate can never describe three different
workouts. An item can pass `t: { r: 15 }` to tighten a rest for its context (a daily circuit
versus a dedicated block).

**"Left" means left of the whole step.** The figure in the player's top bar is the remaining
steps plus whatever is left of the one you are on, and that second part used to be read straight
off the countdown — so a four-round, 45-second hold announced itself as "~3 s left" on the ready
screen, because only the round in front of you was counted. `hereSeconds()` now walks the rest of
the step: remaining rounds, the rests between them, the eight-second switch rest a per-side dose
forces, and for a hand-counted set the estimate for the rounds you have not started. Checked
against the estimator for all 553 steps the app can build, the ready screen now matches
`stepSeconds` exactly.

Every item has a checkbox — tick any of them and a floating bar offers to run just those, with
a time estimate. No mode to enter. Every routine card carries the same idea on two plain
buttons: **▶ Run all N** and **Pick exercises**, which opens the item list in place with
**Select all** / **Clear** and reports the count on its own face (`3 of 14 picked`). Picking
rewrites the run button to **Run 3 selected** and re-estimates the card. The list stays open
across taps, and tapping an exercise's name there still opens its how-to. The library's builder
uses the same checkboxes. There is one timer in the app: the player. "Start session here",
"Run this exercise" and "Mark done today" live in the exercise dialog rather than as per-row
buttons.

## Injury context

The athlete's labral tear is **acetabular (hip)**, not shoulder. That shapes the program more
than a rehab track would: flexion + adduction + internal rotation is the provocative position,
which puts deep squat holds, pancakes and hard cuts on the list of things to calibrate rather
than assume. Seven deep-flexion exercises carry a `HIP LABRUM RULE` flag with the pinch test
and the modifications; hip rotation isometrics at a neutral angle and glute medius work sit in
the Daily Armor; the readiness check-in has its own hip flag that pulls deep flexion and
full-speed cutting for the day. Shoulder work remains, reframed as throwing-volume maintenance
rather than labral rehab.

## Files

```
index.html      shell — loads the three files below
styles.css      design tokens (light + dark, both selected) and all component styles
data.js         exercises, sessions, phases, tests, articles — all the content
app.js          router, timer engine, persistence, charts
build.js        inlines the above into standalone.html
standalone.html generated single-file build — save it anywhere, works offline

check-data.js   schema, ids, tags, every routine on exactly one Train page, the README's own counts
audit.js        loads the estimator and walks every step the app can build
check-timing.js the player's "left" figure, against the estimator, for every step and phase
check-ui.js     drives the app in Chromium: four tabs, the six Train pages, the queue, slim rows, Home mode
```

Run all four before committing a content change:

```
node training/check-data.js && node training/audit.js && \
node training/check-timing.js && node training/check-ui.js
```

After editing `data.js`, `app.js` or `styles.css`, regenerate the single-file build:

```
node training/build.js
```

## Data

Everything lives in `localStorage` under `groundcontact.v1`, on the device that wrote it.
**Copy backup** (More → Backup & voice) puts a JSON blob on the clipboard; **Restore backup** takes it back. Do that
before clearing site data, and after any test battery you care about.

## Scope

This is a training program written from the published research and from a description of the
athlete. It is not a medical assessment. A labral tear and a hamstring strain are worth a
sports physio's eyes at least once — particularly to measure shoulder internal rotation
properly and to confirm what kind of labral lesion is present.
