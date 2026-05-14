import { cards, enemies, hero, relics } from "./data";
import type { Card, CardEffect, CombatState, Enemy, Relic, StatusName, Statuses } from "./types";

export const emptyStatuses = (): Statuses => ({
  poison: 0,
  weak: 0,
  vulnerable: 0,
  thorns: 0,
  dodge: 0
});

export const hasRelicHook = (relicIds: string[], hook: Relic["hook"]) =>
  relicIds.some((id) => relics[id]?.hook === hook);

const drawCountFor = (base: number, relicIds: string[]) =>
  base + (hasRelicHook(relicIds, "modifyDrawPlus1") ? 1 : 0);

export const makeRewardChoices = (nodeIndex: number, ownedDeck: string[]) => {
  const rewardPool = [
    "berry-burst",
    "seed-scatter",
    "sporeveil",
    "sneak-peck",
    "compost-feint",
    "root-trip",
    "moonfruit-flurry",
    "juiced-up",
    "thorn-waltz",
    "night-bloom",
    "bramble-ambush",
    "harvest-cut",
    "ghostberry-gambit",
    "blightbreaker"
  ];
  const offset = (nodeIndex * 3) % rewardPool.length;
  const rotated = [...rewardPool.slice(offset), ...rewardPool.slice(0, offset)];
  return rotated.filter((id, index) => index < 6 || !ownedDeck.includes(id)).slice(0, 3);
};

export const nextRelicReward = (ownedRelics: string[]) =>
  Object.keys(relics).find((id) => !ownedRelics.includes(id));

export const drawCards = (state: CombatState, count: number): CombatState => {
  let next = { ...state, hand: [...state.hand], drawPile: [...state.drawPile], discardPile: [...state.discardPile] };

  for (let drawn = 0; drawn < count; drawn += 1) {
    if (next.drawPile.length === 0) {
      if (next.discardPile.length === 0) break;
      next = {
        ...next,
        drawPile: [...next.discardPile].reverse(),
        discardPile: [],
        log: ["Discard pile reshuffled into draw pile.", ...next.log]
      };
    }

    const [cardId, ...rest] = next.drawPile;
    next = {
      ...next,
      drawPile: rest,
      hand: [...next.hand, cardId]
    };
  }

  return next;
};

export const createCombat = (
  enemyId: string,
  deck: string[],
  playerHp: number,
  playerMaxHp: number,
  relicIds: string[]
): CombatState => {
  const enemy = enemies[enemyId];
  if (!enemy) throw new Error(`Unknown enemy: ${enemyId}`);

  const battleStartStatuses = emptyStatuses();
  if (hasRelicHook(relicIds, "onBattleStartThorns2")) battleStartStatuses.thorns = 2;

  const initial: CombatState = {
    playerHp,
    playerMaxHp,
    playerBlock: hasRelicHook(relicIds, "onBattleStartBlock5") ? 5 : 0,
    playerEnergy: hero.baseEnergy + (hasRelicHook(relicIds, "onBattleStartFirstTurnEnergy") ? 1 : 0),
    playerStatuses: battleStartStatuses,
    enemy,
    enemyHp: enemy.maxHp,
    enemyBlock: 0,
    enemyStatuses: emptyStatuses(),
    drawPile: [...deck],
    hand: [],
    discardPile: [],
    exhaustedPile: [],
    turn: "player",
    turnNumber: 1,
    enemyIntentIndex: 0,
    outcome: "active",
    log: [`${enemy.name} blocks the path.`]
  };

  return applyTurnStartPoison(drawCards(initial, drawCountFor(hero.handSize, relicIds)), "player");
};

const statusValue = (statuses: Statuses, status: StatusName) => statuses[status] ?? 0;

const withStatus = (statuses: Statuses, status: StatusName, amount: number): Statuses => ({
  ...statuses,
  [status]: Math.max(0, statusValue(statuses, status) + amount)
});

const decrementTimedStatuses = (statuses: Statuses): Statuses => ({
  ...statuses,
  weak: Math.max(0, statuses.weak - 1),
  vulnerable: Math.max(0, statuses.vulnerable - 1)
});

const effectAmount = (effect: CardEffect, state: CombatState): number => {
  if (!effect.condition) return effect.value ?? 0;
  if (effect.condition === "enemyPoisoned") return state.enemyStatuses.poison > 0 ? effect.value ?? 0 : effect.otherwise ?? 0;
  if (effect.condition === "selfHasDodge") return state.playerStatuses.dodge > 0 ? effect.value ?? 0 : effect.otherwise ?? 0;
  if (effect.condition === "enemyVulnerable") return state.enemyStatuses.vulnerable > 0 ? effect.value ?? 0 : effect.otherwise ?? 0;
  return effect.value ?? 0;
};

