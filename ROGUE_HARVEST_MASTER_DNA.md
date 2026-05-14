# ROGUE HARVEST — MASTER GAME DNA

## 1) Core Identity

**Title:** Rogue Harvest

**Genre:** Deck-Building Roguelike

**Platform Goal:** Browser-first playable demo

**Primary Showcase Goal:**
Demonstrate a polished AI-assisted game workflow where:
- Codex builds the game systems, structure, UI flow, and logic
- GPT Image 2 generates the art assets, concept art, icons, portraits, card art, backgrounds, and key art

**Tone:**
Dark blight fantasy with a little whimsy

**Emotional Feel:**
- adventurous
- slightly eerie
- charming
- clever
- magical
- organic
- handcrafted indie-game feel

**High Concept / Elevator Pitch:**
Rogue Harvest is a deck-building roguelike where anthropomorphic fruit and vegetable heroes battle through a corrupted garden-world consumed by a spreading force known as the Blight.

**Player Fantasy:**
The player is a small but heroic produce adventurer using agility, plant magic, tools, and relics to survive a dangerous run through a corrupted living world.

---

## 2) Visual / Brand Pillars

### Visual Identity
The world should feel like:
- fantasy produce heroes
- corrupted garden ecosystems
- magical botany
- rot, spores, mold, thorns, roots, and moonlit growth
- charming but dangerous

### Style Balance
This is NOT:
- fully goofy
- fully horror
- fully childish
- fully grimdark

This IS:
- whimsical dark fantasy
- premium indie
- readable and stylized
- painterly with bold silhouettes

### Brand Keywords
- Rogue Harvest
- The Blight
- garden champions
- corrupted harvest
- fruit & vegetable heroes
- thorn, root, rot, bloom, spore, moonfruit, compost, relic, orchard, cellar

---

## 3) Game Pillars

### Pillar 1: Readable strategic combat
Turn-based card combat should be easy to understand but still rewarding.

### Pillar 2: Strong visual identity
The game should stand out immediately because the heroes are fruits and vegetables in a dark fantasy world.

### Pillar 3: AI-generated asset showcase
The game should visibly benefit from AI art generation:
- cards
- relics
- character portraits
- enemies
- backgrounds
- logo
- splash art

### Pillar 4: Expandable systems
The MVP should be small, but structured so more heroes, cards, relics, enemies, and biomes can be added later.

---

## 4) Recommended Tech Direction

### Recommended Stack
**Frontend:** React + TypeScript + Vite

### Why this stack
- excellent for card-heavy UI
- fast browser demo
- easy component structure
- good for Codex-assisted development
- easy to organize game screens
- easy to swap placeholder images with final assets

### Suggested Supporting Tools
- Zustand or simple React state for game state
- CSS modules or Tailwind for styling
- Local JSON data files for cards, enemies, relics, and map nodes

### Alternative Stack
Phaser + TypeScript if a more game-engine-like feel is desired later

---

## 5) Core Gameplay Loop

### Run Loop
1. Start a run
2. Choose or load a hero
3. Enter node-based map
4. Fight enemies in turn-based card battles
5. Gain rewards:
   - cards
   - relics
   - healing
   - upgrades
6. Progress deeper into the corrupted world
7. Fight biome boss
8. Win or lose run
9. Start over stronger in knowledge, not permanent grind-heavy meta

### Combat Loop
1. Draw hand
2. Spend energy to play cards
3. Attack, block, poison, buff, debuff
4. End turn
5. Enemy acts based on intent
6. Repeat until one side is defeated

---

## 6) World / Lore DNA

### Setting
A once-living magical agricultural realm called the **Heartgarden** has been infected by a spreading corruption called the **Blight**.

### The Blight
The Blight is a force of:
- rot
- mold
- parasitic growth
- fungal corruption
- decay of life systems
- hostile overgrowth

