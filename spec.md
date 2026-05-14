# spec.md

# Rogue Harvest MVP Specification

## Goal

Build a browser-first playable demo of **Rogue Harvest**, a dark-whimsy deck-building roguelike where the Blackberry Rogue battles through a corrupted garden path using cards, relics, and turn-based combat.

## Problem

The full game idea is strong but too large to build all at once. The MVP must prove the core loop before expanding into multiple heroes, biomes, shops, lore events, animation, or final art.

## Users

- Primary user: The creator, testing whether Rogue Harvest works as a game concept and AI-assisted build showcase.
- Secondary user: A playtester who can understand the game without explanation.
- Future user: Browser demo players who like deck-building roguelikes and distinctive indie-game art.

## MVP Scope

Version 1 includes:

- React + TypeScript + Vite browser app.
- One playable hero: **Blackberry Rogue**.
- One simple run through **The Starter Patch**.
- Linear node map with 3 normal battles, 1 rest node, and 1 boss.
- Turn-based card combat.
- Draw pile, hand, discard pile, exhaust pile if needed.
- Energy system.
- Block system.
- Enemy intent preview.
- Status effects:
  - Poison
  - Weak
  - Vulnerable
  - Thorns
  - Dodge
- Starting deck plus reward card pool.
- 15–20 unique cards.
- 8 relics.
- Reward screen with choose 1 of 3 cards and occasional relic reward.
- Victory and defeat screens.
- Placeholder image paths and simple placeholder visuals.
- Basic responsive layout.
- Basic tests for core combat logic.

## Non-Goals

Version 1 does not include:

- Multiple heroes.
- Multiple biomes.
- Procedural branching map.
- Shop.
- Card removal.
- Card upgrades.
- Meta-progression.
- Account login.
- Online saves.
- Multiplayer.
- Advanced animation.
- Audio system.
- Final art pass.
- In-app GPT Image 2 generation.
- Payment, publishing, or deployment setup.

## Assumptions

- The project starts as an empty folder containing these handoff files.
- Codex should scaffold a new Vite + React + TypeScript app in this same folder.
- Tailwind CSS is preferred for styling.
- No backend is required.
- No database is required.
- No environment variables are required for the MVP.
- Asset generation is manual/out-of-band using GPT Image 2 prompts from `IMAGE_PROMPTS.md`.
- Placeholder asset paths are acceptable until real images are added.
- Local browser playability is the success target.

## Recommended Stack

- Frontend: React + TypeScript + Vite.
  - Best fit for a fast browser demo with card-heavy UI.
- Styling: Tailwind CSS.
  - Keeps UI iteration fast and consistent.
- State: React reducer/context or small local state modules.
  - Avoid Zustand unless Codex decides it meaningfully reduces complexity.
- Data: Local TypeScript data files or JSON.
  - Cards, enemies, relics, map nodes, and hero config should be data-driven.
- Backend: None.
  - The MVP is client-only.
- Database: None.
  - No account or persistence requirement.
- AI/API: None inside the app.
  - GPT Image 2 is used externally to generate assets.
- Testing: Vitest for pure combat logic.
  - Keep tests focused on damage, block, energy, statuses, draw/discard, enemy turns, and win/loss.
- Deployment: Local only for MVP.
  - Deployment can come after the MVP runs.

## Main Workflow

1. Player opens the app.
2. Player sees the title screen.
3. Player starts a run as Blackberry Rogue.
4. Player enters a simple node map.
5. Player selects the next available node.
6. App starts battle.
7. Player draws cards and receives energy.
8. Player plays cards against an enemy.
9. Enemy intent is visible before enemy acts.
10. Player ends turn.
11. Enemy acts.
12. Combat repeats until enemy or player is defeated.
13. On victory, player chooses 1 of 3 card rewards and may gain a relic.
14. Player returns to map.
15. Player reaches boss.
16. Player wins or loses the run.
17. App shows victory or defeat screen with restart option.

## Core Gameplay Rules

### Player Turn

