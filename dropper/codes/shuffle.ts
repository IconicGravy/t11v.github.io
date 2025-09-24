// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [c2a9e7d1f0b3a8c4d5e1b7f9c6a0d2e4]

import { songs } from "./playerCore"

export function shufflePlaylist() {
   for (let i = songs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = songs[i]
      songs[i] = songs[j]
      songs[j] = temp
   }
}