const calculateDamage = (
  amount: number,
  attackerStatuses: Statuses,
  defenderStatuses: Statuses,
  isAttackCard: boolean,
  relicIds: string[]
) => {
  let damage = amount;
  if (isAttackCard && hasRelicHook(relicIds, "modifyAttackDamagePlus1")) damage += 1;
  if (attackerStatuses.weak > 0) damage = Math.floor(damage * 0.75);
  if (defenderStatuses.vulnerable > 0) damage = Math.floor(damage * 1.5);
  return Math.max(0, damage);
};

const receiveDamage = (
  state: CombatState,
  target: "player" | "enemy",
  rawDamage: number,
  isAttackCard: boolean,
  relicIds: string[]
): CombatState => {
  const attackerStatuses = target === "enemy" ? state.playerStatuses : state.enemyStatuses;
  const defenderStatuses = target === "enemy" ? state.enemyStatuses : state.playerStatuses;
  const damage = calculateDamage(rawDamage, attackerStatuses, defenderStatuses, isAttackCard, relicIds);

  if (target === "enemy") {
    if (state.enemyStatuses.dodge > 0) {
      return {
        ...state,
        enemyStatuses: withStatus(state.enemyStatuses, "dodge", -1),
        log: [`${state.enemy.name} dodged the hit.`, ...state.log]
      };
    }

    const blocked = Math.min(state.enemyBlock, damage);
    const hpDamage = damage - blocked;
    const enemyHp = Math.max(0, state.enemyHp - hpDamage);
    let next: CombatState = {
      ...state,
      enemyHp,
      enemyBlock: state.enemyBlock - blocked,
      log: [`Dealt ${hpDamage} damage to ${state.enemy.name}${blocked ? ` (${blocked} blocked)` : ""}.`, ...state.log]
    };

    if (hpDamage > 0 && state.enemyStatuses.thorns > 0) {
      next = {
        ...next,
        playerHp: Math.max(0, next.playerHp - state.enemyStatuses.thorns),
        log: [`Thorns dealt ${state.enemyStatuses.thorns} back to you.`, ...next.log]
      };
    }

    return checkOutcome(next);
  }

  if (state.playerStatuses.dodge > 0) {
    return {
      ...state,
      playerStatuses: withStatus(state.playerStatuses, "dodge", -1),
      log: ["You dodged the incoming hit.", ...state.log]
    };
  }

  const blocked = Math.min(state.playerBlock, damage);
  const hpDamage = damage - blocked;
  let next: CombatState = {
    ...state,
    playerHp: Math.max(0, state.playerHp - hpDamage),
    playerBlock: state.playerBlock - blocked,
    log: [`You took ${hpDamage} damage${blocked ? ` (${blocked} blocked)` : ""}.`, ...state.log]
  };

  if (hpDamage > 0 && state.playerStatuses.thorns > 0) {
    next = {
      ...next,
      enemyHp: Math.max(0, next.enemyHp - state.playerStatuses.thorns),
      log: [`Your thorns dealt ${state.playerStatuses.thorns} back.`, ...next.log]
    };
  }

  return checkOutcome(next);
};

const applyEffect = (
  state: CombatState,
  effect: CardEffect,
  source: "player" | "enemy",
  relicIds: string[],
  card?: Card
): CombatState => {
  const target = source === "player" ? effect.target : effect.target === "self" ? "enemy" : "self";
  const amount = effectAmount(effect, state);

  if (effect.type === "damage") {
    return receiveDamage(state, target === "enemy" ? "enemy" : "player", amount, card?.type === "attack", relicIds);
  }

  if (effect.type === "block") {
    return target === "self"
      ? { ...state, playerBlock: state.playerBlock + amount, log: [`Gained ${amount} Block.`, ...state.log] }
      : { ...state, enemyBlock: state.enemyBlock + amount, log: [`${state.enemy.name} gained ${amount} Block.`, ...state.log] };
  }

  if (effect.type === "draw") return drawCards({ ...state, log: [`Drew ${amount} card${amount === 1 ? "" : "s"}.`, ...state.log] }, amount);

  if (effect.type === "gainEnergy") {
    return { ...state, playerEnergy: state.playerEnergy + amount, log: [`Gained ${amount} Energy.`, ...state.log] };
  }

  if (effect.type === "heal") {
    return { ...state, playerHp: Math.min(state.playerMaxHp, state.playerHp + amount), log: [`Healed ${amount} HP.`, ...state.log] };
  }

  if (effect.type === "clearStatus" && effect.status) {
    const statuses = target === "self" ? state.playerStatuses : state.enemyStatuses;
    const cleared = { ...statuses, [effect.status]: 0 };
    return target === "self" ? { ...state, playerStatuses: cleared } : { ...state, enemyStatuses: cleared };
  }

  const status = effect.type as StatusName;
  const bonus = status === "poison" && source === "player" && hasRelicHook(relicIds, "modifyPoisonPlus1") ? 1 : 0;
  const total = amount + bonus;

  if (target === "self") {
    return {
      ...state,
      playerStatuses: withStatus(state.playerStatuses, status, total),
      log: [`Gained ${total} ${status}.`, ...state.log]
    };
  }

  return {
    ...state,
    enemyStatuses: withStatus(state.enemyStatuses, status, total),
    log: [`Applied ${total} ${status} to ${state.enemy.name}.`, ...state.log]
  };
};

