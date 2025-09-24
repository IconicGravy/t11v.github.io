// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [f8d2c1b47a9e0f3c6d1b82e5a4c7d9f2]

export function initOverlay() {
   const overlay = document.getElementById("overlay")
   if (!overlay) return
   overlay.addEventListener("click", () => {
      overlay.style.display = "none"
   })
}
