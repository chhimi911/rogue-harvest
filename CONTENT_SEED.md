# CONTENT_SEED.md

# Rogue Harvest MVP Content Seed

Use this content to build the first playable MVP. Keep numbers simple. Balance can be tuned after playtesting.

## Hero

```ts
{
  id: "blackberry-rogue",
  name: "Blackberry Rogue",
  className: "Thorn-Wielding Rogue",
  maxHp: 72,
  baseEnergy: 3,
  handSize: 5,
  portraitPath: "/assets/generated/blackberry-rogue.png",
  description: "An agile berry adventurer using poison, dodge, thorns, and precise strikes."
}
```

## Starting Deck

Use card IDs:

```text
thorn-jab x4
bramble-cloak x2
nightshade-step x1
rot-kiss x1
vine-snare x1
```

Total: 9 cards.

## Card Library

### Starter Cards

#### Thorn Jab

- id: `thorn-jab`
- type: attack
- rarity: starter
- cost: 1
- description: Deal 6 damage.
- effects:
  - damage enemy 6

#### Bramble Cloak

- id: `bramble-cloak`
- type: skill
- rarity: starter
- cost: 1
- description: Gain 5 Block and 2 Thorns.
- effects:
  - block self 5
  - thorns self 2

#### Nightshade Step

- id: `nightshade-step`
- type: skill
- rarity: starter
- cost: 1
- description: Gain 4 Block and 1 Dodge.
- effects:
  - block self 4
  - dodge self 1

#### Rot Kiss

- id: `rot-kiss`
- type: skill
- rarity: starter
- cost: 1
- description: Apply 5 Poison.
- effects:
  - poison enemy 5

#### Vine Snare

- id: `vine-snare`
- type: skill
- rarity: starter
- cost: 1
- description: Apply 2 Weak and 1 Vulnerable.
- effects:
  - weak enemy 2
  - vulnerable enemy 1

### Common Reward Cards

#### Berry Burst

- id: `berry-burst`
- type: attack
- rarity: common
- cost: 1
- description: Deal 4 damage. If the enemy has Poison, deal 8 instead.
- effects:
  - conditional damage enemy 8 if enemy.poison > 0, otherwise damage 4

#### Seed Scatter

- id: `seed-scatter`
- type: attack
- rarity: common
- cost: 1
- description: Deal 3 damage 2 times.
- effects:
  - damage enemy 3
  - damage enemy 3

#### Sporeveil

- id: `sporeveil`
- type: skill
- rarity: common
- cost: 1
- description: Gain 3 Block. Apply 1 Weak.
- effects:
  - block self 3
  - weak enemy 1

#### Sneak Peck

- id: `sneak-peck`
- type: attack
- rarity: common
- cost: 1
- description: Deal 5 damage. If you have Dodge, deal 10 instead.
- effects:
  - conditional damage enemy 10 if self.dodge > 0, otherwise damage 5

#### Compost Feint

- id: `compost-feint`
- type: skill
- rarity: common
- cost: 0
- description: Gain 1 Dodge.
- effects:
  - dodge self 1

#### Root Trip

- id: `root-trip`
- type: attack
- rarity: common
- cost: 1
- description: Deal 4 damage. Apply 2 Vulnerable.
- effects:
  - damage enemy 4
  - vulnerable enemy 2

### Uncommon Reward Cards

#### Moonfruit Flurry

- id: `moonfruit-flurry`
- type: attack
- rarity: uncommon
- cost: 2
- description: Deal 4 damage 3 times.
- effects:
  - damage enemy 4
  - damage enemy 4
  - damage enemy 4

#### Juiced Up

- id: `juiced-up`
- type: skill
- rarity: uncommon
- cost: 0
- description: Gain 1 Energy. Draw 1 card.
- effects:
  - gainEnergy self 1
  - draw self 1

#### Thorn Waltz

- id: `thorn-waltz`
- type: attack
- rarity: uncommon
- cost: 1
- description: Deal 3 damage. Gain 3 Block and 1 Thorns.
- effects:
  - damage enemy 3
  - block self 3
  - thorns self 1

#### Night Bloom

- id: `night-bloom`
- type: skill
- rarity: uncommon
- cost: 2
- description: Gain 8 Block. Apply 4 Poison.
- effects:
  - block self 8
  - poison enemy 4

#### Bramble Ambush

- id: `bramble-ambush`
- type: attack
- rarity: uncommon
- cost: 2
- description: Deal 8 damage. Apply 3 Poison. Gain 1 Dodge.
- effects:
  - damage enemy 8
  - poison enemy 3
  - dodge self 1

### Rare Reward Cards

#### Harvest Cut

- id: `harvest-cut`
- type: attack
- rarity: rare
- cost: 2
- description: Deal 12 damage. Deal 18 instead if the enemy is Vulnerable.
- effects:
  - conditional damage enemy 18 if enemy.vulnerable > 0, otherwise damage 12

