# AGENTS.md

## Project Mission

Build the Rogue Harvest MVP described in `spec.md`.

The goal is a small working browser demo of a deck-building roguelike, not a full game.

## Read First

Before editing files:

1. Read this `AGENTS.md`.
2. Read `spec.md`.
3. Read `TASKS.md`.
4. Read `CONTENT_SEED.md`.
5. Read `ROGUE_HARVEST_MASTER_DNA.md` for creative constraints.
6. Inspect the existing project structure.
7. Build the smallest working MVP.

## Stack Rules

Use:

- React
- TypeScript
- Vite
- Tailwind CSS if straightforward
- Vitest for core logic tests
- Local TypeScript data files for content

Avoid:

- Backend services
- Databases
- Account login
- Global state libraries unless clearly justified
- Phaser
- Multiplayer
- Procedural everything
- Heavy animation systems
- Cloud deployment setup
- In-app image generation

## MVP Boundary

Implement:

- One hero: Blackberry Rogue
- One biome/path: Starter Patch
- 3 normal enemies
- 1 boss
- 15–20 cards
- 8 relics
- Linear node map
- Combat loop
- Rewards
- Rest
- Victory/defeat
- Placeholder art support

Defer:

- More heroes
- Shops
- Card upgrades
- Card removal
- Multiple biomes
- Events
- Meta progression
- Final art
- Sound
- Deployment

## Coding Standards

- Prefer simple, readable code.
- Keep game rules in pure functions where possible.
- Keep UI components thin.
- Keep content data-driven.
- Use clear names.
- Avoid hidden magic.
- Do not add unnecessary dependencies.
- Add comments only for non-obvious game-rule logic.
- Make the app resilient to missing art files by showing styled placeholders.
- Use deterministic behavior where practical so tests are reliable.

## Combat Rules

Core combat logic should be testable outside React.

Support:

- Damage
- Block
- Energy
- Draw pile
- Hand
- Discard pile
- Statuses
- Enemy intent
- Relic modifiers
- Victory/defeat state

Status effects:

- Poison: target loses HP at start of its turn, then poison decreases by 1.
- Weak: outgoing attack damage reduced.
- Vulnerable: incoming attack damage increased.
- Thorns: damages attacker after receiving attack damage.
- Dodge: prevents the next incoming attack hit, then decreases by 1.

Keep status math simple and documented.

## UI Rules

- Card text must be readable.
- Enemy intent must always be visible.
- Player HP, block, energy, draw pile, and discard pile must be visible in battle.
- Reward choices must be easy to compare.
- Do not let decorative styling reduce clarity.
- Use a dark botanical fantasy feel, but prioritize usability.

## Accessibility Rules

- Use semantic HTML.
- Use buttons for clickable actions.
- Label controls.
- Support keyboard navigation.
- Use visible focus states.
- Keep text contrast readable.
- Do not communicate statuses by color only.
- Avoid rapid flashing animations.
- Respect reduced-motion preferences where practical.

## Security Rules

- Do not add analytics.
- Do not collect personal data.
- Do not hard-code secrets.
- Do not invent credentials.
- Create `.env.example`.
- If no environment variables are needed, write that in `.env.example`.
- Do not connect to external APIs.
- Do not add OpenAI API usage to the app unless explicitly requested later.

## Testing Rules

Run available checks.

Try these commands if present or after adding them:

```bash
npm install
npm run lint
npm run typecheck
npm run test
npm run build
```

If a command does not exist, either add a practical script or report it clearly.

If a command fails:

1. Read the error.
2. Fix the root cause.
3. Run the command again.
4. Repeat until passing or blocked.

## Self-Correction Rules

Do not stop for polish questions.

Make reasonable choices and continue unless there is a true blocker.

A true blocker is:

- Required credentials are missing.
- An external account is required.
- The project structure prevents safe editing.
- The requested feature contradicts the MVP.
- A major product decision is missing and blocks the core loop.

## README Requirements

Update `README.md` with:

- What the app is.
- How to install.
- How to run locally.
- How to test.
- How to build.
- What is included in the MVP.
- Known limitations.
- Next recommended step.

## Done Criteria

Complete when:

- App runs locally.
- Main run loop works.
- Combat works.
- Reward flow works.
- Rest works.
- Boss win works.
- Defeat works.
- Tests/checks pass or known failures are explained.
- README is updated.
- `.env.example` exists.
- Final response lists changed files and commands run.
