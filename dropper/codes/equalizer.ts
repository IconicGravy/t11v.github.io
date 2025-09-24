// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [e4f9b1c7a2d8f0c6b3a7e1d9c4f0b28d]

export function initEqualizer(context: AudioContext, source: MediaElementAudioSourceNode) {
   const gainNodes = Array.from({ length: 5 }, () => context.createGain())
   gainNodes.forEach((g, i) => {
      g.gain.value = 1
      source.connect(g).connect(context.destination)
   })
   return gainNodes
}
