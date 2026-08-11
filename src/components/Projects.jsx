import { useMemo, useState } from 'react'
import {
  Grid,
  Paper,
  Typography,
  Stack,
  Box,
  Collapse,
  Button,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import NorthEastIcon from '@mui/icons-material/NorthEast'
import Section from './Section'
import Reveal from './Reveal'
import { projects } from '../data/resume'

/** Tiny uppercase, wide-tracked label — the pink meta line. */
function MetaLabel({ children, sx }) {
  return (
    <Typography
      component="div"
      sx={{
        fontSize: 10.5,
        fontWeight: 700,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'secondary.main',
        ...sx,
      }}
    >
      {children}
    </Typography>
  )
}

function ProjectCard({ project }) {
  const [open, setOpen] = useState(false)

  return (
    <Paper
      elevation={0}
      sx={(t) => ({
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: 0,
        borderRadius: 4,
        overflow: 'hidden',
        border: `1px solid ${t.palette.divider}`,
        backgroundColor: alpha(t.palette.background.paper, t.palette.mode === 'dark' ? 0.5 : 0.85),
        transition: 'transform .4s cubic-bezier(.2,.8,.2,1), border-color .4s, box-shadow .4s',
        '&:hover': {
          transform: 'translateY(-8px)',
          borderColor: alpha(t.palette[project.accent].main, 0.55),
          boxShadow: `0 22px 55px ${alpha(
            t.palette.mode === 'dark' ? '#000000' : t.palette[project.accent].main,
            t.palette.mode === 'dark' ? 0.6 : 0.16
          )}`,
        },
        '&:hover .cover-monogram': { transform: 'scale(1.06)', opacity: 0.55 },
        '&:hover .cover-launch': { opacity: 1, transform: 'scale(1.1)' },
      })}
    >
      {/* ---- cover tile (links out when the project has a live site) ---- */}
      <Box
        component={project.link ? 'a' : 'div'}
        href={project.link || undefined}
        target={project.link ? '_blank' : undefined}
        rel={project.link ? 'noopener noreferrer' : undefined}
        aria-label={project.link ? `Visit ${project.name}` : undefined}
        sx={(t) => ({
          position: 'relative',
          textDecoration: 'none',
          cursor: project.link ? 'pointer' : 'default',
          aspectRatio: '4 / 3',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.75,
          px: 2,
          borderRadius: 4,
          m: 1,
          overflow: 'hidden',
          background: `linear-gradient(150deg, ${alpha(
            t.palette[project.accent].main,
            t.palette.mode === 'dark' ? 0.32 : 0.2
          )}, ${alpha(t.palette.secondary.main, t.palette.mode === 'dark' ? 0.14 : 0.08)} 55%, ${alpha(
            t.palette.background.default,
            t.palette.mode === 'dark' ? 0.9 : 0.2
          )})`,
        })}
      >
        <Typography
          className="cover-monogram"
          aria-hidden
          sx={(t) => ({
            position: 'absolute',
            top: '38%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: { xs: 62, md: 74 },
            fontWeight: 800,
            letterSpacing: '0.04em',
            lineHeight: 1,
            color: alpha(t.palette.text.primary, 0.3),
            transition: 'transform .5s cubic-bezier(.2,.8,.2,1), opacity .5s',
            userSelect: 'none',
          })}
        >
          {project.code}
        </Typography>

        {project.link && (
          <Box
            className="cover-launch"
            sx={(t) => ({
              position: 'absolute',
              top: 10,
              right: 10,
              width: 30,
              height: 30,
              display: 'grid',
              placeItems: 'center',
              borderRadius: '50%',
              color: t.palette[project.accent].main,
              border: `1px solid ${alpha(t.palette[project.accent].main, 0.45)}`,
              backgroundColor: alpha(t.palette.background.paper, 0.85),
              backdropFilter: 'blur(6px)',
              opacity: 0.75,
              transition: 'opacity .3s, transform .3s',
            })}
          >
            <NorthEastIcon sx={{ fontSize: 15 }} />
          </Box>
        )}

        <Box sx={{ mt: '32%', textAlign: 'center' }}>
          <MetaLabel>{project.name.replace(/\s/g, '')}</MetaLabel>
          <Typography
            sx={(t) => ({
              mt: 0.6,
              fontSize: 10.5,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: alpha(t.palette.text.primary, 0.65),
            })}
          >
            {project.tags.join(' · ')}
          </Typography>
        </Box>
      </Box>

      {/* ---- body ---- */}
      <Box sx={{ px: 2.5, pt: 1.5, pb: 2.5, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Typography
          variant="h6"
          component={project.link ? 'a' : 'div'}
          href={project.link || undefined}
          target={project.link ? '_blank' : undefined}
          rel={project.link ? 'noopener noreferrer' : undefined}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.6,
            fontSize: '1.28rem',
            lineHeight: 1.25,
            color: 'text.primary',
            textDecoration: 'none',
            ...(project.link && { '&:hover': { color: 'primary.main' } }),
          }}
        >
          {project.name}
          {project.link && <NorthEastIcon sx={{ fontSize: 15, opacity: 0.7 }} />}
        </Typography>
        <MetaLabel sx={{ mt: 0.75 }}>{project.tags.join(' · ')}</MetaLabel>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
          {project.blurb}
        </Typography>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <Stack component="ul" spacing={0.9} sx={{ pl: 2.2, mt: 1.75, mb: 0 }}>
            {project.points.map((p) => (
              <Typography key={p} component="li" variant="body2" color="text.secondary">
                {p}
              </Typography>
            ))}
          </Stack>

          <Stack direction="row" flexWrap="wrap" gap={0.7} sx={{ mt: 2 }}>
            {project.tech.map((t) => (
              <Chip key={t} label={t} size="small" variant="outlined" sx={{ fontSize: 11, height: 24 }} />
            ))}
          </Stack>
        </Collapse>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          size="small"
          onClick={() => setOpen((o) => !o)}
          endIcon={
            <ExpandMoreIcon
              sx={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .3s' }}
            />
          }
          sx={{ mt: 2, px: 0, minWidth: 0, alignSelf: 'flex-start' }}
        >
          {open ? 'Close' : 'What I built'}
        </Button>
      </Box>
    </Paper>
  )
}

export default function Projects() {
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((p) => p.category)))],
    []
  )
  const [filter, setFilter] = useState('All')
  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <Section
      id="projects"
      eyebrow="Featured products"
      title="Selected Products"
      subtitle="Each build started with a workflow that was harder than it looked. The cards below spell out what I was solving."
    >
      <Reveal>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(_, v) => v && setFilter(v)}
          sx={{ mb: 4, flexWrap: 'wrap', gap: 1, '& .MuiToggleButtonGroup-grouped': { border: 0 } }}
        >
          {categories.map((c) => (
            <ToggleButton
              key={c}
              value={c}
              sx={(t) => ({
                px: 2,
                py: 0.75,
                borderRadius: '999px !important',
                textTransform: 'none',
                fontWeight: 600,
                border: `1px solid ${t.palette.divider} !important`,
                '&.Mui-selected': {
                  bgcolor: alpha(t.palette.primary.main, 0.14),
                  color: 'primary.main',
                  borderColor: `${alpha(t.palette.primary.main, 0.45)} !important`,
                },
              })}
            >
              {c}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Reveal>

      <Grid container spacing={2.5} alignItems="stretch">
        {visible.map((project, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={project.name}>
            <Reveal delay={i * 80} sx={{ height: '100%' }}>
              <ProjectCard project={project} />
            </Reveal>
          </Grid>
        ))}
      </Grid>
    </Section>
  )
}
