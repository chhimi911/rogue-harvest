# IMAGE_PROMPTS.md

# Rogue Harvest — GPT Image 2 Prompt Pack

Use this after the playable MVP works.

Do not generate a huge asset set before combat works.

## Workflow Rule

Asset order:

1. Hero portrait
2. Enemy portraits
3. Boss portrait
4. Starter Patch background
5. Core card art
6. Relic icons
7. Title/key art

## Global Style Lock

Use this style block in every prompt unless intentionally changing direction:

```text
Painterly digital illustration for a premium indie deck-building roguelike, whimsical dark fantasy, corrupted magical garden world, bold readable silhouette, expressive character design, moody but readable lighting, deep greens, earthy browns, moonlit blues, berry purples, sickly fungal yellow-green corruption accents, handcrafted storybook feel, not goofy, not grimdark, not photorealistic, not pixel art, no text unless explicitly requested.
```

## Negative Style Block

Use this when the model drifts:

```text
Avoid: flat corporate vector art, cute mascot style, childish cartoon style, hyperrealism, anime-only styling, pixel art, excessive horror gore, unreadable dark composition, cluttered background, text, logos, watermarks.
```

## File Naming

Save generated files into:

```text
src/assets/generated/
```

Recommended names:

```text
blackberry-rogue.png
mold-mite.png
rot-grub.png
wilted-vinecrawler.png
baron-botrytis.png
starter-patch-bg.png
cards/thorn-jab.png
cards/bramble-cloak.png
cards/rot-kiss.png
relics/golden-trowel.png
```

## Prompt 1 — Blackberry Rogue Portrait

Recommended size: square.

```text
Create a game character portrait of the Blackberry Rogue from Rogue Harvest.

Subject: an anthropomorphic blackberry hero, agile rogue class, blackberry body/head form, expressive clever face, leaf-and-vine hooded cloak, thorn daggers, nimble crouched pose, subtle magical berry glow, heroic but charming, fantasy costume accents made from leaves, vines, thorns, bark, and cloth.

Style: Painterly digital illustration for a premium indie deck-building roguelike, whimsical dark fantasy, corrupted magical garden world, bold readable silhouette, expressive character design, moody but readable lighting, deep greens, earthy browns, moonlit blues, berry purples, sickly fungal yellow-green corruption accents, handcrafted storybook feel, not goofy, not grimdark, not photorealistic, not pixel art, no text.

Composition: centered character portrait, clean silhouette, simple atmospheric garden background, enough empty space around the character for UI cropping.

Avoid: mascot cuteness, horror gore, realistic fruit photo, anime school outfit, text, logo, watermark.
```

## Prompt 2 — Mold Mite Enemy Portrait

```text
Create a game enemy portrait for Rogue Harvest.

Subject: Mold Mite, a small corrupted garden pest with pale fuzzy mold patches, tiny thorn legs, glowing sickly eyes, creeping through moonlit soil. It should look dangerous but not disgusting, readable as a low-level enemy.

Style: Painterly digital illustration for a premium indie deck-building roguelike, whimsical dark fantasy, corrupted magical garden world, bold readable silhouette, moody but readable lighting, deep greens, earthy browns, moonlit blues, sickly fungal yellow-green accents, handcrafted storybook feel, no text.

Composition: centered enemy portrait, simple background, strong silhouette for a battle UI.

Avoid: realistic insect photo, extreme horror, gore, clutter, text, logo, watermark.
```

## Prompt 3 — Rot Grub Enemy Portrait

```text
Create a game enemy portrait for Rogue Harvest.

Subject: Rot Grub, a plump corrupted garden grub with mottled compost-colored body, patches of magical rot, tiny mandibles, faint green spore breath, emerging from damp soil. It should feel like a poison-pressure enemy in a deck-building roguelike.

Style: Painterly digital illustration for a premium indie deck-building roguelike, whimsical dark fantasy, corrupted magical garden world, readable silhouette, moody but readable lighting, earthy browns, moonlit blues, sickly fungal yellow-green corruption accents, no text.

Composition: centered enemy portrait, battle UI friendly, simple atmospheric background.

Avoid: photorealistic larvae, gore, excessive disgust, text, logo, watermark.
```

## Prompt 4 — Wilted Vinecrawler Enemy Portrait

```text
Create a game enemy portrait for Rogue Harvest.

Subject: Wilted Vinecrawler, a corrupted vine creature made of tangled brambles, wilted leaves, thorny tendrils, and cracked bark-like growths. It should look defensive and constricting, with a readable silhouette and menacing posture.

Style: Painterly digital illustration for a premium indie deck-building roguelike, whimsical dark fantasy, corrupted magical garden world, bold readable silhouette, moody but readable lighting, deep greens, earthy browns, moonlit blues, sickly pale green rot accents, no text.

Composition: centered enemy portrait, simple dark garden background, clear UI crop.

Avoid: photorealism, full horror monster, cluttered vines that ruin readability, text, watermark.
```

## Prompt 5 — Baron Botrytis Boss Portrait

```text
Create a boss portrait for Rogue Harvest.

Subject: Baron Botrytis, a corrupted noble fungus/rotted fruit boss, elegant and sinister, wearing a decayed leaf cape and crown-like mold growth, holding a cane made of twisted root, surrounded by drifting spores. The character should feel like a dark fantasy garden aristocrat and final boss of the Starter Patch.

Style: Painterly digital illustration for a premium indie deck-building roguelike, whimsical dark fantasy, premium indie polish, bold readable silhouette, expressive face-like features, moody but readable moonlit lighting, deep greens, berry purples, earthy browns, sickly fungal yellow-green corruption accents, no text.

Composition: centered boss portrait, dramatic but clean, battle UI friendly.

Avoid: gore, realistic mold photo, clownish villain, unreadable darkness, text, logo, watermark.
```

