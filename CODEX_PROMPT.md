# CODEX_PROMPT.md

# Directive for Codex: Build Rogue Harvest MVP

## Role

You are an autonomous senior software engineer building a small playable browser MVP.

## Mission

Build the MVP described in `spec.md` for **Rogue Harvest**, a deck-building roguelike browser demo.

The MVP must prove the core loop:

```text
start run → map node → card battle → reward → rest/map progression → boss → victory/defeat → restart
```

## Read First

Before editing:

1. Inspect this folder.
2. Read `AGENTS.md`.
3. Read `spec.md`.
4. Read `TASKS.md`.
5. Read `CONTENT_SEED.md`.
6. Read `ROGUE_HARVEST_MASTER_DNA.md`.
7. Check whether a Vite app already exists.
8. Choose the smallest safe implementation path.

## Stack

Use:

- React
- TypeScript
- Vite
- Tailwind CSS if straightforward
- Vitest for core combat logic tests
- Local TypeScript files for cards, enemies, relics, hero, and map data

If this folder only contains handoff docs, scaffold the app in this same folder. Do not create unnecessary nested project folders unless tooling requires it.

## Hard Scope Limit

Build only the MVP.

Include:

- One hero: Blackberry Rogue
- One linear Starter Patch map
- 3 normal enemies
- 1 boss
- 15–20 unique cards
- 8 relics
- Turn-based card combat
- Enemy intent preview
- Reward screen
- Rest screen
- Victory screen
- Defeat screen
- Placeholder art paths and styled placeholders

Do not add:

- Multiple heroes
- Multiple biomes
- Shop
- Card removal
- Card upgrades
- Procedural branching map
- Events
- Meta-progression
- Audio
- Multiplayer
- Backend
- Accounts
- OpenAI API calls
- In-app GPT Image generation
- Deployment

## Implementation Rules

- Follow `spec.md`.
- Follow `AGENTS.md`.
- Use `CONTENT_SEED.md` for starter values.
- Keep game rules in pure functions where practical.
- Keep UI components simple.
- Make card/enemy/relic data easy to expand later.
- Use placeholder images safely if actual files do not exist.
- Do not invent credentials.
- Do not hard-code secrets.
- Create `.env.example`.
- If no environment variables are required, say so in `.env.example`.
- Update `README.md`.

## Build Steps

1. Inspect current files.
2. Scaffold app if needed.
3. Install dependencies.
4. Add TypeScript game types.
5. Add content data.
6. Build the combat engine.
7. Add tests for combat engine.
8. Build run/map state.
9. Build screens.
10. Wire UI to combat/run state.
11. Add placeholder art styling.
12. Add reward and relic flow.
13. Add victory/defeat/restart flow.
14. Update README.
15. Run checks.
16. Fix errors.
17. Repeat until done criteria are met.

## Suggested Commands

Run available commands only. Add practical scripts if needed.

```bash
npm install
npm run lint
npm run typecheck
npm run test
npm run build
```

If a command is unavailable, do not pretend it ran. Either add the script or report that it was unavailable.

## Self-Correction Loop

If a command fails:

1. Read the error.
2. Identify the root cause.
3. Apply the smallest focused fix.
4. Run the command again.
5. Continue until passing or truly blocked.

## True Blockers

Stop only if:

- Required credentials are missing.
- An external account or service is required.
- The folder/repo structure prevents safe editing.
- The MVP scope is impossible without a major product decision.
- Legal, medical, financial, security, privacy, or government-sensitive risk appears.

None are expected for this MVP.

## Done Criteria

The task is complete when:

- The app runs locally.
- The player can start a run.
- The map screen works.
- Battles work.
- Cards spend energy and apply effects.
- Enemy intent preview and enemy turns work.
- Player can win normal battles.
- Reward screen works.
- Rest node works.
- Boss battle works.
- Victory and defeat screens work.
- Restart works.
- Core combat tests exist.
- Build/check commands pass or known limitations are explained.
- `README.md` is updated.
- `.env.example` exists.
- Final response lists files changed and commands run.

## Final Response Format

Return:

### Build Summary

Briefly explain what you built.

### Files Changed

List changed files.

### Commands Run

List commands run.

### Tests and Checks

List what passed and what failed.

### Known Limits

List remaining limitations.

### Next Recommended Step

Give one next step.
