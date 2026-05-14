# ART_ASSET_REVIEW.md

## Purpose

Review Rogue Harvest's generated image assets without adding external image-generation complexity.

## Hard Rule

Do not add image-generation API code.

The user wants image creation handled inside Codex / the current creative workflow. Codex should not ask for an API key or install an image API integration.

## Review Areas

### 1. Asset Existence

Check likely locations:

```text
public/
public/assets/
src/assets/
src/data/
```

Find all image references in:

- Card data
- Enemy data
- Relic data
- Hero data
- CSS backgrounds
- Components

### 2. Broken Paths

Report:

- Missing files
- Wrong casing
- Wrong extensions
- Paths that work in dev but may fail in build
- Unused images

### 3. Style Consistency

Check if assets match:

- painterly digital illustration
- whimsical dark fantasy
- premium indie game feel
- readable silhouettes
- fruit/vegetable identity
- Blight / fungal / botanical corruption

### 4. Gameplay Readability

Check:

- Can the hero be recognized?
- Can enemies be recognized?
- Do card images distract from card text?
- Are icons clear at small size?
- Is the background too visually noisy?
- Are important UI elements still readable?

### 5. Prompt Requests

If additional art is needed, write `ART_REQUESTS.md`.

Each request should include:

- Asset name
- Intended use
- Prompt
- Negative prompt / avoid list
- Aspect ratio or size guidance
- Priority

## Output Format for ART_ASSET_AUDIT.md

```markdown
# ART_ASSET_AUDIT.md

## Summary

## Assets Found

## Broken or Missing Assets

## Style Consistency Notes

## Gameplay Readability Notes

## Placeholder Assets Still Needed

## Recommended Art Requests
```
