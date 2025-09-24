// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [b4c8f7d1e2a93f06d7e51c9a84b2f1d0]

export async function fetchDiscordPresence(userId: string) {
   const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`)
   if (!response.ok) return null
   const data = await response.json()
   return data
}
