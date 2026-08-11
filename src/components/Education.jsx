import { Grid, Paper, Typography, Stack, Box, Chip } from '@mui/material'
import { alpha } from '@mui/material/styles'
import SchoolIcon from '@mui/icons-material/SchoolOutlined'
import VerifiedIcon from '@mui/icons-material/WorkspacePremiumOutlined'
import Section from './Section'
import Reveal from './Reveal'
import { education, certifications } from '../data/resume'
import { glassCard } from '../theme'

function Card({ item, index }) {
  const isEdu = item.type === 'education'
  const Icon = isEdu ? SchoolIcon : VerifiedIcon
  const color = isEdu ? 'primary' : 'secondary'

  return (
    <Reveal delay={index * 100}>
      <Paper elevation={0} sx={(t) => ({ ...glassCard(t), p: 3, height: '100%' })}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Box
            sx={(t) => ({
              width: 48,
              height: 48,
              flexShrink: 0,
              borderRadius: 2.5,
              display: 'grid',
              placeItems: 'center',
              color: `${color}.main`,
              bgcolor: alpha(t.palette[color].main, 0.13),
            })}
          >
            <Icon />
          </Box>
          <Box>
            <Chip
              label={isEdu ? 'Education' : 'Certification'}
              size="small"
              sx={(t) => ({
                mb: 1,
                height: 22,
                fontSize: 11,
                fontWeight: 600,
                bgcolor: alpha(t.palette[color].main, 0.12),
                color: `${color}.main`,
              })}
            />
            <Typography variant="h6">{item.title}</Typography>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              {item.org}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.period} · {item.location}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Reveal>
  )
}

export default function Education() {
  const items = [...education, ...certifications]

  return (
    <Section
      id="education"
      eyebrow="Background"
      title="Education & certifications"
      subtitle="Formal study plus a full stack development program."
    >
      <Grid container spacing={3}>
        {items.map((item, i) => (
          <Grid item xs={12} md={6} key={item.title}>
            <Card item={item} index={i} />
          </Grid>
        ))}
      </Grid>
    </Section>
  )
}
