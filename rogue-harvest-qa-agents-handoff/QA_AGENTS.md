# QA_AGENTS.md

## Purpose

These are role lenses for Codex to use while reviewing Rogue Harvest.

Codex should not literally spawn separate agents unless the environment supports it. Treat each role as a focused review pass.

## Agent 1: Engineering QA Agent

### Mission
Verify that the game runs, builds, and behaves correctly at the system level.

### Checks
- Install works.
- Dev server starts.
- Build works.
- TypeScript passes if configured.
- Tests pass if configured.
- Routes load.
- Game state transitions are valid.
- No obvious runtime errors.
- Asset imports and public paths work.

### Output
Write findings to `QA_REPORT.md` and bugs to `BUGS.md`.

## Agent 2: Gameplay Playability Agent

### Mission
Judge whether a new player can understand and complete the core loop.

### Checks
- Start run is obvious.
- Combat actions are obvious.
- Card cost and effect are readable.
- Enemy intent is understandable.
- End turn is obvious.
- Rewards are understandable.
- Win/loss result is clear.
- The next action is always visible.

### Output
Write findings to `QA_REPORT.md` and recommendations to `RECOMMENDATIONS.md`.

## Agent 3: Balance Agent

### Mission
Identify obvious balance problems before deeper tuning.

### Checks
- Card costs make sense.
- Starter deck has attack and defense.
- Poison, block, dodge, and thorns feel useful.
- Enemies are not unfair.
- Boss is harder than normal enemies.
- Rewards do not create automatic wins too early.
- No single strategy dominates the MVP.

### Output
Write findings to `BALANCE_NOTES.md`.

## Agent 4: UX and Accessibility Agent

### Mission
Make the game clearer and easier to use.

### Checks
- Text is readable.
- Buttons have clear labels.
- Keyboard navigation is acceptable.
- Focus states are visible enough.
- Important meaning is not color-only.
- Contrast is acceptable.
- Layout does not break on common desktop widths.

### Output
Write findings to `QA_REPORT.md` and `RECOMMENDATIONS.md`.

## Agent 5: Art Asset Agent

### Mission
Review generated images and visual consistency without adding API complexity.

### Checks
- Existing generated images load.
- Missing image paths are listed.
- Asset naming is stable.
- Character/enemy/card art fits the Rogue Harvest DNA.
- Images are readable at their displayed size.
- No unwanted text appears inside gameplay art.
- Placeholder assets are tracked.

### Output
Write findings to `ART_ASSET_AUDIT.md` and needed prompts to `ART_REQUESTS.md`.

## Agent 6: Product Scope Agent

### Mission
Protect MVP scope.

### Checks
- Current work supports battle loop, deckbuilding loop, asset showcase, or playability.
- Anything else is deferred.
- Recommendations are sorted by urgency.
- Launch ideas are not implemented too early.

### Output
Write findings to `MVP_BACKLOG.md`.

## Agent 7: Creative Director Review Lens

### Mission
Represent the user's approval role.

### Checks
- Does the build feel like Rogue Harvest?
- Is the Blackberry Rogue readable and charming?
- Does the Blight feel eerie but not grimdark?
- Does the game feel like a premium indie prototype?
- Is the core fantasy clear?

### Output
Write a short creative-direction section inside `QA_REPORT.md`.
