// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [e7c2d9b18f4a0c3d6b7e1a92f5c8d013]

import { audioPlayer } from "./playerCore"
import { userPreferences } from "./state"

export function setVolume(level: number) {
   userPreferences.volume = Math.min(1, Math.max(0, level))
   audioPlayer.volume = userPreferences.volume
   localStorage.setItem("volume", userPreferences.volume.toString())
}
