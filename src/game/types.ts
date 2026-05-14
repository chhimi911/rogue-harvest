export type Screen =
  | "title"
  | "hero"
  | "map"
  | "battle"
  | "reward"
  | "rest"
  | "victory"
  | "defeat";

export type CardType = "attack" | "skill" | "power" | "utility";
export type Rarity = "starter" | "common" | "uncommon" | "rare";
export type StatusName = "poison" | "weak" | "vulnerable" | "thorns" | "dodge";
export type Target = "self" | "enemy";
export type EffectType =
  | "damage"
  | "block"
  | "poison"
  | "weak"
  | "vulnerable"
  | "thorns"
  | "dodge"
  | "draw"
  | "gainEnergy"
  | "heal"
  | "clearStatus";

export type EffectCondition = "enemyPoisoned" | "selfHasDodge" | "enemyVulnerable";

export interface CardEffect {
  type: EffectType;
  target: Target;
  value?: number;
  status?: StatusName;
  condition?: EffectCondition;
  otherwise?: number;
}

export interface Card {
  id: string;
  name: string;
  type: CardType;
  rarity: Rarity;
  cost: number;
  description: string;
  tags: string[];
  effects: CardEffect[];
  artPath: string;
}

export interface Hero {
  id: string;
  name: string;
  className: string;
  maxHp: number;
  baseEnergy: number;
  handSize: number;
  startingDeck: string[];
  portraitPath: string;
  description: string;
}

export interface EnemyIntent {
  id: string;
  label: string;
  description: string;
  effects: CardEffect[];
}

export interface Enemy {
  id: string;
  name: string;
  maxHp: number;
  portraitPath: string;
  description: string;
  intents: EnemyIntent[];
}

export type RelicHook =
  | "onBattleStartFirstTurnEnergy"
  | "onBattleVictoryHeal4"
  | "onBattleStartThorns2"
  | "modifyAttackDamagePlus1"
  | "modifyPoisonPlus1"
  | "onBattleStartBlock5"
  | "modifyDrawPlus1"
  | "onPickupMaxHpPlus5Heal5";

export interface Relic {
  id: string;
  name: string;
  rarity: Exclude<Rarity, "starter">;
  description: string;
  hook: RelicHook;
  iconPath: string;
}

export type MapNodeType = "battle" | "rest" | "boss";

export interface MapNode {
  id: string;
  type: MapNodeType;
  label: string;
  enemyId?: string;
}

export type Statuses = Record<StatusName, number>;

export interface CombatState {
  playerHp: number;
  playerMaxHp: number;
  playerBlock: number;
  playerEnergy: number;
  playerStatuses: Statuses;
  enemy: Enemy;
  enemyHp: number;
  enemyBlock: number;
  enemyStatuses: Statuses;
  drawPile: string[];
  hand: string[];
  discardPile: string[];
  exhaustedPile: string[];
  turn: "player" | "enemy";
  turnNumber: number;
  enemyIntentIndex: number;
  outcome: "active" | "victory" | "defeat";
  log: string[];
}

export interface RunState {
  screen: Screen;
  hero: Hero;
  playerHp: number;
  playerMaxHp: number;
  deck: string[];
  relics: string[];
  currentNodeIndex: number;
  completedNodes: string[];
  pendingRewards: string[];
  pendingRelic?: string;
  combat?: CombatState;
}

