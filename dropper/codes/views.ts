// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [d0a7f2b9c38e5d1a7f6c2b41e8d3f90a]

// Not using this for the11view.xyz or licensed pages only for testing purposes
export async function syncViews() {
   const key = "views"
   const count = parseInt(localStorage.getItem(key) || "0") + 1
   localStorage.setItem(key, count.toString())
   return count
}