export const playCard = (state: CombatState, cardId: string, relicIds: string[]): CombatState => {
  if (state.outcome !== "active" || state.turn !== "player") return state;
  const card = cards[cardId];
  const handIndex = state.hand.indexOf(cardId);
  if (!card || handIndex === -1) return state;
  if (state.playerEnergy < card.cost) {
    return { ...state, log: [`Not enough energy for ${card.name}.`, ...state.log] };
  }

  const hand = [...state.hand];
  hand.splice(handIndex, 1);
  let next: CombatState = {
    ...state,
    hand,
    playerEnergy: state.playerEnergy - card.cost,
    discardPile: [...state.discardPile, card.id],
    log: [`Played ${card.name}.`, ...state.log]
  };

  for (const effect of card.effects) {
    next = applyEffect(next, effect, "player", relicIds, card);
    if (next.outcome !== "active") break;
  }

  return next;
};

const applyTurnStartPoison = (state: CombatState, target: "player" | "enemy"): CombatState => {
  if (target === "player" && state.playerStatuses.poison > 0) {
    const poison = state.playerStatuses.poison;
    return checkOutcome({
      ...state,
      playerHp: Math.max(0, state.playerHp - poison),
      playerStatuses: withStatus(state.playerStatuses, "poison", -1),
      log: [`Poison deals ${poison} damage to you.`, ...state.log]
    });
  }

  if (target === "enemy" && state.enemyStatuses.poison > 0) {
    const poison = state.enemyStatuses.poison;
    return checkOutcome({
      ...state,
      enemyHp: Math.max(0, state.enemyHp - poison),
      enemyStatuses: withStatus(state.enemyStatuses, "poison", -1),
      log: [`Poison deals ${poison} damage to ${state.enemy.name}.`, ...state.log]
    });
  }

  return state;
};

export const endPlayerTurn = (state: CombatState, relicIds: string[]): CombatState => {
  if (state.outcome !== "active" || state.turn !== "player") return state;
  let next: CombatState = {
    ...state,
    turn: "enemy",
    discardPile: [...state.discardPile, ...state.hand],
    hand: [],
    playerStatuses: decrementTimedStatuses(state.playerStatuses),
    log: ["Ended turn.", ...state.log]
  };

  next = applyTurnStartPoison(next, "enemy");
  if (next.outcome !== "active") return next;

  const intent = next.enemy.intents[next.enemyIntentIndex % next.enemy.intents.length];
  next = { ...next, log: [`${next.enemy.name} uses ${intent.label}.`, ...next.log] };
  for (const effect of intent.effects) {
    next = applyEffect(next, effect, "enemy", relicIds);
    if (next.outcome !== "active") return next;
  }

  return startPlayerTurn({
    ...next,
    enemyIntentIndex: (next.enemyIntentIndex + 1) % next.enemy.intents.length,
    enemyStatuses: decrementTimedStatuses(next.enemyStatuses)
  }, relicIds);
};

export const startPlayerTurn = (state: CombatState, relicIds: string[]): CombatState => {
  if (state.outcome !== "active") return state;
  const next = applyTurnStartPoison({
    ...state,
    turn: "player",
    turnNumber: state.turnNumber + 1,
    playerBlock: 0,
    enemyBlock: 0,
    playerEnergy: hero.baseEnergy,
    log: [`Turn ${state.turnNumber + 1} begins.`, ...state.log]
  }, "player");

  if (next.outcome !== "active") return next;
  return drawCards(next, drawCountFor(hero.handSize, relicIds));
};

export const checkOutcome = (state: CombatState): CombatState => {
  if (state.enemyHp <= 0) return { ...state, outcome: "victory", log: [`${state.enemy.name} is defeated.`, ...state.log] };
  if (state.playerHp <= 0) return { ...state, outcome: "defeat", log: ["The Blight overtakes you.", ...state.log] };
  return state;
};

export const statusLabels = (statuses: Statuses) =>
  Object.entries(statuses)
    .filter(([, value]) => value > 0)
    .map(([name, value]) => `${name} ${value}`);

export const getCurrentIntent = (enemy: Enemy, index: number) => enemy.intents[index % enemy.intents.length];

