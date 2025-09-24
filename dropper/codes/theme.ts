// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [f39c7e2a84d9b61fa01b3c27e6d42c8f]

import { userPreferences } from "./state"

export function setTheme(theme: string) {
   document.documentElement.setAttribute("data-theme", theme)
   localStorage.setItem("theme", theme)
   userPreferences.theme = theme
}
