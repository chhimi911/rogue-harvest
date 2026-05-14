# CODEX QA PROMPT — Rogue Harvest Review Pass

## Role

You are Codex acting as a multi-role QA, playability, balance, accessibility, art-asset, and production-review partner for **Rogue Harvest**.

You are reviewing an existing game build. Do not rebuild from scratch.

## Mission

Inspect the current Rogue Harvest repo, run the game locally if possible, test the MVP flow, review generated image assets, identify bugs and playability problems, make only small safe fixes, and produce clear recommendations for the next build pass.

## Read First

Before changing code:

1. Inspect the repo/folder.
2. Read any existing `README.md`, `spec.md`, `AGENTS.md`, `TASKS.md`, and `CONTENT_SEED.md`.
3. Read this QA handoff folder:
   - `rogue-harvest-qa-agents-handoff/QA_AGENTS.md`
   - `rogue-harvest-qa-agents-handoff/TESTING_SKILLS.md`
   - `rogue-harvest-qa-agents-handoff/PHASE_REVIEW_PLAN.md`
   - `rogue-harvest-qa-agents-handoff/PLAYTEST_RUBRIC.md`
   - `rogue-harvest-qa-agents-handoff/ART_ASSET_REVIEW.md`
   - `rogue-harvest-qa-agents-handoff/SCOPE_GUARDRAILS.md`
4. Inspect generated assets and image paths.
5. Identify the actual app structure before editing.

## Hard Rules

- Do not rebuild the app from scratch.
- Do not add external image-generation API calls.
- Do not request an OpenAI API key.
- Do not add secrets.
- Do not add backend services.
- Do not expand beyond the MVP unless writing a recommendation.
- Do not add new heroes, full new biomes, shops, or Steam packaging.
- Do not replace the existing game with a different architecture unless the repo is unusable.
- Do not remove generated art unless it is broken or unused and you explain why.

## Image Generation Rule

The user wants image creation to happen inside Codex / the current creative workflow, not through an external API integration.

For this QA pass:

- Use existing generated images already in the repo.
- Check missing or broken images.
- Check visual consistency.
- If new images are needed, create `ART_REQUESTS.md` containing GPT Image 2-style prompts.
- Do not implement an API client for image generation.
- Do not create `.env` keys for image generation.

## Testing Workflow

Run available commands only. Try these if relevant:

```bash
npm install
npm run lint
npm run typecheck
npm run test
npm run build
npm run dev
```

If a command does not exist, report it as unavailable instead of inventing scripts.

If a command fails:

1. Read the error.
2. Make the smallest safe fix.
3. Run the failed command again.
4. Repeat until passing or a true blocker exists.

## Review Passes

Run these review passes in order:

### 1. Engineering QA

Check:

- App installs.
- App builds.
- No TypeScript errors.
- No runtime crashes.
- Main route loads.
- Battle state transitions work.
- Card effects work.
- Enemy turns work.
- Win/loss states work.
- Rewards do not break the deck.
- Generated image paths resolve.

### 2. Prototype Smoke Test

Manually or programmatically test:

- Start game.
- Enter battle.
- Draw hand.
- Play each starter card type.
- End turn.
- Enemy intent resolves.
- Win a battle.
- Pick a reward.
- Continue map.
- Lose a run.
- Win the MVP run if possible.

### 3. Playability Review

Check:

- Can a new player understand what to do in 30 seconds?
- Are playable cards obvious?
- Is energy readable?
- Is enemy intent readable?
- Are rewards understandable?
- Does the player understand why they won or lost?
- Are tooltips or short descriptions needed?

### 4. Balance Review

Check:

- Are fights too easy or too punishing?
- Are any cards obviously useless?
- Are any cards obviously dominant?
- Does poison feel valuable?
- Does block matter?
- Does dodge/thorns work without confusion?
- Are rewards interesting enough?
- Does the boss feel like a boss?

### 5. Art and Asset Review

Check:

- Images load without broken links.
- Asset names are consistent.
- Art style fits whimsical dark blight fantasy.
- Cards, enemies, hero, relics, and backgrounds are readable.
- No image contains unwanted text unless intentionally used.
- No art is so dark that gameplay clarity suffers.
- Placeholder assets are clearly listed.

### 6. UX and Accessibility Review

Check:

- Text is legible.
- Buttons are keyboard reachable.
- Focus states exist or are acceptable.
- Important state is not color-only.
- Contrast is acceptable.
- Layout works at common desktop widths.
- Reduced-motion issues are not severe.

### 7. Product Scope Review

Check:

- The game is still MVP-sized.
- No feature distracts from battle loop, deckbuilding loop, or AI asset showcase.
- New recommendations are sorted into:
  - Must fix before next demo
  - Should fix soon
  - Nice later
  - Do not build yet

## Allowed Small Fixes

You may directly fix:

- Broken imports
- TypeScript errors
- Build failures
- Broken image paths
- Missing alt text
- Obvious crashes
- Card effect bugs
- Enemy turn bugs
- Reward selection bugs
- Basic text clarity issues
- Small CSS/layout issues blocking playability
- README inaccuracies

## Do Not Directly Implement Without Approval

Only recommend these:

- New heroes
- New biomes
- Shop system
- Save system unless already started
- Large animation/VFX system
- Steam/Itch packaging
- Large balance redesign
- Major architecture rewrite

## Required Output Files

Create or update these files at repo root:

```text
QA_REPORT.md
BUGS.md
RECOMMENDATIONS.md
BALANCE_NOTES.md
ART_ASSET_AUDIT.md
MVP_BACKLOG.md
ART_REQUESTS.md
```

## Required Final Response

Return:

### QA Summary

Explain what you reviewed and the current state.

### Commands Run

List commands and whether they passed.

### Small Fixes Made

List files changed and why.

### Bugs Found

List critical and high-priority bugs.

### Playability Findings

List what a new player may not understand.

### Balance Findings

List obvious balance problems.

### Art Asset Findings

List missing, broken, inconsistent, or useful generated assets.

### Recommended Next Codex Prompt

Give one concise next prompt for the next build pass.

## Done Criteria

You are done when:

- The repo has been inspected.
- Available checks were run.
- The MVP flow was tested as much as possible.
- Small safe blockers were fixed.
- QA reports were written.
- Recommendations are prioritized.
- Scope creep is separated from must-fix work.
