import { Box, Paper, Typography, Stack, Chip } from '@mui/material'
import { alpha } from '@mui/material/styles'
import WorkIcon from '@mui/icons-material/WorkOutline'
import PlaceIcon from '@mui/icons-material/PlaceOutlined'
import Section from './Section'
import Reveal from './Reveal'
import { experience } from '../data/resume'
import { glassCard } from '../theme'

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Career"
      title="Where I've worked"
      subtitle="Nearly four years building and shipping production platforms across healthcare, event services and e-commerce."
    >
      <Box sx={{ position: 'relative', pl: { xs: 4, md: 6 } }}>
        {/* timeline rail */}
        <Box
          aria-hidden
          sx={(t) => ({
            position: 'absolute',
            left: { xs: 10, md: 18 },
            top: 8,
            bottom: 8,
            width: 2,
            borderRadius: 1,
            background: `linear-gradient(180deg, ${t.palette.primary.main}, ${alpha(
              t.palette.secondary.main,
              0.15
            )})`,
          })}
        />

        <Stack spacing={4}>
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 110}>
              <Box sx={{ position: 'relative' }}>
                <Box
                  aria-hidden
                  sx={(t) => ({
                    position: 'absolute',
                    left: { xs: -30, md: -46 },
                    top: 26,
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    bgcolor: job.current ? 'primary.main' : 'background.paper',
                    border: `3px solid ${t.palette.primary.main}`,
                    boxShadow: job.current
                      ? `0 0 0 6px ${alpha(t.palette.primary.main, 0.16)}`
                      : 'none',
                  })}
                />
                <Paper elevation={0} sx={(t) => ({ ...glassCard(t), p: { xs: 2.5, md: 3.5 } })}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    spacing={1}
                    sx={{ mb: 1.5 }}
                  >
                    <Box>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                        <WorkIcon fontSize="small" color="primary" />
                        <Typography variant="h6">{job.role}</Typography>
                        {job.current && (
                          <Chip
                            label="Current"
                            size="small"
                            color="success"
                            variant="outlined"
                            sx={{ height: 22, fontSize: 11 }}
                          />
                        )}
                      </Stack>
                      <Typography variant="subtitle1" color="primary.main" fontWeight={600}>
                        {job.company}
                      </Typography>
                      {job.project && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontStyle="italic"
                          sx={{ mt: 0.25 }}
                        >
                          {job.project}
                        </Typography>
                      )}
                    </Box>
                    <Stack alignItems={{ xs: 'flex-start', sm: 'flex-end' }} spacing={0.5}>
                      <Chip
                        label={job.period}
                        size="small"
                        sx={(t) => ({
                          bgcolor: alpha(t.palette.primary.main, 0.1),
                          color: 'primary.main',
                          fontWeight: 600,
                        })}
                      />
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <PlaceIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          {job.location}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>

                  <Stack component="ul" spacing={1} sx={{ pl: 2.5, my: 2 }}>
                    {job.points.map((p) => (
                      <Typography
                        key={p}
                        component="li"
                        variant="body2"
                        color="text.secondary"
                        sx={{ '&::marker': { color: 'primary.main' } }}
                      >
                        {p}
                      </Typography>
                    ))}
                  </Stack>

                  <Stack direction="row" flexWrap="wrap" gap={0.75}>
                    {job.stack.map((s) => (
                      <Chip
                        key={s}
                        label={s}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: 11.5 }}
                      />
                    ))}
                  </Stack>
                </Paper>
              </Box>
            </Reveal>
          ))}
        </Stack>
      </Box>
    </Section>
  )
}
