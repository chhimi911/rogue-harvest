export type SoundName = "victory" | "defeat" | "loot" | "card" | "warning" | "menu";

type SoundConfig = {
  src: string;
  volume: number;
  cooldownMs: number;
};

const STORAGE_KEY = "rogue-harvest-audio";
const DEFAULT_VOLUME = 0.6;

const soundMap: Record<SoundName, SoundConfig> = {
  victory: { src: "/audio/victory-stinger.mp3", volume: 0.7, cooldownMs: 1200 },
  defeat: { src: "/audio/defeat-game-over.mp3", volume: 0.7, cooldownMs: 1200 },
  loot: { src: "/audio/loot-relic-acquisition.mp3", volume: 0.6, cooldownMs: 350 },
  card: { src: "/audio/card-shuffle-play.mp3", volume: 0.35, cooldownMs: 120 },
  warning: { src: "/audio/enemy-warning-high-tension.mp3", volume: 0.55, cooldownMs: 2500 },
  menu: { src: "/audio/menu-selection.mp3", volume: 0.3, cooldownMs: 180 }
};

type SoundPreferences = {
  muted: boolean;
  volume: number;
};

const listeners = new Set<(preferences: SoundPreferences) => void>();
const lastPlayed: Partial<Record<SoundName, number>> = {};

let hasUserInteracted = false;
let muted = false;
let volume = DEFAULT_VOLUME;

const clampVolume = (value: number) => Math.min(1, Math.max(0, value));

const readPreferences = (): SoundPreferences => {
  if (typeof window === "undefined") return { muted, volume };

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return { muted, volume };

    const parsed = JSON.parse(stored) as Partial<SoundPreferences>;
    return {
      muted: Boolean(parsed.muted),
      volume: typeof parsed.volume === "number" ? clampVolume(parsed.volume) : DEFAULT_VOLUME
    };
  } catch {
    return { muted, volume };
  }
};

const savePreferences = () => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ muted, volume }));
  } catch {
    // Local storage can be unavailable in private or restricted browser contexts.
  }
};

const notify = () => {
  const preferences = getSoundPreferences();
  listeners.forEach((listener) => listener(preferences));
};

const initPreferences = () => {
  const preferences = readPreferences();
  muted = preferences.muted;
  volume = preferences.volume;
};

const unlockAudio = () => {
  hasUserInteracted = true;
};

if (typeof window !== "undefined") {
  initPreferences();
  window.addEventListener("pointerdown", unlockAudio, { once: true });
  window.addEventListener("keydown", unlockAudio, { once: true });
}

export const getSoundPreferences = (): SoundPreferences => ({ muted, volume });

export const subscribeToSoundPreferences = (listener: (preferences: SoundPreferences) => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const setMuted = (nextMuted: boolean) => {
  muted = nextMuted;
  savePreferences();
  notify();
};

export const setVolume = (nextVolume: number) => {
  volume = clampVolume(nextVolume);
  savePreferences();
  notify();
};

export const playSound = (name: SoundName) => {
  if (typeof Audio === "undefined") return;
  if (muted || !hasUserInteracted) return;

  const config = soundMap[name];
  const now = Date.now();
  const elapsed = now - (lastPlayed[name] ?? 0);
  if (elapsed < config.cooldownMs) return;

  lastPlayed[name] = now;
  const audio = new Audio(config.src);
  audio.preload = "auto";
  audio.volume = clampVolume(volume * config.volume);
  audio.play().catch(() => {
    // Browser autoplay and device audio policies should never break gameplay.
  });
};
