import { hero, mapNodes, relics } from "./data";
import { createCombat, makeRewardChoices, nextRelicReward } from "./combat";
import type { RunState } from "./types";

export const createRun = (): RunState => ({
  screen: "title",
  hero,
  playerHp: hero.maxHp,
  playerMaxHp: hero.maxHp,
  deck: [...hero.startingDeck],
  relics: [],
  currentNodeIndex: 0,
  completedNodes: [],
  pendingRewards: []
});

export const startRun = (): RunState => ({
  ...createRun(),
  screen: "hero"
});

export const enterMap = (run: RunState): RunState => ({
  ...run,
  screen: "map",
  combat: undefined,
  pendingRewards: [],
  pendingRelic: undefined
});

export const startCurrentNode = (run: RunState): RunState => {
  const node = mapNodes[run.currentNodeIndex];
  if (!node) return { ...run, screen: "victory" };
  if (node.type === "rest") return { ...run, screen: "rest" };
  if (!node.enemyId) return run;
  return {
    ...run,
    screen: "battle",
    combat: createCombat(node.enemyId, run.deck, run.playerHp, run.playerMaxHp, run.relics)
  };
};

export const completeBattle = (run: RunState): RunState => {
  const node = mapNodes[run.currentNodeIndex];
  if (!run.combat || !node) return run;
  const relicAdjustedHp = run.relics.some((id) => relics[id]?.hook === "onBattleVictoryHeal4")
    ? Math.min(run.playerMaxHp, run.combat.playerHp + 4)
    : run.combat.playerHp;

  if (node.type === "boss") {
    return {
      ...run,
      screen: "victory",
      playerHp: relicAdjustedHp,
      completedNodes: [...run.completedNodes, node.id]
    };
  }

  const pendingRelic = run.currentNodeIndex === 1 || run.currentNodeIndex === 3 ? nextRelicReward(run.relics) : undefined;
  return {
    ...run,
    screen: "reward",
    playerHp: relicAdjustedHp,
    completedNodes: [...run.completedNodes, node.id],
    pendingRewards: makeRewardChoices(run.currentNodeIndex, run.deck),
    pendingRelic
  };
};

export const chooseReward = (run: RunState, cardId: string): RunState => {
  let nextMaxHp = run.playerMaxHp;
  let nextHp = run.playerHp;
  const nextRelics = run.pendingRelic ? [...run.relics, run.pendingRelic] : run.relics;

  if (run.pendingRelic && relics[run.pendingRelic]?.hook === "onPickupMaxHpPlus5Heal5") {
    nextMaxHp += 5;
    nextHp = Math.min(nextMaxHp, nextHp + 5);
  }

  return {
    ...run,
    deck: [...run.deck, cardId],
    relics: nextRelics,
    playerHp: nextHp,
    playerMaxHp: nextMaxHp,
    currentNodeIndex: run.currentNodeIndex + 1,
    screen: "map",
    combat: undefined,
    pendingRewards: [],
    pendingRelic: undefined
  };
};

export const rest = (run: RunState): RunState => {
  const node = mapNodes[run.currentNodeIndex];
  return {
    ...run,
    screen: "map",
    playerHp: Math.min(run.playerMaxHp, run.playerHp + 18),
    completedNodes: node ? [...run.completedNodes, node.id] : run.completedNodes,
    currentNodeIndex: run.currentNodeIndex + 1
  };
};

