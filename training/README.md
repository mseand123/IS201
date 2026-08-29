# Ground Contact

An elastic-athlete training system built for one athlete: 25, 6'1", 150 lb, professional
UFA ultimate, 4.6 DUPR pickleball, with a prior SLAP-type labral tear, a weak adductor and
a hamstring strain history.

Open `index.html` (or `training/` on the published site). Everything runs in the browser and
saves to `localStorage` on that device — no account, no server, no network needed after the
fonts load.

## What is in it

| View | What it does |
|---|---|
| **Today** | Resolves the date against the annual plan and renders that session — every block, dose and coaching note — plus a readiness check-in that auto-regulates the day, the Daily Armor, and a notes field. |
| **Program** | This week's microcycle with CNS-cost meters, the periodised year against the UFA calendar, standalone weak-link blocks, short sessions, and the 10-week Copenhagen ladder. |
| **Library** | 95 exercises, filterable to the 74 that need no gym. Each has set-up, step-by-step execution, coaching cues, the faults that ruin it, dose, progression/regression, and why it is in the program. |
| **Tests** | 22-test battery on a 4-week cycle, with trend charts, targets and protocols. Hip internal rotation and the FADIR score lead it. |
| **Method** | Eleven essays: the training model, isometric taxonomy, an honest read on fascia, training without a gym, injury dossiers for the hip labrum / adductor / hamstring, throwing-shoulder load management, fuelling, the UFA game-model numbers, and sources. |

## Gym / Home

A toggle in the status strip switches equipment mode. In **Home** mode every lift that needs a
gym is swapped in place for a bodyweight, doorway or backpack equivalent (marked `HOME` on the
item), and exercises that work either way show their at-home adaptation. Phases, sessions and
ordering are identical in both modes — only the implement changes. Sprinting, jumping and the
whole Daily Armor were never gym work and are unchanged.

The map lives in `HOME_SUB` in `data.js`: `gymExerciseId → { x: homeExerciseId, d: dose }`.
Anything not in that map already works at home. The Library has a **No gym needed** filter that
reads the same map, and the Method section has an essay on what a home track actually costs.

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

Three RAMP-ordered warm-ups lead the Program screen and sit on the Today quick-start row:
**Frisbee Warm-Up** (~33 min, game day), **Warm-Up · Short** (~21 min) and **Half-Time Top-Up**
(~5 min). They are legs-and-hips only — getting the body ready to sprint — with no throwing
block; the arm warm-up lives in the Upper + Throw session instead. Eleven new exercises back
them, including 8-way hips and clamshells, a short deep squat hold placed early, and graded
build-up runs and cutting build-ups so the first hard plant of the day is deliberate.

## Stretching

There is no static stretching in any of the three warm-ups — they are dynamic, activation and
potentiation only. The reasoning is in the Method screen under **Stretching, Static and Dynamic**:
the acute force loss is real but small and dose-dependent (meaningful past ~60 s per muscle,
trivial below), and the more important point is that stretching has no demonstrated
injury-prevention effect where strength training has a large one. Two athlete-specific cautions
apply — passive end-range hip flexion/adduction/IR is the provocative position for a labral hip,
and "tight hamstrings" in a sprinter is usually protective tone rather than short tissue.

The static work moved to the **Range Block** (Program → Getting longer): ~18 minutes of loaded and
actively-held positions run after a session or on an off day, dosed weekly (~5 min accumulated per
muscle group per week) rather than daily. The deep squat hold is the one static position kept in
the warm-up — short, loaded, early, and doubling as a daily read on the hip.

## Injury prevention, against the actual data

The published epidemiology for ultimate points at the knee first (19.5–39.7% of lower-limb
injuries), the thigh second (11.9–31.9%) and the ankle third (15.5–30.1%), with a mechanism that
is overwhelmingly non-contact: decelerating, cutting and landing under accumulated fatigue. The
thigh was already covered by the Nordics, the Askling L-protocol and the long-length isometrics.
**Knee & Ankle Insurance** (Program → Weak-link blocks, ~23 min) covers the other two — a
single-leg balance progression, banded ankle eversion for the peroneals, lateral bound-and-stick
for frontal-plane landing control, deceleration mechanics, single-leg RDLs and tibialis raises.
It is written to be run *tired* rather than fresh, because fatigue is the condition the injury
happens in.

