// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [f0a3c8e7b2d1a9c4e5f7b0d6a2c1e9f4]

export async function fetchLyrics(track: string, artist: string) {
   const url = `https://api.lyrics.ovh/v1/${artist}/${track}`
   const response = await fetch(url)
   if (!response.ok) return null
   const data = await response.json()
   return data.lyrics || null
}
