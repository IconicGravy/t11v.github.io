// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [e7d1b3f9c0a2d8f4b6c1e9a3d5f0c8b2]

import { audioPlayer } from "./playerCore"

export let repeatMode: "off" | "one" | "all" = "off"

export function setRepeat(mode: "off" | "one" | "all") {
   repeatMode = mode
}

export function handleRepeat() {
   if (repeatMode === "one") {
      audioPlayer.currentTime = 0
      audioPlayer.play()
   }
}
