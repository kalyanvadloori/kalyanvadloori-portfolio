import { useEffect, useState } from 'react'
import { Box, Container, Typography, Button, Stack, Chip, Grid, Paper, Tooltip } from '@mui/material'
import { alpha } from '@mui/material/styles'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import MailIcon from '@mui/icons-material/MailOutline'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import PhoneIcon from '@mui/icons-material/PhoneOutlined'
import PlaceIcon from '@mui/icons-material/PlaceOutlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiMongodb,
} from 'react-icons/si'
import { VscAzure } from 'react-icons/vsc'
import { FaAws } from 'react-icons/fa'
import { profile, stats, heroTech } from '../data/resume'
import Reveal from './Reveal'
import CountUp from './CountUp'
import { PAGE_MAX_WIDTH, PAGE_PX } from '../theme'

const ROLES = [
  'Senior Software Engineer',
  'React & TypeScript Developer',
  'Node.js Backend Engineer',
  'Healthcare Platform Builder',
]

function useTypewriter(words, typing = 85, deleting = 45, pause = 1600) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    const word = words[index % words.length]
    let timer

    if (phase === 'typing') {
      if (text.length < word.length) {
        timer = setTimeout(() => setText(word.slice(0, text.length + 1)), typing)
      } else {
        timer = setTimeout(() => setPhase('deleting'), pause)
      }
    } else {
      // Deleting. The hand-off to the next word happens inside the timeout so
      // no state is set synchronously in the effect body (cascading renders).
      timer = setTimeout(() => {
        if (text.length > 1) {
          setText(word.slice(0, text.length - 1))
        } else {
          setText('')
          setPhase('typing')
          setIndex((i) => i + 1)
        }
      }, deleting)
    }

    return () => clearTimeout(timer)
  }, [text, phase, index, words, typing, deleting, pause])

  return text
}

/**
 * Brand logos pinned around the portrait ring.
 * `angle` is degrees clockwise from 3 o'clock; `color` is each brand's own hue.
 * Azure and AWS aren't in the Simple Icons set (trademark removals), so they
 * come from the VS Code and Font Awesome sets instead.
 */
/** One full lap of the ring, in seconds. Raise it to slow the orbit down. */
const ORBIT_SECONDS = 40

