import { useEffect, useRef } from 'react'

const LEAF_EMOJIS = ['🍃', '🍂', '🍁', '🌿']
const LEAF_COUNT = 12

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

export default function LeafFall() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const leaves = []

    const createLeaf = (delayed = false) => {
      const leaf = document.createElement('div')
      const emoji = LEAF_EMOJIS[Math.floor(Math.random() * LEAF_EMOJIS.length)]
      leaf.textContent = emoji
      leaf.style.cssText = `
        position: fixed;
        top: -60px;
        left: ${randomBetween(0, 100)}vw;
        font-size: ${randomBetween(14, 26)}px;
        opacity: 0;
        pointer-events: none;
        z-index: 10;
        user-select: none;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
      `
      container.appendChild(leaf)

      const duration = randomBetween(8000, 14000)
      const delay = delayed ? randomBetween(0, 6000) : 0
      const swayAmplitude = randomBetween(60, 140)
      const rotation = randomBetween(0, 360)
      const startLeft = parseFloat(leaf.style.left)

      let start = null
      let animId

      const animate = (ts) => {
        if (!start) start = ts + delay
        const elapsed = ts - start
        if (elapsed < 0) { animId = requestAnimationFrame(animate); return }

        const t = elapsed / duration
        if (t > 1) {
          container.removeChild(leaf)
          leaves.splice(leaves.indexOf(animId), 1)
          // Respawn
          createLeaf(false)
          return
        }

        const y = t * (window.innerHeight + 120) - 60
        const swayX = Math.sin(t * Math.PI * 4) * swayAmplitude
        const currentLeft = startLeft + (swayX / window.innerWidth) * 100
        const rot = rotation + t * 360

        const fadeIn = Math.min(elapsed / 800, 1)
        const fadeOut = t > 0.85 ? 1 - (t - 0.85) / 0.15 : 1
        const opacity = fadeIn * fadeOut * 0.65

        leaf.style.transform = `translate(${swayX}px, ${y}px) rotate(${rot}deg)`
        leaf.style.opacity = opacity

        animId = requestAnimationFrame(animate)
        leaves.push(animId)
      }

      animId = requestAnimationFrame(animate)
      leaves.push(animId)
    }

    // Create initial batch with delays spread out
    for (let i = 0; i < LEAF_COUNT; i++) {
      createLeaf(true)
    }

    return () => {
      leaves.forEach(id => cancelAnimationFrame(id))
      while (container.firstChild) container.removeChild(container.firstChild)
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-10" />
}
