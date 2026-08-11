import { useEffect, useState } from 'react'
import { Box } from '@mui/material'

export default function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Box
      aria-hidden
      sx={(t) => ({
        position: 'fixed',
        top: 0,
        left: 0,
        height: 3,
        width: `${pct}%`,
        zIndex: (th) => th.zIndex.appBar + 1,
        background: `linear-gradient(90deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
        transition: 'width .1s linear',
      })}
    />
  )
}
