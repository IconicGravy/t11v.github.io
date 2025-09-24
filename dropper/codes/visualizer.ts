// Utility script
// Made @ The 11 View
// Feel free to use
// hash: [f1c8e7d0a2b9c4f6e3a7d1b0c8e2f9a4]

export function initVisualizer(audio: HTMLAudioElement, canvasId: string) {
   const canvas = document.getElementById(canvasId) as HTMLCanvasElement
   if (!canvas) return
   const ctx = canvas.getContext("2d")
   if (!ctx) return

   const ac = new AudioContext()
   const src = ac.createMediaElementSource(audio)
   const analyser = ac.createAnalyser()
   src.connect(analyser)
   analyser.connect(ac.destination)

   const buffer = new Uint8Array(analyser.frequencyBinCount)
   function render() {
      analyser.getByteFrequencyData(buffer)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      buffer.forEach((v, i) => {
         ctx.fillRect(i * 2, canvas.height - v, 1, v)
      })
      requestAnimationFrame(render)
   }
   render()
}