- Start each player turn with base energy.
- Draw up to hand size.
- Reset block to 0 unless a card or relic says otherwise.
- Apply turn-start status effects.
- Player may play cards while enough energy remains.
- Cards apply damage, block, statuses, draw, energy, dodge, or thorns.
- Unplayed cards discard at end turn.

### Enemy Turn

- Enemy intent is selected and shown before the player acts.
- On enemy turn, enemy performs the shown intent.
- Block reduces incoming damage.
- Dodge prevents the next hit or a defined single incoming attack.
- Poison deals damage at the start of affected unit's turn, then decreases.
- Weak reduces outgoing attack damage.
- Vulnerable increases incoming attack damage.
- Thorns damages attackers when they deal attack damage.

### Combat End

- Enemy defeated:
  - Show reward screen.
- Player defeated:
  - Show defeat screen.
- Boss defeated:
  - Show victory screen.

## Data Model

### Hero

- id
- name
- className
- maxHp
- currentHp
- baseEnergy
- handSize
- startingDeck
- portraitPath
- description

### Card

- id
- name
- type: attack | skill | power | utility
- rarity: starter | common | uncommon | rare
- cost
- description
- tags
- effects
- artPath

### CardEffect

- type
- value
- status
- target: self | enemy | allEnemies
- condition, optional

Supported MVP effect types:

- damage
- block
- poison
- weak
- vulnerable
- thorns
- dodge
- draw
- gainEnergy
- heal

### Enemy

- id
- name
- maxHp
- portraitPath
- description
- intents

### EnemyIntent

- id
- label
- description
- type
- effects
- weight or sequence order

### Relic

- id
- name
- rarity
- description
- hook
- iconPath

Supported MVP relic hooks:

- onRunStart
- onBattleStart
- onTurnStart
- onCardPlayed
- onApplyStatus
- onBattleVictory
- modifyDamage

### RunState

- hero
- deck
- relics
- currentNodeIndex
- mapNodes
- completedNodes
- screen
- rngSeed, optional

### CombatState

- playerHp
- playerBlock
- playerEnergy
- playerStatuses
- enemy
- enemyHp
- enemyBlock
- enemyStatuses
- drawPile
- hand
- discardPile
- exhaustPile
- turnNumber
- currentTurn
- enemyIntent
- combatLog

### MapNode

- id
- type: battle | rest | boss
- label
- enemyId, optional
- completed

## Screens or Interfaces

### Title Screen

- Game title.
- One-line pitch.
- Start Run button.
- Visual placeholder/key art region.

### Hero Select Screen

- Blackberry Rogue card.
- HP, style, and starter deck summary.
- Start button.
- Other heroes shown as locked/coming later only if simple.

### Map Screen

- Linear Starter Patch path.
- Nodes:
  1. Mold Mite battle
  2. Rot Grub battle
  3. Rest node
  4. Wilted Vinecrawler battle
  5. Baron Botrytis boss
- Completed/current/locked visual states.
- Continue button.

### Battle Screen

- Enemy portrait placeholder.
- Enemy HP, statuses, and intent.
- Player HP, block, energy, statuses, and relics.
- Draw/discard counts.
- Hand of cards.
- End Turn button.
- Combat log.

### Reward Screen

- Choose 1 of 3 cards.
- Show card name, cost, type, description.
- Occasionally show a relic reward after battle.
- Continue to map.

### Rest Screen

- Heal a fixed amount.
- Continue to map.

### Victory Screen

- Show run won.
- Summary:
  - Boss defeated
  - Cards added
  - Relics gained
- Restart button.

### Defeat Screen

- Show run ended.
- Restart button.

## AI Behavior

AI is not part of the playable app MVP.

GPT Image 2 is used externally for asset creation. Use `IMAGE_PROMPTS.md` to generate art outside the game, save files into `src/assets/generated/`, and update data paths.

## File Structure

Codex should adapt if it chooses a slightly different Vite structure, but aim for:

