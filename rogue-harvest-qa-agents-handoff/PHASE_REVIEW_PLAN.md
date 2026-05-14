# PHASE_REVIEW_PLAN.md

## Purpose

This converts the Rogue Harvest production phases into Codex review gates.

Codex should use these gates to evaluate the current build without expanding scope.

---

## Step 1: Concept Lock Review

### Goal
Confirm the core fantasy and MVP identity are still intact.

### Check
- Core fantasy: produce hero vs the Blight.
- Main character: Blackberry Rogue.
- Enemy types: garden corruption / rot / mold / pests.
- Card types: attack, defense, utility, poison/debuff.
- Run structure: start, battle nodes, rewards, boss, win/loss.
- Win/lose condition exists.

### Output
`QA_REPORT.md` section: Concept Lock Status.

---

## Step 2: Prototype Review

### Goal
Confirm the basic prototype loop works.

### Expected Minimum
- One playable hero.
- One combat screen.
- At least five working cards.
- Three enemies or enough enemy variety for testing.
- One reward screen.
- One basic run loop.

### Output
`QA_REPORT.md` section: Prototype Status.

---

## Step 3: Vertical Slice Review

### Goal
Confirm the demo feels like one coherent slice of Rogue Harvest.

### Expected Minimum
- One complete Starter Patch-style biome.
- 10–15+ cards if already built.
- 3–5+ enemies if already built.
- One boss.
- Basic art style.
- Generated or placeholder art loading.
- Basic sound only if already implemented.

### Output
`QA_REPORT.md` section: Vertical Slice Readiness.

---

## Step 4: MVP Production Readiness Review

### Goal
Check whether the game is ready for a bigger production pass.

### Expected Future Direction
- One strong hero is enough for this MVP.
- Do not force three heroes yet.
- 30–50 cards is later unless the current system is stable.
- Three biomes are later.
- Basic progression and unlocks are later.

### Output
`MVP_BACKLOG.md` section: Production Readiness.

---

## Step 5: Testing Review

### Goal
Evaluate whether the game is understandable, fair, readable, and interesting.

### Test Questions
- Can players understand the game?
- Are runs too long?
- Are cards readable?
- Are enemies fair?
- Are rewards interesting?
- Is one strategy too strong?

### Output
`QA_REPORT.md`, `BALANCE_NOTES.md`, and `RECOMMENDATIONS.md`.

---

## Step 6: Launch Readiness Review

### Goal
Do not launch yet. Prepare the list of what launch would require.

### Itch.io First
Only recommend Itch.io when:
- The app builds cleanly.
- Basic play loop works.
- There is at least one satisfying run.
- Critical bugs are gone.
- README has run/build instructions.
- Generated art is legally and visually acceptable for public demo use.

### Steam Later
Steam demo and Early Access are future phases.

### Output
`MVP_BACKLOG.md` section: Launch Later.

---

## Step 7: Updates Review

### Goal
Prepare patch/update process after the MVP works.

### Patch Categories
- Bug fixes
- Balance changes
- New cards
- New enemies
- New vegetable heroes
- New bosses

### Output
`MVP_BACKLOG.md` section: Future Updates.
