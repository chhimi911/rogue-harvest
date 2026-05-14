import type { Card, Enemy, Hero, MapNode, Relic } from "./types";

const cardArt = (id: string) => `/assets/generated/cards/${id}.png`;
const relicArt = (id: string) => `/assets/generated/relics/${id}.png`;

export const hero: Hero = {
  id: "blackberry-rogue",
  name: "Blackberry Rogue",
  className: "Thorn-Wielding Rogue",
  maxHp: 72,
  baseEnergy: 3,
  handSize: 5,
  portraitPath: "/assets/generated/blackberry-rogue.png",
  description: "An agile berry adventurer using poison, dodge, thorns, and precise strikes.",
  startingDeck: [
    "thorn-jab",
    "thorn-jab",
    "thorn-jab",
    "thorn-jab",
    "bramble-cloak",
    "bramble-cloak",
    "nightshade-step",
    "rot-kiss",
    "vine-snare"
  ]
};

export const cards: Record<string, Card> = {
  "thorn-jab": {
    id: "thorn-jab",
    name: "Thorn Jab",
    type: "attack",
    rarity: "starter",
    cost: 1,
    description: "Deal 6 damage.",
    tags: ["strike"],
    effects: [{ type: "damage", target: "enemy", value: 6 }],
    artPath: cardArt("thorn-jab")
  },
  "bramble-cloak": {
    id: "bramble-cloak",
    name: "Bramble Cloak",
    type: "skill",
    rarity: "starter",
    cost: 1,
    description: "Gain 5 Block and 2 Thorns.",
    tags: ["defense", "thorns"],
    effects: [
      { type: "block", target: "self", value: 5 },
      { type: "thorns", target: "self", value: 2 }
    ],
    artPath: cardArt("bramble-cloak")
  },
  "nightshade-step": {
    id: "nightshade-step",
    name: "Nightshade Step",
    type: "skill",
    rarity: "starter",
    cost: 1,
    description: "Gain 4 Block and 1 Dodge.",
    tags: ["defense", "dodge"],
    effects: [
      { type: "block", target: "self", value: 4 },
      { type: "dodge", target: "self", value: 1 }
    ],
    artPath: cardArt("nightshade-step")
  },
  "rot-kiss": {
    id: "rot-kiss",
    name: "Rot Kiss",
    type: "skill",
    rarity: "starter",
    cost: 1,
    description: "Apply 5 Poison.",
    tags: ["poison"],
    effects: [{ type: "poison", target: "enemy", value: 5 }],
    artPath: cardArt("rot-kiss")
  },
  "vine-snare": {
    id: "vine-snare",
    name: "Vine Snare",
    type: "skill",
    rarity: "starter",
    cost: 1,
    description: "Apply 2 Weak and 1 Vulnerable.",
    tags: ["debuff"],
    effects: [
      { type: "weak", target: "enemy", value: 2 },
      { type: "vulnerable", target: "enemy", value: 1 }
    ],
    artPath: cardArt("vine-snare")
  },
  "berry-burst": {
    id: "berry-burst",
    name: "Berry Burst",
    type: "attack",
    rarity: "common",
    cost: 1,
    description: "Deal 4 damage. If the enemy has Poison, deal 8 instead.",
    tags: ["strike", "poison"],
    effects: [{ type: "damage", target: "enemy", value: 8, condition: "enemyPoisoned", otherwise: 4 }],
    artPath: cardArt("berry-burst")
  },
  "seed-scatter": {
    id: "seed-scatter",
    name: "Seed Scatter",
    type: "attack",
    rarity: "common",
    cost: 1,
    description: "Deal 3 damage 2 times.",
    tags: ["multi-hit"],
    effects: [
      { type: "damage", target: "enemy", value: 3 },
      { type: "damage", target: "enemy", value: 3 }
    ],
    artPath: cardArt("seed-scatter")
  },
  "sporeveil": {
    id: "sporeveil",
    name: "Sporeveil",
    type: "skill",
    rarity: "common",
    cost: 1,
    description: "Gain 3 Block. Apply 1 Weak.",
    tags: ["defense", "debuff"],
    effects: [
      { type: "block", target: "self", value: 3 },
      { type: "weak", target: "enemy", value: 1 }
    ],
    artPath: cardArt("sporeveil")
  },
  "sneak-peck": {
    id: "sneak-peck",
    name: "Sneak Peck",
    type: "attack",
    rarity: "common",
    cost: 1,
    description: "Deal 5 damage. If you have Dodge, deal 10 instead.",
    tags: ["strike", "dodge"],
    effects: [{ type: "damage", target: "enemy", value: 10, condition: "selfHasDodge", otherwise: 5 }],
    artPath: cardArt("sneak-peck")
  },
  "compost-feint": {
    id: "compost-feint",
    name: "Compost Feint",
    type: "skill",
    rarity: "common",
    cost: 0,
    description: "Gain 1 Dodge.",
    tags: ["dodge"],
    effects: [{ type: "dodge", target: "self", value: 1 }],
    artPath: cardArt("compost-feint")
  },
  "root-trip": {
    id: "root-trip",
    name: "Root Trip",
    type: "attack",
    rarity: "common",
    cost: 1,
    description: "Deal 4 damage. Apply 2 Vulnerable.",
    tags: ["strike", "debuff"],
    effects: [
      { type: "damage", target: "enemy", value: 4 },
      { type: "vulnerable", target: "enemy", value: 2 }
    ],
    artPath: cardArt("root-trip")
  },
  "moonfruit-flurry": {
    id: "moonfruit-flurry",
    name: "Moonfruit Flurry",
    type: "attack",
    rarity: "uncommon",
    cost: 2,
    description: "Deal 4 damage 3 times.",
    tags: ["multi-hit"],
    effects: [
      { type: "damage", target: "enemy", value: 4 },
      { type: "damage", target: "enemy", value: 4 },
      { type: "damage", target: "enemy", value: 4 }
    ],
    artPath: cardArt("moonfruit-flurry")
  },
  "juiced-up": {
    id: "juiced-up",
    name: "Juiced Up",
    type: "utility",
    rarity: "uncommon",
    cost: 0,
    description: "Gain 1 Energy. Draw 1 card.",
    tags: ["draw", "energy"],
    effects: [
      { type: "gainEnergy", target: "self", value: 1 },
      { type: "draw", target: "self", value: 1 }
    ],
    artPath: cardArt("juiced-up")
  },
  "thorn-waltz": {
    id: "thorn-waltz",
    name: "Thorn Waltz",
    type: "attack",
    rarity: "uncommon",
    cost: 1,
    description: "Deal 3 damage. Gain 3 Block and 1 Thorns.",
    tags: ["strike", "thorns"],
    effects: [
      { type: "damage", target: "enemy", value: 3 },
      { type: "block", target: "self", value: 3 },
      { type: "thorns", target: "self", value: 1 }
    ],
    artPath: cardArt("thorn-waltz")
  },
  "night-bloom": {
    id: "night-bloom",
    name: "Night Bloom",
    type: "skill",
    rarity: "uncommon",
    cost: 2,
    description: "Gain 8 Block. Apply 4 Poison.",
    tags: ["defense", "poison"],
    effects: [
      { type: "block", target: "self", value: 8 },
      { type: "poison", target: "enemy", value: 4 }
    ],
    artPath: cardArt("night-bloom")
  },
  "bramble-ambush": {
    id: "bramble-ambush",
    name: "Bramble Ambush",
    type: "attack",
    rarity: "uncommon",
    cost: 2,
    description: "Deal 8 damage. Apply 3 Poison. Gain 1 Dodge.",
    tags: ["strike", "poison", "dodge"],
    effects: [
      { type: "damage", target: "enemy", value: 8 },
      { type: "poison", target: "enemy", value: 3 },
      { type: "dodge", target: "self", value: 1 }
    ],
    artPath: cardArt("bramble-ambush")
  },
  "harvest-cut": {
    id: "harvest-cut",
    name: "Harvest Cut",
    type: "attack",
    rarity: "rare",
    cost: 2,
    description: "Deal 12 damage. Deal 18 instead if the enemy is Vulnerable.",
    tags: ["strike", "finisher"],
    effects: [{ type: "damage", target: "enemy", value: 18, condition: "enemyVulnerable", otherwise: 12 }],
    artPath: cardArt("harvest-cut")
  },
  "ghostberry-gambit": {
    id: "ghostberry-gambit",
    name: "Ghostberry Gambit",
    type: "skill",
    rarity: "rare",
    cost: 1,
    description: "Gain 2 Dodge. Draw 2 cards.",
    tags: ["dodge", "draw"],
    effects: [
      { type: "dodge", target: "self", value: 2 },
      { type: "draw", target: "self", value: 2 }
    ],
    artPath: cardArt("ghostberry-gambit")
  },
  "blightbreaker": {
    id: "blightbreaker",
    name: "Blightbreaker",
    type: "attack",
    rarity: "rare",
    cost: 3,
    description: "Deal 20 damage. Remove all Poison from the enemy.",
    tags: ["strike", "cleanse"],
    effects: [
      { type: "damage", target: "enemy", value: 20 },
      { type: "clearStatus", target: "enemy", status: "poison" }
    ],
    artPath: cardArt("blightbreaker")
  }
};