### Lore Premise
The champions of the garden — fruits, roots, leaves, bulbs, gourds, and seeds — must travel through corrupted lands to stop the source of the Blight before the harvest is lost forever.

### Lore Tone
Keep lore simple, flavorful, and suggestive rather than overly dense.

---

## 7) Biome DNA

### Biome 1: The Starter Patch
Purpose:
- onboarding biome
- first enemies
- lighter corruption

Visuals:
- overgrown rows
- broken trellises
- moonlit soil
- early rot patches

### Biome 2: Rotroot Cellar
Purpose:
- darker mid-run biome
- fungal enemies
- heavier debuffs

Visuals:
- cracked storage rooms
- damp roots
- barrels, crates, mold
- cellar gloom

### Biome 3: Thornwild
Purpose:
- aggressive biome
- spiky enemies
- bleed / thorn mechanics

Visuals:
- carnivorous vines
- tangled brambles
- twisted blooms
- dangerous undergrowth

### Biome 4: Orchard of Spores
Purpose:
- late-run weirdness
- corrupted fruit enemies
- airborne poison and rot

Visuals:
- ghostly orchard
- diseased fruit
- drifting spores
- pale moonlight

### Final Zone Option: The Canning Keep
Purpose:
- climactic boss zone
- surreal garden-industrial fusion

Visuals:
- enchanted preserving machines
- glass jars
- metal fittings
- corrupted pantry magic

---

## 8) Hero DNA

### Design Rule
All playable heroes are anthropomorphic fruits or vegetables.

### Hero Style Rule
They should feel:
- heroic
- expressive
- class-based
- readable in silhouette
- charming, not silly
- fantasy-themed, not mascot-themed

### Starter Hero Recommendation
**Blackberry Rogue**

#### Blackberry Rogue
Class fantasy:
An agile, thorn-wielding rogue who uses speed, poison, and evasive techniques.

Visual traits:
- blackberry body/head form
- leaf-and-vine hood or cloak
- thorn daggers
- nimble pose
- subtle magical berry glow
- clever expression

Gameplay identity:
- quick attacks
- poison
- dodge / evade
- multi-hit combo cards
- low-to-medium defense
- high tactical flexibility

### Additional Future Heroes

#### Sir Carrot
Role:
Balanced fighter / knight

Themes:
- root shield
- charge
- discipline
- straightforward attacks

#### Onion Mage
Role:
Debuff / spellcaster

Themes:
- tear magic
- layered defenses
- fumes
- pungent curses

#### Pumpkin Bruiser
Role:
Tank

Themes:
- rind armor
- slam attacks
- seed bursts
- high durability

#### Chili Duelist
Role:
Glass cannon / burn specialist

Themes:
- heat
- speed
- ignite
- explosive damage

---

## 9) Enemy DNA

### Enemy Design Principles
Enemies should feel like natural garden corruption or pantry / rot mutations.

### Basic Enemy Examples
- Mold Mite
- Rot Grub
- Sporespawn
- Wilted Vinecrawler
- Slug Marauder
- Blight Crow
- Canned Sentinel

### Mini-Boss / Boss Examples
- Baron Botrytis
- Queen Mildew
- The Rotten Pumpkin King
- The Worm Beneath
- The Canner Automaton

### Enemy Behavior Identity
Each enemy should have a readable intent style:
- direct attack
- block / defend
- poison / spore spread
- summon
- buff allies
- weaken player

---

## 10) Combat System DNA

### Combat Structure
Turn-based, one side acts then the other.

### Core Combat Stats
Player:
- HP
- Energy
- Block
- Status effects

Enemy:
- HP
- Intent
- Status effects

### Recommended Core Rules
- Player starts each turn with a fixed amount of energy
- Draw a hand of cards each turn
- Cards cost energy
- Unplayed cards discard at turn end unless otherwise specified
- Block absorbs incoming damage
- Enemy intent is shown clearly before the player acts

