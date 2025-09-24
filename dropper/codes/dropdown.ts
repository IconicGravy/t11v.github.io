// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [b3f8a1d7c92e5f04a1c7d9b6f20e48d1]

export function initDropdown(id: string) {
   const dropdown = document.getElementById(id)
   if (!dropdown) return
   dropdown.addEventListener("click", () => {
      dropdown.classList.toggle("open")
   })
}
