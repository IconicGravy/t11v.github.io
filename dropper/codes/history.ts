// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [d8c1f9b2a7e0c3d4b5f2a1c9e7b0d4f2]

export let history: string[] = []

export function addHistory(entry: string) {
   history.push(entry)
   if (history.length > 100) history.shift()
}

export function getHistory() {
   return [...history]
}
