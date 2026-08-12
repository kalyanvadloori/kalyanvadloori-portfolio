import { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Fades + lifts children into view once they enter the viewport. */
export default function Reveal({ children, delay = 0, y = 24, sx }) {
  const ref = useRef(null)
  // Resolved once at mount: visitors who asked for reduced motion start visible,
  // so we never fade anything in for them and never set state inside the effect.
  const [shown, setShown] = useState(prefersReducedMotion)

  useEffect(() => {
    if (shown) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [shown])

  return (
    <Box
      ref={ref}
      sx={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : `translateY(${y}px)`,
        transition: `opacity .7s ease ${delay}ms, transform .7s cubic-bezier(.2,.8,.2,1) ${delay}ms`,
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
