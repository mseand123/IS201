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

**Start guided session** on the Today screen opens a full-screen player that walks the whole
session — every block, then the Daily Armor — one exercise at a time:

- A four-second count-in per exercise, then the timer, with beeps on the last three seconds
- Timed exercises run their prescribed work / rest / rounds; rep-based sets count up and wait
  for you to tap **Done**
- Coaching cues rotate every six seconds inside the exercise; between-round rests show the
  switch instruction ("Switch feet"), between-exercise rests announce what's next
- Speech announces each exercise and each rest — toggle it with **Voice on / off**
- **Back**, **Pause**, **Done early** / **Skip**, and **Show how-to** without losing your place
- Screen wake lock while it runs; completed exercises tick themselves off on the Today screen

**Pick & run** on the Today screen turns the session into a selector: tap the exercises you
have time for, see the running time estimate, and run only those. The `▶` on any item starts
the player from that exercise instead. A separate quick timer for a single
exercise lives in the exercise detail dialog and floats in a dock.

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

19 exercises tagged `desk`, each labelled by how visible it is — `invisible` (nobody can tell),
`subtle` (reads as fidgeting), `private` (fine alone, not in an open-plan office). Six desk
routines in the Desk view run them as guided circuits, from a two-minute hourly reset to a
five-minute adductor / hamstring / cuff block. The rationale: the armor protocols respond to
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
