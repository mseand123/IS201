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
| **Program** | This week's microcycle with CNS-cost meters, the whole periodised year against the UFA calendar, and the 10-week Copenhagen ladder. |
| **Library** | 78 exercises. Each has set-up, step-by-step execution, coaching cues, the faults that ruin it, dose, progression/regression, and why it is in the program. |
| **Tests** | 19-test battery on a 4-week cycle, with trend charts, targets and protocols. |
| **Method** | Nine essays: the training model, isometric taxonomy, an honest read on fascia, injury dossiers for the adductor / hamstring / labrum, fuelling, the UFA game-model numbers, and sources. |

A timer runs in a dock that persists across views: every timed exercise has a `⏱` button that
loads its prescribed work / rest / rounds, with audio cues on the last three seconds.

Keyboard: `1`–`5` switch views, `Space` pauses the timer, `Esc` closes a dialog.

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