export const rewardCardIds = Object.values(cards)
  .filter((card) => card.rarity !== "starter")
  .map((card) => card.id);

export const relics: Record<string, Relic> = {
  "golden-trowel": {
    id: "golden-trowel",
    name: "Golden Trowel",
    rarity: "common",
    description: "Start the first turn of each battle with +1 Energy.",
    hook: "onBattleStartFirstTurnEnergy",
    iconPath: relicArt("golden-trowel")
  },
  "moonwater-flask": {
    id: "moonwater-flask",
    name: "Moonwater Flask",
    rarity: "common",
    description: "Heal 4 HP after each battle.",
    hook: "onBattleVictoryHeal4",
    iconPath: relicArt("moonwater-flask")
  },
  "bramble-sigil": {
    id: "bramble-sigil",
    name: "Bramble Sigil",
    rarity: "common",
    description: "Start each battle with 2 Thorns.",
    hook: "onBattleStartThorns2",
    iconPath: relicArt("bramble-sigil")
  },
  "orchard-knife": {
    id: "orchard-knife",
    name: "Orchard Knife",
    rarity: "common",
    description: "Attack cards deal +1 damage.",
    hook: "modifyAttackDamagePlus1",
    iconPath: relicArt("orchard-knife")
  },
  "wormwood-charm": {
    id: "wormwood-charm",
    name: "Wormwood Charm",
    rarity: "uncommon",
    description: "Whenever you apply Poison, apply 1 additional Poison.",
    hook: "modifyPoisonPlus1",
    iconPath: relicArt("wormwood-charm")
  },
  "crown-of-leaves": {
    id: "crown-of-leaves",
    name: "Crown of Leaves",
    rarity: "uncommon",
    description: "Start each battle with 5 Block.",
    hook: "onBattleStartBlock5",
    iconPath: relicArt("crown-of-leaves")
  },
  "pollinator-bell": {
    id: "pollinator-bell",
    name: "Pollinator Bell",
    rarity: "uncommon",
    description: "Draw 1 additional card at the start of each turn.",
    hook: "modifyDrawPlus1",
    iconPath: relicArt("pollinator-bell")
  },
  "the-first-seed": {
    id: "the-first-seed",
    name: "The First Seed",
    rarity: "rare",
    description: "Gain +5 Max HP when picked up.",
    hook: "onPickupMaxHpPlus5Heal5",
    iconPath: relicArt("the-first-seed")
  }
};

