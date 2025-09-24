// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [a3e9b2d17c40f8d5e1b6c29f7d8a02c4]

export function enableDragDrop() {
   const container = document.querySelector(".main-container")
   if (!container) return
   const cards = container.querySelectorAll(".draggable")
   cards.forEach(card => {
      card.addEventListener("dragstart", () => {
         card.classList.add("dragging")
      })
      card.addEventListener("dragend", () => {
         card.classList.remove("dragging")
      })
   })
}
