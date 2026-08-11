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
            <Box
              component="a"
              href="#top"
              sx={{ display: 'flex', alignItems: 'center', gap: 1.25, textDecoration: 'none' }}
            >
              <Box
                sx={(t) => ({
                  width: 36,
                  height: 36,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 2,
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: 15,
                  background: `linear-gradient(135deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
                })}
              >
                KV
              </Box>
              <Typography variant="subtitle1" fontWeight={700} color="text.primary">
                Kalyan
                <Box component="span" sx={{ color: 'primary.main' }}>
                  .
                </Box>
              </Typography>
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