export const enemies: Record<string, Enemy> = {
  "mold-mite": {
    id: "mold-mite",
    name: "Mold Mite",
    maxHp: 24,
    portraitPath: "/assets/generated/mold-mite.png",
    description: "A fuzzy early attacker creeping through moonlit soil.",
    intents: [
      { id: "gnaw", label: "Gnaw", description: "Attack 5", effects: [{ type: "damage", target: "enemy", value: 5 }] },
      { id: "skitter-guard", label: "Skitter Guard", description: "Gain 4 Block", effects: [{ type: "block", target: "self", value: 4 }] },
      {
        id: "mildew-bite",
        label: "Mildew Bite",
        description: "Attack 4 and apply 1 Weak",
        effects: [
          { type: "damage", target: "enemy", value: 4 },
          { type: "weak", target: "enemy", value: 1 }
        ]
      }
    ]
  },
  "rot-grub": {
    id: "rot-grub",
    name: "Rot Grub",
    maxHp: 30,
    portraitPath: "/assets/generated/rot-grub.png",
    description: "A poison-pressure grub breathing green spore mist.",
    intents: [
      { id: "nibble", label: "Nibble", description: "Attack 6", effects: [{ type: "damage", target: "enemy", value: 6 }] },
      { id: "rot-spit", label: "Rot Spit", description: "Apply 3 Poison", effects: [{ type: "poison", target: "enemy", value: 3 }] },
      { id: "burrow", label: "Burrow", description: "Gain 5 Block", effects: [{ type: "block", target: "self", value: 5 }] }
    ]
  },
  "wilted-vinecrawler": {
    id: "wilted-vinecrawler",
    name: "Wilted Vinecrawler",
    maxHp: 38,
    portraitPath: "/assets/generated/wilted-vinecrawler.png",
    description: "A defensive vine mass that sets up vulnerable turns.",
    intents: [
      { id: "thorn-lash", label: "Thorn Lash", description: "Attack 7", effects: [{ type: "damage", target: "enemy", value: 7 }] },
      { id: "wrap-roots", label: "Wrap Roots", description: "Apply 2 Vulnerable", effects: [{ type: "vulnerable", target: "enemy", value: 2 }] },
      { id: "harden-bark", label: "Harden Bark", description: "Gain 7 Block", effects: [{ type: "block", target: "self", value: 7 }] }
    ]
  },
  "baron-botrytis": {
    id: "baron-botrytis",
    name: "Baron Botrytis",
    maxHp: 92,
    portraitPath: "/assets/generated/baron-botrytis.png",
    description: "A rot-noble boss issuing spore-choked decrees.",
    intents: [
      { id: "royal-rot", label: "Royal Rot", description: "Apply 4 Poison", effects: [{ type: "poison", target: "enemy", value: 4 }] },
      { id: "cane-strike", label: "Cane Strike", description: "Attack 12", effects: [{ type: "damage", target: "enemy", value: 12 }] },
      {
        id: "spore-court",
        label: "Spore Court",
        description: "Gain 8 Block and apply 1 Weak",
        effects: [
          { type: "block", target: "self", value: 8 },
          { type: "weak", target: "enemy", value: 1 }
        ]
      },
      {
        id: "blight-decree",
        label: "Blight Decree",
        description: "Attack 8 and apply 2 Vulnerable",
        effects: [
          { type: "damage", target: "enemy", value: 8 },
          { type: "vulnerable", target: "enemy", value: 2 }
        ]
      }
    ]
  }
};

export const mapNodes: MapNode[] = [
  { id: "node-1", type: "battle", label: "Moonlit Row", enemyId: "mold-mite" },
  { id: "node-2", type: "battle", label: "Compost Bend", enemyId: "rot-grub" },
  { id: "node-3", type: "rest", label: "Dewdrop Hollow" },
  { id: "node-4", type: "battle", label: "Broken Trellis", enemyId: "wilted-vinecrawler" },
  { id: "node-5", type: "boss", label: "Botrytis Gate", enemyId: "baron-botrytis" }
];

