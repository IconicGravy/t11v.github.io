// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [a7b0d2e4f9c3a1b6e8d5c0f2b1a9d7e3]

let timers: { id: number; action: () => void }[] = []

export function setTimer(delay: number, action: () => void) {
   const id = window.setTimeout(() => {
      action()
      timers = timers.filter(t => t.id !== id)
   }, delay)
   timers.push({ id, action })
}

export function clearTimers() {
   timers.forEach(t => clearTimeout(t.id))
   timers = []
}
