import { describe, expect, it } from "vitest";
import { createCombat, drawCards, endPlayerTurn, playCard } from "./combat";

const baseDeck = [
  "thorn-jab",
  "thorn-jab",
  "bramble-cloak",
  "nightshade-step",
  "rot-kiss",
  "vine-snare"
];

describe("combat engine", () => {
  it("spends energy and deals damage through block", () => {
    const combat = createCombat("mold-mite", baseDeck, 72, 72, []);
    const afterBlock = { ...combat, enemyBlock: 3 };
    const afterCard = playCard(afterBlock, "thorn-jab", []);

    expect(afterCard.playerEnergy).toBe(2);
    expect(afterCard.enemyHp).toBe(21);
    expect(afterCard.enemyBlock).toBe(0);
    expect(afterCard.discardPile).toContain("thorn-jab");
  });

  it("applies block, thorns, and dodge from starter skills", () => {
    let combat = createCombat("mold-mite", baseDeck, 72, 72, []);
    combat = playCard(combat, "bramble-cloak", []);
    combat = playCard(combat, "nightshade-step", []);

    expect(combat.playerBlock).toBe(9);
    expect(combat.playerStatuses.thorns).toBe(2);
    expect(combat.playerStatuses.dodge).toBe(1);
  });

  it("poison ticks at the start of the enemy turn", () => {
    let combat = createCombat("mold-mite", baseDeck, 72, 72, []);
    combat = playCard(combat, "rot-kiss", []);
    combat = endPlayerTurn(combat, []);

    expect(combat.enemyHp).toBe(19);
    expect(combat.enemyStatuses.poison).toBe(4);
  });

  it("weak reduces outgoing attack damage and vulnerable increases incoming damage", () => {
    let combat = createCombat("mold-mite", ["vine-snare", "thorn-jab"], 72, 72, []);
    combat = drawCards({ ...combat, hand: [], drawPile: ["vine-snare", "thorn-jab"], discardPile: [] }, 2);
    combat = playCard(combat, "vine-snare", []);
    combat = playCard(combat, "thorn-jab", []);

    expect(combat.enemyHp).toBe(15);
    expect(combat.enemyStatuses.weak).toBe(2);
  });

  it("dodge prevents one incoming hit", () => {
    let combat = createCombat("mold-mite", ["nightshade-step"], 72, 72, []);
    combat = playCard(combat, "nightshade-step", []);
    combat = endPlayerTurn(combat, []);

    expect(combat.playerHp).toBe(72);
    expect(combat.playerStatuses.dodge).toBe(0);
  });

  it("thorns damages an attacker after hp damage lands", () => {
    let combat = createCombat("mold-mite", ["bramble-cloak"], 72, 72, []);
    combat = playCard(combat, "bramble-cloak", []);
    combat = { ...combat, playerBlock: 0 };
    combat = endPlayerTurn(combat, []);

    expect(combat.enemyHp).toBe(22);
  });

  it("draws from discard when the draw pile empties", () => {
    const combat = createCombat("mold-mite", ["thorn-jab"], 72, 72, []);
    const drawn = drawCards({ ...combat, hand: [], drawPile: [], discardPile: ["rot-kiss"] }, 1);

    expect(drawn.hand).toEqual(["rot-kiss"]);
    expect(drawn.discardPile).toEqual([]);
  });

  it("detects victory and defeat", () => {
    const win = playCard(createCombat("mold-mite", ["blightbreaker", "harvest-cut"], 72, 72, []), "blightbreaker", []);
    expect(win.outcome).toBe("active");
    const secondHit = playCard({ ...win, hand: ["harvest-cut"], playerEnergy: 3 }, "harvest-cut", []);
    expect(secondHit.outcome).toBe("victory");

    const loss = endPlayerTurn({
      ...createCombat("baron-botrytis", ["thorn-jab"], 1, 72, []),
      enemyIntentIndex: 1
    }, []);
    expect(loss.outcome).toBe("defeat");
  });
});
