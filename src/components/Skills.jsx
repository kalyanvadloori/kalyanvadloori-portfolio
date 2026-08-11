import { Grid, Paper, Typography, Stack, Chip, Box } from '@mui/material'
import { alpha } from '@mui/material/styles'
import DnsIcon from '@mui/icons-material/DnsOutlined'
import StorageIcon from '@mui/icons-material/StorageOutlined'
import CodeIcon from '@mui/icons-material/CodeOutlined'
import CloudIcon from '@mui/icons-material/CloudOutlined'
import TerminalIcon from '@mui/icons-material/TerminalOutlined'
import ArchitectureIcon from '@mui/icons-material/AccountTreeOutlined'
import PipelineIcon from '@mui/icons-material/RocketLaunchOutlined'
import Section from './Section'
import Reveal from './Reveal'
import { skills } from '../data/resume'
import { glassCard } from '../theme'

const ICONS = {
  server: DnsIcon,
  database: StorageIcon,
  code: CodeIcon,
  cloud: CloudIcon,
  terminal: TerminalIcon,
  architecture: ArchitectureIcon,
  pipeline: PipelineIcon,
}

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Tech stack"
      title="Tools I use every day"
      subtitle="The languages, frameworks, cloud services and architecture patterns behind the platforms I build."
    >
      <Grid container spacing={3}>
        {skills.map((group, i) => {
          const Icon = ICONS[group.icon]
          return (
            <Grid item xs={12} sm={6} md={4} key={group.title}>
              <Reveal delay={i * 90}>
                <Paper
                  elevation={0}
                  sx={(t) => ({
                    ...glassCard(t),
                    p: 3,
                    height: '100%',
                  })}
                >
                  <Box
                    sx={(t) => ({
                      width: 46,
                      height: 46,
                      borderRadius: 2.5,
                      display: 'grid',
                      placeItems: 'center',
                      mb: 2,
                      color: 'primary.main',
                      bgcolor: alpha(t.palette.primary.main, 0.12),
                    })}
                  >
                    <Icon />
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1.75 }}>
                    {group.title}
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={0.75}>
                    {group.items.map((item) => (
                      <Chip
                        key={item}
                        label={item}
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
                </Paper>
              </Reveal>
            </Grid>
          )
        })}
      </Grid>
    </Section>
  )
}
