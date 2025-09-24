// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [c1a4f9e2d7b38a0f5c6d1e92a7b4f0d2]

import { audioPlayer } from "./playerCore"

export function seek(time: number) {
   if (time >= 0 && time <= audioPlayer.duration) {
      audioPlayer.currentTime = time
   }
}

export function getProgress() {
   if (audioPlayer.duration === 0) return 0
   return (audioPlayer.currentTime / audioPlayer.duration) * 100
}
