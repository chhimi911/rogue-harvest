# Rogue Harvest Bugs

## Critical

No critical blocking bugs found in this QA pass.

## High Priority

No high-priority runtime, build, or core-loop blockers found.

## Medium Priority

1. **Status behavior is under-explained in the UI.**
   - Impact: New players can see `poison`, `weak`, `vulnerable`, `thorns`, and `dodge`, but may not know when they tick or expire.
   - Evidence: Status labels are short text pills only.
   - Status: Addressed in the current polish pass with a compact combat help/status glossary.

2. **Generated image payload is heavy.**
   - Impact: Individual card images are often around 2.6-2.8 MB, which can slow first load on a public demo.
   - Evidence: `du -h` showed multiple card PNGs above 2.5 MB.
   - Suggested fix: Optimize/copy compressed web assets after art approval.

3. **README and seed count drift existed before this pass.**
   - Impact: README said art files were not included and listed 18 cards, while the current app has generated art and 19 card PNGs.
   - Status: README was corrected in this pass.

## Low Priority

1. **Browser manual playthrough was not completed through visible click automation.**
   - Impact: Engine-level and Vite fetch tests passed, but UI click-through was not fully automated.
   - Reason: Available browser state was on an unrelated active user Chrome tab, and it was not disturbed.
   - Status: Addressed in the current polish pass with a Playwright smoke script that drives a dedicated browser context.