### Recommended MVP Status Effects
- Poison
- Weak
- Vulnerable
- Thorns
- Dodge / Evasion

### Combat Feel
The game should feel:
- readable
- strategic
- not too complicated at first
- satisfying when combos click

---

## 11) Card System DNA

### Card Categories
- Attack
- Skill
- Defense
- Utility
- Poison / Debuff
- Finisher / Rare

### Starting Hero Card Identity: Blackberry Rogue
Core mechanics:
- poison
- multi-hit
- evasive movement
- bramble / thorn flavor
- clever utility

### Example Blackberry Rogue Cards

**Common / Starter Cards**
- Thorn Jab — small attack
- Berry Burst — damage + combo synergy
- Bramble Cloak — gain block and thorns
- Nightshade Step — gain dodge or defensive utility
- Vine Snare — apply weak or slow-like debuff
- Seed Scatter — small multi-target attack
- Rot Kiss — apply poison
- Juiced Up — gain energy or draw
- Sneak Peck — conditional bonus damage
- Moonfruit Flurry — multi-hit attack

### Card Naming Style
Names should feel:
- garden-magic flavored
- easy to understand
- slightly poetic but not confusing

Examples:
- Thorn Jab
- Root Guard
- Layered Ward
- Compost Rite
- Bloomstrike
- Feral Vine
- Sporeveil
- Harvest Cut

---

## 12) Relic DNA

### Relic Function
Relics are passive items that change playstyle and reward experimentation.

### Relic Visual Rule
Relics should be icon-friendly and visually distinctive.

### Example Relics
- Golden Trowel
- Moonwater Flask
- Sacred Compost
- The First Seed
- Wormwood Charm
- Sunlit Sprinkler
- Crown of Leaves
- Pollinator Bell
- Bramble Sigil
- Orchard Knife

### Relic Design Style
Small magical garden artifacts with personality

---

## 13) Progression DNA

### MVP Run Progression
- Start run
- Travel through simple path nodes
- Fight 3–5 battles
- Gain rewards
- Encounter a boss
- Win or lose

### Node Types
- Battle
- Elite Battle
- Rest
- Reward
- Shop
- Boss

### Reward Types
- choose 1 of 3 cards
- gain relic
- heal
- remove a card
- upgrade a card

### Long-Term Philosophy
For MVP, keep meta-progression light or absent.
The focus is the run, not a giant unlock system.

---

## 14) UX / UI DNA

### UI Goals
- clean
- legible
- polished
- card game first
- premium but simple

### Screen List
- Title Screen
- Hero Select
- Map Screen
- Battle Screen
- Reward Screen
- Victory / Defeat Screen

### UI Theme
- parchment + botanical + moonlit fantasy
- or dark wood / garden stone / magical leaf accents
- buttons and panels should feel fantasy-organic, not sci-fi

### Readability Rule
Gameplay clarity matters more than decorative complexity

---

## 15) Art Direction DNA

### Master Style
Painterly digital illustration with bold readable silhouettes and premium indie-game polish

### Art Tone
Whimsical dark fantasy with a little storybook energy

### Character Art Rules
- expressive faces or face-like features
- strong silhouette
- class identity should read quickly
- fruit/vegetable form must remain recognizable
- fantasy costume accents from leaves, roots, thorns, vines, petals, bark, cloth

### Asset Consistency Rules
All assets should feel like they belong to one world.
Avoid mixing:
- pixel art
- hyper realism
- flat corporate illustration
- anime with painterly western fantasy unless intentionally directed

### Color Direction
World palette:
- deep greens
- earthy browns
- moonlit blues
- berry purples
- fungal sickly yellows / pale greens for corruption
- warm gold accents for relics / hero magic

### Lighting Direction
- moody but readable
- magical highlights
- glow accents on important objects
- not too dark to understand

