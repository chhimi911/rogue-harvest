# Rogue Harvest

Rogue Harvest is a small browser demo of a dark botanical deck-building roguelike. The MVP proves the core loop: start a run, move through a linear map, fight card battles, pick rewards, rest, fight the boss, win or lose, and restart.

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Vite will print a local URL, usually `http://localhost:5173/`.

## Test

```bash
npm run test
```

Core combat rules are covered with Vitest unit tests.

```bash
npm run smoke
```

The smoke test launches a local Vite server in a dedicated browser context and clicks through the main path: start run, map, battle, card play, enemy turn, reward, and return to map.

## Type Check and Lint

```bash
npm run typecheck
npm run lint
```

For this MVP, `lint` runs TypeScript checking so no extra lint dependency is required.

## Build

```bash
npm run build
```

## Generated Assets

Generated PNG art assets that are part of the playable MVP live in `public/assets/generated/` and are intended to be committed with the project. The app still has styled placeholder support for future missing art paths.

## Audio

Local MP3 sound effects live in `public/audio/` and are played with the browser's native audio support. The game uses short sounds for menu actions, card play, rewards, boss/heavy-attack warnings, victory, and defeat. Audio preferences are saved in `localStorage`; use the Sound On/Off button and volume slider in the top corner to adjust playback.

## Included in the MVP

- One hero: Blackberry Rogue.
- One linear map: The Starter Patch.
- Three normal enemies and one boss.
- Nineteen unique cards from the current local data set.
- Eight relics with MVP hooks.
- Turn-based card combat with energy, block, draw pile, hand, discard pile, enemy intents, poison, weak, vulnerable, thorns, and dodge.
- Reward flow with choose-one-of-three cards and deterministic relic rewards.
- Rest node, victory screen, defeat screen, and restart flow.
- Lightweight local sound effects with mute and volume controls.
- Placeholder art support for missing generated assets.

## Known Limitations

- Balance is intentionally simple and will need playtesting.
- Map progression is linear only.
- No shops, card upgrades, card removal, events, meta progression, background music system, backend, accounts, or deployment setup.
- Generated PNG art is included for the current hero, enemies, cards, relics, and Starter Patch backgrounds; missing future image paths still render styled placeholders.
- The UI is responsive for desktop and tablet-sized play, but it is not tuned as a mobile-first game layout.

## Next Recommended Step

Play through the full run locally, tune enemy HP/damage and card reward order, then optimize the generated PNGs for smaller browser payloads.
