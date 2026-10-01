// Shared, mutable state between the DOM hero (GSAP) and the WebGL scene.
// Kept outside three.js imports so the hero doesn't pull three into the main bundle.
export const heroState = { scroll: 0 }

export function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}
