import { useEffect, useMemo, useRef, useState } from "react";
import { playSound } from "./audio/sounds";
import { useSound } from "./audio/useSound";
import { cards, enemies, mapNodes, relics } from "./game/data";
import { completeBattle, createRun, chooseReward, enterMap, rest, startCurrentNode, startRun } from "./game/run";
import { endPlayerTurn, getCurrentIntent, playCard, statusLabels } from "./game/combat";
import type { Card, RunState, Statuses } from "./game/types";

const placeholderInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

function ArtFrame({ src, label, variant = "portrait" }: { src: string; label: string; variant?: "portrait" | "card" | "icon" }) {
  const [missing, setMissing] = useState(false);
  return (
    <div className={`art-frame art-${variant}`} aria-label={`${label} art`}>
      {!missing ? <img src={src} alt="" onError={() => setMissing(true)} /> : <span>{placeholderInitials(label)}</span>}
    </div>
  );
}

function StatusList({ statuses }: { statuses: Statuses }) {
  const labels = statusLabels(statuses);
  if (labels.length === 0) return <span className="muted">No statuses</span>;
  return (
    <ul className="status-list" aria-label="Active statuses">
      {labels.map((label) => (
        <li key={label}>{label}</li>
      ))}
    </ul>
  );
}

function StatusGlossary() {
  const entries = [
    ["Poison", "Loses HP at the start of that side's turn, then drops by 1."],
    ["Weak", "Outgoing attack damage is reduced while active."],
    ["Vulnerable", "Incoming attack damage is increased while active."],
    ["Thorns", "Damages an attacker after HP damage lands."],
    ["Dodge", "Prevents the next incoming attack hit, then drops by 1."]
  ];

  return (
    <details className="status-glossary">
      <summary>Combat help and status glossary</summary>
      <dl>
        {entries.map(([name, description]) => (
          <div key={name}>
            <dt>{name}</dt>
            <dd>{description}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}

function AudioControls() {
  const { muted, setMuted, setVolume, volume } = useSound();

  return (
    <aside className="sound-controls" aria-label="Sound settings">
      <button
        className="sound-toggle"
        type="button"
        aria-pressed={muted}
        onClick={() => setMuted(!muted)}
      >
        {muted ? "Sound Off" : "Sound On"}
      </button>
      <label className="volume-control">
        <span>Volume</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          aria-label="Sound volume"
        />
      </label>
    </aside>
  );
}

function CardButton({
  card,
  disabled,
  disabledReason,
  onClick
}: {
  card: Card;
  disabled?: boolean;
  disabledReason?: string;
  onClick?: () => void;
}) {
  const label = `${card.name}, cost ${card.cost}. ${disabledReason ?? card.description}`;

  return (
    <button className="card-button" type="button" disabled={disabled} aria-label={label} title={disabledReason} onClick={onClick}>
      <span className="card-topline">
        <strong>{card.name}</strong>
        <b>{card.cost}</b>
      </span>
      <ArtFrame src={card.artPath} label={card.name} variant="card" />
      <span className="card-meta">{card.rarity} {card.type}</span>
      <span className="card-copy">{card.description}</span>
      {disabledReason ? <span className="disabled-reason">{disabledReason}</span> : null}
    </button>
  );
}

function RelicTray({ relicIds }: { relicIds: string[] }) {
  if (relicIds.length === 0) return <p className="muted">No relics yet.</p>;
  return (
    <ul className="relic-tray" aria-label="Active relics">
      {relicIds.map((id) => {
        const relic = relics[id];
        return (
          <li key={id}>
            <ArtFrame src={relic.iconPath} label={relic.name} variant="icon" />
            <span>
              <strong>{relic.name}</strong>
              <small>{relic.description}</small>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function TitleScreen({ onStart }: { onStart: () => void }) {
  return (
    <main className="screen title-screen">
      <section className="hero-panel">
        <div>
          <p className="overline">The Starter Patch awaits</p>
          <h1>Rogue Harvest</h1>
          <p>
            A dark-whimsy deck-building roguelike demo where the Blackberry Rogue fights through a corrupted garden path.
          </p>
          <button className="primary-action" type="button" onClick={onStart}>
            Start Run
          </button>
        </div>
        <ArtFrame src="/assets/generated/starter-patch-bg.png" label="Starter Patch" />
      </section>
    </main>
  );
}

function HeroScreen({ run, onContinue }: { run: RunState; onContinue: () => void }) {
  return (
    <main className="screen">
      <section className="two-column">
        <div className="panel hero-card">
          <ArtFrame src={run.hero.portraitPath} label={run.hero.name} />
          <div>
            <p className="overline">{run.hero.className}</p>
            <h1>{run.hero.name}</h1>
            <p>{run.hero.description}</p>
            <dl className="stat-grid">
              <div><dt>HP</dt><dd>{run.playerHp}/{run.playerMaxHp}</dd></div>
              <div><dt>Energy</dt><dd>{run.hero.baseEnergy}</dd></div>
              <div><dt>Hand</dt><dd>{run.hero.handSize}</dd></div>
              <div><dt>Deck</dt><dd>{run.deck.length}</dd></div>
            </dl>
            <button className="primary-action" type="button" onClick={onContinue}>
              Enter Starter Patch
            </button>
          </div>
        </div>
        <DeckList deck={run.deck} />
      </section>
    </main>
  );
}

function DeckList({ deck }: { deck: string[] }) {
  const counts = useMemo(
    () => deck.reduce<Record<string, number>>((acc, id) => ({ ...acc, [id]: (acc[id] ?? 0) + 1 }), {}),
    [deck]
  );
  return (
    <aside className="panel">
      <h2>Run Deck</h2>
      <ul className="deck-list">
        {Object.entries(counts).map(([id, count]) => (
          <li key={id}>
            <span>{cards[id].name}</span>
            <b>x{count}</b>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function MapScreen({ run, onNode }: { run: RunState; onNode: () => void }) {
  const current = mapNodes[run.currentNodeIndex];
  return (
    <main className="screen">
      <header className="screen-header">
        <div>
          <p className="overline">Linear path</p>
          <h1>The Starter Patch</h1>
        </div>
        <div className="run-summary">HP {run.playerHp}/{run.playerMaxHp} · Deck {run.deck.length}</div>
      </header>
      <section className="map-layout">
        <ol className="map-track" aria-label="Starter Patch nodes">
          {mapNodes.map((node, index) => {
            const isCurrent = index === run.currentNodeIndex;
            const complete = run.completedNodes.includes(node.id);
            return (
              <li key={node.id} className={isCurrent ? "current-node" : complete ? "complete-node" : ""}>
                <span>{index + 1}</span>
                <strong>{node.label}</strong>
                <small>{node.type}{node.enemyId ? ` · ${enemies[node.enemyId].name}` : ""}</small>
              </li>
            );
          })}
        </ol>
        <aside className="panel">
          <h2>{current ? current.label : "Path cleared"}</h2>
          <p>
            {current?.type === "rest"
              ? "Rest at Dewdrop Hollow to recover 18 HP."
              : current?.type === "boss"
                ? "The boss waits beyond the gate."
                : "Choose the next node to begin combat."}
          </p>
          <button className="primary-action" type="button" onClick={onNode} disabled={!current}>
            {current?.type === "rest" ? "Rest" : current?.type === "boss" ? "Face the Boss" : "Start Battle"}
          </button>
          <h3>Relics</h3>
          <RelicTray relicIds={run.relics} />
        </aside>
      </section>
    </main>
  );
}

function BattleScreen({
  run,
  onPlay,
  onEndTurn,
  onContinue,
  onDefeat
}: {
  run: RunState;
  onPlay: (cardId: string) => void;
  onEndTurn: () => void;
  onContinue: () => void;
  onDefeat: () => void;
}) {
  const combat = run.combat;
  if (!combat) return null;
  const intent = getCurrentIntent(combat.enemy, combat.enemyIntentIndex);
  return (
    <main className="screen battle-screen">
      <header className="battle-hud">
        <div>
          <strong>{run.hero.name}</strong>
          <span>HP {combat.playerHp}/{combat.playerMaxHp}</span>
          <span>Block {combat.playerBlock}</span>
          <span>Energy {combat.playerEnergy}</span>
        </div>
        <div>
          <span>Draw {combat.drawPile.length}</span>
          <span>Discard {combat.discardPile.length}</span>
          <span>Turn {combat.turnNumber}</span>
        </div>
      </header>
      <StatusGlossary />
      <section className="battlefield">
        <article className="combatant panel">
          <ArtFrame src={run.hero.portraitPath} label={run.hero.name} />
          <h2>{run.hero.name}</h2>
          <StatusList statuses={combat.playerStatuses} />
        </article>
        <article className="combatant enemy panel">
          <ArtFrame src={combat.enemy.portraitPath} label={combat.enemy.name} />
          <h2>{combat.enemy.name}</h2>
          <p>HP {combat.enemyHp}/{combat.enemy.maxHp} · Block {combat.enemyBlock}</p>
          <div className="intent-box">
            <strong>Intent: {intent.label}</strong>
            <span>{intent.description}</span>
          </div>
          <StatusList statuses={combat.enemyStatuses} />
        </article>
      </section>
      <section className="hand-panel" aria-label="Hand">
        {combat.hand.map((cardId, index) => {
          const card = cards[cardId];
          const disabledReason =
            combat.outcome !== "active"
              ? "Combat is over"
              : combat.turn !== "player"
                ? "Enemy turn"
                : combat.playerEnergy < card.cost
                  ? `Need ${card.cost - combat.playerEnergy} more Energy`
                  : undefined;
          return (
            <CardButton
              key={`${cardId}-${index}`}
              card={card}
              disabled={Boolean(disabledReason)}
              disabledReason={disabledReason}
              onClick={() => onPlay(cardId)}
            />
          );
        })}
      </section>
      <footer className="battle-footer">
        <div className="panel log-panel" aria-live="polite">
          <h2>Combat Log</h2>
          <ol>
            {combat.log.slice(0, 6).map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ol>
        </div>
        <div className="turn-actions">
          {combat.outcome === "victory" ? (
            <button className="primary-action" type="button" onClick={onContinue}>
              {mapNodes[run.currentNodeIndex]?.type === "boss" ? "Claim Victory" : "Claim Reward"}
            </button>
          ) : combat.outcome === "defeat" ? (
            <button className="primary-action danger" type="button" onClick={onDefeat}>Fall to the Blight</button>
          ) : (
            <button className="primary-action" type="button" onClick={onEndTurn}>End Turn</button>
          )}
        </div>
      </footer>
    </main>
  );
}

function RewardScreen({ run, onChoose }: { run: RunState; onChoose: (cardId: string) => void }) {
  const pendingRelic = run.pendingRelic ? relics[run.pendingRelic] : undefined;

  return (
    <main className="screen">
      <header className="screen-header">
        <div>
          <p className="overline">Battle won</p>
          <h1>Choose a Card</h1>
          <p className="screen-note">
            Choose 1 card. It is added to your run deck before you return to the map.
            {pendingRelic ? " The relic shown below is gained with this reward." : ""}
          </p>
        </div>
        {pendingRelic ? <div className="run-summary">Also gained: {pendingRelic.name}</div> : null}
      </header>
      <section className="reward-grid" aria-label="Choose one card reward">
        {run.pendingRewards.map((id) => (
          <CardButton key={id} card={cards[id]} onClick={() => onChoose(id)} />
        ))}
      </section>
      {pendingRelic ? (
        <aside className="panel reward-relic">
          <ArtFrame src={pendingRelic.iconPath} label={pendingRelic.name} variant="icon" />
          <div>
            <p className="overline">Relic reward</p>
            <h2>{pendingRelic.name}</h2>
            <p><strong>Also gained after you choose a card.</strong> {pendingRelic.description}</p>
          </div>
        </aside>
      ) : null}
    </main>
  );
}

function RestScreen({ run, onRest }: { run: RunState; onRest: () => void }) {
  return (
    <main className="screen center-screen">
      <section className="panel end-panel">
        <p className="overline">Dewdrop Hollow</p>
        <h1>Rest Among Moonlit Leaves</h1>
        <p>Recover 18 HP, up to your current maximum. No shop, upgrades, or removals in this MVP.</p>
        <p className="run-summary">Current HP {run.playerHp}/{run.playerMaxHp}</p>
        <button className="primary-action" type="button" onClick={onRest}>Rest and Continue</button>
      </section>
    </main>
  );
}

function EndScreen({ kind, run, onRestart }: { kind: "victory" | "defeat"; run: RunState; onRestart: () => void }) {
  return (
    <main className="screen center-screen">
      <section className={`panel end-panel ${kind}`}>
        <p className="overline">{kind === "victory" ? "Starter Patch cleared" : "Run ended"}</p>
        <h1>{kind === "victory" ? "The Harvest Holds" : "The Blight Wins"}</h1>
        <p>
          {kind === "victory"
            ? "Baron Botrytis falls, and the Blackberry Rogue slips back through the trellis with a hard-earned win."
            : "The corrupted garden closes in. Knowledge carries forward, even when the run does not."}
        </p>
        <p className="run-summary">Final HP {run.playerHp}/{run.playerMaxHp} · Deck {run.deck.length} · Relics {run.relics.length}</p>
        <button className="primary-action" type="button" onClick={onRestart}>Restart Run</button>
      </section>
    </main>
  );
}

export default function App() {
  const [run, setRun] = useState<RunState>(() => createRun());
  const lastScreenSoundRef = useRef(run.screen);
  const lastWarningKeyRef = useRef("");

  const updateCombat = (updater: NonNullable<RunState["combat"]>) => setRun((current) => ({ ...current, combat: updater }));

  useEffect(() => {
    if (run.screen === lastScreenSoundRef.current) return;
    lastScreenSoundRef.current = run.screen;

    if (run.screen === "victory") playSound("victory");
    if (run.screen === "defeat") playSound("defeat");
  }, [run.screen]);

  useEffect(() => {
    if (run.screen !== "battle" || !run.combat) return;

    const node = mapNodes[run.currentNodeIndex];
    const intent = getCurrentIntent(run.combat.enemy, run.combat.enemyIntentIndex);
    const heavyAttack = intent.effects.some((effect) => effect.type === "damage" && (effect.value ?? 0) >= 10);
    const bossStart = node?.type === "boss" && run.combat.turnNumber === 1 && run.combat.enemyIntentIndex === 0;
    const warningKey = `${node?.id}-${run.combat.turnNumber}-${run.combat.enemyIntentIndex}`;

    if ((bossStart || heavyAttack) && lastWarningKeyRef.current !== warningKey) {
      lastWarningKeyRef.current = warningKey;
      playSound("warning");
    }
  }, [run.combat, run.currentNodeIndex, run.screen]);

  let screen;
  if (run.screen === "title") {
    screen = <TitleScreen onStart={() => { playSound("menu"); setRun(startRun()); }} />;
  } else if (run.screen === "hero") {
    screen = <HeroScreen run={run} onContinue={() => { playSound("menu"); setRun((current) => enterMap(current)); }} />;
  } else if (run.screen === "map") {
    screen = <MapScreen run={run} onNode={() => { playSound("menu"); setRun((current) => startCurrentNode(current)); }} />;
  } else if (run.screen === "rest") {
    screen = <RestScreen run={run} onRest={() => { playSound("menu"); setRun((current) => rest(current)); }} />;
  } else if (run.screen === "reward") {
    screen = (
      <RewardScreen
        run={run}
        onChoose={(cardId) => {
          playSound("loot");
          setRun((current) => chooseReward(current, cardId));
        }}
      />
    );
  } else if (run.screen === "victory") {
    screen = <EndScreen kind="victory" run={run} onRestart={() => { playSound("menu"); setRun(createRun()); }} />;
  } else if (run.screen === "defeat") {
    screen = <EndScreen kind="defeat" run={run} onRestart={() => { playSound("menu"); setRun(createRun()); }} />;
  } else {
    screen = (
      <BattleScreen
        run={run}
        onPlay={(cardId) => {
          if (!run.combat) return;
          const nextCombat = playCard(run.combat, cardId, run.relics);
          if (nextCombat !== run.combat) playSound("card");
          updateCombat(nextCombat);
        }}
        onEndTurn={() => run.combat && updateCombat(endPlayerTurn(run.combat, run.relics))}
        onContinue={() => { playSound("menu"); setRun((current) => completeBattle(current)); }}
        onDefeat={() => { playSound("menu"); setRun((current) => ({ ...current, screen: "defeat", playerHp: 0 })); }}
      />
    );
  }

  return (
    <>
      <AudioControls />
      {screen}
    </>
  );
}
