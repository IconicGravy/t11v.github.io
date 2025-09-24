// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [a1d9c3e2f7b84a10c9f6b3d42e7f56aa]

export let isCrossfading = false
export let isPlaying = false
export let currentSongIndex = 0
export let snowInterval: number | null = null

export const userPreferences = {
   theme: localStorage.getItem("theme") || "dark",
   volume: parseFloat(localStorage.getItem("volume") || "1"),
   background: localStorage.getItem("background") || "snow"
}