#### Ghostberry Gambit

- id: `ghostberry-gambit`
- type: skill
- rarity: rare
- cost: 1
- description: Gain 2 Dodge. Draw 2 cards.
- effects:
  - dodge self 2
  - draw self 2

#### Blightbreaker

- id: `blightbreaker`
- type: attack
- rarity: rare
- cost: 3
- description: Deal 20 damage. Remove all Poison from the enemy.
- effects:
  - damage enemy 20
  - clearStatus enemy poison
```

Total unique cards: 18.

## Relics

### Golden Trowel

- id: `golden-trowel`
- rarity: common
- description: Start the first turn of each battle with +1 Energy.
- hook: `onBattleStartFirstTurnEnergy`

### Moonwater Flask

- id: `moonwater-flask`
- rarity: common
- description: Heal 4 HP after each battle.
- hook: `onBattleVictoryHeal4`

### Bramble Sigil

- id: `bramble-sigil`
- rarity: common
- description: Start each battle with 2 Thorns.
- hook: `onBattleStartThorns2`

### Orchard Knife

- id: `orchard-knife`
- rarity: common
- description: Attack cards deal +1 damage.
- hook: `modifyAttackDamagePlus1`

### Wormwood Charm

- id: `wormwood-charm`
- rarity: uncommon
- description: Whenever you apply Poison, apply 1 additional Poison.
- hook: `modifyPoisonPlus1`

### Crown of Leaves

- id: `crown-of-leaves`
- rarity: uncommon
- description: Start each battle with 5 Block.
- hook: `onBattleStartBlock5`

### Pollinator Bell

- id: `pollinator-bell`
- rarity: uncommon
- description: Draw 1 additional card at the start of each turn.
- hook: `modifyDrawPlus1`

### The First Seed

- id: `the-first-seed`
- rarity: rare
- description: Gain +5 Max HP when picked up.
- hook: `onPickupMaxHpPlus5Heal5`

## Enemies

### Mold Mite

- id: `mold-mite`
- maxHp: 24
- portraitPath: `/assets/generated/mold-mite.png`
- behavior: early direct attacker
- intent sequence:
  1. Gnaw — attack 5
  2. Skitter Guard — block 4
  3. Mildew Bite — attack 4, apply 1 Weak

### Rot Grub

- id: `rot-grub`
- maxHp: 30
- portraitPath: `/assets/generated/rot-grub.png`
- behavior: poison pressure
- intent sequence:
  1. Nibble — attack 6
  2. Rot Spit — apply 3 Poison
  3. Burrow — block 5

### Wilted Vinecrawler

- id: `wilted-vinecrawler`
- maxHp: 38
- portraitPath: `/assets/generated/wilted-vinecrawler.png`
- behavior: block and vulnerable setup
- intent sequence:
  1. Thorn Lash — attack 7
  2. Wrap Roots — apply 2 Vulnerable
  3. Harden Bark — block 7

### Baron Botrytis

- id: `baron-botrytis`
- maxHp: 92
- portraitPath: `/assets/generated/baron-botrytis.png`
- behavior: boss, poison and heavy strikes
- intent sequence:
  1. Royal Rot — apply 4 Poison
  2. Cane Strike — attack 12
  3. Spore Court — gain block 8, apply 1 Weak
  4. Blight Decree — attack 8, apply 2 Vulnerable

## Map Nodes

Use a linear map:

```ts
[
  { id: "node-1", type: "battle", label: "Moonlit Row", enemyId: "mold-mite" },
  { id: "node-2", type: "battle", label: "Compost Bend", enemyId: "rot-grub" },
  { id: "node-3", type: "rest", label: "Dewdrop Hollow" },
  { id: "node-4", type: "battle", label: "Broken Trellis", enemyId: "wilted-vinecrawler" },
  { id: "node-5", type: "boss", label: "Botrytis Gate", enemyId: "baron-botrytis" }
]
```

## Rest Node

- Heal 18 HP.
- Do not exceed max HP.
- Continue to map.

## Rewards

After each non-boss battle:

- Show 3 card choices.
- Add selected card to deck.
- After node 2 and node 4, also grant 1 random relic or show a relic choice if easy.

For MVP simplicity:

- Use deterministic reward pools if that is easier to test.
- Avoid duplicate reward display within the same reward screen.

## Placeholder Assets

Use these target paths even if files do not exist yet:

```text
src/assets/generated/blackberry-rogue.png
src/assets/generated/mold-mite.png
src/assets/generated/rot-grub.png
src/assets/generated/wilted-vinecrawler.png
src/assets/generated/baron-botrytis.png
src/assets/generated/starter-patch-bg.png
src/assets/generated/cards/*.png
src/assets/generated/relics/*.png
```

If missing, show styled gradient/card placeholders.