// Nine badges spaced 40° apart, starting at 12 o'clock — an even lap with no gaps.
// If you add or remove one, respace the whole ring (360 / count) so it stays even.
const TECH_ORBIT = [
  { label: 'React', Icon: SiReact, color: '#61DAFB', angle: -90 },
  { label: 'TypeScript', Icon: SiTypescript, color: '#3178C6', angle: -50 },
  { label: 'Next.js', Icon: SiNextdotjs, color: '#E5E7EB', angle: -10 },
  { label: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E', angle: 30 },
  { label: 'Express', Icon: SiExpress, color: '#CBD5E1', angle: 70 },
  { label: 'Azure', Icon: VscAzure, color: '#0078D4', angle: 110 },
  { label: 'AWS', Icon: FaAws, color: '#FF9900', angle: 150 },
  { label: 'MySQL', Icon: SiMysql, color: '#00758F', angle: 190 },
  { label: 'MongoDB', Icon: SiMongodb, color: '#47A248', angle: 230 },
]

/**
 * One stat tile. Owns its own hover state so mousing over the card replays the
 * count-up without re-rendering the other three.
 */
function StatCard({ stat }) {
  const [replay, setReplay] = useState(0)

  return (
    <Paper
      elevation={0}
      onMouseEnter={() => setReplay((r) => r + 1)}
      sx={(t) => ({
        p: { xs: 2, md: 2.75 },
        textAlign: 'center',
        borderRadius: 3,
        border: `1px solid ${t.palette.divider}`,
        backgroundColor: alpha(t.palette.background.paper, t.palette.mode === 'dark' ? 0.5 : 0.75),
        backdropFilter: 'blur(10px)',
        transition: 'transform .3s, border-color .3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: alpha(t.palette.primary.main, 0.5),
        },
      })}
    >
      <Typography
        variant="h4"
        sx={(t) => ({
          fontWeight: 800,
          fontSize: { xs: '1.9rem', md: '2.5rem' },
          background: `linear-gradient(120deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        })}
      >
        <CountUp value={stat.value} replay={replay} />
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {stat.label}
      </Typography>
    </Paper>
  )
}

export default function Hero() {
  const typed = useTypewriter(ROLES)

  return (
    <Box
      id="top"
      sx={{
        position: 'relative',
        pt: { xs: 14, md: 20 },
        pb: { xs: 8, md: 12 },
        overflow: 'hidden',
      }}
    >
      {/* animated orbs */}
      <Box
        aria-hidden
        sx={(t) => ({
          position: 'absolute',
          top: -140,
          right: -120,
          width: 520,
          height: 520,
          borderRadius: '50%',
          filter: 'blur(90px)',
          opacity: t.palette.mode === 'dark' ? 0.35 : 0.28,
          background: `radial-gradient(circle at 30% 30%, ${t.palette.primary.main}, transparent 65%)`,
          animation: 'float 14s ease-in-out infinite',
          '@keyframes float': {
            '0%,100%': { transform: 'translate(0,0)' },
            '50%': { transform: 'translate(-30px, 30px)' },
          },
        })}
      />

      <Container maxWidth={PAGE_MAX_WIDTH} sx={{ position: 'relative', px: PAGE_PX }}>
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          <Grid item xs={12} md={7}>
            <Reveal>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2.5 }}>
                <Box sx={{ width: 34, height: 2, borderRadius: 1, bgcolor: 'primary.main' }} />
                <Typography
                  sx={{
                    fontSize: { xs: 11.5, md: 13 },
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'secondary.main',
                  }}
                >
                  {profile.role} · InterScripts Software
                </Typography>
              </Stack>
            </Reveal>

            <Reveal>
              <Chip
                size="small"
                label={profile.availability}
                sx={(t) => ({
                  mb: 3,
                  px: 0.5,
                  fontWeight: 600,
                  color: 'success.main',
                  bgcolor: alpha(t.palette.success.main, 0.12),
                  border: `1px solid ${alpha(t.palette.success.main, 0.3)}`,
                  '& .MuiChip-icon': { color: 'success.main' },
                })}
                icon={
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: 'success.main',
                      ml: 1.2,
                      animation: 'pulse 1.8s ease-in-out infinite',
                      '@keyframes pulse': {
                        '0%,100%': { opacity: 1, transform: 'scale(1)' },
                        '50%': { opacity: 0.4, transform: 'scale(0.8)' },
                      },
                    }}
                  />
                }
              />
            </Reveal>

            <Reveal delay={80}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '3rem', sm: '4.2rem', md: '5.2rem', lg: '6.2rem' },
                  mb: 1.5,
                }}
              >
                Hi, I&apos;m{' '}
                <Box
                  component="span"
                  sx={(t) => ({
                    background: `linear-gradient(120deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  })}
                >
                  Kalyan
                </Box>
              </Typography>
            </Reveal>

            <Reveal delay={140}>
              <Typography
                variant="h4"
                color="text.secondary"
                sx={{
                  mb: 3,
                  minHeight: { xs: 44, md: 62 },
                  fontSize: { xs: '1.5rem', md: '2.2rem', lg: '2.5rem' },
                }}
              >
                {typed}
                <Box
                  component="span"
                  sx={{
                    ml: 0.4,
                    color: 'primary.main',
                    animation: 'blink 1s step-end infinite',
                    '@keyframes blink': { '50%': { opacity: 0 } },
                  }}
                >
                  |
                </Box>
              </Typography>
            </Reveal>

            <Reveal delay={200}>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 640, fontSize: { xs: '1.08rem', md: '1.2rem' }, mb: 3.5 }}
              >
                {profile.tagline}
              </Typography>
            </Reveal>

            <Reveal delay={230}>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3.5 }}>
                {heroTech.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    size="small"
                    sx={(t) => ({
                      bgcolor: alpha(t.palette.text.primary, 0.05),
                      border: `1px solid ${t.palette.divider}`,
                      transition: 'all .25s',
                      '&:hover': {
                        bgcolor: alpha(t.palette.primary.main, 0.14),
                        color: 'primary.main',
                        borderColor: alpha(t.palette.primary.main, 0.4),
                      },
                    })}
                  />
                ))}
              </Stack>
            </Reveal>

            <Reveal delay={260}>
              <Stack
                direction="row"
                spacing={2.5}
                flexWrap="wrap"
                useFlexGap
                sx={{ mb: 4, color: 'text.secondary' }}
              >
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <PlaceIcon fontSize="small" color="primary" />
                  <Typography variant="body2">{profile.location}</Typography>
                </Stack>
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <PhoneIcon fontSize="small" color="primary" />
                  <Typography variant="body2">{profile.phone}</Typography>
                </Stack>
              </Stack>
            </Reveal>

            <Reveal delay={320}>
              <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                <Button variant="contained" size="large" href="#projects" endIcon={<ArrowForwardIcon />}>
                  View My Work
                </Button>
                <Button variant="outlined" size="large" href="#contact" startIcon={<MailIcon />}>
                  Get in Touch
                </Button>
                <Button
                  size="large"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener"
                  startIcon={<LinkedInIcon />}
                  sx={{ color: 'text.secondary' }}
                >
                  LinkedIn
                </Button>
                {profile.github && (
                  <Button
                    size="large"
                    href={profile.github}
                    target="_blank"
                    rel="noopener"
                    startIcon={<GitHubIcon />}
                    sx={{ color: 'text.secondary' }}
                  >
                    GitHub
                  </Button>
                )}
              </Stack>
            </Reveal>
          </Grid>

          <Grid item xs={12} md={5}>
            <Reveal delay={220} y={36}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: { xs: 320, sm: 400, md: 440, lg: 500 },
                  mx: 'auto',
                  aspectRatio: '1 / 1',
                }}
              >
                {/* soft glow behind the portrait */}
                <Box
                  aria-hidden
                  sx={(t) => ({
                    position: 'absolute',
                    inset: '-12%',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    opacity: t.palette.mode === 'dark' ? 0.5 : 0.35,
                    background: `radial-gradient(circle at 50% 45%, ${alpha(
                      t.palette.primary.main,
                      0.55
                    )}, ${alpha(t.palette.secondary.main, 0.25)} 55%, transparent 72%)`,
                  })}
                />

                {/* outer dashed orbit */}
                <Box
                  aria-hidden
                  sx={(t) => ({
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: `1px dashed ${alpha(t.palette.primary.main, 0.28)}`,
                    animation: 'spin 38s linear infinite',
                    '@keyframes spin': {
                      from: { transform: 'rotate(0deg)' },
                      to: { transform: 'rotate(360deg)' },
                    },
                  })}
                />

                {/* inner ring */}
                <Box
                  aria-hidden
                  sx={(t) => ({
                    position: 'absolute',
                    inset: '6%',
                    borderRadius: '50%',
                    border: `1px solid ${alpha(t.palette.text.primary, 0.18)}`,
                  })}
                />

                {/* the portrait */}
                <Box
                  sx={(t) => ({
                    position: 'absolute',
                    inset: '10%',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    background: `linear-gradient(160deg, ${alpha(
                      t.palette.primary.main,
                      0.9
                    )}, ${alpha(t.palette.secondary.main, 0.9)})`,
                    p: '3px',
                    boxShadow:
                      t.palette.mode === 'dark'
                        ? '0 30px 70px rgba(0,0,0,0.65)'
                        : '0 24px 60px rgba(15,23,42,0.18)',
                    /**
                     * Zooms in on load, landing just after the surrounding rings
                     * appear. `both` fill keeps the start frame before the delay
                     * elapses and the end frame after, so the photo never flashes
                     * at full size first — and reduced-motion visitors (whose
                     * animations are cut to 0.01ms globally) still end up here.
                     */
                    animation: 'portraitIn 1s cubic-bezier(.2,.8,.2,1) .3s both',
                    '@keyframes portraitIn': {
                      from: { opacity: 0, transform: 'scale(0.88)' },
                      to: { opacity: 1, transform: 'scale(1)' },
                    },
                    // Slow push-in on hover. The circle clips it, so the crop
                    // tightens on the face instead of the frame growing.
                    '&:hover .portrait-img': { transform: 'scale(1.07)' },
                  })}
                >
                  <Box
                    component="img"
                    className="portrait-img"
                    src={profile.photo}
                    alt={`${profile.name} — ${profile.role}`}
                    loading="eager"
                    fetchpriority="high"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                    sx={{
                      width: '100%',
                      height: '100%',
                      display: 'block',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      objectPosition: profile.photoPosition || '50% 25%',
                      transition: 'transform .7s cubic-bezier(.2,.8,.2,1)',
                    }}
                  />
                </Box>

                {/* orbiting tech badges */}
                {/*
                  The whole ring of badges rotates as one. Each badge then spins
                  backwards at the same speed so the logos stay upright instead of
                  tumbling. Hovering anywhere on the ring pauses both.
                */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    animation: `orbit ${ORBIT_SECONDS}s linear infinite`,
                    '@keyframes orbit': {
                      from: { transform: 'rotate(0deg)' },
                      to: { transform: 'rotate(360deg)' },
                    },
                    '&:hover, &:hover .orbit-badge': { animationPlayState: 'paused' },
                    '@media (prefers-reduced-motion: reduce)': {
                      animation: 'none',
                      '& .orbit-badge': { animation: 'none' },
                    },
                  }}
                >
                  {TECH_ORBIT.map(({ label, Icon, color, angle }) => {
                    const rad = (angle * Math.PI) / 180
                    return (
                      <Box
                        key={label}
                        sx={{
                          position: 'absolute',
                          left: `${50 + 50 * Math.cos(rad)}%`,
                          top: `${50 + 50 * Math.sin(rad)}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <Tooltip title={label} placement="top" arrow>
                          <Box
                            className="orbit-badge"
                            aria-label={label}
                            sx={(t) => ({
                              width: { xs: 34, sm: 40, md: 46 },
                              height: { xs: 34, sm: 40, md: 46 },
                              display: 'grid',
                              placeItems: 'center',
                              borderRadius: '50%',
                              color,
                              fontSize: { xs: 16, sm: 19, md: 22 },
                              border: `1px solid ${alpha(color, 0.45)}`,
                              backgroundColor: alpha(
                                t.palette.background.paper,
                                t.palette.mode === 'dark' ? 0.92 : 0.97
                              ),
                              backdropFilter: 'blur(8px)',
                              boxShadow: `0 4px 16px ${alpha('#000', 0.3)}, 0 0 18px ${alpha(
                                color,
                                0.28
                              )}`,
                              transition: 'box-shadow .3s',
                              cursor: 'default',
                              animation: `counter-orbit ${ORBIT_SECONDS}s linear infinite`,
                              '@keyframes counter-orbit': {
                                from: { transform: 'rotate(0deg)' },
                                to: { transform: 'rotate(-360deg)' },
                              },
                              '&:hover': {
                                boxShadow: `0 6px 20px ${alpha('#000', 0.35)}, 0 0 26px ${alpha(
                                  color,
                                  0.65
                                )}`,
                              },
                            })}
                          >
                            <Icon />
                          </Box>
                        </Tooltip>
                      </Box>
                    )
                  })}
                </Box>
              </Box>
            </Reveal>
          </Grid>
        </Grid>

        <Reveal delay={380}>
          <Grid container spacing={2} sx={{ mt: { xs: 6, md: 10 } }}>
            {stats.map((s) => (
              <Grid item xs={6} md={3} key={s.label}>
                <StatCard stat={s} />
              </Grid>
            ))}
          </Grid>
        </Reveal>

        <Box sx={{ textAlign: 'center', mt: { xs: 6, md: 8 } }}>
          <KeyboardArrowDownIcon
            sx={{
              color: 'text.secondary',
              animation: 'bounce 2s infinite',
              '@keyframes bounce': {
                '0%,100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(8px)' },
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  )
}
