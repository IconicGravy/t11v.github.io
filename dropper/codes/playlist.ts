// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [c7e1a4b9f0d28c5a6b3e9f1d2a7c8b40]

export let playlist: string[] = []

export function addToPlaylist(track: string) {
   playlist.push(track)
}

export function removeFromPlaylist(index: number) {
   playlist.splice(index, 1)
}

export function clearPlaylist() {
   playlist = []
}
