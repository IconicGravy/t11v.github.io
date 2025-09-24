// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [f2a8c9b7d3e0a4c1b6d9e8f5c7a2b013]

export async function syncData(endpoint: string, payload: any) {
   const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
   })
   return response.ok ? await response.json() : null
}