**Sprint-Ready · Minimum** (~10 min) is the fourth warm-up: what survives when the warm-up is
stripped to only the load-bearing parts — raise, leg swings, one hamstring long-length isometric,
and four graded build-ups. It exists because a short warm-up that gets done beats a thorough one
that gets skipped.

## After the game, and between games

Three separate problems, three blocks, on the Program screen:

- **Post-Game Flush** (~17 min) — after a single game. Deliberately narrow, because the evidence
  for active cool-downs is weak: the best review of the question found them largely ineffective
  for soreness, performance and injury. What it is actually for is getting range back before you
  stiffen overnight and dropping out of a sympathetic state so eating and sleeping happen sooner.
- **Between Games** (~16 min) — a long gap at a tournament, which is a different problem from
  half-time: fully cold, possibly stiff, but with a game already in the legs. Spend the first hour
  horizontal and eating; start this about twenty minutes before pull and do not skip the top of
  the intensity ladder.
- **Tournament Night** (~25 min) — day one done, playing again tomorrow. The block itself is the
  small part; its notes carry the actual hierarchy — sleep, then carbohydrate early (~1 g/kg/hr
  for the first few hours), then protein and fluid. Cold water immersion is included *here*
  specifically, because it improves next-day sprint recovery at a tournament while blunting
  adaptation when used after ordinary strength training.

The reasoning, including what is theatre, is in the Method screen under **Recovery, Honestly**.

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
warm-ups and under the desk. **Ball Work · Legs & Hips** (~12 min) applies the same trick to the
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

## Not following the plan

Any day can be swapped: **Train something else** on the Today screen lists every session with its
type and computed length, marks the planned one, and flags any choice that would put two
CNS-expensive days back to back against the day before or after. The override is stored per date
in `S.override`, so the week grid, estimates and weekly balance all follow it.

The Program screen carries a **weekly balance** panel — high days, max-velocity exposures,
Copenhagen sessions, Nordic sessions — measured against what *this phase* plans rather than a
fixed target, so a restoration block with no high days reads as correct instead of a shortfall.
Plus a warning naming any back-to-back high days. That is the check that keeps improvisation honest: day order is
flexible, weekly structure is not.

## Voice

The player speaks each exercise, each rest and every side switch. It ranks the browser's
available voices and picks the best English one rather than the default, preferring enhanced /
premium / neural voices and demoting the novelty ones. **Change voice** (in the player, or in the
sidebar) lists them with a tap-to-hear preview, three speeds, and an off switch. On iOS the best
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

## Desk track

27 exercises tagged `desk`, each labelled by how visible it is — `invisible` (nobody can tell),
`subtle` (reads as fidgeting), `private` (fine alone, not in an open-plan office). Nine desk
routines in the Desk view run them as guided circuits, from a three-minute hourly reset to
**The Full Desk Session** — ~43 minutes covering hip, groin, hamstring, foot, shoulder, posture
and breathing without leaving a chair. The rationale: the armor protocols respond to
frequency more than intensity, and a workday is the largest unused training window available.

Keyboard — app: `1`–`6` switch views. Player: `Space` pause/done, `←` `→` step, `Esc` exit.

## Files

```
index.html      shell — loads the three files below
styles.css      design tokens (light + dark, both selected) and all component styles
data.js         exercises, sessions, phases, tests, articles — all the content
app.js          router, timer engine, persistence, charts
build.js        inlines the above into standalone.html
standalone.html generated single-file build — save it anywhere, works offline
```

After editing `data.js`, `app.js` or `styles.css`, regenerate the single-file build:

```
node training/build.js
```

## Data

Everything lives in `localStorage` under `groundcontact.v1`, on the device that wrote it.
**Copy backup** puts a JSON blob on the clipboard; **Restore backup** takes it back. Do that
before clearing site data, and after any test battery you care about.

## Scope

This is a training program written from the published research and from a description of the
athlete. It is not a medical assessment. A labral tear and a hamstring strain are worth a
sports physio's eyes at least once — particularly to measure shoulder internal rotation
properly and to confirm what kind of labral lesion is present.
