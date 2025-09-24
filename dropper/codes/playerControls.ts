// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [e1f9b3d72c48a5f0c7d28e94b1a3f60c]

import { audioPlayer, songs, loadSong } from "./playerCore"
import { userPreferences, isCrossfading, isPlaying, currentSongIndex } from "./state"

export function playSong() {
   audioPlayer.volume = userPreferences.volume
   audioPlayer.play()
   isPlaying = true
}

export function pauseSong() {
   audioPlayer.pause()
   isPlaying = false
}

export function nextSong() {
   if (isCrossfading) return
   isCrossfading = true
   currentSongIndex = (currentSongIndex + 1) % songs.length
   loadSong(currentSongIndex)
   audioPlayer.currentTime = 0
   audioPlayer.volume = userPreferences.volume
   if (isPlaying) audioPlayer.play()
   isCrossfading = false
}