### Asset Types to Generate
- title / key art
- hero portrait
- enemy portraits
- boss portraits
- card illustrations
- relic icons
- biome backgrounds
- UI decorations

---

## 16) Audio / Mood DNA

### Optional Mood Direction
- soft fantasy ambience
- rustling leaves
- distant insects
- cellar drips
- magical garden tones
- subtle combat stings

Not required for MVP, but useful later.

---

## 17) MVP Scope Definition

### MVP Goal
Build a playable polished prototype that proves the concept and the AI workflow.

### MVP Features
- 1 playable hero: Blackberry Rogue
- 3 standard enemies
- 1 boss
- 15–20 cards
- 8–10 relics
- 1 simple node-based map
- turn-based battle system
- reward screen
- victory and defeat states
- placeholder or first-pass GPT Image 2 assets

### MVP Non-Goals
Do NOT start with:
- multiple heroes
- huge lore system
- dozens of relics
- animation-heavy complexity
- multiplayer
- procedural everything
- mobile app port first

---

## 18) Expansion Roadmap

### Phase 2
- second playable hero
- more enemies
- more relics
- map variety
- shops and card removal
- stronger visual polish

### Phase 3
- more biomes
- more bosses
- card upgrade paths
- hero unlocks
- events / story nodes

### Phase 4
- richer meta progression
- sound design
- advanced VFX
- better balancing
- public demo packaging

---

## 19) AI Workflow DNA

### Codex Responsibilities
Codex should help:
- scaffold project
- organize codebase
- build combat system
- build map flow
- build card logic
- build reward flow
- wire game state
- create reusable components
- support iterative refactors
- use placeholder asset paths initially
- later integrate generated assets

### GPT Image 2 Responsibilities
GPT Image 2 should generate:
- key art
- title screen art
- hero portrait
- enemy portraits
- boss portrait
- card illustrations
- relic icons
- backgrounds
- UI decorative elements

### Important Workflow Principle
Start with gameplay using placeholder art.
Then replace category by category with generated assets.

Recommended asset order:
1. hero portrait
2. enemy portraits
3. card art
4. relic icons
5. backgrounds
6. key art / logo

---

## 20) Prompt Strategy DNA

### For Codex prompts
Prompts should emphasize:
- React + TypeScript + Vite
- clean modular code
- browser demo
- deck-building roguelike structure
- data-driven cards and enemies
- placeholder image paths
- readable and maintainable architecture

### For GPT Image 2 prompts
Prompts should emphasize:
- consistent art direction
- painterly fantasy
- whimsical dark-blight tone
- fruit/vegetable hero identity
- no text on art unless specifically requested
- game-asset suitability
- clean composition and readable silhouettes

---

## 21) Signature Keywords / Prompt Vocabulary

### Setting Keywords
- Heartgarden
- The Blight
- corrupted orchard
- fungal rot
- moonlit garden
- enchanted cellar
- thornwild
- magical produce kingdom

### Art Keywords
- painterly digital illustration
- whimsical dark fantasy
- premium indie game
- clean silhouette
- rich garden colors
- botanical magic
- moody but readable
- expressive character design

### Gameplay Keywords
- deck-building roguelike
- turn-based card combat
- node-based progression
- rewards and relics
- poison, dodge, thorns, utility

---

## 22) One-Sentence Creative North Star

Rogue Harvest is a stylish, charming, slightly eerie deck-building roguelike where anthropomorphic fruit and vegetable heroes battle a spreading blight through a magical corrupted garden-world.

---

## 23) Two-Sentence Vision Statement

The game should feel like a polished indie roguelike with a highly distinctive world and immediately memorable character theme. It should clearly showcase how Codex can build the game systems while GPT Image 2 generates a cohesive set of premium-looking visual assets.

---

## 24) Build Constraint

Always protect scope.

If a feature does not support:
- the core battle loop
- the deckbuilding loop
- the AI asset showcase
- or MVP playability

then it should be deferred.