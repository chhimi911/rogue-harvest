# TESTING_SKILLS.md

## Purpose

These skills define repeatable QA workflows Codex can run against Rogue Harvest.

Use them in order unless a build blocker prevents testing.

---

## Skill: Build Health Check

### Use When
Starting any review pass.

### Instructions
1. Inspect package manager and scripts.
2. Install dependencies if needed.
3. Run available build/type/lint/test commands.
4. Fix obvious blocking errors.
5. Report unavailable scripts instead of inventing them.

### Output
- `QA_REPORT.md`
- `BUGS.md`

---

## Skill: MVP Flow Smoke Test

### Use When
The app can run or build.

### Instructions
Test the full MVP loop:

1. Title or start screen appears.
2. Start run.
3. Enter battle.
4. Draw cards.
5. Play an attack.
6. Play a defensive card.
7. End turn.
8. Enemy intent resolves.
9. Win battle.
10. Choose reward.
11. Continue to next node.
12. Reach boss or run end.
13. Trigger victory or defeat.

### Output
- `QA_REPORT.md`
- `BUGS.md`

---

## Skill: Card Behavior Test

### Use When
Reviewing card combat.

### Instructions
Check every card in the current data set.

For each card:

- Name is visible.
- Type is visible.
- Cost is visible.
- Description matches behavior.
- Card cannot be played without enough energy.
- Targeting works.
- Discard/exhaust behavior works if implemented.
- No card crashes combat.

### Output
- `BALANCE_NOTES.md`
- `BUGS.md`

---

## Skill: Enemy Intent Test

### Use When
Reviewing combat fairness.

### Instructions
Check each enemy:

- Enemy name appears.
- HP appears.
- Intent appears before enemy acts.
- Intent matches actual action.
- Status effects apply correctly.
- Enemy death ends battle or advances combat properly.

### Output
- `QA_REPORT.md`
- `BALANCE_NOTES.md`

---

## Skill: Reward Loop Test

### Use When
Reviewing deckbuilding.

### Instructions
Check:

- Reward screen appears after battle.
- Player can choose a card.
- Reward card is added to deck.
- Player can skip if skip exists.
- Relic rewards work if present.
- Continuing does not duplicate/break state.
- Deck size changes as expected.

### Output
- `QA_REPORT.md`
- `BUGS.md`

---

## Skill: Generated Asset Audit

### Use When
Images exist in the repo.

### Instructions
Inspect:

- `/public`
- `/src/assets`
- Any generated asset folders
- Card/enemy/relic image references

Check:

- Files exist.
- Paths are correct.
- Images load in build.
- Names are understandable.
- Images match the intended object.
- Style is cohesive.
- No hidden API dependency exists.

### Output
- `ART_ASSET_AUDIT.md`
- `ART_REQUESTS.md`

---

## Skill: New Player Readability Test

### Use When
Reviewing UX/playability.

### Instructions
Pretend the player has never played Rogue Harvest.

Check:

- What am I supposed to click first?
- What is my health?
- What is enemy health?
- What does the enemy plan to do?
- How much energy do I have?
- Which cards can I afford?
- What happened after I played a card?
- Why did I take damage?
- What do rewards do?
- How do I know I won or lost?

### Output
- `QA_REPORT.md`
- `RECOMMENDATIONS.md`

---

## Skill: Scope Creep Filter

### Use When
Creating recommendations.

### Instructions
Sort every idea into one bucket:

1. Must fix before next demo
2. Should fix soon
3. Nice later
4. Do not build yet

Only "Must fix before next demo" can be implemented immediately.

### Output
- `MVP_BACKLOG.md`
