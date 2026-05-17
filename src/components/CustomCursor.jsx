import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0

    const moveCursor = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = `${mouseX}px`
      cursor.style.top = `${mouseY}px`
    }

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.15
      followerY += (mouseY - followerY) * 0.15
      follower.style.left = `${followerX}px`
      follower.style.top = `${followerY}px`
      requestAnimationFrame(animateFollower)
    }

    const handleHoverStart = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        setIsHovering(true)
      }
    }

    const handleHoverEnd = () => setIsHovering(false)

    document.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleHoverStart)
    document.addEventListener('mouseout', handleHoverEnd)
    const raf = requestAnimationFrame(animateFollower)

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleHoverStart)
      document.removeEventListener('mouseout', handleHoverEnd)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
      />
      <div
        ref={followerRef}
        className={`custom-cursor-follower ${isHovering ? 'hovering' : ''}`}
      />
    </>
  )
}
