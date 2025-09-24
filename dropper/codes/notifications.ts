// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [a9d2f7b18c40e5d7f3a1c8e2b7d0f6c1]

export function showNotification(message: string, timeout = 3000) {
   const box = document.createElement("div")
   box.className = "notification"
   box.textContent = message
   document.body.appendChild(box)
   setTimeout(() => box.remove(), timeout)
}
