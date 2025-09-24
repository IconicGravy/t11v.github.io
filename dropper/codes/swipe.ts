// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [d9e0a3b7c4f8a1d2e5b9c7f3a0d2b8e1]

export function initSwipe(containerId: string, onSwipeLeft: () => void, onSwipeRight: () => void) {
   const container = document.getElementById(containerId)
   if (!container) return

   let startX = 0
   container.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX
   })

   container.addEventListener("touchend", e => {
      const endX = e.changedTouches[0].clientX
      if (endX - startX > 50) onSwipeRight()
      if (startX - endX > 50) onSwipeLeft()
   })
}
