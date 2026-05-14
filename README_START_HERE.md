# Rogue Harvest — Codex Handoff

## What This Is

This is the starter build package for **Rogue Harvest**, a browser-first deck-building roguelike MVP.

Use this package to have Codex build the first playable version before spending time on polish, extra heroes, animation, or a large asset set.

## Build Philosophy

Build the boring playable version first.

The MVP proves:

- Turn-based card combat works.
- The Blackberry Rogue has a usable starter deck.
- The player can move through a simple node map.
- Battles produce rewards.
- A boss can be defeated.
- Placeholder assets can later be replaced with GPT Image 2 assets.

## Files Included

- `README_START_HERE.md` — this file
- `spec.md` — full MVP specification
- `AGENTS.md` — coding-agent instructions for Codex
- `TASKS.md` — phased build checklist
- `CODEX_PROMPT.md` — paste this into Codex
- `.env.example` — environment placeholder file
- `ROGUE_HARVEST_MASTER_DNA.md` — source-of-truth creative/game DNA
- `CONTENT_SEED.md` — starter cards, enemies, relics, map, and balance values
- `IMAGE_PROMPTS.md` — GPT Image 2 prompt pack and asset workflow

## How to Use with Codex Desktop

1. Download and unzip this package.
2. Open the unzipped folder in Codex Desktop.
3. Open `CODEX_PROMPT.md`.
4. Paste the full prompt into Codex.
5. Let Codex scaffold and build the MVP in this folder.
6. Do not ask Codex for extra heroes, shops, animations, or procedural map generation yet.

## How to Use with Codex Web

1. Upload this folder or its files to a Codex task.
2. Tell Codex to read `CODEX_PROMPT.md`.
3. Confirm it builds the local browser demo.
4. Review the files changed and commands run.

## What Not To Do Yet

Do not start with:

- Multiple heroes
- Multi-biome procedural runs
- Full animation system
- Large lore/event system
- Online accounts
- Monetization
- Mobile port
- Complex save system
- Full balance tuning
- Final art pass

Focus on the core.

## Asset Workflow

Start with placeholder art. After the combat loop works, use `IMAGE_PROMPTS.md` to generate the first art batch:

1. Blackberry Rogue portrait
2. Three enemy portraits
3. Boss portrait
4. Starter Patch background
5. A small set of card illustrations
6. Relic icons

## One Next Action

Open `CODEX_PROMPT.md`, paste it into Codex, and build the playable MVP.
