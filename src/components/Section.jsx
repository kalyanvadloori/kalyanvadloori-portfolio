import { Box, Container, Typography, Stack } from '@mui/material'
import Reveal from './Reveal'
import { PAGE_MAX_WIDTH, PAGE_PX } from '../theme'

export default function Section({ id, eyebrow, title, subtitle, children, sx }) {
  return (
    <Box
      id={id}
      component="section"
      sx={{ py: { xs: 9, md: 14 }, scrollMarginTop: '80px', ...sx }}
    >
      <Container maxWidth={PAGE_MAX_WIDTH} sx={{ px: PAGE_PX }}>
        <Reveal>
          <Stack spacing={1.75} sx={{ mb: { xs: 5, md: 8 }, maxWidth: 860 }}>
            {eyebrow && (
              <Stack direction="row" spacing={1.25} alignItems="center">
                <Box
                  sx={{
                    width: 28,
                    height: 2,
                    borderRadius: 1,
                    bgcolor: 'primary.main',
                  }}
                />
                <Typography
                  variant="overline"
                  color="primary.main"
                  sx={{ fontSize: { xs: 11.5, md: 13 }, letterSpacing: '0.2em' }}
                >
                  {eyebrow}
                </Typography>
              </Stack>
            )}
            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '2.4rem', sm: '3rem', md: '3.6rem', lg: '4rem' } }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: { xs: '1.05rem', md: '1.2rem' } }}
              >
                {subtitle}
              </Typography>
            )}
          </Stack>
        </Reveal>
        {children}
      </Container>
    </Box>
  )
}
