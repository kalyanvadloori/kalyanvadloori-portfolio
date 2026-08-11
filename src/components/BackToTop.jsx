import { Fab, Zoom, useScrollTrigger } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

export default function BackToTop() {
  const show = useScrollTrigger({ disableHysteresis: true, threshold: 400 })

  return (
    <Zoom in={show}>
      <Fab
        color="primary"
        size="medium"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        sx={{ position: 'fixed', bottom: 28, right: 28, zIndex: 1200 }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  )
}