```text
rogue-harvest/
├── README.md
├── AGENTS.md
├── spec.md
├── TASKS.md
├── CODEX_PROMPT.md
├── .env.example
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── styles.css
│   ├── components/
│   │   ├── CardView.tsx
│   │   ├── StatusPill.tsx
│   │   ├── RelicIcon.tsx
│   │   ├── CombatLog.tsx
│   │   └── Layout.tsx
│   ├── screens/
│   │   ├── TitleScreen.tsx
│   │   ├── HeroSelectScreen.tsx
│   │   ├── MapScreen.tsx
│   │   ├── BattleScreen.tsx
│   │   ├── RewardScreen.tsx
│   │   ├── RestScreen.tsx
│   │   ├── VictoryScreen.tsx
│   │   └── DefeatScreen.tsx
│   ├── data/
│   │   ├── cards.ts
│   │   ├── enemies.ts
│   │   ├── relics.ts
│   │   ├── heroes.ts
│   │   └── map.ts
│   ├── game/
│   │   ├── types.ts
│   │   ├── combatEngine.ts
│   │   ├── runEngine.ts
│   │   ├── rewards.ts
│   │   └── rng.ts
│   ├── assets/
│   │   ├── placeholders/
│   │   └── generated/
│   └── tests/
│       └── combatEngine.test.ts
└── public/
```

## Accessibility Requirements

- Use semantic HTML.
- Buttons must be keyboard-focusable.
- Use visible focus states.
- Do not rely on color alone for statuses or node states.
- Cards must have readable text.
- Enemy intent must be text-readable, not icon-only.
- Maintain strong contrast against dark fantasy backgrounds.
- Avoid rapid flashing animation.
- Respect reduced motion where practical.
- Use aria labels for icon-only controls if any are added.

## Privacy and Security

- No user account.
- No backend.
- No analytics.
- No personal data collection.
- No API keys required.
- Do not store secrets.
- `.env.example` must exist and state that no environment variables are required.
- Generated art files should be local assets only.
- If future API-based image generation is added, API keys must be environment variables and must not be committed.

## Testing Plan

### Unit Tests

Add tests for:

- Playing a damage card spends energy and reduces enemy HP.
- Block absorbs damage.
- Poison ticks and decreases.
- Weak reduces outgoing damage.
- Vulnerable increases incoming damage.
- Dodge prevents one incoming attack.
- Thorns damages attacker.
- Draw/discard cycle works.
- Battle victory triggers reward state.
- Player defeat triggers defeat state.

### Type Checks

- Run TypeScript validation through the available project command.

### Lint Checks

- Add or use available lint command.

### Build Check

- Run production build.

### Manual Smoke Test

Confirm:

1. App opens.
2. Start run works.
3. Map node selection starts battle.
4. Cards can be played.
5. End turn works.
6. Enemy acts.
7. Enemy can be defeated.
8. Reward can be selected.
9. Rest node heals.
10. Boss can be reached.
11. Victory/defeat state appears.
12. Restart works.

## Build Order

1. Inspect folder and read all handoff files.
2. Scaffold Vite + React + TypeScript if no app exists.
3. Add Tailwind or simple CSS if Tailwind setup is too slow.
4. Add core types.
5. Add content data from `CONTENT_SEED.md`.
6. Build pure combat engine.
7. Add tests for combat engine.
8. Build run/map flow.
9. Build screens.
10. Wire state.
11. Add placeholder assets/styles.
12. Add reward flow.
13. Add victory/defeat flow.
14. Update README.
15. Run checks.
16. Fix errors.
17. Report final status.

## Risks

- Scope creep into a full Slay-the-Spire-like system.
- Too many card interactions before the base loop works.
- Spending too much time on art before combat works.
- Overengineering the map.
- Adding global state libraries unnecessarily.
- Styling delays.
- Balance will be rough until playtested.

## Done Criteria

The MVP is done when:

- The app runs locally.
- Player can start a run.
- Player can complete a linear map.
- At least 3 battles and 1 boss exist.
- Cards, energy, draw/discard, block, statuses, and enemy intents work.
- Reward screen works.
- Rest screen works.
- Victory and defeat states work.
- Placeholder image paths exist.
- `README.md` explains setup, run, test, and build commands.
- `.env.example` exists.
- Tests/checks pass or known limitations are clearly explained.
- Codex reports changed files and commands run.
