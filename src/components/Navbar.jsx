import { useEffect, useState } from 'react'
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Stack,
  Tooltip,
  useScrollTrigger,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeIcon from '@mui/icons-material/LightModeOutlined'
import DownloadIcon from '@mui/icons-material/FileDownloadOutlined'
import { navLinks, profile } from '../data/resume'
import { PAGE_MAX_WIDTH, PAGE_PX } from '../theme'

export default function Navbar({ mode, onToggleMode }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 24 })

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        color="transparent"
        sx={(t) => ({
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          backgroundColor: scrolled
            ? alpha(t.palette.background.default, t.palette.mode === 'dark' ? 0.72 : 0.78)
            : 'transparent',
          borderBottom: `1px solid ${scrolled ? t.palette.divider : 'transparent'}`,
          transition: 'all .3s ease',
        })}
      >
        <Container maxWidth={PAGE_MAX_WIDTH} sx={{ px: PAGE_PX }}>
          <Toolbar disableGutters sx={{ minHeight: { xs: 66, md: 80 } }}>
            {/* Brand pill: gradient-ringed monogram + name over a mono role line. */}
            <Box
              component="a"
              href="#top"
              aria-label={`${profile.name} — home`}
              sx={(t) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                textDecoration: 'none',
                pl: 0.75,
                pr: { xs: 1.5, sm: 2.25 },
                py: 0.75,
                borderRadius: 999,
                border: `1px solid ${t.palette.divider}`,
                backgroundColor: alpha(t.palette.text.primary, t.palette.mode === 'dark' ? 0.04 : 0.03),
                transition: 'border-color .3s, background-color .3s',
                '&:hover': {
                  borderColor: alpha(t.palette.secondary.main, 0.45),
                  backgroundColor: alpha(t.palette.secondary.main, 0.06),
                },
                '&:hover .brand-ring': {
                  boxShadow: `0 0 18px ${alpha(t.palette.secondary.main, 0.6)}`,
                },
              })}
            >
              {/* Gradient ring — 2px of gradient showing around a solid inner disc. */}
              <Box
                className="brand-ring"
                sx={(t) => ({
                  width: 38,
                  height: 38,
                  flexShrink: 0,
                  borderRadius: '50%',
                  p: '2px',
                  background: `linear-gradient(135deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
                  boxShadow: `0 0 12px ${alpha(t.palette.secondary.main, 0.35)}`,
                  transition: 'box-shadow .3s',
                })}
              >
                <Box
                  sx={(t) => ({
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    // Solid disc so only the 2px rim of the parent gradient shows.
                    backgroundColor: t.palette.background.default,
                  })}
                >
                  {/* Gradient lives on the letters, not the disc — background-clip:
                      text and a solid background colour can't share one element. */}
                  <Box
                    component="span"
                    sx={(t) => ({
                      fontWeight: 800,
                      fontSize: 14,
                      letterSpacing: '0.02em',
                      background: `linear-gradient(135deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    })}
                  >
                    KV
                  </Box>
                </Box>
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '0.9rem', md: '0.98rem' },
                    lineHeight: 1.2,
                    color: 'text.primary',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {profile.name}
                </Typography>
                <Typography
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 9.5,
                    fontWeight: 500,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'secondary.main',
                    lineHeight: 1.4,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {profile.role}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
              {navLinks.map((link) => (
                <Button
                  key={link.href}
                  href={link.href}
                  sx={{
                    px: 2,
                    fontSize: '1rem',
                    color: active === link.href ? 'primary.main' : 'text.secondary',
                    fontWeight: active === link.href ? 700 : 500,
                    '&:hover': { color: 'text.primary', bgcolor: 'transparent' },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: { md: 2 } }}>
              <Tooltip title={mode === 'dark' ? 'Light mode' : 'Dark mode'}>
                <IconButton onClick={onToggleMode} size="small" color="inherit">
                  {mode === 'dark' ? (
                    <LightModeIcon fontSize="small" />
                  ) : (
                    <DarkModeIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>

              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                href={profile.resumeFile}
                download
                sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
              >
                Resume
              </Button>

              <IconButton
                onClick={() => setOpen(true)}
                sx={{ display: { md: 'none' } }}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { width: 268, px: 1.5, py: 2 } }}
      >
        <Stack direction="row" justifyContent="flex-end">
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <List>
          {navLinks.map((link) => (
            <ListItemButton
              key={link.href}
              component="a"
              href={link.href}
              onClick={() => setOpen(false)}
              sx={{ borderRadius: 2 }}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItemButton>
          ))}
        </List>
        <Button
          fullWidth
          variant="contained"
          startIcon={<DownloadIcon />}
          href={profile.resumeFile}
          download
          sx={{ mt: 1 }}
        >
          Download Resume
        </Button>
      </Drawer>
    </>
  )
}
