// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [c7a4f5e28d91b3f0a16d2c47b83e9f12]

import { userPreferences, isCrossfading, isPlaying, currentSongIndex } from "./state"

export const audioPlayer = new Audio()
export const songs: string[] = []

export function loadSong(index: number) {
   if (songs.length === 0) return
   audioPlayer.src = songs[index]
}