## Prompt 6 — Starter Patch Background

Recommended size: landscape.

```text
Create a battle background for Rogue Harvest: The Starter Patch.

Scene: moonlit corrupted garden rows, broken trellises, overgrown soil beds, early rot patches, thorny vines, faint magical spores in the air, distant silhouette of a strange orchard, charming but dangerous.

Style: Painterly digital illustration for a premium indie deck-building roguelike, whimsical dark fantasy, moody but readable, deep greens, earthy browns, moonlit blues, berry purple shadows, sickly pale green corruption accents, handcrafted storybook feel, no text.

Composition: wide landscape battle backdrop, open space in the lower foreground for characters and UI, clear depth, not too busy.

Avoid: photorealism, pixel art, heavy horror, unreadable darkness, text, logo, watermark.
```

## Prompt 7 — Card Art: Thorn Jab

Recommended size: portrait/card art.

```text
Create card illustration art for Rogue Harvest.

Card: Thorn Jab.
Scene: a small blackberry rogue hand thrusting a sharp thorn dagger forward with a quick magical strike, purple berry glow trailing behind, a hint of moonlit garden soil and brambles in the background.

Style: Painterly digital illustration for a premium indie deck-building roguelike, whimsical dark fantasy, bold readable action silhouette, moody but readable lighting, berry purples, deep greens, earthy browns, no text.

Composition: portrait card art, strong focal point, readable at small card size.

Avoid: text, border, UI frame, logo, watermark, gore.
```

## Prompt 8 — Card Art: Bramble Cloak

```text
Create card illustration art for Rogue Harvest.

Card: Bramble Cloak.
Scene: magical vines and brambles wrapping protectively around the Blackberry Rogue like a cloak, tiny thorns glowing with moonlit purple energy, defensive posture.

Style: Painterly digital illustration for a premium indie deck-building roguelike, whimsical dark fantasy, readable silhouette, botanical magic, moody but readable lighting, no text.

Composition: portrait card art, clear defensive action, strong center focus.

Avoid: text, card border, UI frame, logo, watermark.
```

## Prompt 9 — Card Art: Rot Kiss

```text
Create card illustration art for Rogue Harvest.

Card: Rot Kiss.
Scene: a delicate swirl of poisonous berry-purple and sickly green magic drifting from a thorn dagger toward a corrupted garden enemy, beautiful but dangerous, spores sparkling in moonlight.

Style: Painterly digital illustration for a premium indie deck-building roguelike, whimsical dark fantasy, magical botanical poison, moody but readable, no text.

Composition: portrait card art, clear magical effect, readable at small size.

Avoid: gore, gross-out imagery, text, card border, watermark.
```

## Prompt 10 — Relic Icon: Golden Trowel

Recommended size: square/icon.

```text
Create a game relic icon for Rogue Harvest.

Relic: Golden Trowel.
Subject: a small enchanted golden garden trowel with leaf engravings, a faint warm magical glow, tiny soil particles and moonlit sparkles.

Style: Painterly digital icon for a premium indie deck-building roguelike, whimsical dark fantasy, clean silhouette, readable at small size, warm gold accent, no text.

Composition: centered object on simple dark botanical background, icon-friendly.

Avoid: text, logo, watermark, photorealistic tool photo.
```

## Prompt 11 — Relic Icon: Moonwater Flask

```text
Create a game relic icon for Rogue Harvest.

Relic: Moonwater Flask.
Subject: a small glass flask filled with glowing blue moonwater, cork stopper, vine wrapping, a tiny crescent reflection, magical healing aura.

Style: Painterly digital icon for a premium indie deck-building roguelike, whimsical dark fantasy, clean silhouette, readable at small size, moonlit blue glow, no text.

Composition: centered object on simple dark botanical background.

Avoid: text, logo, watermark, photorealism.
```

## Prompt 12 — Title Key Art

Generate only after the MVP works.

```text
Create key art for Rogue Harvest.

Scene: the Blackberry Rogue stands at the entrance of a moonlit corrupted garden path, thorn dagger ready, facing drifting spores and the silhouette of Baron Botrytis in the distance. Broken trellises, magical rot, brambles, and glowing berry-purple accents frame the path. The mood is adventurous, slightly eerie, charming, clever, and magical.

Style: Painterly digital illustration for a premium indie deck-building roguelike, whimsical dark fantasy, premium indie game polish, bold readable silhouette, moody but readable lighting, deep greens, earthy browns, moonlit blues, berry purples, sickly fungal yellow-green corruption accents, handcrafted storybook feel.

Composition: landscape key art, strong central character, clear depth, usable for title screen background. No title text yet.

Avoid: text, logo, watermark, gore, childish mascot style, photorealism, pixel art.
```

## Consistency Pass Prompt

Use after generating several assets:

```text
Review this image against the Rogue Harvest art direction: painterly premium indie deck-building roguelike, whimsical dark fantasy, corrupted magical garden, bold readable silhouettes, fruit/vegetable hero identity, moody but readable lighting, deep greens, earthy browns, moonlit blues, berry purples, sickly fungal corruption accents. Suggest what to adjust so it matches the set better.
```

## Scope Reminder

Focus on the core. Art comes after the build works.
