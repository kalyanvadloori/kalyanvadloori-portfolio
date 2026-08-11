import { Grid, Paper, Typography, Stack, Box } from '@mui/material'
import { alpha } from '@mui/material/styles'
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutline'
import Section from './Section'
import Reveal from './Reveal'
import { profile, highlights } from '../data/resume'

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About me"
      title="Building for scale, security and compliance"
      subtitle="A quick look at how I work and what I bring to a team."
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Reveal>
            <Stack spacing={2.5}>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '1.05rem', md: '1.15rem' } }}>
                {profile.summary}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '1.05rem', md: '1.15rem' } }}>
                {profile.summary2}
              </Typography>

              <Paper
                elevation={0}
                sx={(t) => ({
                  p: 2.5,
                  borderRadius: 3,
                  borderLeft: `3px solid ${t.palette.primary.main}`,
                  backgroundColor: alpha(t.palette.primary.main, 0.07),
                })}
              >
                <Typography variant="body2" color="text.secondary" fontStyle="italic">
                  “Owning production releases end-to-end in regulated, high-availability
                  environments — collaborating across Product, Platform, QA and Engineering to
                  deliver large-scale production systems.”
                </Typography>
              </Paper>
            </Stack>
          </Reveal>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={1.5}>
            {highlights.map((h, i) => (
              <Reveal key={h} delay={i * 70}>
                <Paper
                  elevation={0}
                  sx={(t) => ({
                    p: 2,
                    borderRadius: 3,
                    border: `1px solid ${t.palette.divider}`,
                    backgroundColor: alpha(
                      t.palette.background.paper,
                      t.palette.mode === 'dark' ? 0.55 : 0.85
                    ),
                    transition: 'transform .3s, border-color .3s',
                    '&:hover': {
                      transform: 'translateX(6px)',
                      borderColor: alpha(t.palette.primary.main, 0.5),
                    },
                  })}
                >
                  <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <CheckCircleIcon fontSize="small" color="primary" sx={{ mt: 0.3 }} />
                    <Typography variant="body2" color="text.primary">
                      {h}
                    </Typography>
                  </Stack>
                </Paper>
              </Reveal>
            ))}
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ height: 0 }} />
    </Section>
  )
}
