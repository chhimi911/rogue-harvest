# Rogue Harvest QA Report

## Summary

Reviewed the current Rogue Harvest MVP as an existing React/Vite build, not a rebuild. The app builds, tests pass, generated images resolve from `public/assets/generated`, and a deterministic engine-level playthrough completed the full loop: title -> hero -> map -> battle -> reward -> rest -> boss -> victory. A forced defeat path also works.

## Concept Lock Status

- Core fantasy is intact: Blackberry Rogue battles garden Blight enemies through the Starter Patch.
- Enemy identities fit the corrupted garden premise: mold, rot, vines, and fungal boss.
- Card mechanics support the hero identity: poison, dodge, thorns, weak, vulnerable, and quick attacks.
- Win/loss states exist and are clear once reached.

## Prototype Status

- The prototype loop is working: start run, enter battle, play cards, end turns, win normal battles, select rewards, rest, fight boss, win, restart.
- Combat state displays HP, block, energy, draw pile, discard pile, turn, statuses, and enemy intent.
- Reward card choice adds to the deck and later battles use the larger deck.
- Relic rewards are deterministic and appear after selected battles.

## Vertical Slice Readiness

- The build has one complete linear Starter Patch run, 3 normal enemies, 1 boss, 19 current card assets, and 8 relic icons.
- The generated art pass materially improves the demo feel and supports the AI-asset showcase goal.
- The MVP feels coherent, but still reads like a first playable prototype rather than a polished public demo.

## Engineering QA

- `npm run typecheck`: passed.
- `npm run lint`: passed. This script currently runs TypeScript checking.
- `npm run test`: passed, 8 combat tests.
- `npm run build`: passed.
- Local Vite smoke test: passed by fetching app HTML and representative generated assets.
- Current polish pass added a browser-level smoke script for the main click path.
- This folder is not a git repository, so no git diff/status tracking is available.

## Prototype Smoke Test

- Engine-level full run completed with victory.
- Final simulated result: victory, 44/72 HP, 12-card deck, relics `golden-trowel` and `moonwater-flask`, all 5 map nodes completed.
- Forced defeat scenario reached `defeat` outcome correctly.
- Browser-level verification was limited to local Vite URL/asset fetches because Chrome was focused on an unrelated user tab and was not disturbed.

## Playability Review

- Start and next-action buttons are clear.
- Cards show name, cost, rarity/type, art, and description.
- Enemy intent is always visible in battle.
- Combat log helps explain recent effects, but it only shows the latest few messages and can be easy to miss.
- New players may not immediately understand the timing of poison, weak, vulnerable, dodge, or thorns without hover/help text.
- Disabled unaffordable cards are visible, but the UI does not explicitly say why they are disabled beyond energy count.
- Current polish pass added a compact combat glossary and inline disabled-card reasons.

## UX and Accessibility Review

- Semantic buttons are used for major actions and card play.
- Focus styling exists and is visible.
- Important statuses are textual, not color-only.
- Text contrast is generally acceptable against the dark UI.
- Card images are large and rich but do not obscure card text.
- Reward copy now explicitly says the selected card enters the run deck, and relic rewards are marked as also gained.
- Layout is acceptable for desktop/tablet widths; mobile play is likely crowded because cards and battle panels stack into a long page.

## Creative Direction

- The generated art strongly supports the Rogue Harvest tone: whimsical dark fantasy, painterly botanical corruption, and a readable Blackberry Rogue.
- The Blight feels eerie without becoming grimdark.
- The most compelling showcase elements are the hero portrait, Starter Patch background, boss portrait, and card art.

## Rubric Scores

| Area | Score | Notes |
|---|---:|---|
| Core loop works | 4 | Full deterministic run reaches victory. |
| Combat clarity | 3 | Core stats and intent are visible; status timing needs clearer explanation. |
| Card readability | 4 | Cards are readable and visually distinct. |
| Enemy fairness | 3 | Normal fights are fair; boss is beatable with current deterministic rewards. |
| Reward interest | 3 | Rewards work, but choices are deterministic and not yet deeply strategic. |
| Balance | 3 | Acceptable MVP, needs playtest tuning. |
| Visual identity | 4 | Strong art direction and cohesive assets. |
| Asset reliability | 4 | No missing referenced assets found. |
| UX/accessibility | 3 | Keyboard/focus/text basics are present; mobile and status help need work. |
| Performance | 3 | Build size is fine, but many PNGs are 2MB+ each. |
| Scope control | 4 | MVP remains focused. |
