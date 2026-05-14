# Rogue Harvest QA Agents Handoff

## Purpose

This package is for the **second Codex pass** on Rogue Harvest.

It is not a rebuild prompt. It gives Codex focused review roles and testing skills so it can inspect the existing game, run checks, play through the MVP flow, review generated art/assets, make small safe fixes, and produce practical recommendations.

## Use This On

Use this package on the existing Rogue Harvest game folder after the first build has already been created.

Expected current state:

- React + TypeScript + Vite game exists.
- Placeholder or generated images may already exist.
- The app can possibly run locally, but may need fixes.
- Codex should inspect before changing anything.

## Files Included

```text
rogue-harvest-qa-agents-handoff/
├── README_START_HERE.md
├── CODEX_QA_PROMPT.md
├── QA_AGENTS.md
├── TESTING_SKILLS.md
├── PHASE_REVIEW_PLAN.md
├── PLAYTEST_RUBRIC.md
├── BUG_REPORT_TEMPLATE.md
├── RECOMMENDATIONS_TEMPLATE.md
├── ART_ASSET_REVIEW.md
├── SCOPE_GUARDRAILS.md
├── .env.example
├── agents/
│   ├── engineering-qa-agent.md
│   ├── gameplay-playability-agent.md
│   ├── balance-agent.md
│   ├── ux-accessibility-agent.md
│   ├── art-asset-agent.md
│   └── product-scope-agent.md
└── skills/
    ├── 01-concept-lock-review.md
    ├── 02-prototype-smoke-test.md
    ├── 03-vertical-slice-review.md
    ├── 04-mvp-production-readiness.md
    ├── 05-playability-balance-test.md
    ├── 06-launch-readiness-check.md
    └── 07-update-triage.md
```

## Important Image Rule

The user has already adjusted the Codex workflow so images are created inside Codex / the current build environment.

Codex must not add external image-generation API integrations, request API keys, or block on missing image credentials.

For QA:

- Review images that already exist in the repo.
- Verify images load correctly.
- Verify file paths are stable.
- Verify art is consistent with Rogue Harvest.
- If more images are needed, write prompts to `ART_REQUESTS.md`.
- Do not implement an external image API.

## How to Use with Codex Desktop

1. Open your existing Rogue Harvest game repo in Codex Desktop.
2. Copy this entire `rogue-harvest-qa-agents-handoff` folder into the root of that repo.
3. Open `CODEX_QA_PROMPT.md`.
4. Paste that prompt into Codex.
5. Let Codex inspect, test, patch small defects, and generate QA reports.

## What Codex Should Produce

Codex should create or update:

```text
QA_REPORT.md
BUGS.md
RECOMMENDATIONS.md
BALANCE_NOTES.md
ART_ASSET_AUDIT.md
MVP_BACKLOG.md
ART_REQUESTS.md
```

Codex may also fix small bugs directly if they are clearly blocking playability.

## What Not To Do Yet

Do not add:

- New heroes
- New biomes
- Shops
- Multiplayer
- Steam packaging
- Large animation systems
- API-based image generation
- Backend services
- Accounts or cloud saves

Focus on the core. That detail comes after the build works.

## Next Action

Open your existing Rogue Harvest repo, add this folder, and paste `CODEX_QA_PROMPT.md` into Codex.
