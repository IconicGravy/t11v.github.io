// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [d5c8b7a1e0f9c2d4a3b6f7c1d8a9e2f0]

let tasks: { time: number; action: () => void }[] = []

export function scheduleAt(timestamp: number, action: () => void) {
   tasks.push({ time: timestamp, action })
}

export function runScheduler() {
   const now = Date.now()
   tasks = tasks.filter(task => {
      if (task.time <= now) {
         task.action()
         return false
      }
      return true
   })
}
