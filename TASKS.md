# TASKS.md

## Build Goal

Build the first playable browser MVP of Rogue Harvest: Blackberry Rogue completes a short Starter Patch run with card combat, rewards, relics, rest, boss, victory, and defeat.

## Phase 1: Setup

- [ ] Inspect folder contents.
- [ ] Read `AGENTS.md`.
- [ ] Read `spec.md`.
- [ ] Read `CONTENT_SEED.md`.
- [ ] Read `ROGUE_HARVEST_MASTER_DNA.md`.
- [ ] Scaffold Vite + React + TypeScript if no app exists.
- [ ] Add or confirm Tailwind CSS or a simple CSS fallback.
- [ ] Add `.env.example`.
- [ ] Add/confirm README setup section.

## Phase 2: Core Types and Data

- [ ] Create `src/game/types.ts`.
- [ ] Add hero data.
- [ ] Add card library data.
- [ ] Add starting deck data.
- [ ] Add enemy data.
- [ ] Add relic data.
- [ ] Add linear map data.
- [ ] Add placeholder asset paths.

## Phase 3: Combat Engine

- [ ] Implement draw pile, hand, discard pile.
- [ ] Implement energy.
- [ ] Implement card play validation.
- [ ] Implement damage.
- [ ] Implement block.
- [ ] Implement poison.
- [ ] Implement weak.
- [ ] Implement vulnerable.
- [ ] Implement thorns.
- [ ] Implement dodge.
- [ ] Implement enemy intent preview.
- [ ] Implement enemy turn.
- [ ] Implement battle victory and player defeat.
- [ ] Add combat log messages.

## Phase 4: Run Flow

- [ ] Implement title screen.
- [ ] Implement hero select screen.
- [ ] Implement map screen.
- [ ] Implement battle screen.
- [ ] Implement reward screen.
- [ ] Implement rest screen.
- [ ] Implement victory screen.
- [ ] Implement defeat screen.
- [ ] Implement restart run.
- [ ] Ensure map progression works.

## Phase 5: Cards, Rewards, and Relics

- [ ] Add starting deck.
- [ ] Add reward card pool.
- [ ] Implement choose 1 of 3 card rewards.
- [ ] Implement relic gain after selected battles.
- [ ] Implement all MVP relic effects.
- [ ] Display active relics.
- [ ] Confirm card descriptions match actual behavior.

## Phase 6: UI and Accessibility

- [ ] Build readable card component.
- [ ] Build enemy intent display.
- [ ] Build status pill component.
- [ ] Build relic icon component.
- [ ] Build combat log.
- [ ] Add empty/missing art placeholder.
- [ ] Make layout responsive enough for desktop and tablet widths.
- [ ] Ensure keyboard-accessible actions.
- [ ] Ensure visible focus states.
- [ ] Ensure text contrast is readable.

## Phase 7: Testing

- [ ] Add unit tests for damage and energy.
- [ ] Add unit tests for block.
- [ ] Add unit tests for poison.
- [ ] Add unit tests for weak and vulnerable.
- [ ] Add unit tests for thorns.
- [ ] Add unit tests for dodge.
- [ ] Add unit tests for draw/discard behavior.
- [ ] Add unit tests for battle victory/defeat.
- [ ] Run type checks.
- [ ] Run lint checks.
- [ ] Run test command.
- [ ] Run build command.
- [ ] Run manual smoke test.

## Phase 8: Finish

- [ ] Confirm done criteria from `spec.md`.
- [ ] Update `README.md`.
- [ ] Confirm `.env.example` is safe.
- [ ] List files changed.
- [ ] List commands run.
- [ ] List known limitations.
- [ ] Recommend one next step.

## Stop Point

Stop only when the MVP works or a true blocker exists.
