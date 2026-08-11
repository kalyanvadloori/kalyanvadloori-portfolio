import { Box, Container, Typography, Stack, IconButton, Divider } from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import MailIcon from '@mui/icons-material/MailOutline'
import PhoneIcon from '@mui/icons-material/PhoneOutlined'
import { profile, navLinks } from '../data/resume'
import { PAGE_MAX_WIDTH, PAGE_PX } from '../theme'

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 5 }}>
      <Container maxWidth={PAGE_MAX_WIDTH} sx={{ px: PAGE_PX }}>
        <Divider sx={{ mb: 4 }} />
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} {profile.name}. Built with React & Material UI.
          </Typography>

          <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navLinks.map((l) => (
              <Typography
                key={l.href}
                component="a"
                href={l.href}
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
              >
                {l.label}
              </Typography>
            ))}
          </Stack>

          <Stack direction="row" spacing={0.5}>
            <IconButton size="small" href={`mailto:${profile.email}`} aria-label="Email">
              <MailIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" href={`tel:${profile.phone.replace(/\s/g, '')}`} aria-label="Phone">
              <PhoneIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              href={profile.linkedin}
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
