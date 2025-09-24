// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [a8c7d3f0b2e91c4d7e6f50a1c8b3d9e2]

import { playSong, pauseSong, nextSong } from "./playerControls"

export function initHotkeys() {
   window.addEventListener("keydown", e => {
      if (e.code === "Space") {
         e.preventDefault()
         if (document.hidden) return
         if (document.querySelector("audio")?.paused) playSong()
         else pauseSong()
      }
      if (e.code === "ArrowRight") nextSong()
   })
}
