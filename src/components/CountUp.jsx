import { useCallback, useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Splits a display value into its animatable parts:
 *   '4+'    → { target: 4,   suffix: '+',  decimals: 0 }
 *   '3.5M+' → { target: 3.5, suffix: 'M+', decimals: 1 }
 * Returns null for values that don't start with a number, so those render as-is.
 */
function parseValue(value) {
  const match = String(value).match(/^([\d.]+)(.*)$/)
  if (!match) return null

  const [, digits, suffix] = match
  const dot = digits.indexOf('.')

  return {
    target: parseFloat(digits),
    suffix,
    decimals: dot === -1 ? 0 : digits.length - dot - 1,
  }
}

const format = (n, { decimals, suffix }) => `${n.toFixed(decimals)}${suffix}`

/**
 * Counts a stat up from zero. Runs once when it scrolls into view, and again
 * whenever `replay` changes (the stat cards bump it on hover).
 *
 * Visitors who ask for reduced motion just see the final number immediately.
 */
export default function CountUp({ value, replay = 0, duration = 1400 }) {
  const parsed = parseValue(value)
  const ref = useRef(null)
  const frame = useRef(0)

  const [display, setDisplay] = useState(() =>
    parsed && !prefersReducedMotion() ? format(0, parsed) : value
  )

  const run = useCallback(() => {
    if (!parsed || prefersReducedMotion()) return

    cancelAnimationFrame(frame.current)
    const startedAt = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic — fast start, soft landing
      setDisplay(format(parsed.target * eased, parsed))
      if (progress < 1) frame.current = requestAnimationFrame(tick)
    }

    frame.current = requestAnimationFrame(tick)
    // parsed is derived from `value`, so that's the real dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration])

  // First run: when the card scrolls into view.
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run()
          io.disconnect()
        }
      },
      { threshold: 0.4 }
    )

    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame.current)
    }
  }, [run])

  // Replays triggered by hovering the card.
  useEffect(() => {
    if (replay > 0) run()
  }, [replay, run])

  return (
    <Box component="span" ref={ref}>
      {display}
    </Box>
  )
}
