import { useEffect, useState } from "react";
import {
  getSoundPreferences,
  playSound,
  setMuted,
  setVolume,
  subscribeToSoundPreferences
} from "./sounds";

export function useSound() {
  const [preferences, setPreferences] = useState(getSoundPreferences);

  useEffect(() => subscribeToSoundPreferences(setPreferences), []);

  return {
    ...preferences,
    playSound,
    setMuted,
    setVolume,
    toggleMuted: () => setMuted(!preferences.muted)
  };
}
