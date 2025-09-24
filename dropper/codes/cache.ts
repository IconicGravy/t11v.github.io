// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [b0a7e4d1c3f8a9b2d7e1f0c6b4a2d9f8]

export function saveCache(key: string, data: any) {
   localStorage.setItem(key, JSON.stringify(data))
}

export function loadCache(key: string) {
   const raw = localStorage.getItem(key)
   return raw ? JSON.parse(raw) : null
}

export function clearCache(key: string) {
   localStorage.removeItem(key)
}
