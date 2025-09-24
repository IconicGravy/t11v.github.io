// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [9c4d2f1a7b83e9c65d02f4b18a72d3e1]

import { userPreferences, snowInterval } from "./state"

export function setBackground(effect: string) {
   clearBackground()
   if (effect === "snow") initSnow()
   if (effect === "aurora") initAurora()
   if (effect === "nebula") initNebula()
   if (effect === "geometric") initGeometric()
   if (effect === "galaxy") initGalaxy()
   localStorage.setItem("background", effect)
   userPreferences.background = effect
}

export function clearBackground() {
   if (snowInterval) clearInterval(snowInterval)
   const bg = document.getElementById("background-effect")
   if (bg) bg.innerHTML = ""
}
