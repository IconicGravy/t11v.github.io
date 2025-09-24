// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [7b1d3f9e0c28a6d4e8f5b2c13a9d7f20]

export function updateGreeting() {
   const hour = new Date().getHours()
   const greetingElement = document.getElementById("greeting")
   if (!greetingElement) return
   if (hour < 12) greetingElement.textContent = "Good morning"
   else if (hour < 18) greetingElement.textContent = "Good afternoon"
   else greetingElement.textContent = "Good evening"
}
